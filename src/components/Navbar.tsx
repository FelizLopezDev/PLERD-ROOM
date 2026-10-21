/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';
import { ViewTab } from '../types';
import {
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Globe,
  UserCheck,
  ShieldAlert,
  Sparkles,
  BookOpen,
  LayoutDashboard,
  BrainCircuit,
  GraduationCap,
  Activity,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    userRole,
    setUserRole,
    theme,
    toggleTheme,
    language,
    setLanguage,
    profile,
    notifications,
    unreadNotifsCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = useAppState();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { tab: ViewTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'dashboard', label: 'Mi Aula', icon: LayoutDashboard },
    { tab: 'library', label: 'Biblioteca', icon: BookOpen },
    { tab: 'study_table', label: 'Mesa de Estudio', icon: BrainCircuit },
    { tab: 'evaluations', label: 'Evaluaciones', icon: GraduationCap },
    { tab: 'diagnostics', label: 'Mi Diagnóstico', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* 1. Franja institucional superior oficial */}
      <div className="bg-[#001738] text-slate-200 text-xs py-1.5 px-4 sm:px-6 flex items-center justify-between border-b border-[#0A2540]">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-600 text-white font-black text-[9px]">
            🇩🇴
          </span>
          <span className="font-bold tracking-tight text-white">PLERD</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            Dirección de Participación y Liderazgo Estudiantil
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline">
            Ministerio de Educación · Gobierno de la República Dominicana
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-semibold text-sky-300">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Ecosistema MINUME ROOM
          </span>
          <a
            href="https://minumeroom.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            minumeroom.com <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. Navbar Principal Blanca Estilo MINUME ROOM */}
      <div
        className={`w-full backdrop-blur-md border-b transition-colors ${
          theme === 'dark'
            ? 'bg-slate-900/95 border-slate-800 text-white'
            : 'bg-white/95 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo y Badge de Proyecto */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#001F54] via-[#0A2540] to-sky-600 flex items-center justify-center text-white shadow-sm shadow-sky-900/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-sky-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight text-[#0A2540] dark:text-white leading-none">
                    PLERD <span className="text-sky-600 font-black">ROOM</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800">
                    Fase 2 · MINERD
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Biblioteca Inteligente & Aprendizaje Adaptativo
                </span>
              </div>
            </button>
          </div>

          {/* Enlaces de Navegación Centrales */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setCurrentTab(item.tab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#0A2540] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-sky-300' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.tab === 'evaluations' && profile.areasToReinforceCount > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controles del Lado Derecho: Rol, Idioma, Tema, Notificaciones y Píldora de Sala */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Selector de Rol: Delegado vs Coordinador */}
            <div className="relative" ref={roleRef}>
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  userRole === 'COORDINATOR'
                    ? 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
                }`}
                title="Cambiar perspectiva de usuario"
              >
                {userRole === 'COORDINATOR' ? (
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                )}
                <span className="hidden sm:inline">
                  {userRole === 'COORDINATOR' ? 'Coordinador PLERD' : 'Delegado'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Cambiar perspectiva de visualización
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('DELEGATE');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors ${
                      userRole === 'DELEGATE'
                        ? 'bg-sky-50 text-sky-900 dark:bg-sky-950/50 dark:text-sky-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-sky-600" />
                    <div>
                      <p className="font-bold">Vista: Delegado Oficial</p>
                      <p className="text-[10px] text-slate-500 font-normal">
                        Diagnóstico individual y biblioteca personal
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setUserRole('COORDINATOR');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-colors mt-1 ${
                      userRole === 'COORDINATOR'
                        ? 'bg-purple-50 text-purple-900 dark:bg-purple-950/50 dark:text-purple-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="font-bold">Vista: Coordinador PLERD</p>
                      <p className="text-[10px] text-slate-500 font-normal">
                        Publicar documentos y mapa de calor de sala
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Idioma Selector */}
            <button
              onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              title="Cambiar idioma"
            >
              <Globe className="w-3 h-3 text-slate-400" />
              <span>{language}</span>
            </button>

            {/* Tema Modo Claro / Oscuro */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              title="Alternar modo visual"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Campana de Notificaciones con Desplegable */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                title="Notificaciones de aprendizaje"
                aria-label="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-black text-white ring-2 ring-white dark:ring-slate-900">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        Notificaciones de Diagnóstico
                      </span>
                      {unreadNotifsCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                          {unreadNotifsCount} nuevas
                        </span>
                      )}
                    </div>
                    {unreadNotifsCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-medium text-sky-600 hover:text-sky-800 dark:text-sky-400"
                      >
                        Marcar leídas
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 mt-2">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        No hay notificaciones pendientes.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                            !n.read
                              ? 'bg-sky-50/70 dark:bg-sky-950/30'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">
                              {n.timestamp}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            {n.description}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Píldora de Sala de Comisión (Estilo MINUME ROOM) */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2">
              <div className="flex items-center gap-2 bg-[#0A2540] hover:bg-[#002060] text-white px-3 sm:px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="tracking-tight">{profile.roomCode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación móvil inferior si la pantalla es estrecha */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 py-1.5 px-2 bg-slate-50/90 dark:bg-slate-900/90">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setCurrentTab(item.tab)}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-bold ${
                  isActive ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
