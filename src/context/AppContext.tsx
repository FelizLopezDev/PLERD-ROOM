/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notebook, Source, ExamResult, View } from '../types';
import { initialNotebooks } from '../data/seed';

const STORAGE_KEY = 'plerd_notebooks_v1';

interface AppContextType {
  notebooks: Notebook[];
  view: View;
  go: (view: View) => void;
  createNotebook: (title: string) => void;
  addSource: (notebookId: string, source: Omit<Source, 'id'>) => void;
  saveExamResult: (notebookId: string, result: Omit<ExamResult, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notebooks, setNotebooks] = useState<Notebook[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return initialNotebooks;
  });

  const [view, setView] = useState<View>({ name: 'library' });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notebooks));
    } catch {
      // Ignore
    }
  }, [notebooks]);

  const go = (newView: View) => {
    setView(newView);
  };

  const createNotebook = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newNotebook: Notebook = {
      id: `nb-${Date.now()}`,
      title: trimmed,
      scope: 'personal',
      sources: [],
      exams: [],
    };
    setNotebooks((prev) => [newNotebook, ...prev]);
    setView({ name: 'notebook', id: newNotebook.id });
  };

  const addSource = (notebookId: string, source: Omit<Source, 'id'>) => {
    const newSource: Source = {
      ...source,
      id: `src-${Date.now()}`,
    };
    setNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId ? { ...nb, sources: [...nb.sources, newSource] } : nb
      )
    );
  };

  const saveExamResult = (notebookId: string, result: Omit<ExamResult, 'id'>) => {
    const newResult: ExamResult = {
      ...result,
      id: `exam-${Date.now()}`,
    };
    setNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId ? { ...nb, exams: [newResult, ...nb.exams] } : nb
      )
    );
    setView({ name: 'results', id: notebookId, examId: newResult.id });
  };

  return (
    <AppContext.Provider
      value={{
        notebooks,
        view,
        go,
        createNotebook,
        addSource,
        saveExamResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
