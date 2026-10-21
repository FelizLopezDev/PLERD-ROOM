/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DocumentScope = 'INSTITUTIONAL' | 'PERSONAL';

export type ProgramType = 'MINUME XVII' | 'CND Debate' | 'CLIT' | 'Normativa General';

export type FileSourceType = 'pdf' | 'doc' | 'drive' | 'text';

export type ConfidenceLevel = 'INSUFFICIENT' | 'LOW' | 'MEDIUM' | 'HIGH';

export type ConceptStatus = 'MASTERED' | 'CONSOLIDATING' | 'NEEDS_REINFORCEMENT' | 'NO_EVIDENCE';

export type SpacedRepetitionStep = 1 | 4 | 14 | 30;

export interface Section {
  id: string;
  numberStr: string; // e.g., '01', '02', '4.1', '4.2'
  chapterTitle?: string;
  title: string;
  pageRange: string; // e.g., 'Págs. 18–20'
  summary: string;
  content: string;
  conceptIds: string[];
  keyTakeaway?: string;
}

export interface Document {
  id: string;
  title: string;
  subtitle: string;
  scope: DocumentScope;
  program: ProgramType;
  version: string;
  pagesCount: number;
  verifiedOfficial: boolean;
  updatedAt: string;
  sections: Section[];
  fileUrl?: string;
  fileType: FileSourceType;
  tags: string[];
  description: string;
  authorOrEntity: string;
}

export interface ConceptDiagnostic {
  conceptId: string;
  name: string;
  category: string;
  masteryScore: number; // 0 - 100
  confidenceLevel: ConfidenceLevel;
  status: ConceptStatus;
  deltaEvolution: number; // e.g. +34, -8
  spacedRepetitionStep: SpacedRepetitionStep;
  nextReviewDate: string;
  lastAttemptDate: string;
  totalAttempts: number;
  errorMisconceptionsCount: number;
  relatedDocumentId: string;
  relatedSectionId: string;
}

export interface PrescribedSource {
  documentId: string;
  documentTitle: string;
  chapterStr: string;
  sectionId: string;
  sectionNumber: string;
  sectionTitle: string;
  pages: string;
}

export interface EvidenceRecommendation {
  id: string;
  conceptId: string;
  conceptName: string;
  indexNumber: string; // '01', '02', '03'
  status: 'NEEDS_REINFORCEMENT' | 'CONSOLIDATING';
  masteryScore: number;
  confidenceLevel: ConfidenceLevel;
  historyEvidence: string;
  prescribedSource: PrescribedSource;
  focusGuidance: string;
  actionLabels: {
    openSection: string;
    reevaluate: string;
  };
}

export interface SpacedReviewItem {
  id: string;
  conceptId: string;
  conceptName: string;
  documentName: string;
  sectionNumber: string;
  currentStep: SpacedRepetitionStep;
  dueDate: string;
  dueStatus: 'TODAY' | 'UPCOMING' | 'OVERDUE';
  estimatedMinutes: number;
  masteryScore: number;
}

export interface DelegateProfile {
  name: string;
  role: string;
  country: string;
  committee: string;
  event: string;
  roomCode: string;
  institution: string;
  overallMastery: number;
  masteredCount: number;
  totalConcepts: number;
  areasToReinforceCount: number;
  todayReviewsCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'EVALUATION' | 'SPACED_REVIEW' | 'INSTITUTIONAL' | 'RECOMMENDATION';
  read: boolean;
  actionLink?: string;
}

export type ViewTab = 'dashboard' | 'library' | 'study_table' | 'evaluations' | 'diagnostics';
export type UserRole = 'DELEGATE' | 'COORDINATOR';
