/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const { notebooks, go, createNotebook } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setNewTitle('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createNotebook(newTitle.trim());
    setNewTitle('');
    setIsModalOpen(false);
  };

  const generalNotebooks = notebooks.filter((n) => n.scope === 'general');
  const personalNotebooks = notebooks.filter((n) => n.scope === 'personal');

  return (
    <div className="space-y-8">
      {/* Sección 1: Recursos Generales */}
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-ink">Recursos generales</h2>
          <p className="text-xs text-muted">Material oficial del PLERD</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {generalNotebooks.map((nb) => {
            const latestExam = nb.exams && nb.exams.length > 0 ? nb.exams[0] : null;
            return (
              <button
                type="button"
                key={nb.id}
                onClick={() => go({ name: 'notebook', id: nb.id })}
                className="w-full text-left bg-surface border border-line rounded-2xl p-5 hover:border-muted cursor-pointer transition-all space-y-2 focus:outline-none"
              >
                <span className="text-xs text-muted block">{nb.program}</span>
                <h3 className="font-semibold text-ink text-base leading-snug">{nb.title}</h3>
                <p className="text-xs text-muted pt-1">
                  {nb.sources.length} {nb.sources.length === 1 ? 'fuente' : 'fuentes'}
                </p>
                {latestExam && (
                  <span className="text-xs text-muted block pt-1">
                    Último examen: {latestExam.correct}/{latestExam.total}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sección 2: Mis Recursos */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-ink">Mis recursos</h2>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Crear cuaderno nuevo"
            className="w-7 h-7 rounded-full border border-line bg-surface hover:bg-base text-ink flex items-center justify-center transition-colors"
          >
            <Plus size={16} strokeWidth={1.75} />
          </button>
        </div>

        {personalNotebooks.length === 0 ? (
          <div className="bg-surface border border-line rounded-2xl p-8 text-center space-y-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-ink hover:text-muted border border-line bg-surface px-4 py-2 rounded-full transition-colors"
            >
              Crear mi primer cuaderno
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personalNotebooks.map((nb) => {
              const latestExam = nb.exams && nb.exams.length > 0 ? nb.exams[0] : null;
              return (
                <button
                  type="button"
                  key={nb.id}
                  onClick={() => go({ name: 'notebook', id: nb.id })}
                  className="w-full text-left bg-surface border border-line rounded-2xl p-5 hover:border-muted cursor-pointer transition-all space-y-2 focus:outline-none"
                >
                  <span className="text-xs text-muted block">Personal</span>
                  <h3 className="font-semibold text-ink text-base leading-snug">{nb.title}</h3>
                  <p className="text-xs text-muted pt-1">
                    {nb.sources.length} {nb.sources.length === 1 ? 'fuente' : 'fuentes'}
                  </p>
                  {latestExam && (
                    <span className="text-xs text-muted block pt-1">
                      Último examen: {latestExam.correct}/{latestExam.total}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal accesible para Crear Cuaderno Personal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setIsModalOpen(false);
            setNewTitle('');
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/20 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-line rounded-2xl max-w-md w-full p-6 space-y-4 shadow-sm"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-ink">Nuevo cuaderno</h3>
              <p className="text-xs text-muted">
                Los cuadernos personales son privados y se guardan únicamente en este navegador.
              </p>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                required
                autoFocus
                placeholder="Ej. Notas de debate y argumentación"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-base border border-line rounded-xl px-3.5 py-2 text-sm text-ink focus:outline-none"
              />

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewTitle('');
                  }}
                  className="text-xs text-muted hover:text-ink px-4 py-2 border border-line rounded-full"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="text-xs font-semibold bg-accent hover:bg-accent-strong disabled:opacity-50 text-white px-5 py-2 rounded-full transition-colors"
                >
                  Crear cuaderno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
