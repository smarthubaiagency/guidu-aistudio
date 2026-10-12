import React, { useState } from "react";
import {
  Layers,
  AlertTriangle,
  RotateCcw,
  Search,
  CheckCircle2,
  FileCode,
  Sparkles,
  Info
} from "lucide-react";
import { MOCK_LEADS, Lead } from "../mocks/leads";
import { LeadCard } from "../components/LeadCard";

interface UiStatesScreenProps {
  onShowToast: (msg: string) => void;
}

export const UiStatesScreen: React.FC<UiStatesScreenProps> = ({ onShowToast }) => {
  const [activeSection, setActiveSection] = useState<"cards" | "states">("cards");
  const [errorSimulated, setErrorSimulated] = useState(true);

  // Specific lead variations
  const leadCompleto = MOCK_LEADS.find((l) => l.id === "lead-02")!; // Instituto Odontológico Ilha Sul (Full)
  const leadSemSite = MOCK_LEADS.find((l) => l.id === "lead-01")!; // Clínica DermaFloripa (No site - Oportunidade)
  const leadSemTelefone = MOCK_LEADS.find((l) => l.id === "lead-06")!; // Espaço Integrado (No phone)
  const leadSemAvaliacoes = MOCK_LEADS.find((l) => l.id === "lead-09")!; // Consultório OdontoArte (No reviews)
  const leadFechadoTemporario = MOCK_LEADS.find((l) => l.id === "lead-10")!; // Centro de Diagnóstico Beira-Mar (Closed temporarily)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Design System & Showcase
          </span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span className="text-xs text-slate-500">/ui-states</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Galeria de Estados de Interface & Variações
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Esta tela documenta como o SoulLocal lida de ponta a ponta com a variabilidade dos dados do Google Maps (ausência de website, sem telefone, sem avaliações, estabelecimentos fechados) e os estados de sistema (carregando, vazio, erro).
        </p>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => setActiveSection("cards")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeSection === "cards"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            Variações do Card do Lead (5 Casos)
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("states")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeSection === "states"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            Estados de Carregamento, Vazio & Erro
          </button>
        </div>
      </div>

      {/* SECTION 1: CARD VARIATIONS */}
      {activeSection === "cards" && (
        <div className="space-y-10">
          {/* 1. Lead Completo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  1. Lead Completo (Ficha com Alta Densidade)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Possui foto, website oficial, telefone celular com WhatsApp verificado, nota alta com mais de 300 avaliações, horários da semana completos e dados de acessibilidade.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">id: {leadCompleto.id}</span>
            </div>
            <LeadCard
              lead={leadCompleto}
              onToggleSave={() => onShowToast("Lead adicionado aos salvos!")}
              onToggleContacted={() => onShowToast("Status alterado para contatado!")}
              onOpenNote={(l) => onShowToast(`Abrir anotações de ${l.displayName}`)}
              onOpenReport={(l) => onShowToast(`Reportar dado de ${l.displayName}`)}
            />
          </div>

          {/* 2. Lead Sem Website */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  2. Lead Sem Website (Gancho Comercial de Oportunidade)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  A ausência de website não gera buraco no layout: é convertida em um callout informativo de oportunidade de venda e tag temática em teal.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">id: {leadSemSite.id}</span>
            </div>
            <LeadCard
              lead={leadSemSite}
              onToggleSave={() => onShowToast("Lead adicionado aos salvos!")}
              onToggleContacted={() => onShowToast("Status alterado para contatado!")}
              onOpenNote={(l) => onShowToast(`Abrir anotações de ${l.displayName}`)}
              onOpenReport={(l) => onShowToast(`Reportar dado de ${l.displayName}`)}
            />
          </div>

          {/* 3. Lead Sem Telefone */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  3. Lead Sem Telefone Cadastrado
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sem telefone no Places. O score de contato é reduzido na ponderação e o botão de ligação exibe o estado "Sem telefone" sem falhas visuais.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">id: {leadSemTelefone.id}</span>
            </div>
            <LeadCard
              lead={leadSemTelefone}
              onToggleSave={() => onShowToast("Lead adicionado aos salvos!")}
              onToggleContacted={() => onShowToast("Status alterado para contatado!")}
              onOpenNote={(l) => onShowToast(`Abrir anotações de ${l.displayName}`)}
              onOpenReport={(l) => onShowToast(`Reportar dado de ${l.displayName}`)}
            />
          </div>

          {/* 4. Lead Sem Avaliações */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  4. Lead Sem Avaliações (0 Reviews)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Estabelecimento recém-inaugurado. Não exibe estrelas vazias de mentira, mas sim o texto amigável "Sem avaliações no Maps".
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">id: {leadSemAvaliacoes.id}</span>
            </div>
            <LeadCard
              lead={leadSemAvaliacoes}
              onToggleSave={() => onShowToast("Lead adicionado aos salvos!")}
              onToggleContacted={() => onShowToast("Status alterado para contatado!")}
              onOpenNote={(l) => onShowToast(`Abrir anotações de ${l.displayName}`)}
              onOpenReport={(l) => onShowToast(`Reportar dado de ${l.displayName}`)}
            />
          </div>

          {/* 5. Lead Fechado Temporariamente */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  5. Lead Fechado Temporariamente (CLOSED_TEMPORARILY)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tratamento semântico em âmbar do status operacional com justificativa nos horários de funcionamento (reforma/modernização).
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400">id: {leadFechadoTemporario.id}</span>
            </div>
            <LeadCard
              lead={leadFechadoTemporario}
              onToggleSave={() => onShowToast("Lead adicionado aos salvos!")}
              onToggleContacted={() => onShowToast("Status alterado para contatado!")}
              onOpenNote={(l) => onShowToast(`Abrir anotações de ${l.displayName}`)}
              onOpenReport={(l) => onShowToast(`Reportar dado de ${l.displayName}`)}
            />
          </div>
        </div>
      )}

      {/* SECTION 2: UI STATES (LOADING, EMPTY, ERROR) */}
      {activeSection === "states" && (
        <div className="space-y-12">
          {/* Estado de Carregamento (Skeleton) */}
          <div className="space-y-3">
            <div className="pb-1 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Estado de Carregamento (Skeleton Loaders)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Placeholders geométricos fieis à estrutura dos dados com animação suave de pulso.
              </p>
            </div>

            <div className="space-y-4">
              {[1, 2].map((idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-pulse"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-3 w-32 bg-slate-100 dark:bg-slate-850 rounded" />
                    </div>
                    <div className="h-7 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 h-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="col-span-9 space-y-2.5">
                      <div className="h-3 w-full bg-slate-100 dark:bg-slate-850 rounded" />
                      <div className="h-3 w-5/6 bg-slate-100 dark:bg-slate-850 rounded" />
                      <div className="h-6 w-64 bg-slate-100 dark:bg-slate-850 rounded" />
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="h-3 w-40 bg-slate-100 dark:bg-slate-850 rounded" />
                    <div className="h-7 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estado Vazio (Empty State) */}
          <div className="space-y-3">
            <div className="pb-1 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                Estado Vazio (Nenhum Lead Encontrado)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Apresenta diagnóstico acionável ao invés de tela em branco, sugerindo aumento do raio ou relaxamento de filtros.
              </p>
            </div>

            <div className="p-10 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Nenhum lead encontrado para este conjunto de filtros
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Recomendamos aumentar o raio de 5 km para 15 km ou remover a restrição de nota mínima 4.5★ para encontrar clínicas em bairros adjacentes.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onShowToast("Filtros redefinidos para valores padrão.")}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Expandir busca para 25 km
                </button>
              </div>
            </div>
          </div>

          {/* Estado de Erro com Nova Tentativa (Error State) */}
          <div className="space-y-3">
            <div className="pb-1 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Estado de Erro com Recuperação (Retry Action)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tratamento amigável de interrupções de conexão ou limite simulado de consultas.
              </p>
            </div>

            {errorSimulated ? (
              <div className="p-8 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-rose-900 dark:text-rose-200">
                  Instabilidade na conexão com os nós da Places API
                </h4>
                <p className="text-xs text-rose-700 dark:text-rose-300 max-w-md mx-auto leading-relaxed">
                  Não foi possível completar a varredura das quadrículas de São José neste momento. Seus parâmetros de busca foram preservados.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setErrorSimulated(false);
                      onShowToast("Reconexão bem-sucedida! Dados restaurados.");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Tentar novamente agora</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Conexão restabelecida com sucesso
                </h4>
                <button
                  type="button"
                  onClick={() => setErrorSimulated(true)}
                  className="text-xs text-emerald-700 underline"
                >
                  Simular erro novamente
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
