/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { ProgramType, Document, Section } from '../types';
import {
  BookOpen,
  Search,
  Filter,
  ShieldCheck,
  Lock,
  Plus,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Clock,
  Layers,
  Award,
  AlertCircle,
  CheckCircle2,
  Bookmark,
  Share2,
  FileQuestion,
  GraduationCap,
} from 'lucide-react';
import { AddPersonalDocModal, PublishOfficialDocModal } from './LibraryModals';

export const LibraryView: React.FC = () => {
  const {
    libraryScope,
    setLibraryScope,
    institutionalDocs,
    personalDocs,
    searchQuery,
    setSearchQuery,
    activeProgramFilter,
    setActiveProgramFilter,
    diagnostics,
    selectDocAndSection,
    startReevaluation,
    setCurrentTab,
    userRole,
    setIsAddPersonalModalOpen,
    setIsPublishOfficialModalOpen,
    openDocPreview,
  } = useAppState();

  const [expandedDocIds, setExpandedDocIds] = useState<Record<string, boolean>>({
    'doc-minume-manual': true,
  });

  const programs: ('Todos' | ProgramType)[] = [
    'Todos',
    'MINUME XVII',
    'CND Debate',
    'CLIT',
    'Normativa General',
  ];

  const currentDocs = libraryScope === 'INSTITUTIONAL' ? institutionalDocs : personalDocs;

  // Filter docs
  const filteredDocs = currentDocs.filter((doc) => {
    const matchesProgram =
      activeProgramFilter === 'Todos' || doc.program === activeProgramFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.sections.some(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesProgram && matchesSearch;
  });

  const toggleDocExpand = (docId: string) => {
    setExpandedDocIds((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Encabezado de la Biblioteca y Conmutador de Ámbito */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-sky-600" />
            <span>Biblioteca Inteligente Dual</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Separación estricta entre fuentes canónicas oficiales del PLERD y tus apuntes privados de delegación.
          </p>
        </div>

        {/* Conmutador de Ámbito Tipo Píldora (Estilo MINUME ROOM) */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 self-start md:self-auto">
          <button
            onClick={() => setLibraryScope('INSTITUTIONAL')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              libraryScope === 'INSTITUTIONAL'
                ? 'bg-[#0A2540] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
            <span>Biblioteca Institucional PLERD</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-900/50 text-sky-200">
              {institutionalDocs.length}
            </span>
          </button>

          <button
            onClick={() => setLibraryScope('PERSONAL')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              libraryScope === 'PERSONAL'
                ? 'bg-[#0A2540] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>Mi Biblioteca Personal</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              {personalDocs.length}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Banner Específico según el Ámbito Activo */}
      {libraryScope === 'INSTITUTIONAL' ? (
        <div className="bg-sky-50 dark:bg-sky-950/40 rounded-2xl p-4 sm:p-5 border border-sky-200 dark:border-sky-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-700 dark:text-sky-300 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-sky-900 dark:text-sky-200">
                Fuentes Oficiales y Canónicas del Ministerio de Educación (MINERD)
              </h3>
              <p className="text-xs text-sky-800/80 dark:text-sky-300/80 mt-0.5 leading-relaxed">
                Cada sección cuenta con un mapa de conceptos indexados. El Tutor IA basa sus preguntas y rúbricas exclusivamente en estos textos oficiales.
              </p>
            </div>
          </div>

          {/* Si el rol activo es COORDINADOR: botón para publicar nuevo documento */}
          {userRole === 'COORDINATOR' && (
            <button
              onClick={() => setIsPublishOfficialModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-sm shrink-0 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Publicar Documento Oficial</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-4 sm:p-5 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                Espacio de Estudio Privado y Confidencial del Delegado
              </h3>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5 leading-relaxed">
                Solo tú puedes ver y estudiar estos archivos. Tus prácticas y notas aquí <strong>no alteran tu diagnóstico oficial del PLERD</strong> ni tu puntaje de dominio de comisión.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddPersonalModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] shadow-sm shrink-0 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Recurso Personal</span>
          </button>
        </div>
      )}

      {/* 3. Barra de Búsqueda y Filtros por Programa */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por concepto, regla, sección o palabra clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
          />
        </div>

        {/* Filtros de Programa */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {programs.map((prog) => {
            const isSelected = activeProgramFilter === prog;
            return (
              <button
                key={prog}
                onClick={() => setActiveProgramFilter(prog)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {prog}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Lista de Documentos */}
      <div className="space-y-5">
        {filteredDocs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              No se encontraron documentos
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Prueba cambiando los filtros de programa o el término de búsqueda.
            </p>
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isExpanded = expandedDocIds[doc.id] ?? false;

            return (
              <div
                key={doc.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden transition-all"
              >
                {/* Cabecera del Documento */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        {doc.verifiedOfficial ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                            <ShieldCheck className="w-3 h-3" />
                            Fuente Oficial Verificada
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">
                            <Lock className="w-3 h-3" />
                            Recurso Personal Privado
                          </span>
                        )}

                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                          {doc.program}
                        </span>

                        <span className="text-[11px] text-slate-400">
                          {doc.version} · {doc.pagesCount} páginas
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                        {doc.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {doc.subtitle}
                      </p>
                    </div>

                    {/* Botones de acción del documento */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {doc.fileUrl && (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                        >
                          <span>Abrir Google Docs</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <button
                        onClick={() => toggleDocExpand(doc.id)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800 transition-colors"
                      >
                        <span>{isExpanded ? 'Ocultar Secciones' : `Ver ${doc.sections.length} Secciones`}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {doc.description}
                  </p>
                </div>

                {/* Desglose Desplegable de Secciones Numeradas Estilo Rúbrica MINUME ROOM */}
                {isExpanded && (
                  <div className="bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Índice Canónico de Secciones y Mapa de Conceptos
                      </span>
                      <span className="text-xs text-slate-400">
                        Haz clic en una sección para leerla o estudiarla con el tutor
                      </span>
                    </div>

                    <div className="space-y-3">
                      {doc.sections.map((sec) => {
                        return (
                          <div
                            key={sec.id}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-all space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <span className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-extrabold rounded-xl px-2.5 py-1 text-xs sm:text-sm tabular-nums mt-0.5">
                                  {sec.numberStr}
                                </span>
                                <div>
                                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                                    {sec.title}
                                  </h3>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {sec.chapterTitle ? `${sec.chapterTitle} · ` : ''}{sec.pageRange}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                                <button
                                  onClick={() => openDocPreview(doc, sec)}
                                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 transition-colors"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>Leer Sección</span>
                                </button>

                                <button
                                  onClick={() => selectDocAndSection(doc.id, sec.id, 'study_table')}
                                  className="flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] shadow-sm transition-transform active:scale-95"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                                  <span>Estudiar con IA</span>
                                </button>
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {sec.summary}
                            </p>

                            {/* Regla Crítica si existe */}
                            {sec.keyTakeaway && (
                              <div className="bg-sky-50/70 dark:bg-sky-950/30 rounded-xl px-3 py-2 border-l-4 border-sky-500 text-xs text-sky-900 dark:text-sky-200">
                                <strong className="font-bold">Regla de Sala: </strong>
                                {sec.keyTakeaway}
                              </div>
                            )}

                            {/* Conceptos Evaluables Vinculados con su Estado Real */}
                            {sec.conceptIds.length > 0 && (
                              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                  Conceptos Evaluables:
                                </span>
                                {sec.conceptIds.map((cId) => {
                                  const diag = diagnostics[cId];
                                  if (!diag) return null;

                                  const isMastered = diag.status === 'MASTERED';
                                  const isCritical = diag.status === 'NEEDS_REINFORCEMENT';

                                  return (
                                    <button
                                      key={cId}
                                      onClick={() => startReevaluation(cId)}
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                                        isMastered
                                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                                          : isCritical
                                          ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 hover:bg-rose-100'
                                          : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                                      }`}
                                      title="Haz clic para reevaluar este concepto"
                                    >
                                      {isMastered ? (
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                      ) : isCritical ? (
                                        <AlertCircle className="w-3 h-3 text-rose-600" />
                                      ) : (
                                        <Clock className="w-3 h-3 text-amber-600" />
                                      )}
                                      <span>{diag.name}</span>
                                      <span className="opacity-75">({diag.masteryScore}%)</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modals de Inclusión y Publicación */}
      <AddPersonalDocModal />
      <PublishOfficialDocModal />
    </div>
  );
};
