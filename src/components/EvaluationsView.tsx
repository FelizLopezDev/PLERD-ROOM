/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/AppStateContext';
import {
  GraduationCap,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const EvaluationsView: React.FC = () => {
  const { diagnostics, startReevaluation, recommendations } = useAppState();

  const conceptList = Object.values(diagnostics);
  const criticalConcepts = conceptList.filter((c) => c.status === 'NEEDS_REINFORCEMENT');
  const consolidatingConcepts = conceptList.filter((c) => c.status === 'CONSOLIDATING');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Evaluaciones Formativas y Reevaluaciones Adaptativas
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Pruebas breves de 5 a 6 preguntas (escenarios y aplicación práctica) para verificar tu comprensión sin penalizaciones punitivas.
          </p>
        </div>

        <button
          onClick={() => startReevaluation('c-cuestion-previa')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] shadow-sm self-start sm:self-auto transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-sky-300" />
          <span>Iniciar Simulación Rápida (3 preguntas)</span>
        </button>
      </div>

      {/* Tarjeta Destacada de Reevaluación Prioritaria */}
      <div className="bg-gradient-to-r from-rose-900/90 via-[#001F54] to-[#0A2540] rounded-3xl p-6 sm:p-8 text-white border border-rose-500/30 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>Reevaluación de Máxima Prioridad Detectada</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
          Moción de Cuestión Previa vs. Suspensión de la Sesión
        </h2>
        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
          En tus últimos 2 intentos persistió la confusión sobre si el cierre de debate puede interrumpir una moción de receso informal. Repasa la Sección 4.2 y comprueba tu progreso en 3 minutos.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => startReevaluation('c-cuestion-previa')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-md transition-transform active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Reevaluar Ahora</span>
          </button>
        </div>
      </div>

      {/* Lista de Pruebas Formativas Disponibles por Módulo */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Banco de Evaluaciones por Competencia Reglamentaria</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conceptList.map((concept) => {
            const isCritical = concept.status === 'NEEDS_REINFORCEMENT';
            const isMastered = concept.status === 'MASTERED';

            return (
              <div
                key={concept.conceptId}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {concept.category}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                      {concept.name}
                    </h4>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                      isMastered
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : isCritical
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {concept.masteryScore}% Dominio
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isMastered ? 'bg-emerald-500' : isCritical ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${concept.masteryScore}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-400">
                    {concept.totalAttempts} intentos previos
                  </span>

                  <button
                    onClick={() => startReevaluation(concept.conceptId)}
                    className="flex items-center gap-1 font-bold text-sky-700 hover:text-sky-900 dark:text-sky-400 transition-colors"
                  >
                    <span>Lanzar prueba</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
