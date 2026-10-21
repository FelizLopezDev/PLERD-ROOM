/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage, Source } from '../types';
import { GraduationCap, Plus, FileText, Send } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

export const NotebookView: React.FC<{ notebookId: string }> = ({ notebookId }) => {
  const {
    notebooks,
    go,
    addSource,
    removeSource,
    deleteNotebook,
    chatHistories,
    setNotebookChat,
  } = useApp();

  const notebook = notebooks.find((n) => n.id === notebookId);

  // Casillas de fuentes marcadas por defecto
  const [checkedSourceIds, setCheckedSourceIds] = useState<Set<string>>(() => {
    return new Set(notebook?.sources.map((s) => s.id) || []);
  });

  const [activeSourceId, setActiveSourceId] = useState<string | null>(
    notebook && notebook.sources.length > 0 ? notebook.sources[0].id : null
  );

  // Historial de chat persistido en el contexto de la sesión
  const messages = chatHistories[notebookId] || [
    {
      id: 'm-initial',
      sender: 'assistant',
      text: `Has abierto "${notebook?.title || 'este cuaderno'}". Puedes formular preguntas sobre las fuentes marcadas o solicitar materiales de estudio.`,
    },
  ];

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Panel Estudio
  const [studyAction, setStudyAction] = useState<'summary' | 'keypoints' | 'glossary' | null>(null);
  const [studyResult, setStudyResult] = useState<string | null>(null);
  const [isStudyLoading, setIsStudyLoading] = useState(false);
  const [studyError, setStudyError] = useState<string | null>(null);

  // Modal para agregar fuente (solo personales)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<'text' | 'file' | 'link'>('text');
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceContent, setSourceContent] = useState('');
  const [sourceLink, setSourceLink] = useState('');
  const [savedConfirmation, setSavedConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cerrar modal de agregar fuente con Escape
  useEffect(() => {
    if (!isAddModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAddModalOpen(false);
        setSourceTitle('');
        setSourceContent('');
        setSourceLink('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddModalOpen]);

  // Preguntas sugeridas dinámicas generadas desde los títulos de las fuentes
  const dynamicQuestions = useMemo(() => {
    if (!notebook || notebook.sources.length === 0) return [];
    const s = notebook.sources;
    const q: string[] = [];
    if (s[0]) q.push(`¿Qué establece "${s[0].title}"?`);
    if (s[1]) q.push(`¿Cuáles son las reglas principales de "${s[1].title}"?`);
    if (s[2]) q.push(`¿Cómo se aplica en la práctica "${s[2].title}"?`);
    else if (s[0]) q.push(`Resume los puntos esenciales de "${s[0].title}"`);
    return q.slice(0, 3);
  }, [notebook?.sources]);

  if (!notebook) {
    return (
      <div className="bg-surface border border-line rounded-2xl p-8 text-center space-y-4">
        <p className="text-sm text-muted">No se encontró este cuaderno.</p>
      </div>
    );
  }

  const selectedSources = notebook.sources.filter((s) => checkedSourceIds.has(s.id));
  const activeSource = notebook.sources.find((s) => s.id === activeSourceId);

  const toggleSourceCheck = (sourceId: string) => {
    setCheckedSourceIds((prev) => {
      const next = new Set(prev);
      if (next.has(sourceId)) {
        next.delete(sourceId);
      } else {
        next.add(sourceId);
      }
      return next;
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || selectedSources.length === 0 || isThinking) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: text.trim(),
    };

    const newHistory = [...messages, userMsg];
    setNotebookChat(notebookId, newHistory);
    setInputQuery('');
    setIsThinking(true);

    // Filtrar mensaje de saludo inicial: enviar SOLO turnos reales que comiencen por el usuario
    const realHistory = messages.filter((m) => m.id !== 'm-initial');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: realHistory,
          sources: selectedSources.map((s) => ({ title: s.title, content: s.content })),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Error al conectar con el servidor.');
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'assistant',
        text: data.text,
      };

      setNotebookChat(notebookId, [...newHistory, assistantMsg]);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error de conexión con el modelo.');
    } finally {
      setIsThinking(false);
    }
  };

  const handleStudyAction = async (action: 'summary' | 'keypoints' | 'glossary') => {
    if (selectedSources.length === 0 || isStudyLoading) return;

    setStudyAction(action);
    setStudyResult(null);
    setStudyError(null);
    setIsStudyLoading(true);

    try {
      const res = await fetch('/api/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          sources: selectedSources.map((s) => ({ title: s.title, content: s.content })),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Error al generar material de estudio.');
      }

      setStudyResult(data.text);
    } catch (err: any) {
      setStudyError(err.message || 'Error al generar.');
    } finally {
      setIsStudyLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!sourceTitle.trim()) {
      setSourceTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSourceContent(content || '');
    };
    reader.readAsText(file);
  };

  const handleSaveSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceTitle.trim()) return;

    const finalContent =
      addMode === 'link'
        ? `Fuente de referencia: ${sourceLink}\n\n${sourceContent}`
        : sourceContent;

    if (!finalContent.trim()) return;

    // Agregar fuente y marcar SOLO la nueva fuente conservando la selección existente
    const newSourceId = addSource(notebook.id, {
      title: sourceTitle.trim(),
      type: addMode === 'file' ? 'file' : addMode === 'link' ? 'link' : 'text',
      content: finalContent.trim(),
    });

    if (newSourceId) {
      setCheckedSourceIds((prev) => new Set([...prev, newSourceId]));
      setActiveSourceId(newSourceId);
    }

    setSavedConfirmation(true);
    setTimeout(() => {
      setSavedConfirmation(false);
      setIsAddModalOpen(false);
      setSourceTitle('');
      setSourceContent('');
      setSourceLink('');
    }, 700);
  };

  const handleRemoveSource = (sourceId: string, title: string) => {
    if (window.confirm(`¿Quitar la fuente "${title}" de este cuaderno personal?`)) {
      removeSource(notebook.id, sourceId);
      setCheckedSourceIds((prev) => {
        const next = new Set(prev);
        next.delete(sourceId);
        return next;
      });
      if (activeSourceId === sourceId) {
        setActiveSourceId(null);
      }
    }
  };

  const handleDeleteNotebook = () => {
    if (window.confirm(`¿Seguro que deseas eliminar el cuaderno "${notebook.title}"? Esta acción no se puede deshacer.`)) {
      deleteNotebook(notebook.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabecera del Cuaderno: Título único y botón Examinarme (sin botón volver duplicado) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-ink truncate">{notebook.title}</h1>
          <span className="text-xs text-muted">
            {notebook.scope === 'general' ? 'Oficial PLERD' : 'Personal'}
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {notebook.scope === 'personal' && (
            <button
              type="button"
              onClick={handleDeleteNotebook}
              className="text-xs text-muted hover:text-ink border border-line bg-surface rounded-full px-3 py-1.5 transition-colors"
            >
              Eliminar cuaderno
            </button>
          )}

          <button
            onClick={() => go({ name: 'exam', id: notebook.id })}
            disabled={notebook.sources.length === 0}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-strong disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <GraduationCap size={16} strokeWidth={1.75} />
            <span>Examinarme</span>
          </button>
        </div>
      </div>

      {/* Contenido en Dos Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Fuentes del Cuaderno */}
        <div className="lg:col-span-5 bg-surface border border-line rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-ink">
                Fuentes ({notebook.sources.length})
              </h2>
              <span className="text-xs text-muted">
                {notebook.scope === 'general' ? 'Material oficial del PLERD' : 'Cuaderno personal'}
              </span>
            </div>

            {notebook.scope === 'personal' && (
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs text-ink hover:text-muted font-medium"
              >
                <Plus size={16} strokeWidth={1.75} />
                <span>Agregar fuente</span>
              </button>
            )}
          </div>

          {/* Aviso si no hay fuentes seleccionadas */}
          {checkedSourceIds.size === 0 && (
            <p className="text-xs text-muted">
              Marca al menos una fuente para estudiar o consultar.
            </p>
          )}

          {/* Lista de fuentes con casilla, FileText y botón discreto Quitar */}
          <div className="space-y-2">
            {notebook.sources.length === 0 ? (
              <p className="text-xs text-muted py-4 text-center">
                No hay fuentes en este cuaderno.
              </p>
            ) : (
              notebook.sources.map((source) => {
                const isChecked = checkedSourceIds.has(source.id);
                const isSelected = source.id === activeSourceId;

                return (
                  <div
                    key={source.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                      isSelected
                        ? 'border-line bg-base text-ink'
                        : 'border-line bg-surface text-muted hover:text-ink'
                    }`}
                  >
                    <div
                      onClick={() => setActiveSourceId(source.id)}
                      className="flex items-center gap-2 flex-1 cursor-pointer truncate"
                    >
                      <FileText size={16} strokeWidth={1.75} />
                      <span className="truncate">{source.title}</span>
                    </div>

                    <div className="flex items-center gap-2 ml-2">
                      {notebook.scope === 'personal' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSource(source.id, source.title);
                          }}
                          className="text-[11px] text-muted hover:text-ink border border-line rounded-full px-2 py-0.5 transition-colors"
                        >
                          Quitar
                        </button>
                      )}

                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSourceCheck(source.id)}
                        aria-label={`Incluir ${source.title}`}
                        className="w-4 h-4 rounded border-line cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Lector del fragmento de la fuente seleccionada */}
          {activeSource && (
            <div className="pt-3 border-t border-line space-y-2">
              <h3 className="text-xs font-semibold text-ink">{activeSource.title}</h3>
              <div className="bg-base border border-line rounded-xl p-3 text-xs text-muted whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {activeSource.content}
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha: Estudio y Chat Basado en Fuentes */}
        <div className="lg:col-span-7 space-y-4">
          {/* Panel Estudio con Resumen, Puntos clave, Glosario */}
          <div className="bg-surface border border-line rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Estudio</h2>
              <span className="text-xs text-muted">
                {selectedSources.length}{' '}
                {selectedSources.length === 1 ? 'fuente marcada' : 'fuentes marcadas'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={selectedSources.length === 0 || isStudyLoading}
                onClick={() => handleStudyAction('summary')}
                className="text-xs font-medium text-ink hover:text-muted disabled:opacity-40 bg-base border border-line rounded-full px-3.5 py-1.5 transition-colors"
              >
                Resumen
              </button>
              <button
                type="button"
                disabled={selectedSources.length === 0 || isStudyLoading}
                onClick={() => handleStudyAction('keypoints')}
                className="text-xs font-medium text-ink hover:text-muted disabled:opacity-40 bg-base border border-line rounded-full px-3.5 py-1.5 transition-colors"
              >
                Puntos clave
              </button>
              <button
                type="button"
                disabled={selectedSources.length === 0 || isStudyLoading}
                onClick={() => handleStudyAction('glossary')}
                className="text-xs font-medium text-ink hover:text-muted disabled:opacity-40 bg-base border border-line rounded-full px-3.5 py-1.5 transition-colors"
              >
                Glosario
              </button>
            </div>

            {isStudyLoading && (
              <p className="text-xs text-muted italic">Generando material con las fuentes...</p>
            )}

            {studyError && (
              <p className="text-xs text-muted border border-line bg-base p-2.5 rounded-xl">
                {studyError}
              </p>
            )}

            {studyResult && !isStudyLoading && (
              <div className="bg-base border border-line rounded-xl p-3.5 text-xs text-ink leading-relaxed max-h-56 overflow-y-auto">
                <span className="font-semibold block mb-1.5 text-muted uppercase tracking-wider text-[10px]">
                  {studyAction === 'summary'
                    ? 'Resumen'
                    : studyAction === 'keypoints'
                    ? 'Puntos clave'
                    : 'Glosario'}
                </span>
                <MarkdownRenderer content={studyResult} />
              </div>
            )}
          </div>

          {/* Interfaz de Chat con renderizado de Markdown */}
          <div className="bg-surface border border-line rounded-2xl p-5 flex flex-col h-[520px]">
            <div className="pb-3 border-b border-line flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Conversación</h2>
              <span className="text-xs text-muted">
                {selectedSources.length > 0
                  ? `${selectedSources.length} fuentes activas`
                  : 'Sin fuentes marcadas'}
              </span>
            </div>

            {/* Mensajes del chat */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {messages.map((m) => {
                const isUser = m.sender === 'user';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-ink text-white'
                          : 'bg-base text-ink border border-line'
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-line">{m.text}</p>
                      ) : (
                        <MarkdownRenderer content={m.text} />
                      )}
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex flex-col items-start">
                  <div className="bg-base text-muted border border-line rounded-2xl px-4 py-2.5 text-xs italic">
                    Pensando...
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="bg-base border border-line text-xs text-muted p-3 rounded-xl">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* 3 Preguntas sugeridas dinámicas generadas desde los títulos */}
            {dynamicQuestions.length > 0 && (
              <div className="py-2 flex items-center gap-2 overflow-x-auto">
                {dynamicQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={selectedSources.length === 0 || isThinking}
                    onClick={() => handleSendMessage(q)}
                    className="text-xs text-muted hover:text-ink disabled:opacity-40 bg-base border border-line rounded-full px-3 py-1 whitespace-nowrap transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Formulario de envío */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="pt-2 border-t border-line flex items-center gap-2"
            >
              <input
                type="text"
                disabled={selectedSources.length === 0 || isThinking}
                placeholder={
                  selectedSources.length === 0
                    ? 'Marca al menos una fuente para consultar...'
                    : 'Haz una pregunta sobre las fuentes marcadas...'
                }
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 bg-base border border-line rounded-full px-4 py-2 text-xs text-ink focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || selectedSources.length === 0 || isThinking}
                aria-label="Enviar mensaje"
                className="w-8 h-8 rounded-full bg-ink text-white disabled:opacity-40 flex items-center justify-center shrink-0 transition-opacity"
              >
                <Send size={16} strokeWidth={1.75} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal accesible para Agregar Fuente (solo personales) */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setIsAddModalOpen(false);
            setSourceTitle('');
            setSourceContent('');
            setSourceLink('');
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/20 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-line rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-sm"
          >
            <h3 className="text-base font-bold text-ink">Agregar fuente</h3>

            {/* Pestañas de método */}
            <div className="flex items-center gap-2 border-b border-line pb-2">
              <button
                type="button"
                onClick={() => setAddMode('text')}
                className={`text-xs px-3 py-1 rounded-full border ${
                  addMode === 'text'
                    ? 'border-line bg-base font-semibold text-ink'
                    : 'border-transparent text-muted'
                }`}
              >
                Pegar texto
              </button>
              <button
                type="button"
                onClick={() => setAddMode('file')}
                className={`text-xs px-3 py-1 rounded-full border ${
                  addMode === 'file'
                    ? 'border-line bg-base font-semibold text-ink'
                    : 'border-transparent text-muted'
                }`}
              >
                Subir .txt / .md
              </button>
              <button
                type="button"
                onClick={() => setAddMode('link')}
                className={`text-xs px-3 py-1 rounded-full border ${
                  addMode === 'link'
                    ? 'border-line bg-base font-semibold text-ink'
                    : 'border-transparent text-muted'
                }`}
              >
                Enlace de referencia
              </button>
            </div>

            <form onSubmit={handleSaveSource} className="space-y-3">
              <div>
                <label className="text-xs text-muted block mb-1">Título de la fuente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Notas de procedimiento"
                  value={sourceTitle}
                  onChange={(e) => setSourceTitle(e.target.value)}
                  className="w-full bg-base border border-line rounded-xl px-3 py-2 text-xs text-ink focus:outline-none"
                />
              </div>

              {addMode === 'file' && (
                <div>
                  <label className="text-xs text-muted block mb-1">Archivo .txt o .md</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".txt,.md"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-muted file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border file:border-line file:text-xs file:bg-base file:text-ink cursor-pointer"
                  />
                </div>
              )}

              {addMode === 'link' && (
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-muted block mb-1">Enlace de referencia</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={sourceLink}
                      onChange={(e) => setSourceLink(e.target.value)}
                      className="w-full bg-base border border-line rounded-xl px-3 py-2 text-xs text-ink focus:outline-none"
                    />
                  </div>
                  <div className="bg-base border border-line rounded-xl p-2.5 text-xs text-muted leading-relaxed">
                    Este enlace es solo de referencia. Para que el cuaderno pueda estudiar su contenido, pega el texto del documento.
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs text-muted block mb-1">
                  {addMode === 'link' ? 'Texto pegado del documento *' : 'Contenido de la fuente *'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe o pega el texto del documento aquí..."
                  value={sourceContent}
                  onChange={(e) => setSourceContent(e.target.value)}
                  className="w-full bg-base border border-line rounded-xl px-3 py-2 text-xs text-ink focus:outline-none"
                />
              </div>

              {savedConfirmation && (
                <p className="text-xs text-muted font-medium">Fuente guardada con éxito.</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-xs text-muted hover:text-ink px-4 py-2 border border-line rounded-full"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savedConfirmation || !sourceContent.trim() || !sourceTitle.trim()}
                  className="text-xs font-semibold bg-accent hover:bg-accent-strong disabled:opacity-50 text-white px-5 py-2 rounded-full transition-colors"
                >
                  Confirmar y guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
