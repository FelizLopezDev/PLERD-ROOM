/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Source {
  id: string;
  title: string;
  type: 'file' | 'text' | 'link';
  content: string;
}

export interface Question {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctIndex: number;
  concept: string;
  sourceId: string;
  section: string;
}

export interface ExamResult {
  id: string;
  date: string; // ISO
  total: number;
  correct: number;
  answers: number[];
  missedConcepts: string[];
}

export interface Notebook {
  id: string;
  title: string;
  program?: 'MINUME XVII' | 'CND Debate' | 'CLIT';
  scope: 'general' | 'personal';
  sources: Source[];
  exams: ExamResult[];
}

export type View =
  | { name: 'library' }
  | { name: 'notebook'; id: string }
  | { name: 'exam'; id: string }
  | { name: 'results'; id: string; examId: string };
