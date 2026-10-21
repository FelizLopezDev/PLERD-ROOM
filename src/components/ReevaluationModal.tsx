/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import {
  X,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

interface QuestionScenario {
  id: string;
  questionType: 'MULTIPLE_CHOICE' | 'OPEN';
  prompt: string;
  sourceCitation: string;
  verbatimQuote: string;
  options?: {
    id: string;
    text: string;
    classification: 'DEMONSTRATED' | 'PARTIAL' | 'CONCEPTUAL_ERROR' | 'NOT_UNDERSTOOD';
    evidenceScore: number;
    feedback: string;
  }[];
  openRubricGuide?: string;
}

const scenarioBank: Record<string, QuestionScenario[]> = {
  'c-cuestion-previa': [
    {
      id: 'q-cp-1',
      questionType: 'MULTIPLE_CHOICE',
      prompt:
        'En plena sesión de la Comisión PNUD, la delegación de Brasil propone una Moción de Cuestión Previa para cerrar de inmediato el debate y votar el proyecto de resolución. En ese instante, la delegación de Barbados presenta una Moción de Suspensión de la Sesión por 15 minutos para consultas informales. ¿Cómo debe proceder la Presidencia según el orden de precedencia reglamentario?',
      sourceCitation: 'Manual del Delegado MINUME XVII, Capítulo 4, Sección 4.2, Pág. 19',
      verbatimQuote:
        'La Moción de Suspensión de la Sesión posee estricta precedencia sobre la Moción de Cuestión Previa. No es debatible y se vota de forma inmediata.',
      options: [
        {
          id: 'opt-1',
          text: 'Someter a votación de inmediato la Moción de Suspensión de la Sesión, ya que tiene precedencia sobre la Cuestión Previa y no es debatible.',
          classification: 'DEMONSTRATED',
          evidenceScore: 1.0,
          feedback:
            '¡Excelente aplicación! La Moción de Suspensión ocupa el puesto número 1 en la jerarquía parlamentaria de MINUME y prevalece automáticamente sobre el cierre de debate.',
        },
        {
          id: 'opt-2',
          text: 'Votar primero la Cuestión Previa porque fue propuesta con anterioridad en el orden cronológico.',
          classification: 'CONCEPTUAL_ERROR',
          evidenceScore: 0.15,
          feedback:
            'Error conceptual de precedencia: En el reglamento parlamentario, la prelación no es cronológica sino jerárquica. La suspensión de sesión siempre antecede a la cuestión previa.',
        },
        {
          id: 'opt-3',
          text: 'Permitir dos oradores a favor y dos en contra antes de decidir cuál moción se vota.',
          classification: 'NOT_UNDERSTOOD',
          evidenceScore: 0.0,
          feedback:
            'La Moción de Suspensión no admite debate alguno; se somete al voto sin deliberación previa.',
        },
        {
          id: 'opt-4',
          text: 'Declarar un receso informal automático de 5 minutos antes de consultar a la Mesa.',
          classification: 'PARTIAL',
          evidenceScore: 0.6,
          feedback:
            'Respuesta incompleta: la Mesa no puede declarar receso sin someter la moción de suspensión al voto reglamentario de la sala.',
        },
      ],
    },
    {
      id: 'q-cp-2',
      questionType: 'MULTIPLE_CHOICE',
      prompt:
        '¿Cuál es el requisito indispensable para que la Presidencia declare admisible una Moción de Cuestión Previa en MINUME?',
      sourceCitation: 'Manual del Delegado MINUME XVII, Capítulo 4, Sección 4.2, Pág. 19',
      verbatimQuote:
        'La Cuestión Previa únicamente es admisible si se han agotado al menos dos (2) oradores en la lista general del debate.',
      options: [
        {
          id: 'opt-2-1',
          text: 'Que al menos dos (2) oradores hayan participado formalmente en la lista de oradores.',
          classification: 'DEMONSTRATED',
          evidenceScore: 1.0,
          feedback:
            'Correcto. Se exige haber escuchado a un mínimo de dos delegaciones antes de clausurar el debate de fondo.',
        },
        {
          id: 'opt-2-2',
          text: 'Que la totalidad de los países patrocinadores estén de acuerdo por unanimidad.',
          classification: 'CONCEPTUAL_ERROR',
          evidenceScore: 0.15,
          feedback:
            'Confusión: los patrocinadores no tienen poder de veto sobre la cuestión previa, la cual depende de la sala y de la lista de oradores.',
        },
      ],
    },
  ],
  'c-derecho-replica': [
    {
      id: 'q-dr-1',
      questionType: 'MULTIPLE_CHOICE',
      prompt:
        'Durante el debate, un delegado afirma: "La delegación de Francia defiende una postura retrógrada e ineficiente que ha causado el colapso del tratado". El delegado de Francia solicita un Derecho a Réplica. ¿Debe la Mesa concederlo?',
      sourceCitation: 'Manual del Delegado MINUME XVII, Capítulo 4, Sección 4.3, Págs. 21–22',
      verbatimQuote:
        'No procede Derecho a Réplica para rebatir argumentos técnicos, estadísticos o políticos sobre el fondo del tópico.',
      options: [
        {
          id: 'opt-dr-1',
          text: 'No, porque se trata de una discrepancia política y argumentativa sobre el tópico, no de una injuria a la dignidad soberana o personal del Jefe de Estado.',
          classification: 'DEMONSTRATED',
          evidenceScore: 1.0,
          feedback:
            '¡Preciso! El Derecho a Réplica no ampara controversias doctrinales ni adjetivos políticos sobre posturas de fondo.',
        },
        {
          id: 'opt-dr-2',
          text: 'Sí, porque cualquier alusión nominal desfavorable a un país otorga automáticamente el derecho de réplica.',
          classification: 'CONCEPTUAL_ERROR',
          evidenceScore: 0.15,
          feedback:
            'Error común: la mención del nombre del país no habilita réplica a menos que constituya injuria grave a la investidura nacional.',
        },
      ],
    },
  ],
  'c-puntos-informacion': [
    {
      id: 'q-poi-1',
      questionType: 'MULTIPLE_CHOICE',
      prompt:
        'En un debate del CND, ¿en qué momento está terminantemente prohibido formular un Punto de Información (POI)?',
      sourceCitation: 'Reglamento Oficial CND, Capítulo 2, Sección 2.1, Pág. 12',
      verbatimQuote:
        'El primer minuto y el último minuto constituyen Tiempo Protegido donde ningún debatiente contrario podrá solicitar POIs.',
      options: [
        {
          id: 'opt-poi-1',
          text: 'Durante el primer minuto (0:00–1:00) y el último minuto (6:00–7:00), catalogados como Tiempos Protegidos.',
          classification: 'DEMONSTRATED',
          evidenceScore: 1.0,
          feedback:
            'Exacto. Los tiempos protegidos aseguran la introducción y conclusión ininterrumpida de la bancada.',
        },
        {
          id: 'opt-poi-2',
          text: 'Durante los minutos 3:00 a 4:00 por ser la mitad del discurso.',
          classification: 'NOT_UNDERSTOOD',
          evidenceScore: 0.0,
          feedback:
            'Ese es el momento central de tiempo abierto donde los POIs son expresamente bienvenidos.',
        },
      ],
    },
  ],
};

export const ReevaluationModal: React.FC = () => {
  const {
    activeReevalConceptId,
    closeReevalModal,
    diagnostics,
    submitReevalAnswer,
    selectDocAndSection,
  } = useAppState();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedbackResult, setFeedbackResult] = useState<any | null>(null);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  if (!activeReevalConceptId) return null;

  const concept = diagnostics[activeReevalConceptId];
  const questions =
    scenarioBank[activeReevalConceptId] ||
    scenarioBank['c-cuestion-previa']; // Fallback robusto

  const currentQ = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
  };

  const handleVerifyAnswer = () => {
    if (!selectedOptionId || !currentQ.options) return;
    const chosen = currentQ.options.find((o) => o.id === selectedOptionId);
    if (!chosen) return;

    setFeedbackResult(chosen);
  };

  const handleNextOrFinish = () => {
    if (feedbackResult) {
      // Calculate score improvement
      const delta = feedbackResult.classification === 'DEMONSTRATED' ? +28 : +6;
      const targetScore = Math.min(100, (concept?.masteryScore || 40) + delta);

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOptionId(null);
        setFeedbackResult(null);
      } else {
        submitReevalAnswer(activeReevalConceptId, delta, targetScore);
        setSessionCompleted(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Encabezado Fijo */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                Sesión de Reevaluación Diagnóstica
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {concept?.name || 'Evaluación Formativa'}
              </h3>
            </div>
          </div>

          <button
            onClick={closeReevalModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!sessionCompleted ? (
          <>
            {/* Cuerpo con Scroll Vertical Independiente */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {/* Barra de progreso */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </span>
                <span className="font-semibold text-sky-600 dark:text-sky-400">
                  Caso Práctico de Comisión
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-600 transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Enunciado del Caso */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                  Escenario Parlamentario Real
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.prompt}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-sky-700 dark:text-sky-300 font-medium">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Fuente oficial: {currentQ.sourceCitation}</span>
                </div>
              </div>

              {/* Opciones de Selección */}
              <div className="space-y-2.5">
                {currentQ.options?.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const showFeedback = feedbackResult !== null;
                  const isChosen = feedbackResult?.id === opt.id;

                  let optionBorder = 'border-slate-200 dark:border-slate-800';
                  let optionBg = 'bg-white dark:bg-slate-900 hover:border-sky-300';

                  if (isSelected) {
                    optionBorder = 'border-sky-500 ring-2 ring-sky-500/20';
                    optionBg = 'bg-sky-50/50 dark:bg-sky-950/30';
                  }

                  if (showFeedback) {
                    if (opt.classification === 'DEMONSTRATED') {
                      optionBorder = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40';
                    } else if (isChosen) {
                      optionBorder = 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={showFeedback}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionBorder} ${optionBg}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                          isSelected
                            ? 'border-sky-600 bg-sky-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 text-slate-500'
                        }`}
                      >
                        {isSelected ? '✓' : ''}
                      </div>
                      <span className="font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Panel de Corrección Pedagógica y Diagnóstico */}
              {feedbackResult && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border space-y-3 animate-in fade-in duration-200 ${
                    feedbackResult.classification === 'DEMONSTRATED'
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-50/80 border-rose-200 text-rose-950 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      {feedbackResult.classification === 'DEMONSTRATED' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Conocimiento Demostrado (Evidencia: 1.0)
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          Confusión Conceptual Detectada
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {feedbackResult.feedback}
                  </p>

                  {/* Cita Textual de la Fuente Canónica */}
                  <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-black/5 dark:border-white/10 text-xs">
                    <span className="font-bold block text-slate-700 dark:text-slate-300 mb-0.5">
                      Cita Textual de la Fuente Oficial:
                    </span>
                    <p className="italic text-slate-600 dark:text-slate-400">
                      "{currentQ.verbatimQuote}"
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      — {currentQ.sourceCitation}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Fijo con Botones de Acción */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 shrink-0 bg-slate-50/70 dark:bg-slate-900/70">
              {!feedbackResult ? (
                <button
                  onClick={handleVerifyAnswer}
                  disabled={!selectedOptionId}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] disabled:opacity-40 shadow-sm transition-all"
                >
                  Confirmar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleNextOrFinish}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <span>
                    {currentQuestionIndex + 1 < questions.length
                      ? 'Siguiente Pregunta'
                      : 'Finalizar y Actualizar Diagnóstico'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              )}
            </div>
          </>
        ) : (
          /* Pantalla de Finalización con Actualización de Dominio */
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                ¡Reevaluación Registrada con Éxito!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Tu evidencia fue procesada por el Tutor Pedagógico y tu perfil de aprendizaje fue actualizado.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                <span>Nuevo Puntaje de Dominio:</span>
                <span className="text-emerald-600 font-black text-base tabular-nums">
                  {concept ? Math.min(100, concept.masteryScore + 28) : 72}% (+28%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${concept ? Math.min(100, concept.masteryScore + 28) : 72}%`,
                  }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400">
                Próximo repaso automático programado: <strong>Escalón 4 días</strong>.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={closeReevalModal}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#0A2540] hover:bg-[#002B7F] shadow-sm transition-transform active:scale-95"
              >
                Volver a Mi Aula
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
