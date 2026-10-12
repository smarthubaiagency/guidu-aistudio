import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Search,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Building2,
  Star,
  Layers,
  Filter
} from "lucide-react";
import { MOCK_GENERATED_TERMS, MOCK_LEADS, Lead } from "../mocks/leads";
import { ProspectingParams } from "./ProspectingFormScreen";

interface ProcessingScreenProps {
  params: ProspectingParams;
  onFinish: () => void;
  onCancel: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  params,
  onFinish,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [discoveredCount, setDiscoveredCount] = useState<number>(0);
  const [streamedLeads, setStreamedLeads] = useState<Lead[]>([]);

  const steps = [
    {
      id: 0,
      title: "Interpretando sua oferta",
      description: "Identificando gatilhos de valor, serviços e palavras-chave de nicho...",
    },
    {
      id: 1,
      title: "Mapeando a região geográfica",
      description: `Definindo quadrículas e raio de ${params.radiusKm} km em ${params.locations.join(", ") || "Florianópolis"}...`,
    },
    {
      id: 2,
      title: "Coletando empresas no Google Maps",
      description: "Consultando estabelecimentos em funcionamento, horários e canais de contato...",
    },
    {
      id: 3,
      title: "Calculando score e organizando a lista",
      description: "Ponderando reputação, canais de contato, ausência de website e proximidade...",
    },
  ];

  // Stage timer simulation (~2s per step, total ~8s, or user can click 'Ver resultados parciais')
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 3) return prev + 1;
        clearInterval(timer);
        setTimeout(onFinish, 1200);
        return prev;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [onFinish]);

  // Lead streaming counter simulation during step 2 and 3
  useEffect(() => {
    if (currentStep >= 2) {
      const interval = setInterval(() => {
        setDiscoveredCount((prev) => {
          const next = prev + 3;
          if (next >= MOCK_LEADS.length) {
            clearInterval(interval);
            return MOCK_LEADS.length;
          }
          return next;
        });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // Stream preview leads into view
  useEffect(() => {
    if (discoveredCount > 0) {
      setStreamedLeads(MOCK_LEADS.slice(0, Math.min(discoveredCount, 5)));
    }
  }, [discoveredCount]);

  const progressPercent = Math.min(100, (currentStep + 1) * 25);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Card: Progress & Status */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                SoulLocal Engine · Prospecção Ativa
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Processando sua busca no Google Maps
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onFinish}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Ver resultados parciais</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="my-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700 dark:text-slate-300">
              Etapa {currentStep + 1} de {steps.length}: {steps[currentStep]?.title}
            </span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold tabular-nums">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 4 Steps timeline grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-6">
          {steps.map((st, idx) => {
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx;
            return (
              <div
                key={st.id}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  isCurrent
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/20"
                    : isDone
                    ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-[11px]">
                    0{idx + 1}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                <h4 className="font-bold text-xs mb-1">{st.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {st.description}
                </p>
                {idx === 2 && currentStep >= 2 && (
                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                    {discoveredCount} de {params.leadsLimit || 50} coletadas
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Generated Terms Section */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 my-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Termos de busca gerados pela IA
              </h4>
            </div>
            <span className="text-[11px] text-slate-400">
              Transformação automática da sua oferta
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-[11px] text-slate-500 block mb-1">
                Termos principais e variações de nicho (incluídos):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {MOCK_GENERATED_TERMS.includedTerms.map((term, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-100/70 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  >
                    + {term}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block mb-1">
                Termos descartados para evitar falso-positivos (excluídos):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {MOCK_GENERATED_TERMS.excludedTerms.map((term, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[11px] rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    - {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Streaming Leads Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Prévia dos leads capturados em tempo real
            </h4>
            <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
              {discoveredCount} oportunidades mapeadas
            </span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {streamedLeads.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 italic bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                Iniciando varredura nos nós do Google Maps...
              </div>
            ) : (
              streamedLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {lead.score}
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                        {lead.displayName}
                      </h5>
                      <p className="text-[11px] text-slate-400 truncate">
                        {lead.primaryTypeDisplayName} · {lead.neighborhood || lead.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!lead.websiteUri && (
                      <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                        Sem site
                      </span>
                    )}
                    {lead.rating && (
                      <div className="flex items-center gap-0.5 text-xs font-mono font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{lead.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
