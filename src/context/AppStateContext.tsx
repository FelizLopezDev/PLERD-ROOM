/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Document,
  Section,
  ConceptDiagnostic,
  EvidenceRecommendation,
  SpacedReviewItem,
  DelegateProfile,
  NotificationItem,
  ViewTab,
  UserRole,
  ProgramType,
  DocumentScope,
} from '../types';
import {
  initialDelegateProfile,
  initialInstitutionalDocuments,
  initialPersonalDocuments,
  initialConceptDiagnostics,
  initialEvidenceRecommendations,
  initialSpacedReviews,
  initialNotifications,
} from '../data/plerdMockData';

interface AppStateContextType {
  currentTab: ViewTab;
  setCurrentTab: (tab: ViewTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'ES' | 'EN';
  setLanguage: (lang: 'ES' | 'EN') => void;
  profile: DelegateProfile;
  institutionalDocs: Document[];
  personalDocs: Document[];
  allDocs: Document[];
  diagnostics: Record<string, ConceptDiagnostic>;
  recommendations: EvidenceRecommendation[];
  spacedReviews: SpacedReviewItem[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;

  // Selected doc / section for cross-view navigation
  selectedDocId: string;
  selectedSectionId: string | null;
  activeHighlightCitation: string | null;
  selectDocAndSection: (docId: string, sectionId?: string | null, targetTab?: ViewTab) => void;

  // Library state
  libraryScope: DocumentScope;
  setLibraryScope: (scope: DocumentScope) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeProgramFilter: string;
  setActiveProgramFilter: (prog: string) => void;

  // Modals & Reevaluation
  activeReevalConceptId: string | null;
  startReevaluation: (conceptId: string) => void;
  closeReevalModal: () => void;
  submitReevalAnswer: (conceptId: string, delta: number, newScore: number) => void;

  isAddPersonalModalOpen: boolean;
  setIsAddPersonalModalOpen: (open: boolean) => void;
  addPersonalDocument: (newDoc: Omit<Document, 'id' | 'scope' | 'updatedAt' | 'verifiedOfficial'>) => void;

  isPublishOfficialModalOpen: boolean;
  setIsPublishOfficialModalOpen: (open: boolean) => void;
  publishOfficialDocument: (newDoc: Omit<Document, 'id' | 'scope' | 'updatedAt' | 'verifiedOfficial'>) => void;

  previewTarget: { doc: Document; section?: Section } | null;
  openDocPreview: (doc: Document, section?: Section) => void;
  closeDocPreview: () => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<ViewTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('DELEGATE');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'ES' | 'EN'>('ES');

  const [profile, setProfile] = useState<DelegateProfile>(initialDelegateProfile);
  const [institutionalDocs, setInstitutionalDocs] = useState<Document[]>(initialInstitutionalDocuments);
  const [personalDocs, setPersonalDocs] = useState<Document[]>(initialPersonalDocuments);
  const [diagnostics, setDiagnostics] = useState<Record<string, ConceptDiagnostic>>(initialConceptDiagnostics);
  const [recommendations, setRecommendations] = useState<EvidenceRecommendation[]>(initialEvidenceRecommendations);
  const [spacedReviews, setSpacedReviews] = useState<SpacedReviewItem[]>(initialSpacedReviews);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const [selectedDocId, setSelectedDocId] = useState<string>('doc-minume-manual');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>('sec-minume-4-2');
  const [activeHighlightCitation, setActiveHighlightCitation] = useState<string | null>(null);

  // Library specific state
  const [libraryScope, setLibraryScope] = useState<DocumentScope>('INSTITUTIONAL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProgramFilter, setActiveProgramFilter] = useState<string>('Todos');

  // Modals
  const [activeReevalConceptId, setActiveReevalConceptId] = useState<string | null>(null);
  const [isAddPersonalModalOpen, setIsAddPersonalModalOpen] = useState<boolean>(false);
  const [isPublishOfficialModalOpen, setIsPublishOfficialModalOpen] = useState<boolean>(false);
  const [previewTarget, setPreviewTarget] = useState<{ doc: Document; section?: Section } | null>(null);

  const allDocs = [...institutionalDocs, ...personalDocs];
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const selectDocAndSection = (docId: string, sectionId?: string | null, targetTab: ViewTab = 'library') => {
    setSelectedDocId(docId);
    setSelectedSectionId(sectionId || null);
    if (sectionId) {
      setActiveHighlightCitation(sectionId);
    }
    // Also adjust libraryScope if needed
    const isPersonal = personalDocs.some((d) => d.id === docId);
    setLibraryScope(isPersonal ? 'PERSONAL' : 'INSTITUTIONAL');
    setCurrentTab(targetTab);
  };

  const startReevaluation = (conceptId: string) => {
    setActiveReevalConceptId(conceptId);
  };

  const closeReevalModal = () => {
    setActiveReevalConceptId(null);
  };

  const submitReevalAnswer = (conceptId: string, delta: number, newScore: number) => {
    setDiagnostics((prev) => {
      const current = prev[conceptId];
      if (!current) return prev;
      const updatedScore = Math.min(100, Math.max(0, newScore));
      const newStatus =
        updatedScore >= 80 ? 'MASTERED' : updatedScore >= 50 ? 'CONSOLIDATING' : 'NEEDS_REINFORCEMENT';
      const newConfidence = updatedScore >= 80 ? 'HIGH' : updatedScore >= 50 ? 'MEDIUM' : 'LOW';

      return {
        ...prev,
        [conceptId]: {
          ...current,
          masteryScore: updatedScore,
          deltaEvolution: delta,
          status: newStatus,
          confidenceLevel: newConfidence,
          lastAttemptDate: 'Hoy (Reevaluación completada)',
          totalAttempts: current.totalAttempts + 1,
        },
      };
    });

    // Update profile metrics
    setProfile((prev) => {
      const newMastered = Object.values(diagnostics).filter(
        (c) => (c.conceptId === conceptId ? newScore >= 80 : c.status === 'MASTERED')
      ).length;
      return {
        ...prev,
        masteredCount: newMastered,
        overallMastery: Math.min(100, Math.round(prev.overallMastery + delta * 0.4)),
      };
    });

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Reevaluación de Concepto Procesada',
      description: `El diagnóstico para "${diagnostics[conceptId]?.name || conceptId}" se actualizó con un resultado de ${newScore}%.`,
      timestamp: 'Hace un momento',
      type: 'EVALUATION',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addPersonalDocument = (
    newDocData: Omit<Document, 'id' | 'scope' | 'updatedAt' | 'verifiedOfficial'>
  ) => {
    const newDoc: Document = {
      ...newDocData,
      id: `doc-personal-${Date.now()}`,
      scope: 'PERSONAL',
      verifiedOfficial: false,
      updatedAt: 'Hace un momento',
    };
    setPersonalDocs((prev) => [newDoc, ...prev]);
    setIsAddPersonalModalOpen(false);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Documento Personal Agregado',
        description: `"${newDoc.title}" fue indexado con éxito en tu Biblioteca Personal protegida.`,
        timestamp: 'Hace un momento',
        type: 'RECOMMENDATION',
        read: false,
      },
      ...prev,
    ]);
  };

  const publishOfficialDocument = (
    newDocData: Omit<Document, 'id' | 'scope' | 'updatedAt' | 'verifiedOfficial'>
  ) => {
    const newDoc: Document = {
      ...newDocData,
      id: `doc-official-${Date.now()}`,
      scope: 'INSTITUTIONAL',
      verifiedOfficial: true,
      updatedAt: 'Publicado hoy por Coordinación PLERD',
    };
    setInstitutionalDocs((prev) => [newDoc, ...prev]);
    setIsPublishOfficialModalOpen(false);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Nuevo Documento Oficial Publicado',
        description: `Coordinación del PLERD publicó "${newDoc.title}" con secciones y conceptos homologados.`,
        timestamp: 'Hace un momento',
        type: 'INSTITUTIONAL',
        read: false,
      },
      ...prev,
    ]);
  };

  const openDocPreview = (doc: Document, section?: Section) => {
    setPreviewTarget({ doc, section });
  };

  const closeDocPreview = () => {
    setPreviewTarget(null);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppStateContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        userRole,
        setUserRole,
        theme,
        toggleTheme,
        language,
        setLanguage,
        profile,
        institutionalDocs,
        personalDocs,
        allDocs,
        diagnostics,
        recommendations,
        spacedReviews,
        notifications,
        unreadNotifsCount,
        selectedDocId,
        selectedSectionId,
        activeHighlightCitation,
        selectDocAndSection,
        libraryScope,
        setLibraryScope,
        searchQuery,
        setSearchQuery,
        activeProgramFilter,
        setActiveProgramFilter,
        activeReevalConceptId,
        startReevaluation,
        closeReevalModal,
        submitReevalAnswer,
        isAddPersonalModalOpen,
        setIsAddPersonalModalOpen,
        addPersonalDocument,
        isPublishOfficialModalOpen,
        setIsPublishOfficialModalOpen,
        publishOfficialDocument,
        previewTarget,
        openDocPreview,
        closeDocPreview,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
