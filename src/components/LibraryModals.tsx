/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { ProgramType, FileSourceType, Section } from '../types';
import {
  X,
  Upload,
  Link,
  CheckCircle,
  AlertCircle,
  FileText,
  Sparkles,
  ShieldCheck,
  Plus,
} from 'lucide-react';

export const AddPersonalDocModal: React.FC = () => {
  const { isAddPersonalModalOpen, setIsAddPersonalModalOpen, addPersonalDocument } = useAppState();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [program, setProgram] = useState<ProgramType>('MINUME XVII');
  const [fileType, setFileType] = useState<FileSourceType>('drive');
  const [driveUrl, setDriveUrl] = useState('');
  const [notesContent, setNotesContent] = useState('');
  const [tagsInput, setTagsInput] = useState('Postura, Apuntes, Borrador');

  if (!isAddPersonalModalOpen) return null;

  const isDriveUrlValid =
    driveUrl.trim().startsWith('https://docs.google.com/') ||
    driveUrl.trim().startsWith('https://drive.google.com/');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const sections: Section[] = [
      {
        id: `sec-pers-${Date.now()}-1`,
        numberStr: 'P.1',
        title: 'Apuntes Generales y Marco de Negociación',
        pageRange: 'Págs. 1–3',
        summary: subtitle || 'Notas personales para uso privado en sala de comisión.',
        content:
          notesContent.trim() ||
          `Documento personal vinculado a ${driveUrl || 'archivo local'}.\n\nNotas registradas por el delegado para consultas rápidas sin alterar el diagnóstico institucional.`,
        conceptIds: [],
        keyTakeaway: 'Documento confidencial del delegado.',
      },
    ];

    addPersonalDocument({
      title: title.trim(),
      subtitle: subtitle.trim() || 'Documento de trabajo privado del delegado',
      program,
      version: 'Borrador 1.0',
      pagesCount: 4,
      fileType,
      fileUrl: fileType === 'drive' ? driveUrl.trim() : undefined,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      description: 'Apuntes personales indexados para consultas del asistente en la Mesa de Estudio.',
      authorOrEntity: 'Delegado (Privado)',
      sections,
    });

    // Reset
    setTitle('');
    setSubtitle('');
    setDriveUrl('');
    setNotesContent('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              Agregar Recurso a Mi Biblioteca Personal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              100% privado · Solo visible para ti y no altera tu diagnóstico oficial del PLERD.
            </p>
          </div>
          <button
            onClick={() => setIsAddPersonalModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          {/* Tipo de fuente */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Método de Incorporación
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFileType('drive')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border font-bold text-xs transition-all ${
                  fileType === 'drive'
                    ? 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-700'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>Google Docs / Drive</span>
              </button>

              <button
                type="button"
                onClick={() => setFileType('pdf')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border font-bold text-xs transition-all ${
                  fileType === 'pdf'
                    ? 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-700'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir PDF / Word</span>
              </button>

              <button
                type="button"
                onClick={() => setFileType('text')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border font-bold text-xs transition-all ${
                  fileType === 'text'
                    ? 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-700'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Pegar Texto Directo</span>
              </button>
            </div>
          </div>

          {/* Si es Google Docs: validación en verde igual a MINUME ROOM */}
          {fileType === 'drive' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Enlace de Google Docs o Google Drive
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://docs.google.com/document/d/..."
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  className={`w-full pl-3.5 pr-20 py-2 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 ${
                    driveUrl.length > 0 && isDriveUrlValid
                      ? 'border-emerald-500 focus:ring-emerald-400/30'
                      : driveUrl.length > 0
                      ? 'border-amber-400 focus:ring-amber-400/30'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500/30'
                  }`}
                />
                {driveUrl.length > 0 && isDriveUrlValid && (
                  <span className="absolute right-3 top-2.5 flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-white/90 dark:bg-slate-800 px-1 rounded">
                    <CheckCircle className="w-3.5 h-3.5" /> Válido
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                El documento debe tener permisos de lectura compartidos (ej. "Cualquiera con el enlace puede ver").
              </p>
            </div>
          )}

          {/* Si es PDF: simulador de subida */}
          {fileType === 'pdf' && (
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-sky-400 transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-800/40">
              <Upload className="w-7 h-7 mx-auto text-sky-600 mb-1.5" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Arrastra tu PDF o documento aquí
              </p>
              <p className="text-[11px] text-slate-400">Archivos PDF, DOCX o TXT de hasta 25 MB</p>
            </div>
          )}

          {/* Título */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Título del Documento *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Borrador de Cláusulas Operativas · Delegación RD"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Programa Relacionado
              </label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value as ProgramType)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
              >
                <option value="MINUME XVII">MINUME XVII (Modelo ONU)</option>
                <option value="CND Debate">CND (Campeonato Debate)</option>
                <option value="CLIT">CLIT (Liderazgo Estudiantil)</option>
                <option value="Normativa General">Normativa General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Etiquetas (Separadas por coma)
              </label>
              <input
                type="text"
                placeholder="Postura, Discurso, POIs"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
              >
              </input>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Notas o Fragmento Inicial (Opcional)
            </label>
            <textarea
              rows={3}
              placeholder="Escribe o pega aquí extractos clave para que el Tutor IA pueda citarlos en tus consultas..."
              value={notesContent}
              onChange={(e) => setNotesContent(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddPersonalModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] disabled:opacity-50 transition-all"
            >
              Guardar en Mi Biblioteca
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const PublishOfficialDocModal: React.FC = () => {
  const { isPublishOfficialModalOpen, setIsPublishOfficialModalOpen, publishOfficialDocument } =
    useAppState();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [program, setProgram] = useState<ProgramType>('MINUME XVII');
  const [version, setVersion] = useState('Edición Oficial 2026.2');
  const [description, setDescription] = useState('');
  const [isSimulatingExtract, setIsSimulatingExtract] = useState(false);
  const [extractedSections, setExtractedSections] = useState<Section[]>([
    {
      id: 'sec-auto-1',
      numberStr: '1.1',
      title: 'Disposiciones Generales y Principios Rectores',
      pageRange: 'Págs. 1–6',
      summary: 'Reglas fundamentales de convivencia, orden y deliberación parlamentaria.',
      content: 'Contenido oficial de la sección 1.1 homologada para evaluación formativa.',
      conceptIds: ['c-disposiciones-generales'],
      keyTakeaway: 'Deber de cumplimiento obligatorio por todas las delegaciones participantes.',
    },
    {
      id: 'sec-auto-2',
      numberStr: '1.2',
      title: 'Protocolo de Adjudicación y Rúbricas Oficiales',
      pageRange: 'Págs. 7–12',
      summary: 'Criterios de ponderación para jueces y autoridades de mesa.',
      content: 'Contenido técnico de la rúbrica oficial de la comisión.',
      conceptIds: ['c-criterios-adjudicacion'],
      keyTakeaway: 'Preeminencia del fondo argumental y evidencia empírica.',
    },
  ]);

  if (!isPublishOfficialModalOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    publishOfficialDocument({
      title: title.trim(),
      subtitle: subtitle.trim() || 'Reglamento canónico publicado por Coordinación PLERD',
      program,
      version: version.trim() || 'Edición Oficial 2026',
      pagesCount: 36,
      fileType: 'pdf',
      tags: ['Oficial', 'PLERD', program, 'Reglamento'],
      description:
        description.trim() ||
        'Documento institucional con mapa de conceptos evaluables aprobado por la Dirección de Participación y Liderazgo Estudiantil.',
      authorOrEntity: 'Dirección PLERD · MINERD',
      sections: extractedSections,
    });

    setTitle('');
    setSubtitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-purple-200 dark:border-purple-900 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md">
                Panel de Coordinador PLERD
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Publicar Documento Institucional Homologado
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Este documento será accesible para todos los delegados del PLERD y formará parte del diagnóstico acumulativo oficial.
            </p>
          </div>
          <button
            onClick={() => setIsPublishOfficialModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePublish} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Título Oficial del Documento *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Adenda al Reglamento de Procedimiento MINUME XVII"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Programa
              </label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value as ProgramType)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
              >
                <option value="MINUME XVII">MINUME XVII</option>
                <option value="CND Debate">CND Debate</option>
                <option value="CLIT">CLIT</option>
                <option value="Normativa General">Normativa General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Versión Oficial
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Caja de Extracción Asistida por Gemini */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Extracción Canónica de Secciones y Conceptos (Gemini)
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSimulatingExtract(true);
                  setTimeout(() => setIsSimulatingExtract(false), 600);
                }}
                className="text-[11px] font-bold text-purple-700 hover:text-purple-900 dark:text-purple-300"
              >
                {isSimulatingExtract ? 'Indexando...' : 'Reindexar secciones'}
              </button>
            </div>

            <p className="text-[11px] text-purple-800/80 dark:text-purple-300/80">
              Se detectaron <strong>{extractedSections.length} secciones estructuradas</strong> listas para vincular al banco de preguntas del tutor pedagógico.
            </p>

            <div className="space-y-1.5 max-h-32 overflow-y-auto pt-1">
              {extractedSections.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-purple-100 dark:border-purple-900/50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-purple-700 bg-purple-100 dark:bg-purple-900 px-2 py-0.5 rounded-lg text-[10px]">
                      {sec.numberStr}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {sec.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{sec.pageRange}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsPublishOfficialModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 rounded-full text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-50 shadow-sm transition-all"
            >
              Publicar a la Biblioteca Institucional
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
