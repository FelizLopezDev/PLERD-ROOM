/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import {
  BrainCircuit,
  BookOpen,
  Send,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Bookmark,
  FileText,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  citations?: { sectionId: string; label: string }[];
  timestamp: string;
}

export const StudyTableView: React.FC = () => {
  const {
    allDocs,
    selectedDocId,
    selectedSectionId,
    selectDocAndSection,
    activeHighlightCitation,
    startReevaluation,
  } = useAppState();

  const [inputMessage, setInputMessage] = useState('');
  const [highlightedSecId, setHighlightedSecId] = useState<string | null>(
    selectedSectionId || 'sec-minume-4-2'
  );

  const activeDoc = allDocs.find((d) => d.id === selectedDocId) || allDocs[0];
  const activeSec =
    activeDoc.sections.find((s) => s.id === (selectedSectionId || highlightedSecId)) ||
    activeDoc.sections[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'tutor',
      text: `Hola, Alejandro. Estoy configurado como tu Tutor Pedagógico Oficial del PLERD para acompañarte en el estudio activo de las fuentes oficiales de MINUME XVII y el CND.
      
He indexado las secciones canónicas del documento "${activeDoc.title}". Puedes hacerme cualquier consulta procesal o pedirme simulaciones de debate; todas mis respuestas estarán estrictamente fundamentadas en los fragmentos reglamentarios.`,
      timestamp: '10:00 AM',
    },
    {
      id: 'msg-2',
      sender: 'tutor',
      text: `¿Deseas repasar la precedencia de la Moción de Cuestión Previa [Sección 4.2 · Pág. 18] o prefieres una simulación de sala?`,
      citations: [{ sectionId: 'sec-minume-4-2', label: 'Sección 4.2 · Pág. 18' }],
      timestamp: '10:01 AM',
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Tutor Grounded Response simulation
    setTimeout(() => {
      let replyText = '';
      let replyCitations: { sectionId: string; label: string }[] = [];

      if (text.toLowerCase().includes('resumir') || text.toLowerCase().includes('resumen')) {
        replyText = `De acuerdo con la [Sección ${activeSec.numberStr} · ${activeSec.pageRange}], el núcleo normativo establece:\n\n• ${activeSec.summary}\n\n• Regla imperativa de sala: "${activeSec.keyTakeaway || 'Cumplimiento estricto del orden procesal'}".`;
        replyCitations = [{ sectionId: activeSec.id, label: `Sección ${activeSec.numberStr}` }];
      } else if (text.toLowerCase().includes('ejemplo') || text.toLowerCase().includes('comisión')) {
        replyText = `Ejemplo práctico en la Comisión PNUD: Si la delegación de Brasil propone cerrar el debate mediante Cuestión Previa, pero Barbados necesita pactar enmiendas y solicita suspender la sesión por 15 minutos, la Presidencia someterá primero a votación la suspensión [Sección 4.2 · Pág. 19], pues las mociones de receso no se debaten y tienen rango 1.`;
        replyCitations = [{ sectionId: 'sec-minume-4-2', label: 'Sección 4.2 · Pág. 19' }];
      } else if (text.toLowerCase().includes('evaluar') || text.toLowerCase().includes('comprensión')) {
        replyText = `Excelente iniciativa. He preparado una sesión de diagnóstico formativo de 3 preguntas de escenario sobre esta sección. Haz clic en el botón inferior para comenzar la evaluación interactiva.`;
      } else {
        replyText = `Fundamentado estrictamente en [Sección ${activeSec.numberStr} · ${activeSec.pageRange}], se establece que todo delegado debe respetar las formalidades reglamentarias de la Mesa. ¿Deseas poner a prueba este conocimiento con una pregunta de escenario?`;
        replyCitations = [{ sectionId: activeSec.id, label: `Sección ${activeSec.numberStr}` }];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `tut-${Date.now()}`,
          sender: 'tutor',
          text: replyText,
          citations: replyCitations,
          timestamp: 'Ahora',
        },
      ]);
    }, 500);
  };

  const handleCitationClick = (sectionId: string) => {
    setHighlightedSecId(sectionId);
    selectDocAndSection(activeDoc.id, sectionId);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Mesa de Estudio Activo · Asistente Canónico
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Visor documental en pantalla dividida inspirado en NotebookLM con respuestas del Tutor IA 100% fundamentadas en fuentes oficiales.
          </p>
        </div>

        {/* Selector de Documento Activo */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 hidden sm:inline">
            Documento:
          </label>
          <select
            value={activeDoc.id}
            onChange={(e) => selectDocAndSection(e.target.value)}
            className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none"
          >
            {allDocs.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.scope === 'INSTITUTIONAL' ? 'Oficial' : 'Personal'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pantalla Dividida (Split Screen) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[760px]">
        {/* PANEL IZQUIERDO: Visor Documental Indexado (7 columnas en desktop) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden">
          {/* Barra superior del documento */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                {activeDoc.program}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-xs">
                {activeDoc.title}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {activeDoc.sections.length} secciones indexadas
            </span>
          </div>

          {/* Selector de pestañas de secciones */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none bg-white dark:bg-slate-900">
            {activeDoc.sections.map((sec) => {
              const isSelected = (selectedSectionId || highlightedSecId) === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleCitationClick(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  <span>Sec. {sec.numberStr}</span>
                </button>
              );
            })}
          </div>

          {/* Cuerpo del Visor con el contenido del párrafo y resalte de cita */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5">
            {activeSec ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                    {activeSec.chapterTitle || 'Sección Documental'}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {activeSec.title}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    {activeSec.pageRange} · Fuente homologada PLERD
                  </p>
                </div>

                {/* Párrafo resaltado estilo cita activa */}
                <div
                  className={`p-4 rounded-2xl border-l-4 transition-all duration-300 ${
                    highlightedSecId === activeSec.id
                      ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block mb-1">
                    Extracto Normativo Vinculado
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                    {activeSec.content}
                  </p>
                </div>

                {activeSec.keyTakeaway && (
                  <div className="bg-amber-50 dark:bg-amber-950/40 rounded-xl p-3.5 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <strong className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Regla Crítica de Aplicación Práctica:
                    </strong>
                    <p className="italic leading-relaxed">{activeSec.keyTakeaway}</p>
                  </div>
                )}

                {/* Conceptos asociados a esta sección */}
                {activeSec.conceptIds.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      Conceptos de esta sección:
                    </span>
                    {activeSec.conceptIds.map((cId) => (
                      <button
                        key={cId}
                        onClick={() => startReevaluation(cId)}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 dark:bg-sky-950 dark:text-sky-300"
                      >
                        ⚡ Evaluar {cId}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                Selecciona una sección para leerla.
              </div>
            )}
          </div>
        </div>

        {/* PANEL DERECHO: Tutor IA de Estudio con Gemini (5 columnas en desktop) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden">
          {/* Cabecera del Tutor */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#001F54] to-sky-600 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-sky-300" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Tutor Pedagógico PLERD
                </h3>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Grounded en {activeDoc.title.substring(0, 24)}...
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (activeSec.conceptIds[0]) {
                  startReevaluation(activeSec.conceptIds[0]);
                } else {
                  startReevaluation('c-cuestion-previa');
                }
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] shadow-sm transition-transform active:scale-95"
            >
              <span>⚡ Evaluar Sección</span>
            </button>
          </div>

          {/* Acciones Rápidas en Píldoras Superiores */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => handleSendMessage('Resumir los puntos clave de esta sección')}
              className="px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400 whitespace-nowrap"
            >
              📝 Resumir sección
            </button>
            <button
              onClick={() => handleSendMessage('Explicar con un ejemplo práctico de comisión PNUD')}
              className="px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400 whitespace-nowrap"
            >
              💡 Ejemplo de comisión
            </button>
            <button
              onClick={() => handleSendMessage('Extraer los conceptos clave evaluables')}
              className="px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400 whitespace-nowrap"
            >
              🔍 Conceptos clave
            </button>
          </div>

          {/* Lista de Mensajes del Chat */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
            {messages.map((m) => {
              const isTutor = m.sender === 'tutor';

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isTutor ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      isTutor
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60'
                        : 'bg-[#0A2540] text-white'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>

                    {/* Citas Clicables en Píldoras que resaltan el panel izquierdo */}
                    {m.citations && m.citations.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-1.5">
                        {m.citations.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleCitationClick(c.sectionId)}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 hover:bg-sky-200 border border-sky-300 dark:border-sky-700 transition-colors"
                          >
                            <Bookmark className="w-3 h-3 text-sky-600" />
                            <span>Ver {c.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Formulario de Entrada de Pregunta */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Pregunta algo sobre el reglamento o pide un caso..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-9 h-9 rounded-full bg-[#0A2540] hover:bg-[#002B7F] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <Send className="w-4 h-4 text-sky-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
