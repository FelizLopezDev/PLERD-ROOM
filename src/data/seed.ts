/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Notebook } from '../types';

export const initialNotebooks: Notebook[] = [
  {
    id: 'nb-minume-manual',
    title: 'Manual del Delegado MINUME XVII',
    program: 'MINUME XVII',
    scope: 'general',
    exams: [],
    sources: [
      {
        id: 'src-minume-1',
        title: 'Apertura de la Sesión y Quórum',
        type: 'text',
        content: `La Presidencia abre formalmente cada sesión de trabajo comprobando que se encuentra presente en la sala el quórum reglamentario: un tercio (1/3) de las delegaciones acreditadas para deliberar, o la mayoría absoluta (la mitad más uno) para someter a votación cualquier cuestión sustantiva.

Durante el llamado a lista al inicio de la jornada, cada Estado Miembro responde indicando su estatus:
- "Presente": Permite votar a favor, en contra o abstenerse en la votación final de resoluciones.
- "Presente y Votando": La delegación asume un compromiso irrevocable con el debate, quedando expresamente inhabilitada para abstenerse en resoluciones sustantivas.`,
      },
      {
        id: 'src-minume-2',
        title: 'Mociones de Procedimiento y Orden de Precedencia',
        type: 'text',
        content: `Cuando concurren dos o más mociones, la Presidencia somete a votación la de mayor jerarquía procesal según el siguiente orden reglamentario inalterable:

1. Moción de Suspensión de la Sesión (recesos informales o consultas): No es debatible y se vota de forma inmediata.
2. Moción de Cierre de la Sesión (levantamiento definitivo de la jornada del día): Requiere aprobación por mayoría simple.
3. Moción de Aplazamiento del Debate (posposición del tópico): Admite hasta dos oradores a favor y dos en contra antes del voto.
4. Moción de Cuestión Previa (cierre anticipado del debate para votar de inmediato): Únicamente admisible si se han agotado al menos dos oradores en la lista general.

Regla esencial: La Moción de Cuestión Previa nunca tiene prelación sobre la Moción de Suspensión de la Sesión.`,
      },
      {
        id: 'src-minume-3',
        title: 'Derecho a Réplica y Puntos de Sala',
        type: 'text',
        content: `El Derecho a Réplica es una prerrogativa extraordinaria concedida a discreción de la Presidencia. Solo se otorgará cuando un delegado considere que la soberanía, integridad, dignidad o persona del Jefe de Estado de su nación ha sido directamente agraviada o injuriada por otro orador en tribuna.

No procede Derecho a Réplica para:
a) Rebatir argumentos técnicos, estadísticos o políticos sobre el fondo del tópico.
b) Corregir interpretaciones jurídicas de tratados internacionales.
c) Contradecir el voto emitido por otra delegación.

El Punto de Orden se utiliza para alertar a la Presidencia sobre una infracción manifiesta del reglamento en el desarrollo del debate.`,
      },
      {
        id: 'src-minume-4',
        title: 'Hojas de Trabajo y Proyectos de Resolución',
        type: 'text',
        content: `Todo Proyecto de Resolución presentado ante la Mesa Directiva debe contar con el respaldo formal de:
- Al menos dos (2) Patrocinadores (Sponsors), quienes redactan y defienden íntegramente el articulado.
- Un número mínimo de Signatarios (Signatories) equivalente al 20% de las delegaciones presentes en la comisión.

Distinción clave: La condición de Signatario no obliga bajo ninguna circunstancia a la delegación a votar favorablemente por el proyecto en la votación final; únicamente certifica que considera el texto lo suficientemente maduro para su discusión formal.`,
      },
    ],
  },
  {
    id: 'nb-cnd-reglamento',
    title: 'Reglamento Oficial del CND',
    program: 'CND Debate',
    scope: 'general',
    exams: [],
    sources: [
      {
        id: 'src-cnd-1',
        title: 'Estructura de Discursos y Tiempos Parlamentarios',
        type: 'text',
        content: `Cada orador principal dispone de un tiempo reglamentario de siete (7) minutos. El primer minuto y el último minuto constituyen "Tiempo Protegido", indicado por un solo golpe de mazo de la Mesa de Jueces.

Durante el Tiempo Protegido ningún debatiente del equipo contrario puede solicitar Puntos de Información (POIs). Entre el minuto 1:00 y el minuto 6:00, el tiempo es abierto y la bancada contraria puede formular intervenciones breves de no más de 15 segundos previa concesión del orador.`,
      },
      {
        id: 'src-cnd-2',
        title: 'Puntos de Información (POIs): Admisión y Rechazo',
        type: 'text',
        content: `La solicitud de un Punto de Información debe realizarse de pie, pronunciando únicamente la fórmula: "Punto de Información" o "Sobre ese punto". Queda terminantemente prohibido solapar argumentos durante la solicitud antes de que el orador conceda la palabra.

Se espera que todo orador acepte al menos uno (1) y no más de dos (2) POIs durante su discurso de 7 minutos. Negarse a otorgar la palabra a lo largo de todo el tiempo no protegido es penalizado por el panel de jueces en el rubro de Estrategia.`,
      },
      {
        id: 'src-cnd-3',
        title: 'Criterios de Adjudicación de los Jueces',
        type: 'text',
        content: `El panel de jueces emite su veredicto fundamentándose en tres pilares objetivos:
a) Contenido y Razonamiento Lógico (40%): Carga de la prueba, solidez empírica, relevancia y cadenas causales completas (Afirmación, Razonamiento, Evidencia, Impacto).
b) Forma y Comunicación Persuasiva (30%): Lenguaje corporal, modulación vocal, asertividad, manejo de tiempos y respeto parlamentario.
c) Estrategia y Cumplimiento del Rol (30%): Identificación de los puntos de choque neurálgicos de la moción y respuesta a los argumentos de mayor peso del contrincante.`,
      },
    ],
  },
  {
    id: 'nb-clit-guia',
    title: 'Guía Construyendo Liderazgo Trascendente (CLIT)',
    program: 'CLIT',
    scope: 'general',
    exams: [],
    sources: [
      {
        id: 'src-clit-1',
        title: 'Liderazgo Servidor y Negociación de Harvard',
        type: 'text',
        content: `En los debates estudiantiles del PLERD, el éxito negociador radica en aplicar los cuatro postulados de la Escuela de Negociación de Harvard:
1. Separar a las personas del problema: Tratar a los colegas delegados con cortesía empática y a los dilemas sustantivos con rigor técnico.
2. Enfocarse en intereses, no en posiciones: Una posición es lo que un país declara querer; un interés es la necesidad subyacente real.
3. Generar opciones de mutuo beneficio antes de decidir.
4. Insistir en criterios objetivos e independientes de justicia y legalidad.`,
      },
      {
        id: 'src-clit-2',
        title: 'Resolución de Conflictos y Acuerdos de Consenso',
        type: 'text',
        content: `Cuando una comisión experimenta una polarización que impide el avance del quórum, los líderes estudiantiles aplican el protocolo de mediación escalonada:
- Identificar los mínimos comunes no negociables de ambos bloques.
- Redactar cláusulas alternativas que incorporen salvaguardas recíprocas.
- Utilizar el espacio del caucus informal para el acercamiento de los patrocinadores principales sin la presión de la transcripción oficial.`,
      },
    ],
  },
];
