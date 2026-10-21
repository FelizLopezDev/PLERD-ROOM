/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BookOpen, FileText, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { view, go, notebooks } = useApp();

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans">
      {/* Barra superior simple */}
      <header className="bg-surface border-b border-line px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span
              onClick={() => go({ name: 'library' })}
              className="text-lg font-bold text-ink cursor-pointer hover:opacity-90"
            >
              PLERD ROOM
            </span>
            <span className="text-xs text-muted">
              Dirección de Participación y Liderazgo Estudiantil · Ministerio de Educación
            </span>
          </div>

          {view.name !== 'library' && (
            <button
              onClick={() => go({ name: 'library' })}
              className="text-xs text-muted hover:text-ink flex items-center gap-2 py-1 px-3 border border-line rounded-full bg-surface"
            >
              Volver a la biblioteca
            </button>
          )}
        </div>
      </header>

      {/* Contenido según vista (Placeholders de Paso 0-4) */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6">
        {view.name === 'library' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-ink">Cuadernos de Estudio</h1>
                <p className="text-sm text-muted">
                  Selecciona un cuaderno para estudiar con tus fuentes o crear uno nuevo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {notebooks.map((nb) => (
                <div
                  key={nb.id}
                  onClick={() => go({ name: 'notebook', id: nb.id })}
                  className="bg-surface border border-line rounded-2xl p-5 hover:border-accent cursor-pointer transition-all space-y-3"
                >
                  <div className="flex items-center gap-2 text-ink">
                    <BookOpen size={20} strokeWidth={1.75} className="text-ink" />
                    <span className="text-xs text-muted">
                      {nb.scope === 'general' ? 'Oficial PLERD' : 'Personal'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink text-base">{nb.title}</h3>
                  <p className="text-xs text-muted">
                    {nb.sources.length} fuentes indexadas
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view.name === 'notebook' && (
          <div className="bg-surface border border-line rounded-2xl p-8 text-center space-y-4">
            <div className="flex justify-center text-ink">
              <FileText size={20} strokeWidth={1.75} className="text-ink" />
            </div>
            <h2 className="text-lg font-bold text-ink">
              Cuaderno seleccionado: {notebooks.find((n) => n.id === view.id)?.title || view.id}
            </h2>
            <p className="text-sm text-muted max-w-md mx-auto">
              Vista del cuaderno: fuentes a la izquierda, conversación basada en fuentes en el centro y botón "Examinarme".
            </p>
            <div className="pt-2">
              <button
                onClick={() => go({ name: 'exam', id: view.id })}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-strong text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                Examinarme
              </button>
            </div>
          </div>
        )}

        {view.name === 'exam' && (
          <div className="bg-surface border border-line rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-lg font-bold text-ink">Sesión de Examen</h2>
            <p className="text-sm text-muted max-w-md mx-auto">
              Preguntas generadas exclusivamente a partir de las fuentes del cuaderno.
            </p>
            <button
              onClick={() => go({ name: 'notebook', id: view.id })}
              className="text-xs text-muted hover:text-ink px-4 py-2 border border-line rounded-full"
            >
              Cancelar y volver
            </button>
          </div>
        )}

        {view.name === 'results' && (
          <div className="bg-surface border border-line rounded-2xl p-8 text-center space-y-4">
            <div className="flex justify-center text-ink">
              <CheckCircle2 size={20} strokeWidth={1.75} className="text-ink" />
            </div>
            <h2 className="text-lg font-bold text-ink">Resultados del Examen</h2>
            <p className="text-sm text-muted">
              Revisión de respuestas y conceptos a repasar.
            </p>
            <button
              onClick={() => go({ name: 'notebook', id: view.id })}
              className="text-xs text-muted hover:text-ink px-4 py-2 border border-line rounded-full"
            >
              Volver al cuaderno
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
