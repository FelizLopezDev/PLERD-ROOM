/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import {
  Activity,
  Award,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  Users,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const DiagnosticsView: React.FC = () => {
  const {
    diagnostics,
    profile,
    startReevaluation,
    userRole,
    setUserRole,
    selectDocAndSection,
  } = useAppState();

  const [filterCategory, setFilterCategory] = useState<string>('Todos');

  const conceptList = Object.values(diagnostics);

  const categories = [
    'Todos',
    ...Array.from(new Set(conceptList.map((c) => c.category))),
  ];

  const filteredConcepts =
    filterCategory === 'Todos'
      ? conceptList
      : conceptList.filter((c) => c.category === filterCategory);

  // Simulated cohort heatmap for coordinator view
  const cohortHeatmap = [
    {
      concept: 'Moción de Cuestión Previa (Precedencia)',
      errorRate: 74,
      affectedDelegates: '18 / 24 delegados',
      urgency: 'CRÍTICA',
      recommendation:
        'Hacer simulacro guiado de 10 minutos al inicio de la jornada para clarificar que la suspensión tiene preeminencia sobre el cierre de debate.',
    },
    {
      concept: 'Derecho a Réplica (Causal de Soberanía)',
      errorRate: 62,
      affectedDelegates: '15 / 24 delegados',
      urgency: 'ALTA',
      recommendation:
        'Aclarar que las divergencias de política exterior no constituyen causal válida de réplica.',
    },
    {
      concept: 'Gestión de POIs en Tiempos Protegidos (CND)',
      errorRate: 48,
      affectedDelegates: '11 / 24 delegados',
      urgency: 'MEDIA',
      recommendation:
        'Reforzar el uso del mazo de jueces para marcar el minuto 1:00 y el minuto 6:00.',
    },
    {
      concept: 'Registro Presente y Votando (Abstenciones)',
      errorRate: 12,
      affectedDelegates: '3 / 24 delegados',
      urgency: 'BAJA',
      recommendation: 'Concepto ampliamente dominado en la cohorte.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
              <Activity className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {userRole === 'COORDINATOR'
                ? 'Panel de Diagnóstico Agregado · Cohorte PLERD'
                : 'Mi Diagnóstico Acumulativo de Aprendizaje'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {userRole === 'COORDINATOR'
              ? 'Mapa de calor grupal para la Mesa Directiva sin exponer apuntes personales de los delegados.'
              : 'Puntajes de Dominio (D) y Nivel de Confianza (N) basados en evidencia de respuestas previas.'}
          </p>
        </div>

        {/* Toggle de rol para demostración */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setUserRole('DELEGATE')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              userRole === 'DELEGATE'
                ? 'bg-[#0A2540] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Vista Delegado
          </button>
          <button
            onClick={() => setUserRole('COORDINATOR')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              userRole === 'COORDINATOR'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Vista Mesa / Coordinador
          </button>
        </div>
      </div>

      {userRole === 'COORDINATOR' ? (
        /* VISTA DE COORDINADOR / MESA DIRECTIVA: MAPA DE CALOR AGREGADO */
        <div className="space-y-6">
          <div className="bg-purple-50 dark:bg-purple-950/40 rounded-3xl p-6 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-700 dark:text-purple-400" />
              <h2 className="text-base sm:text-lg font-bold text-purple-950 dark:text-purple-200">
                Mapa de Calor y Confusiones Grupales de la Comisión PNUD (24 Delegaciones)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-purple-900/80 dark:text-purple-300/80 leading-relaxed">
              Datos agregados en tiempo real. Permite a los presidentes de mesa y directores académicos enfocar los anuncios formativos antes de iniciar las votaciones formales.
            </p>
          </div>

          <div className="space-y-4">
            {cohortHeatmap.map((item, idx) => {
              const isCritical = item.urgency === 'CRÍTICA';
              const isHigh = item.urgency === 'ALTA';

              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-xs px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                        0{idx + 1}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {item.concept}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : isHigh
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {item.errorRate}% Tasa de Confusión ({item.affectedDelegates})
                      </span>
                    </div>
                  </div>

                  {/* Barra visual de error */}
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${item.errorRate}%` }}
                    ></div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-bold">
                      Recomendación Pedagógica para la Mesa:
                    </strong>{' '}
                    {item.recommendation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VISTA DE DELEGADO: MI DIAGNÓSTICO ACUMULATIVO */
        <div className="space-y-6">
          {/* Métricas Globales */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase">
                Dominio General
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {profile.overallMastery}%
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  +12% este mes
                </span>
              </div>
              <div className="mt-2 w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${profile.overallMastery}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase">
                Conceptos Homologados
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                  {profile.masteredCount} / {profile.totalConcepts}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                64% con Nivel de Confianza Alta o Media
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-400 font-bold uppercase">
                Próximos Repasos
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-600 tabular-nums">
                  {profile.todayReviewsCount} Hoy
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                En Escalón 1d (Repetición Espaciada)
              </p>
            </div>
          </div>

          {/* Filtros de Categoría */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filas Numeradas Estilo Rúbrica MINUME ROOM (01, 02...) */}
          <div className="space-y-3">
            {filteredConcepts.map((concept, idx) => {
              const isMastered = concept.status === 'MASTERED';
              const isCritical = concept.status === 'NEEDS_REINFORCEMENT';

              return (
                <div
                  key={concept.conceptId}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-sky-300 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-extrabold rounded-xl px-2.5 py-1 text-xs sm:text-sm tabular-nums mt-0.5">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {concept.name}
                        </h3>
                        <p className="text-xs text-slate-400">{concept.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isMastered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                            : isCritical
                            ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {isMastered
                          ? '✓ Dominio Consolidado'
                          : isCritical
                          ? 'Requiere Refuerzo'
                          : 'En Consolidación'}
                      </span>

                      <button
                        onClick={() => startReevaluation(concept.conceptId)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] shadow-sm transition-transform active:scale-95"
                      >
                        <RotateCcw className="w-3 h-3 text-sky-300" />
                        <span>Reevaluar</span>
                      </button>
                    </div>
                  </div>

                  {/* Barra de Dominio con Delta */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        Puntaje de Dominio: {concept.masteryScore}%
                      </span>
                      <span
                        className={`font-bold ${
                          concept.deltaEvolution >= 0
                            ? 'text-emerald-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {concept.deltaEvolution >= 0 ? '+' : ''}
                        {concept.deltaEvolution}% post-refuerzo
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isMastered
                            ? 'bg-emerald-500'
                            : isCritical
                            ? 'bg-rose-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${concept.masteryScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Detalles de Repetición Espaciada y Último Intento */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                    <span>
                      Último intento: <strong>{concept.lastAttemptDate}</strong> ({concept.totalAttempts} intentos)
                    </span>
                    <span>
                      Próximo repaso espaciado: <strong>{concept.nextReviewDate}</strong> (Escalón {concept.spacedRepetitionStep}d)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
