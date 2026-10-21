/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/AppStateContext';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  BookmarkCheck,
  ChevronRight,
  RotateCcw,
  ShieldAlert,
  Flame,
  Award,
  Calendar,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    profile,
    recommendations,
    spacedReviews,
    selectDocAndSection,
    startReevaluation,
    setCurrentTab,
    userRole,
  } = useAppState();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero Card Oscura (Gradiente #001F54 → #0A0E2A) Estilo Aula Room */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001F54] via-[#0A192F] to-[#0A0E2A] text-white p-6 sm:p-8 lg:p-10 border border-sky-400/20 shadow-xl shadow-[#001F54]/25">
        {/* Adorno sutil de fondo geométrico */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-blue-600/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 backdrop-blur-md">
                🇩🇴 {profile.country} · {profile.committee}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ● En Sesión Activa
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Bienvenido, {profile.name}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {profile.institution} — Sistema de estudio activo fundamentado en la evidencia documental oficial de <span className="text-white font-semibold">{profile.event}</span> y el <span className="text-sky-300 font-semibold">CND Debate</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('study_table')}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-3 rounded-full text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Abrir Mesa de Estudio Activo</span>
            </button>
          </div>
        </div>

        {/* 3 KPIs Tabulares Estilo MINUME ROOM */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          {/* KPI 1 */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-sky-400/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Conceptos Dominados
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tabular-nums tracking-tight">
                {profile.masteredCount} <span className="text-xl text-slate-400 font-normal">/ {profile.totalConcepts}</span>
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {profile.overallMastery}% Dominio
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400 font-medium">
              Nivel de Confianza: <span className="text-sky-300 font-bold">Media-Alta (88%)</span>
            </p>
          </div>

          {/* KPI 2 */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-rose-400/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Áreas por Reforzar
              </span>
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tabular-nums tracking-tight">
                0{profile.areasToReinforceCount}
              </span>
              <span className="text-xs font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/30">
                Prioridad Crítica
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400 font-medium">
              Confusiones detectadas por evidencia en simulacros
            </p>
          </div>

          {/* KPI 3 */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-amber-400/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Retención Espaciada
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white tabular-nums tracking-tight">
                0{profile.todayReviewsCount}
              </span>
              <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                Programados Hoy
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400 font-medium">
              Escalón 1d · ~9 minutos de repaso activo
            </p>
          </div>
        </div>
      </div>

      {/* 2. Sección Principal: Plan de Refuerzo Basado en Evidencia (Máximo 3 tarjetas) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Plan de Refuerzo Basado en Evidencia
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Prescripciones exactas vinculadas a tus evaluaciones previas, citando capítulo, sección y páginas oficiales.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('diagnostics')}
            className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 dark:text-sky-400 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 transition-colors"
          >
            <span>Ver diagnóstico completo (22 conceptos)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lista de las 3 tarjetas de refuerzo con los 5 eslabones obligatorios */}
        <div className="space-y-4">
          {recommendations.map((rec) => {
            const isCritical = rec.status === 'NEEDS_REINFORCEMENT';

            return (
              <div
                key={rec.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all space-y-4"
              >
                {/* ESLABÓN 1: Concepto, Índice Numerado, Semáforo y Métricas */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-extrabold rounded-xl px-3 py-1.5 text-sm tabular-nums">
                      {rec.indexNumber}
                    </span>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        {rec.conceptName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {rec.prescribedSource.chapterStr}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {isCritical ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Requiere Refuerzo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">
                        <TrendingUp className="w-3.5 h-3.5" />
                        En Consolidación
                      </span>
                    )}

                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Dominio: {rec.masteryScore}% · Confianza {rec.confidenceLevel === 'HIGH' ? 'Alta' : rec.confidenceLevel === 'MEDIUM' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                </div>

                {/* ESLABÓN 2: Evidencia del Historial */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 border-l-4 border-rose-500 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">
                    Evidencia Registrada en Historial:
                  </span>
                  {rec.historyEvidence}
                </div>

                {/* ESLABÓN 3: Fuente Prescrita & ESLABÓN 4: Guía de Enfoque */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  {/* Fuente */}
                  <div className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-1.5 mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      Lectura Prescrita Oficial
                    </span>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {rec.prescribedSource.documentTitle}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      Sección {rec.prescribedSource.sectionNumber}: {rec.prescribedSource.sectionTitle} ({rec.prescribedSource.pages})
                    </p>
                  </div>

                  {/* Guía de enfoque */}
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      Qué Buscar al Repasar
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 italic">
                      "{rec.focusGuidance}"
                    </p>
                  </div>
                </div>

                {/* ESLABÓN 5: Botones de Acción Funcionales (Píldoras) */}
                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
                  <button
                    onClick={() =>
                      selectDocAndSection(
                        rec.prescribedSource.documentId,
                        rec.prescribedSource.sectionId,
                        'library'
                      )
                    }
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{rec.actionLabels.openSection}</span>
                  </button>

                  <button
                    onClick={() => startReevaluation(rec.conceptId)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-sky-300" />
                    <span>{rec.actionLabels.reevaluate}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Panel: Agenda de Repetición Espaciada (Escalones 1d → 4d → 14d → 30d) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Agenda de Repetición Espaciada (Spaced Repetition)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              El algoritmo del PLERD programa reevaluaciones en intervalos crecientes para fijar los conceptos parlamentarios en la memoria de largo plazo.
            </p>
          </div>

          <span className="text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-3 py-1.5 rounded-full border border-sky-200 dark:border-sky-800 self-start sm:self-auto">
            Escalones: 1 día → 4 días → 14 días → 30 días
          </span>
        </div>

        {/* Visual Stepper de Escalones */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
            <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
              Escalón 1d (Hoy)
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black text-rose-800 dark:text-rose-300 tabular-nums">
                2 conceptos
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            </div>
            <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">
              Refuerzo inmediato requerido
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              Escalón 4d
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black text-amber-800 dark:text-amber-300 tabular-nums">
                2 conceptos
              </span>
              <span className="text-xs font-semibold text-amber-700">22–24 Oct</span>
            </div>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">
              En consolidación activa
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
            <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider block">
              Escalón 14d
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black text-sky-800 dark:text-sky-300 tabular-nums">
                5 conceptos
              </span>
              <span className="text-xs font-semibold text-sky-700">Noviembre</span>
            </div>
            <p className="text-[10px] text-sky-600 dark:text-sky-400 mt-0.5">
              Fijación intermedia lograda
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              Escalón 30d
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black text-emerald-800 dark:text-emerald-300 tabular-nums">
                13 conceptos
              </span>
              <span className="text-xs font-semibold text-emerald-700">Dominio Total</span>
            </div>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
              Retención a largo plazo
            </p>
          </div>
        </div>

        {/* Tabla / Filas Numeradas de Repasos de la Agenda (Estilo Rúbrica MINUME) */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {spacedReviews.map((item, idx) => {
            const isDueToday = item.dueStatus === 'TODAY';
            return (
              <div
                key={item.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-xl px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 font-bold rounded-xl px-2.5 py-1 text-xs tabular-nums">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {item.conceptName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {item.documentName} · {item.sectionNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isDueToday
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.dueDate} ({item.estimatedMinutes} min)
                  </span>

                  <button
                    onClick={() => startReevaluation(item.conceptId)}
                    className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isDueToday
                        ? 'bg-[#0A2540] hover:bg-[#002B7F] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <span>{isDueToday ? 'Repasar Ahora' : 'Adelantar'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
