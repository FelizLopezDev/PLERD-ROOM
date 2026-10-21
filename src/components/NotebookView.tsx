/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Source } from '../types';
import { ArrowLeft, GraduationCap, Plus, FileText, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export const NotebookView: React.FC<{ notebookId: string }> = ({ notebookId }) => {
  const { notebooks, go, addSource } = useApp();
  const notebook = notebooks.find((n) => n.id === notebookId);

  const [activeSourceId, setActiveSourceId] = useState<string | null>(
    notebook && notebook.sources.length > 0 ? notebook.sources[0].id : null
  );

  const [isAddingSource, setIsAddingSource] = useState(false);
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceContent, setSourceContent] = useState('');

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'assistant',
      text: `Has abierto "${notebook?.title || 'este cuaderno'}". Puedes formular preguntas sobre cualquiera de sus fuentes o pulsar "Examinarme" cuando quieras poner a prueba lo aprendido.`,
    },
  ]);

  if (!notebook) {
    return (
      <div className="bg-surface border border-line rounded-2xl p-8 text-center space-y-4">
        <p className="text-sm text-muted">No se encontró este cuaderno.</p>
        <button
          onClick={() => go({ name: 'library' })}
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-ink px-4 py-2 border border-line rounded-full"
        >
          <ArrowLeft size={16} />
          <span>Volver a la biblioteca</span>
        </button>
      </div>
    );
  }

  const activeSource = notebook.sources.find((s) => s.id === activeSourceId);

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceTitle.trim() || !sourceContent.trim()) return;

    addSource(notebook.id, {
      title: sourceTitle.trim(),
      type: 'text',
      content: sourceContent.trim(),
    });

    setSourceTitle('');
    setSourceContent('');
    setIsAddingSource(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: query.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Búsqueda de coincidencia en las fuentes del cuaderno
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      const matchedSource = notebook.sources.find(
        (s) =>
          s.content.toLowerCase().includes(lower) ||
          s.title.toLowerCase().includes(lower)
      );

      if (matchedSource) {
        reply = `Según "${matchedSource.title}":\n\n${matchedSource.content.substring(0, 320)}...`;
      } else if (lower.includes('resum') || lower.includes('ideas') || lower.includes('puntos')) {
        const summaries = notebook.sources
          .map((s) => `• ${s.title}: ${s.content.split('\n')[0]}`)
          .join('\n\n');
        reply = `Resumen de las fuentes disponibles:\n\n${summaries}`;
      } else {
        reply = `Con base en las ${notebook.sources.length} fuentes de "${notebook.title}", la normativa se centra en el cumplimiento de los procedimientos parlamentarios y los tiempos reglamentarios de intervención.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: 'assistant',
          text: reply,
        },
      ]);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Barra de cabecera del cuaderno */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div className="flex items-center gap-3">
          <button
            onClick={() => go({ name: 'library' })}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Biblioteca</span>
          </button>
          <span className="text-muted">/</span>
          <h1 className="text-lg font-bold text-ink truncate">{notebook.title}</h1>
        </div>

        <button
          onClick={() => go({ name: 'exam', id: notebook.id })}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-strong text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors self-start sm:self-auto"
        >
          <GraduationCap size={16} />
          <span>Examinarme</span>
        </button>
      </div>

      {/* Contenido en dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Fuentes */}
        <div className="lg:col-span-5 bg-surface border border-line rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-ink">
                Fuentes ({notebook.sources.length})
              </h2>
              <span className="text-xs text-muted">
                {notebook.scope === 'general' ? 'Oficial PLERD' : 'Cuaderno personal'}
              </span>
            </div>

            {notebook.scope === 'personal' && (
              <button
                onClick={() => setIsAddingSource(!isAddingSource)}
                className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-strong font-medium"
              >
                <Plus size={16} />
                <span>Añadir</span>
              </button>
            )}
          </div>

          {/* Formulario para añadir fuente (solo en cuadernos personales) */}
          {isAddingSource && notebook.scope === 'personal' && (
            <form onSubmit={handleAddSource} className="border border-line rounded-xl p-3.5 space-y-2.5 bg-base">
              <input
                type="text"
                required
                placeholder="Título de la fuente"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                className="w-full bg-surface border border-line rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-accent"
              />
              <textarea
                required
                rows={3}
                placeholder="Pega aquí el texto de tus notas o documento..."
                value={sourceContent}
                onChange={(e) => setSourceContent(e.target.value)}
                className="w-full bg-surface border border-line rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-accent"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingSource(false)}
                  className="text-xs text-muted hover:text-ink px-2.5 py-1"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!sourceTitle.trim() || !sourceContent.trim()}
                  className="text-xs font-semibold bg-accent hover:bg-accent-strong disabled:opacity-50 text-white px-3 py-1 rounded-full"
                >
                  Guardar fuente
                </button>
              </div>
            </form>
          )}

          {/* Lista de fuentes con FileText únicamente aquí */}
          <div className="space-y-1.5">
            {notebook.sources.map((source) => {
              const isSelected = source.id === activeSourceId;
              return (
                <div
                  key={source.id}
                  onClick={() => setActiveSourceId(source.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                    isSelected
                      ? 'border-accent bg-base text-ink font-semibold'
                      : 'border-line bg-surface text-muted hover:text-ink hover:border-line'
                  }`}
                >
                  <FileText size={16} />
                  <span className="truncate">{source.title}</span>
                </div>
              );
            })}
          </div>

          {/* Lector del fragmento de la fuente seleccionada */}
          {activeSource && (
            <div className="pt-3 border-t border-line space-y-2">
              <h3 className="text-xs font-semibold text-ink">{activeSource.title}</h3>
              <div className="bg-base border border-line rounded-xl p-3 text-xs text-muted whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto">
                {activeSource.content}
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha: Estudio y Chat Basado en Fuentes */}
        <div className="lg:col-span-7 bg-surface border border-line rounded-2xl p-5 flex flex-col h-[540px]">
          <div className="pb-3 border-b border-line flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Estudio con Fuentes</h2>
            <span className="text-xs text-muted">Exclusivo de este cuaderno</span>
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
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-ink text-white'
                        : 'bg-base text-ink border border-line'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sugerencias rápidas de consulta */}
          <div className="py-2 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => handleSendMessage('¿Cuáles son los puntos principales de las fuentes?')}
              className="text-xs text-muted hover:text-ink bg-base border border-line rounded-full px-3 py-1 whitespace-nowrap"
            >
              Puntos principales
            </button>
            <button
              onClick={() => handleSendMessage('Explícame una regla o procedimiento importante')}
              className="text-xs text-muted hover:text-ink bg-base border border-line rounded-full px-3 py-1 whitespace-nowrap"
            >
              Regla importante
            </button>
          </div>

          {/* Entrada de consulta con botón Send */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="pt-2 border-t border-line flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Haz una pregunta sobre las fuentes de este cuaderno..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-base border border-line rounded-full px-4 py-2 text-xs text-ink focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="w-8 h-8 rounded-full bg-ink text-white disabled:opacity-40 flex items-center justify-center shrink-0 transition-opacity"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
