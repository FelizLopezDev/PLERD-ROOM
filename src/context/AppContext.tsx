/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notebook, Source, ExamResult, View, ChatMessage } from '../types';
import { initialNotebooks } from '../data/seed';

const STORAGE_KEY = 'plerd_personal_v2';

interface AppContextType {
  notebooks: Notebook[];
  view: View;
  go: (view: View) => void;
  createNotebook: (title: string) => void;
  addSource: (notebookId: string, source: Omit<Source, 'id'>) => void;
  saveExamResult: (notebookId: string, result: Omit<ExamResult, 'id'>) => void;
  chatHistories: Record<string, ChatMessage[]>;
  setNotebookChat: (notebookId: string, messages: ChatMessage[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personalNotebooks, setPersonalNotebooks] = useState<Notebook[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
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

  const [view, setView] = useState<View>({ name: 'library' });

  // Historial de chat por cuaderno durante la sesión abierta (en memoria)
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});

  // Guardar en localStorage únicamente los cuadernos personales
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personalNotebooks));
    } catch {
      // Ignore
    }
  }, [personalNotebooks]);

  // Cuadernos generales siempre desde seed + personales guardados
  const notebooks: Notebook[] = [...initialNotebooks, ...personalNotebooks];

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

  const addSource = (notebookId: string, source: Omit<Source, 'id'>) => {
    // addSource ignora cuadernos con scope 'general'
    const target = notebooks.find((nb) => nb.id === notebookId);
    if (!target || target.scope === 'general') {
      return;
    }

    const newSource: Source = {
      ...source,
      id: crypto.randomUUID(),
    };

    setPersonalNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebookId ? { ...nb, sources: [...nb.sources, newSource] } : nb
      )
    );
  };

  const saveExamResult = (notebookId: string, result: Omit<ExamResult, 'id'>) => {
    const newResult: ExamResult = {
      ...result,
      id: crypto.randomUUID(),
    };

    const isPersonal = personalNotebooks.some((nb) => nb.id === notebookId);
    if (isPersonal) {
      setPersonalNotebooks((prev) =>
        prev.map((nb) =>
          nb.id === notebookId ? { ...nb, exams: [newResult, ...nb.exams] } : nb
        )
      );
    } else {
      const generalTarget = initialNotebooks.find((nb) => nb.id === notebookId);
      if (generalTarget) {
        generalTarget.exams = [newResult, ...generalTarget.exams];
      }
    }

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
        addSource,
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
