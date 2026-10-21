/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notebook, Source, ExamResult, View, ChatMessage } from '../types';
import { initialNotebooks } from '../data/seed';

const STORAGE_PERSONAL_KEY = 'plerd_personal_v2';
const STORAGE_EXAMS_KEY = 'plerd_exams_v1';

interface AppContextType {
  notebooks: Notebook[];
  view: View;
  go: (view: View) => void;
  createNotebook: (title: string) => void;
  deleteNotebook: (notebookId: string) => void;
  addSource: (notebookId: string, source: Omit<Source, 'id'>) => string | undefined;
  removeSource: (notebookId: string, sourceId: string) => void;
  saveExamResult: (notebookId: string, result: Omit<ExamResult, 'id'>) => void;
  chatHistories: Record<string, ChatMessage[]>;
  setNotebookChat: (notebookId: string, messages: ChatMessage[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personalNotebooks, setPersonalNotebooks] = useState<Notebook[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PERSONAL_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((nb: Notebook) => nb.scope === 'personal');
        }
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Exámenes de TODOS los cuadernos (generales y personales) persistidos en plerd_exams_v1
  const [examsByNotebook, setExamsByNotebook] = useState<Record<string, ExamResult[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EXAMS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return {};
  });

  const [view, setView] = useState<View>({ name: 'library' });
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});

  // Guardar cuadernos personales
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PERSONAL_KEY, JSON.stringify(personalNotebooks));
    } catch {
      // Ignore
    }
  }, [personalNotebooks]);

  // Guardar exámenes de todos los cuadernos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EXAMS_KEY, JSON.stringify(examsByNotebook));
    } catch {
      // Ignore
    }
  }, [examsByNotebook]);

  // Fusionar cuadernos con sus respectivos exámenes persistidos (sin mutar initialNotebooks)
  const notebooks: Notebook[] = [
    ...initialNotebooks.map((nb) => ({
      ...nb,
      exams: examsByNotebook[nb.id] || [],
    })),
    ...personalNotebooks.map((nb) => ({
      ...nb,
      exams: examsByNotebook[nb.id] || [],
    })),
  ];

  const go = (newView: View) => {
    setView(newView);
  };

  const createNotebook = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newNotebook: Notebook = {
      id: crypto.randomUUID(),
      title: trimmed,
      scope: 'personal',
      sources: [],
      exams: [],
    };
    setPersonalNotebooks((prev) => [newNotebook, ...prev]);
    setView({ name: 'notebook', id: newNotebook.id });
  };

  const deleteNotebook = (notebookId: string) => {
    const target = personalNotebooks.find((nb) => nb.id === notebookId);
    if (!target) return;

    setPersonalNotebooks((prev) => prev.filter((nb) => nb.id !== notebookId));
    setView({ name: 'library' });
  };

  const addSource = (notebookId: string, source: Omit<Source, 'id'>) => {
    const target = notebooks.find((nb) => nb.id === notebookId);
    if (!target || target.scope === 'general') {
      return undefined;
    }

    const newId = crypto.randomUUID();
    const newSource: Source = {
      ...source,
      id: newId,
    };

    setPersonalNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId ? { ...nb, sources: [...nb.sources, newSource] } : nb
      )
    );

    return newId;
  };

  const removeSource = (notebookId: string, sourceId: string) => {
    setPersonalNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId
          ? { ...nb, sources: nb.sources.filter((s) => s.id !== sourceId) }
          : nb
      )
    );
  };

  const saveExamResult = (notebookId: string, result: Omit<ExamResult, 'id'>) => {
    const newResult: ExamResult = {
      ...result,
      id: crypto.randomUUID(),
    };

    setExamsByNotebook((prev) => {
      const currentList = prev[notebookId] || [];
      return {
        ...prev,
        [notebookId]: [newResult, ...currentList],
      };
    });

    setView({ name: 'results', id: notebookId, examId: newResult.id });
  };

  const setNotebookChat = (notebookId: string, messages: ChatMessage[]) => {
    setChatHistories((prev) => ({
      ...prev,
      [notebookId]: messages,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        notebooks,
        view,
        go,
        createNotebook,
        deleteNotebook,
        addSource,
        removeSource,
        saveExamResult,
        chatHistories,
        setNotebookChat,
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
