import React from "react";
import { Moon, Sun, Search, Sparkles } from "lucide-react";
import { SoulLocalLogo } from "./SoulLocalLogo";

interface NavbarProps {
  currentScreen: "form" | "processing" | "results" | "uistates";
  onNavigate: (screen: "form" | "processing" | "results" | "uistates") => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenDesignModal: () => void;
  leadsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onOpenDesignModal,
  leadsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          type="button"
          onClick={() => onNavigate("form")}
          className="flex items-center gap-2 text-left focus:outline-none shrink-0"
        >
          <SoulLocalLogo size="md" />
        </button>

        {/* Zone 2: Nav Links (4-5 single-line clean text links with subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={() => onNavigate("form")}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              currentScreen === "form"
                ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Nova Prospecção
          </button>

          <button
            type="button"
            onClick={() => onNavigate("results")}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              currentScreen === "results"
                ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>Resultados</span>
            <span className="font-mono text-[10px] bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800 tabular-nums">
              {leadsCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("uistates")}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              currentScreen === "uistates"
                ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Estados de UI
          </button>

          <button
            type="button"
            onClick={onOpenDesignModal}
            className="whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white text-slate-500 cursor-pointer"
          >
            Sobre o Design
          </button>
        </nav>

        {/* Zone 3: Primary Action & Theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            aria-label="Alternar tema claro e escuro"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => onNavigate("form")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Nova Prospecção</span>
          </button>
        </div>
      </div>

      {/* Mobile nav subrow */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-100 dark:border-slate-800 py-2 px-2 text-xs font-medium text-slate-600 dark:text-slate-300">
        <button
          onClick={() => onNavigate("form")}
          className={`px-2 py-1 rounded ${
            currentScreen === "form" ? "text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/40" : ""
          }`}
        >
          Prospecção
        </button>
        <button
          onClick={() => onNavigate("results")}
          className={`px-2 py-1 rounded ${
            currentScreen === "results" ? "text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/40" : ""
          }`}
        >
          Resultados ({leadsCount})
        </button>
        <button
          onClick={() => onNavigate("uistates")}
          className={`px-2 py-1 rounded ${
            currentScreen === "uistates" ? "text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/40" : ""
          }`}
        >
          Estados UI
        </button>
        <button onClick={onOpenDesignModal} className="px-2 py-1 rounded text-slate-500">
          Design
        </button>
      </div>
    </header>
  );
};
