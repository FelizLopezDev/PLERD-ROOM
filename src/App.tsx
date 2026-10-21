/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { LibraryView } from './components/LibraryView';
import { StudyTableView } from './components/StudyTableView';
import { EvaluationsView } from './components/EvaluationsView';
import { DiagnosticsView } from './components/DiagnosticsView';
import { ReevaluationModal } from './components/ReevaluationModal';
import { DocPreviewModal } from './components/DocPreviewModal';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentTab, theme } = useAppState();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Doble barra de navegación oficial */}
      <Navbar />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'dashboard' && <DashboardView />}
        {currentTab === 'library' && <LibraryView />}
        {currentTab === 'study_table' && <StudyTableView />}
        {currentTab === 'evaluations' && <EvaluationsView />}
        {currentTab === 'diagnostics' && <DiagnosticsView />}
      </main>

      {/* Modales Globales */}
      <ReevaluationModal />
      <DocPreviewModal />

      {/* Footer Institucional Estilo MINUME ROOM */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[10px]">
              🇩🇴
            </span>
            <span className="font-bold text-slate-800 dark:text-white">
              PLERD ROOM
            </span>
            <span>·</span>
            <span>
              Dirección de Participación y Liderazgo Estudiantil (MINERD)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href="https://minumeroom.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 font-semibold"
            >
              <span>Ecosistema MINUME ROOM</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a
              href="https://plerd.minerd.gob.do/sobrenosotros"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 dark:hover:text-sky-400"
            >
              Sobre el PLERD
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>Fase 2: Aprendizaje Adaptativo & Tutor Pedagógico</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <MainContent />
    </AppStateProvider>
  );
}
