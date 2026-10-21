/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Document,
  ConceptDiagnostic,
  EvidenceRecommendation,
  SpacedReviewItem,
  DelegateProfile,
  NotificationItem,
} from '../types';

export const initialDelegateProfile: DelegateProfile = {
  name: 'Alejandro M. Morales',
  role: 'Delegado Titular',
  country: 'República Dominicana',
  committee: 'Comisión PNUD (Programa de las Naciones Unidas para el Desarrollo)',
  event: 'MINUME XVII',
  roomCode: 'PNUD · Sala 01',
  institution: 'Liceo Secundario República de Argentina · Distrito 10-04 (MINERD)',
  overallMastery: 64,
  masteredCount: 14,
  totalConcepts: 22,
  areasToReinforceCount: 3,
  todayReviewsCount: 2,
};

export const initialInstitutionalDocuments: Document[] = [
  {
    id: 'doc-minume-manual',
    title: 'Manual del Delegado MINUME XVII',
    subtitle: 'Reglamento Parlamentario Oficial, Protocolo de Sala y Redacción Resolutiva',
    scope: 'INSTITUTIONAL',
    program: 'MINUME XVII',
    version: 'Edición Oficial 2026.1',
    pagesCount: 64,
    verifiedOfficial: true,
    updatedAt: '15 Oct 2026',
    authorOrEntity: 'Mesa Directiva Central & Secretaría General MINUME',
    description: 'Guía canónica de procedimiento parlamentario, mociones de precedencia, derecho a réplica y normativa resolutiva del Modelo Internacional de las Naciones Unidas del Ministerio de Educación.',
    fileType: 'pdf',
    tags: ['Reglamento', 'Procedimiento', 'Quórum', 'Mociones', 'Resoluciones'],
    sections: [
      {
        id: 'sec-minume-4-1',
        numberStr: '4.1',
        chapterTitle: 'Capítulo IV · Procedimiento Parlamentario en Sala',
        title: 'Apertura de la Sesión, Llamado a Lista y Quórum',
        pageRange: 'Págs. 14–17',
        summary: 'Establece los criterios para declarar formalmente abierta la sesión, el registro de delegaciones (Presente vs. Presente y Votando) y el cálculo de mayorías simples y calificadas.',
        keyTakeaway: 'Una delegación registrada como "Presente y Votando" renuncia explícitamente al derecho a abstenerse en resoluciones sustantivas.',
        conceptIds: ['c-quorum', 'c-present-and-voting'],
        content: `4.1 APERTURA DE LA SESIÓN Y QUÓRUM REGLAMENTARIO
El Presidente de la Mesa abrirá formalmente cada sesión de trabajo una vez comprobado que se encuentra presente en la sala el quórum reglamentario correspondiente a un tercio (1/3) de las delegaciones acreditadas para deliberar, o la mayoría absoluta (la mitad más uno) de las delegaciones para someter a votación cualquier cuestión sustantiva.

Durante el llamado a lista al inicio de cada jornada, cada Estado Miembro responderá indicando su estatus:
a) "Presente": Permite al delegado votar a favor, en contra o abstenerse en la votación final de proyectos de resolución.
b) "Presente y Votando": La delegación asume un compromiso irrevocable con el debate, quedando expresamente inhabilitada para emitir votos de abstención en resoluciones sustantivas.`,
      },
      {
        id: 'sec-minume-4-2',
        numberStr: '4.2',
        chapterTitle: 'Capítulo IV · Procedimiento Parlamentario en Sala',
        title: 'Mociones de Procedimiento y Orden de Precedencia',
        pageRange: 'Págs. 18–20',
        summary: 'Catálogo jerárquico inalterable de las mociones parlamentarias, su prelación ante la Mesa y la prohibición estricta de interrupciones mientras un orador se encuentra en tribuna.',
        keyTakeaway: 'La Moción de Suspensión de la Sesión posee estricta precedencia jerárquica sobre la Moción de Cuestión Previa.',
        conceptIds: ['c-cuestion-previa', 'c-precedencia-mociones', 'c-suspension-sesion'],
        content: `4.2 ORDEN INALTERABLE DE PRECEDENCIA DE MOCIONES
Cuando dos o más mociones concurran simultáneamente ante la presidencia, la Mesa someterá a consideración inmediata la de mayor jerarquía procesal, siguiendo el orden estricto de precedencia contemplado en la siguiente tabla reglamentaria:

1. Moción de Suspensión de la Sesión (para recesos informales o consultas de caucus): No es debatible y se vota de forma inmediata sin permitir discusión.
2. Moción de Cierre de la Sesión (levantamiento definitivo de la jornada del día): Requiere aprobación por mayoría simple.
3. Moción de Aplazamiento del Debate (posposición indefinida del tópico): Admite hasta dos oradores a favor y dos en contra antes del voto.
4. Moción de Cuestión Previa (cierre anticipado del debate para votar inmediatamente el proyecto de resolución): Únicamente admisible si se han agotado al menos dos oradores en la lista general.
5. Moción de Enmienda a la Agenda de Trabajo.

REGLA CRÍTICA DE COMISIÓN: La Moción de Cuestión Previa nunca tiene prelación sobre la Moción de Suspensión o Cierre de la Sesión. Si un delegado propone una cuestión previa y simultáneamente otro propone la suspensión para consultas, la Mesa someterá en primer término la suspensión.`,
      },
      {
        id: 'sec-minume-4-3',
        numberStr: '4.3',
        chapterTitle: 'Capítulo IV · Procedimiento Parlamentario en Sala',
        title: 'Derecho a Réplica y Puntos Parlamentarios',
        pageRange: 'Págs. 21–24',
        summary: 'Diferenciación estricta entre el Punto de Orden, Punto de Privilegio Personal, Punto de Información Parlamentaria y la concesión extraordinaria de Derecho a Réplica.',
        keyTakeaway: 'El Derecho a Réplica no procede ante desacuerdos políticos o doctrinales, sino exclusivamente ante injurias graves directas a la dignidad y soberanía nacional.',
        conceptIds: ['c-derecho-replica', 'c-punto-orden', 'c-privilegio-personal'],
        content: `4.3 DERECHO A RÉPLICA Y PUNTOS DE SALA
El Derecho a Réplica es una prerrogativa extraordinaria concedida a discreción exclusiva de la Presidencia. 
Solo se otorgará cuando un delegado considere que la soberanía, integridad, dignidad o persona del Jefe de Estado de su nación ha sido directamente agraviada o injuriada por otro orador en tribuna.

No procede Derecho a Réplica para:
a) Rebatir argumentos técnicos, estadísticos o políticos sobre el fondo del tópico.
b) Corregir interpretaciones jurídicas de tratados internacionales.
c) Contradecir el voto emitido por otra delegación.

El Punto de Orden se utiliza para alertar a la Presidencia sobre una infracción manifiesta del reglamento en el desarrollo del debate, y no puede interrumpir el discurso de un orador salvo vicio flagrante de sala.`,
      },
      {
        id: 'sec-minume-5-1',
        numberStr: '5.1',
        chapterTitle: 'Capítulo V · Instrumentos Resolutivos y Negociación',
        title: 'Hojas de Trabajo, Enmiendas y Proyectos de Resolución',
        pageRange: 'Págs. 30–35',
        summary: 'Requisitos de firmas de patrocinadores y signatarios, proceso de aprobación de cláusulas preambulares y operativas, e introducción de enmiendas amistosas y no amistosas.',
        keyTakeaway: 'Un Estado Signatario no compromete su voto a favor de la resolución; solo manifiesta su interés en que el documento sea sometido a debate.',
        conceptIds: ['c-patrocinadores-signatarios', 'c-enmiendas-amistosas', 'c-clausulas-operativas'],
        content: `5.1 GESTIÓN DE PROYECTOS DE RESOLUCIÓN
Todo Proyecto de Resolución presentado ante la Mesa Directiva debe contar con el respaldo formal de:
- Al menos dos (2) Patrocinadores (Sponsors), quienes redactan y defienden íntegramente el articulado.
- Un número mínimo de Signatarios (Signatories) equivalente al 20% de las delegaciones presentes en la comisión.

DISTINCIÓN JURÍDICA CLAVE: La condición de "Signatario" no obliga bajo ninguna circunstancia a la delegación a votar favorablemente por el proyecto en la votación final; únicamente certifica que considera el texto lo suficientemente maduro para su discusión formal en el pleno.`,
      },
    ],
  },
  {
    id: 'doc-cnd-reglamento',
    title: 'Reglamento Oficial del Campeonato Nacional de Debates (CND)',
    subtitle: 'Normativa Técnica, Formato Parlamentario Británico / WSDC y Criterios de Jueces',
    scope: 'INSTITUTIONAL',
    program: 'CND Debate',
    version: 'Temporada Nacional 2026',
    pagesCount: 48,
    verifiedOfficial: true,
    updatedAt: '02 Oct 2026',
    authorOrEntity: 'Dirección de Participación y Liderazgo Estudiantil (PLERD)',
    description: 'Bases reglamentarias para las rondas regionales y la Gran Final Nacional de Debates del MINERD. Especifica roles por bancada, refutación cruzada, adjudicación y puntos de información.',
    fileType: 'pdf',
    tags: ['Debate', 'Argumentación', 'POIs', 'Adjudicación', 'WSDC'],
    sections: [
      {
        id: 'sec-cnd-2-1',
        numberStr: '2.1',
        chapterTitle: 'Capítulo II · Dinámica del Enfrentamiento y Discursos',
        title: 'Estructura de Discursos y Tiempos Parlamentarios',
        pageRange: 'Págs. 11–15',
        summary: 'Distribución cronométrica de los turnos de Primer Ministro, Líder de Oposición, Diputados, Látigos y Réplicas.',
        keyTakeaway: 'El primer y último minuto de cada discurso de fondo son tiempos protegidos donde no se admiten Puntos de Información.',
        conceptIds: ['c-tiempos-protegidos', 'c-rol-latigo'],
        content: `2.1 DISTRIBUCIÓN TEMPORAL Y TIEMPOS PROTEGIDOS
Cada orador principal dispondrá de un tiempo reglamentario de siete (7) minutos. El primer minuto y el último minuto constituyen "Tiempo Protegido", indicado por un solo golpe de mazo de la Mesa de Jueces. 
Durante este lapso, ningún debatiente del equipo contrario podrá solicitar Puntos de Información (POIs).

Entre el minuto 1:00 y el minuto 6:00, el tiempo es abierto y la bancada contraria podrá formular intervenciones breves de no más de 15 segundos previa concesión del orador.`,
      },
      {
        id: 'sec-cnd-3-1',
        numberStr: '3.1',
        chapterTitle: 'Capítulo III · Intervenciones Directas',
        title: 'Puntos de Información (POIs): Admisión y Rechazo Estratégico',
        pageRange: 'Págs. 18–22',
        summary: 'Directrices éticas y estratégicas para solicitar, responder y desestimar interpelaciones cruzadas sin incurrir en penalizaciones por evasión.',
        keyTakeaway: 'Rechazar sistemáticamente todos los POIs durante un discurso debilita el puntaje de Estrategia en la rúbrica del juez.',
        conceptIds: ['c-puntos-informacion', 'c-estrategia-adjudicacion'],
        content: `3.1 GESTIÓN REGLAMENTARIA DE PUNTOS DE INFORMACIÓN
La solicitud de un Punto de Información debe realizarse de pie, pronunciando únicamente la fórmula: "Punto de Información", "Sobre ese punto" o formulando el ademán reglamentario. Queda terminantemente prohibido solapar argumentos durante la solicitud antes de que el orador conceda la palabra.

RECOMENDACIÓN DE RÚBRICA CND: Se espera que todo orador acepte al menos uno (1) y no más de dos (2) Puntos de Información durante su discurso de 7 minutos. Negarse a otorgar la palabra a lo largo de todo el tiempo no protegido será penalizado por el panel de jueces en el rubro de "Interacción y Estrategia Dinámica".`,
      },
      {
        id: 'sec-cnd-4-2',
        numberStr: '4.2',
        chapterTitle: 'Capítulo IV · Sistema de Evaluación de Jueces',
        title: 'Rúbrica de Adjudicación: Fondo, Forma y Estrategia',
        pageRange: 'Págs. 28–33',
        summary: 'Ponderación porcentual de la argumentación lógica (40%), oratoria persuasiva (30%) y priorización de choques de debate (30%).',
        keyTakeaway: 'La adjudicación penaliza las falacias de hombre de paja y premia el principio de caridad interpretativa con el argumento rival.',
        conceptIds: ['c-rubrica-adjudicacion', 'c-choque-argumental'],
        content: `4.2 DESGLOSE DE CRITERIOS DE ADJUDICACIÓN CND
El panel de jueces emitirá su veredicto fundamentándose en tres pilares objetivos:
a) Contenido y Razonamiento Lógico (40%): Carga de la prueba, solidez empírica, relevancia y cadenas causales completas (Afirmación, Razonamiento, Evidencia, Impacto - AREI).
b) Forma y Comunicación Persuasiva (30%): Lenguaje corporal, modulación vocal, asertividad, manejo de tiempos y respeto parlamentario.
c) Estrategia y Cumplimiento del Rol (30%): Identificación de los puntos de choque neurálgicos de la moción, gestión de POIs y respuesta a los argumentos de mayor peso del contrincante.`,
      },
    ],
  },
  {
    id: 'doc-clit-guia',
    title: 'Guía Construyendo Liderazgo Trascendente (CLIT)',
    subtitle: 'Marco de Competencias Socioemocionales, Negociación de Harvard y Ciudadanía Democrática',
    scope: 'INSTITUTIONAL',
    program: 'CLIT',
    version: 'Fase Formativa 2026',
    pagesCount: 52,
    verifiedOfficial: true,
    updatedAt: '28 Sep 2026',
    authorOrEntity: 'Unidad de Liderazgo Estudiantil · MINERD',
    description: 'Documento metodológico para el desarrollo de liderazgos juveniles transformacionales, diálogo empático, resolución pacífica de controversias y consenso en asambleas estudiantiles.',
    fileType: 'pdf',
    tags: ['Liderazgo', 'Negociación', 'Consenso', 'Valores', 'Ética'],
    sections: [
      {
        id: 'sec-clit-1-2',
        numberStr: '1.2',
        chapterTitle: 'Módulo I · Paradigmas del Liderazgo Escolar',
        title: 'Liderazgo Servidor y Negociación Basada en Principios',
        pageRange: 'Págs. 12–16',
        summary: 'El método del Proyecto de Negociación de Harvard aplicado a comisiones de delegados: separar a las personas del problema y concentrarse en intereses, no en posiciones.',
        keyTakeaway: 'Un buen delegado negocia sobre intereses fundamentales compartidos y no se atrinchera en posturas cerradas de bloqueo.',
        conceptIds: ['c-intereses-vs-posiciones', 'c-liderazgo-servidor'],
        content: `1.2 EL MÉTODO DE NEGOCIACIÓN BASADA EN PRINCIPIOS
En los debates estudiantiles del PLERD, el éxito negociador no radica en imponer una postura por desgaste o superioridad numérica, sino en aplicar los cuatro postulados de la Escuela de Harvard:
1. Separar a las personas del problema: Tratar a los colegas delegados con absoluta cortesía empática y a los dilemas sustantivos con rigor técnico.
2. Enfocarse en intereses, no en posiciones: Una posición es lo que un país declara querer ("Queremos el embargo inmediato"); un interés es la necesidad subyacente real ("Garantizar la seguridad alimentaria en la frontera").
3. Generar opciones de mutuo beneficio antes de decidir.
4. Insistir en criterios objetivos e independientes de justicia y legalidad.`,
      },
      {
        id: 'sec-clit-2-3',
        numberStr: '2.3',
        chapterTitle: 'Módulo II · Dinámicas de Consenso en Asambleas',
        title: 'Resolución de Conflictos en Comisiones Multilaterales',
        pageRange: 'Págs. 22–27',
        summary: 'Técnicas de mediación y mediación activa cuando un bloque parlamentario se encuentra en parálisis resolutiva.',
        keyTakeaway: 'El caucus no moderado es el espacio idóneo para redactar cláusulas de compromiso puente entre bloques antagónicos.',
        conceptIds: ['c-resolucion-conflictos', 'c-mediacion-caucus'],
        content: `2.3 SUPERACIÓN DEL BLOQUEO EN MESAS DE NEGOCIACIÓN
Cuando una comisión experimenta una polarización irreconciliable que impide el avance del quórum, los líderes estudiantiles aplicarán el protocolo de mediación escalonada:
- Identificar los mínimos comunes no negociables de ambos bloques.
- Redactar cláusulas alternativas que incorporen salvaguardas recíprocas.
- Utilizar el espacio del caucus informal para el acercamiento de los patrocinadores principales sin la presión de la transcripción oficial.`,
      },
    ],
  },
];

export const initialPersonalDocuments: Document[] = [
  {
    id: 'doc-personal-rd-pnud',
    title: 'Apuntes de Postura Nacional · República Dominicana (PNUD)',
    subtitle: 'Marco Político Estratégico para la Transición Energética Justa y Alianzas Caribeñas',
    scope: 'PERSONAL',
    program: 'MINUME XVII',
    version: 'Borrador de Trabajo v3.2',
    pagesCount: 14,
    verifiedOfficial: false,
    updatedAt: 'Hoy, 09:15 AM',
    authorOrEntity: 'Delegado Alejandro Morales (Apunte Privado)',
    description: 'Notas personales con datos estadísticos del Ministerio de Energía y Minas, postura sobre financiamiento verde no reembolsable y borradores de cláusulas operativas para el bloque de Pequeños Estados Insulares (SIDS).',
    fileType: 'drive',
    fileUrl: 'https://docs.google.com/document/d/1A2B3C4D5E6F7G8H9_MINUME_RD_PNUD_v3/edit',
    tags: ['PNUD', 'República Dominicana', 'Energía', 'Financiamiento', 'Apuntes Privados'],
    sections: [
      {
        id: 'sec-personal-1',
        numberStr: 'P.1',
        title: 'Líneas Rojas Diplomáticas de la Delegación Dominicana',
        pageRange: 'Págs. 1–4',
        summary: 'Defensa irrevocable de la soberanía energética y oposición a condicionamientos macroeconómicos en fondos verdes.',
        keyTakeaway: 'República Dominicana prioriza fondos no reembolsables para adaptación climática insular.',
        conceptIds: ['c-intereses-vs-posiciones'],
        content: `POSTURA NACIONAL - REPÚBLICA DOMINICANA (COMISIÓN PNUD)
1. Eje Central: Transición energética con justicia socioeconómica. No podemos aceptar metas de descarbonización sin financiamiento concesional directo para economías insulares altamente vulnerables a huracanes.
2. Posibles Aliados en Sala: Delegaciones de Barbados (Iniciativa Bridgetown), Costa Rica, Chile y Jamaica.
3. Línea Roja: Rechazar cualquier cláusula que imponga aranceles al carbono sobre exportaciones agropecuarias del Caribe sin transferencia tecnológica previa.`,
      },
      {
        id: 'sec-personal-2',
        numberStr: 'P.2',
        title: 'Argumentario para el Discurso de Apertura (Lista de Oradores)',
        pageRange: 'Págs. 5–7',
        summary: 'Estructura de 90 segundos con gancho impactante sobre el sargazo y la vulnerabilidad costera.',
        conceptIds: ['c-tiempos-protegidos'],
        content: `BORRADOR DISCURSO GENERAL (90 SEGUNDOS)
"Distinguida Mesa Presidencial, honorables delegados:
Mientras deliberamos en este recinto, las costas de nuestra Quisqueya y de todo el Gran Caribe reciben toneladas de sargazo y sufren el embate de tormentas que no respetan fronteras ni tratados.
República Dominicana no viene a solicitar limosnas climáticas; viene a demandar la materialización efectiva de los fondos de pérdidas y daños acordados por la comunidad internacional..."`,
      },
    ],
  },
  {
    id: 'doc-personal-argumentario-debate',
    title: 'Ficha de Refutación Cruzada y Choques CND',
    subtitle: 'Esquemas AREI para Mociones Económicas y Puntos de Información Preparados',
    scope: 'PERSONAL',
    program: 'CND Debate',
    version: 'Notas de Práctica',
    pagesCount: 8,
    verifiedOfficial: false,
    updatedAt: 'Ayer, 04:30 PM',
    authorOrEntity: 'Alejandro Morales (Privado)',
    description: 'Modelos de anticipación a contra-argumentos de la bancada de oposición sobre regulación de plataformas digitales y soberanía de datos.',
    fileType: 'doc',
    tags: ['Debate', 'POIs', 'Refutación', 'Economía'],
    sections: [
      {
        id: 'sec-personal-deb-1',
        numberStr: 'D.1',
        title: 'Banco de POIs de 15 Segundos para Tópico Tecnológico',
        pageRange: 'Págs. 1–3',
        summary: 'Preguntas trampa preparadas para desarticular la premisa de libertad absoluta de mercado digital.',
        conceptIds: ['c-puntos-informacion'],
        content: `BANCO DE PREGUNTAS DIRECTAS (POIs):
- "¿Reconoce la bancada de gobierno que el 72% de la infraestructura de cables submarinos en nuestra región depende de oligopolios privados sin auditoría pública nacional?"
- "Si su modelo garantiza la libre competencia, ¿por qué los tres mayores conglomerados absorben el 94% de los ingresos publicitarios escolares?"`,
      },
    ],
  },
];

export const initialConceptDiagnostics: Record<string, ConceptDiagnostic> = {
  'c-cuestion-previa': {
    conceptId: 'c-cuestion-previa',
    name: 'Moción de Cuestión Previa (Cierre de Debate)',
    category: 'Procedimiento Parlamentario MINUME',
    masteryScore: 38,
    confidenceLevel: 'MEDIUM',
    status: 'NEEDS_REINFORCEMENT',
    deltaEvolution: -12,
    spacedRepetitionStep: 1,
    nextReviewDate: 'Hoy, 21 Octubre',
    lastAttemptDate: '20 Oct 2026',
    totalAttempts: 5,
    errorMisconceptionsCount: 3,
    relatedDocumentId: 'doc-minume-manual',
    relatedSectionId: 'sec-minume-4-2',
  },
  'c-precedencia-mociones': {
    conceptId: 'c-precedencia-mociones',
    name: 'Jerarquía y Orden de Precedencia de Mociones',
    category: 'Procedimiento Parlamentario MINUME',
    masteryScore: 44,
    confidenceLevel: 'MEDIUM',
    status: 'NEEDS_REINFORCEMENT',
    deltaEvolution: +6,
    spacedRepetitionStep: 1,
    nextReviewDate: 'Hoy, 21 Octubre',
    lastAttemptDate: '19 Oct 2026',
    totalAttempts: 6,
    errorMisconceptionsCount: 2,
    relatedDocumentId: 'doc-minume-manual',
    relatedSectionId: 'sec-minume-4-2',
  },
  'c-puntos-informacion': {
    conceptId: 'c-puntos-informacion',
    name: 'Gestión Estratégica de Puntos de Información (POIs)',
    category: 'Campeonato Nacional de Debates (CND)',
    masteryScore: 52,
    confidenceLevel: 'MEDIUM',
    status: 'CONSOLIDATING',
    deltaEvolution: +14,
    spacedRepetitionStep: 4,
    nextReviewDate: 'Mañana, 22 Octubre',
    lastAttemptDate: '18 Oct 2026',
    totalAttempts: 4,
    errorMisconceptionsCount: 1,
    relatedDocumentId: 'doc-cnd-reglamento',
    relatedSectionId: 'sec-cnd-3-1',
  },
  'c-derecho-replica': {
    conceptId: 'c-derecho-replica',
    name: 'Derecho a Réplica: Causal y Concesión de Presidencia',
    category: 'Procedimiento Parlamentario MINUME',
    masteryScore: 58,
    confidenceLevel: 'LOW',
    status: 'CONSOLIDATING',
    deltaEvolution: +8,
    spacedRepetitionStep: 4,
    nextReviewDate: 'En 3 días (24 Oct)',
    lastAttemptDate: '17 Oct 2026',
    totalAttempts: 3,
    errorMisconceptionsCount: 1,
    relatedDocumentId: 'doc-minume-manual',
    relatedSectionId: 'sec-minume-4-3',
  },
  'c-present-and-voting': {
    conceptId: 'c-present-and-voting',
    name: 'Registro Presente y Votando (Inhabilidad de Abstención)',
    category: 'Protocolo de Sala MINUME',
    masteryScore: 92,
    confidenceLevel: 'HIGH',
    status: 'MASTERED',
    deltaEvolution: +18,
    spacedRepetitionStep: 14,
    nextReviewDate: 'En 12 días (02 Nov)',
    lastAttemptDate: '19 Oct 2026',
    totalAttempts: 7,
    errorMisconceptionsCount: 0,
    relatedDocumentId: 'doc-minume-manual',
    relatedSectionId: 'sec-minume-4-1',
  },
  'c-patrocinadores-signatarios': {
    conceptId: 'c-patrocinadores-signatarios',
    name: 'Patrocinadores vs. Signatarios en Resoluciones',
    category: 'Instrumentos Resolutivos MINUME',
    masteryScore: 88,
    confidenceLevel: 'HIGH',
    status: 'MASTERED',
    deltaEvolution: +24,
    spacedRepetitionStep: 14,
    nextReviewDate: 'En 10 días (31 Oct)',
    lastAttemptDate: '16 Oct 2026',
    totalAttempts: 5,
    errorMisconceptionsCount: 0,
    relatedDocumentId: 'doc-minume-manual',
    relatedSectionId: 'sec-minume-5-1',
  },
  'c-intereses-vs-posiciones': {
    conceptId: 'c-intereses-vs-posiciones',
    name: 'Método Harvard: Intereses Subyacentes vs. Posiciones',
    category: 'Liderazgo y Negociación CLIT',
    masteryScore: 84,
    confidenceLevel: 'HIGH',
    status: 'MASTERED',
    deltaEvolution: +15,
    spacedRepetitionStep: 30,
    nextReviewDate: 'En 26 días (16 Nov)',
    lastAttemptDate: '15 Oct 2026',
    totalAttempts: 6,
    errorMisconceptionsCount: 0,
    relatedDocumentId: 'doc-clit-guia',
    relatedSectionId: 'sec-clit-1-2',
  },
  'c-tiempos-protegidos': {
    conceptId: 'c-tiempos-protegidos',
    name: 'Tiempos Protegidos en Discursos Parlamentarios',
    category: 'Reglamento Técnico CND',
    masteryScore: 90,
    confidenceLevel: 'HIGH',
    status: 'MASTERED',
    deltaEvolution: +10,
    spacedRepetitionStep: 30,
    nextReviewDate: 'En 28 días (18 Nov)',
    lastAttemptDate: '14 Oct 2026',
    totalAttempts: 4,
    errorMisconceptionsCount: 0,
    relatedDocumentId: 'doc-cnd-reglamento',
    relatedSectionId: 'sec-cnd-2-1',
  },
};

export const initialEvidenceRecommendations: EvidenceRecommendation[] = [
  {
    id: 'rec-1',
    conceptId: 'c-cuestion-previa',
    conceptName: 'Moción de Cuestión Previa vs. Suspensión de Sesión',
    indexNumber: '01',
    status: 'NEEDS_REINFORCEMENT',
    masteryScore: 38,
    confidenceLevel: 'MEDIUM',
    historyEvidence:
      'En las evaluaciones del 18 y 20 de octubre confundiste su prelación frente a la suspensión de la sesión (2 errores conceptuales registrados al asumir erróneamente que el cierre de debate prevalece sobre una moción de receso informal).',
    prescribedSource: {
      documentId: 'doc-minume-manual',
      documentTitle: 'Manual del Delegado MINUME XVII',
      chapterStr: 'Capítulo IV · Procedimiento Parlamentario',
      sectionId: 'sec-minume-4-2',
      sectionNumber: '4.2',
      sectionTitle: 'Mociones de Procedimiento y Orden de Precedencia',
      pages: 'Págs. 18–20',
    },
    focusGuidance:
      'Al leer la página 19, presta atención a la tabla de orden de precedencia de las mociones parlamentarias: nota que la Moción de Suspensión ocupa el puesto número 1 y no admite debate previo a su votación.',
    actionLabels: {
      openSection: 'Abrir sección 4.2 en Biblioteca',
      reevaluate: 'Reevaluar concepto (3 preguntas)',
    },
  },
  {
    id: 'rec-2',
    conceptId: 'c-derecho-replica',
    conceptName: 'Derecho a Réplica: Injurias Personales vs. Desacuerdos Políticos',
    indexNumber: '02',
    status: 'CONSOLIDATING',
    masteryScore: 58,
    confidenceLevel: 'LOW',
    historyEvidence:
      'En la sesión práctica del 17 de octubre solicitaste réplica ante una crítica legítima de la delegación de Francia a la política de tarifas insulares. La Mesa te señaló que la réplica no ampara divergencias doctrinales.',
    prescribedSource: {
      documentId: 'doc-minume-manual',
      documentTitle: 'Manual del Delegado MINUME XVII',
      chapterStr: 'Capítulo IV · Procedimiento Parlamentario',
      sectionId: 'sec-minume-4-3',
      sectionNumber: '4.3',
      sectionTitle: 'Derecho a Réplica y Puntos Parlamentarios',
      pages: 'Págs. 21–24',
    },
    focusGuidance:
      'Repasa los tres supuestos taxativos de la página 22: únicamente agravios a la soberanía, integridad territorial o dignidad del Jefe de Estado justifican la concesión por parte de la Presidencia.',
    actionLabels: {
      openSection: 'Abrir sección 4.3 en Biblioteca',
      reevaluate: 'Reevaluar Derecho a Réplica',
    },
  },
  {
    id: 'rec-3',
    conceptId: 'c-puntos-informacion',
    conceptName: 'Puntos de Información (POIs): Reglas de Admisión y Rúbrica de Jueces',
    indexNumber: '03',
    status: 'CONSOLIDATING',
    masteryScore: 52,
    confidenceLevel: 'MEDIUM',
    historyEvidence:
      'En el simulacro CND del 18 de octubre rechazaste 4 POIs consecutivos durante los minutos 2:00 a 5:30. El panel de jueces penalizó el criterio de Estrategia por evasión deliberada del choque.',
    prescribedSource: {
      documentId: 'doc-cnd-reglamento',
      documentTitle: 'Reglamento Oficial del Campeonato Nacional de Debates (CND)',
      chapterStr: 'Capítulo III · Intervenciones Directas',
      sectionId: 'sec-cnd-3-1',
      sectionNumber: '3.1',
      sectionTitle: 'Puntos de Información (POIs): Admisión y Rechazo Estratégico',
      pages: 'Págs. 18–22',
    },
    focusGuidance:
      'Observa la directriz de adjudicación de la página 20: se exige aceptar entre 1 y 2 POIs para evidenciar solvencia argumentativa frente a la interpelación contraria.',
    actionLabels: {
      openSection: 'Abrir sección 3.1 en Biblioteca',
      reevaluate: 'Reevaluar Estrategia de POIs',
    },
  },
];

export const initialSpacedReviews: SpacedReviewItem[] = [
  {
    id: 'sr-1',
    conceptId: 'c-cuestion-previa',
    conceptName: 'Moción de Cuestión Previa y Precedencia',
    documentName: 'Manual del Delegado MINUME XVII',
    sectionNumber: 'Sec. 4.2',
    currentStep: 1,
    dueDate: 'Hoy',
    dueStatus: 'TODAY',
    estimatedMinutes: 4,
    masteryScore: 38,
  },
  {
    id: 'sr-2',
    conceptId: 'c-precedencia-mociones',
    conceptName: 'Jerarquía Procesal de Mociones de Sala',
    documentName: 'Manual del Delegado MINUME XVII',
    sectionNumber: 'Sec. 4.2',
    currentStep: 1,
    dueDate: 'Hoy',
    dueStatus: 'TODAY',
    estimatedMinutes: 5,
    masteryScore: 44,
  },
  {
    id: 'sr-3',
    conceptId: 'c-puntos-informacion',
    conceptName: 'Gestión Estratégica de POIs en CND',
    documentName: 'Reglamento Oficial CND',
    sectionNumber: 'Sec. 3.1',
    currentStep: 4,
    dueDate: 'Mañana (22 Oct)',
    dueStatus: 'UPCOMING',
    estimatedMinutes: 6,
    masteryScore: 52,
  },
  {
    id: 'sr-4',
    conceptId: 'c-derecho-replica',
    conceptName: 'Causales de Derecho a Réplica',
    documentName: 'Manual del Delegado MINUME XVII',
    sectionNumber: 'Sec. 4.3',
    currentStep: 4,
    dueDate: 'En 3 días (24 Oct)',
    dueStatus: 'UPCOMING',
    estimatedMinutes: 5,
    masteryScore: 58,
  },
  {
    id: 'sr-5',
    conceptId: 'c-present-and-voting',
    conceptName: 'Estatus Presente y Votando',
    documentName: 'Manual del Delegado MINUME XVII',
    sectionNumber: 'Sec. 4.1',
    currentStep: 14,
    dueDate: 'En 12 días (02 Nov)',
    dueStatus: 'UPCOMING',
    estimatedMinutes: 3,
    masteryScore: 92,
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Diagnóstico Actualizado por Evidencia',
    description: 'Se detectó confusión recurrente en la precedencia de la Moción de Cuestión Previa. Revisa la recomendación prioritaria prescrita.',
    timestamp: 'Hace 2 horas',
    type: 'RECOMMENDATION',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Ciclo de Repetición Espaciada Vencido',
    description: 'Tienes 2 conceptos prioritarios en Escalón 1d programados para repasar hoy antes de la sesión de comisión.',
    timestamp: 'Hoy, 08:00 AM',
    type: 'SPACED_REVIEW',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Nuevo Documento Institucional Publicado',
    description: 'La Mesa Directiva del PLERD publicó la Edición 2026.1 del Manual del Delegado MINUME XVII con fe de erratas.',
    timestamp: 'Ayer',
    type: 'INSTITUTIONAL',
    read: true,
  },
];
