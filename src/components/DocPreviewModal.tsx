/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/AppStateContext';
import {
  X,
  BookOpen,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Lock,
  ExternalLink,
  Bookmark,
} from 'lucide-react';

export const DocPreviewModal: React.FC = () => {
  const {
    previewTarget,
    closeDocPreview,
    setCurrentTab,
    selectDocAndSection,
    startReevaluation,
  } = useAppState();

  if (!previewTarget) return null;

  const { doc, section } = previewTarget;
  const currentSec = section || doc.sections[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Cabecera del Visor */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {doc.verifiedOfficial ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
                  <ShieldCheck className="w-3 h-3" /> Fuente Oficial Verificada
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <Lock className="w-3 h-3" /> Documento Privado
                </span>
              )}
              <span className="text-xs text-slate-400">
                {doc.program} · {doc.version}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {doc.title}
            </h2>
          </div>

          <button
            onClick={closeDocPreview}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido del Documento */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {currentSec ? (
            <div className="space-y-5 max-w-2xl mx-auto">
              {/* Sección encabezado */}
              <div className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400">
                  <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950">
                    Sección {currentSec.numberStr}
                  </span>
                  <span>{currentSec.pageRange}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentSec.title}
                </h3>
                {currentSec.chapterTitle && (
                  <p className="text-xs text-slate-400">{currentSec.chapterTitle}</p>
                )}
              </div>

              {/* Regla Crítica Resaltada */}
              {currentSec.keyTakeaway && (
                <div className="bg-sky-50 dark:bg-sky-950/40 p-4 rounded-2xl border-l-4 border-sky-600 text-xs sm:text-sm text-sky-950 dark:text-sky-200 leading-relaxed">
                  <span className="font-bold block text-sky-800 dark:text-sky-300 mb-1">
                    Regla Crítica de Sala:
                  </span>
                  {currentSec.keyTakeaway}
                </div>
              )}

              {/* Texto de la Sección */}
              <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-850 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 font-mono">
                {currentSec.content}
              </div>

              {/* Conceptos asociados */}
              {currentSec.conceptIds.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Conceptos asociados a esta sección
                  </span>
                  <div className="flex gap-2">
                    {currentSec.conceptIds.map((cId) => (
                      <button
                        key={cId}
                        onClick={() => {
                          closeDocPreview();
                          startReevaluation(cId);
                        }}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200"
                      >
                        ⚡ Reevaluar {cId}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm py-12">
              No hay secciones cargadas para este documento.
            </p>
          )}
        </div>

        {/* Barra de acción inferior */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Cita verificada · PLERD ROOM
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={closeDocPreview}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cerrar Visor
            </button>
            {currentSec && (
              <button
                onClick={() => {
                  closeDocPreview();
                  selectDocAndSection(doc.id, currentSec.id, 'study_table');
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Abrir en Mesa de Estudio Activo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
