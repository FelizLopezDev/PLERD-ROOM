/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LibraryView } from './components/LibraryView';
import { NotebookView } from './components/NotebookView';
import { ArrowLeft } from 'lucide-react';

const AppContent: React.FC = () => {
  const { view, go, notebooks } = useApp();

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans">
      {/* Barra superior institucional */}
      <header className="bg-surface border-b border-line px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex flex-col items-start">
            <button
              type="button"
              onClick={() => go({ name: 'library' })}
              className="text-lg font-bold text-ink hover:opacity-85 text-left focus:outline-none"
            >
              PLERD ROOM
            </button>
            <span className="text-xs text-muted">
              Dirección de Participación y Liderazgo Estudiantil · Ministerio de Educación
            </span>
          </div>

          {view.name !== 'library' && (
            <button
              onClick={() => go({ name: 'library' })}
              className="text-xs text-muted hover:text-ink inline-flex items-center gap-1.5 py-1 px-3 border border-line rounded-full bg-surface transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Biblioteca</span>
            </button>
          )}
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        {view.name === 'library' && <LibraryView />}
        {view.name === 'notebook' && <NotebookView notebookId={view.id} />}
        {view.name === 'exam' && (
          <div className="bg-surface border border-line rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-lg font-bold text-ink">
              Examen · {notebooks.find((n) => n.id === view.id)?.title || 'Cuaderno'}
            </h2>
            <p className="text-sm text-muted max-w-md mx-auto">
              Preguntas generadas exclusivamente a partir de las fuentes de este cuaderno.
            </p>
            <button
              onClick={() => go({ name: 'notebook', id: view.id })}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink px-4 py-2 border border-line rounded-full"
            >
              <ArrowLeft size={16} />
              <span>Volver al cuaderno</span>
            </button>
          </div>
        )}
        {view.name === 'results' && (
          <div className="bg-surface border border-line rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-lg font-bold text-ink">Resultados del Examen</h2>
            <p className="text-sm text-muted max-w-md mx-auto">
              Revisión de respuestas y conceptos a repasar.
            </p>
            <button
              onClick={() => go({ name: 'notebook', id: view.id })}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink px-4 py-2 border border-line rounded-full"
            >
              <ArrowLeft size={16} />
              <span>Volver al cuaderno</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
