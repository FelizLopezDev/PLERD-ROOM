/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const { notebooks, go, createNotebook } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createNotebook(newTitle.trim());
    setNewTitle('');
    setIsCreating(false);
  };

  const generalNotebooks = notebooks.filter((n) => n.scope === 'general');
  const personalNotebooks = notebooks.filter((n) => n.scope === 'personal');

  return (
    <div className="space-y-8">
      {/* Encabezado y Acción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Cuadernos de Estudio</h1>
          <p className="text-sm text-muted">
            Selecciona un cuaderno para estudiar con tus fuentes o crear uno nuevo.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-strong text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Nuevo cuaderno</span>
        </button>
      </div>

      {/* Formulario para nuevo cuaderno personal */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="bg-surface border border-line rounded-2xl p-5 space-y-3"
        >
          <h3 className="text-sm font-semibold text-ink">Crear cuaderno personal</h3>
          <input
            type="text"
            required
            autoFocus
            placeholder="Título del cuaderno (ej. Postura de Delegación · PNUD)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-base border border-line rounded-xl px-3.5 py-2 text-sm text-ink focus:outline-none focus:border-accent"
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setNewTitle('');
              }}
              className="text-xs text-muted hover:text-ink px-3 py-1.5 border border-line rounded-full"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="text-xs font-semibold bg-accent hover:bg-accent-strong disabled:opacity-50 text-white px-4 py-1.5 rounded-full"
            >
              Crear
            </button>
          </div>
        </form>
      )}

      {/* Sección Cuadernos Oficiales */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Materiales Oficiales PLERD
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {generalNotebooks.map((nb) => (
            <div
              key={nb.id}
              onClick={() => go({ name: 'notebook', id: nb.id })}
              className="bg-surface border border-line rounded-2xl p-5 hover:border-accent cursor-pointer transition-all space-y-2"
            >
              <span className="text-xs text-muted block">{nb.program}</span>
              <h3 className="font-semibold text-ink text-base leading-snug">{nb.title}</h3>
              <p className="text-xs text-muted pt-1">
                {nb.sources.length} {nb.sources.length === 1 ? 'fuente' : 'fuentes'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Cuadernos Personales */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Cuadernos Personales
        </h2>

        {personalNotebooks.length === 0 ? (
          <div className="bg-surface border border-line rounded-2xl p-6 text-center text-xs text-muted">
            No tienes cuadernos personales todavía. Pulsa "Nuevo cuaderno" para agregar tus notas o documentos.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personalNotebooks.map((nb) => (
              <div
                key={nb.id}
                onClick={() => go({ name: 'notebook', id: nb.id })}
                className="bg-surface border border-line rounded-2xl p-5 hover:border-accent cursor-pointer transition-all space-y-2"
              >
                <span className="text-xs text-muted block">Personal</span>
                <h3 className="font-semibold text-ink text-base leading-snug">{nb.title}</h3>
                <p className="text-xs text-muted pt-1">
                  {nb.sources.length} {nb.sources.length === 1 ? 'fuente' : 'fuentes'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
