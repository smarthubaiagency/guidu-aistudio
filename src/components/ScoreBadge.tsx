import React, { useState } from "react";
import { Info, HelpCircle } from "lucide-react";

interface ScoreBadgeProps {
  score: number;
  fit: "alta" | "media" | "baixa";
  breakdown?: {
    aderencia: number;
    reputacao: number;
    contato: number;
    proximidade: number;
    atividade: number;
  };
  size?: "sm" | "md" | "lg";
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  fit,
  breakdown,
  size = "md",
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const fitConfig = {
    alta: {
      label: "Aderência Alta",
      textColor: "text-emerald-700 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      ringColor: "#10B981",
    },
    media: {
      label: "Aderência Média",
      textColor: "text-blue-700 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
      borderColor: "border-blue-200 dark:border-blue-800",
      ringColor: "#3B82F6",
    },
    baixa: {
      label: "Aderência Baixa",
      textColor: "text-slate-600 dark:text-slate-400",
      bgColor: "bg-slate-100 dark:bg-slate-800/60",
      borderColor: "border-slate-200 dark:border-slate-700",
      ringColor: "#94A3B8",
    },
  };

  const current = fitConfig[fit];

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setShowPopover(!showPopover)}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-all ${current.bgColor} ${current.borderColor} ${current.textColor} hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        title="Ver detalhamento do score de aderência"
      >
        <span className="font-mono tabular-nums font-bold text-sm">{score}</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-90">
          / 100
        </span>
        <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
        <span className="font-medium">{current.label}</span>
        <HelpCircle className="w-3.5 h-3.5 ml-0.5 opacity-70" />
      </button>

      {/* Popover Breakdown */}
      {showPopover && breakdown && (
        <div
          className="absolute z-40 top-full left-0 mt-2 w-72 p-3.5 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 text-left text-xs pointer-events-auto"
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2.5">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Por que esse score?
            </div>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              {score} pts
            </span>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
            Calculado por aderência semântica à sua oferta, presença de canais diretos de contato, reputação e proximidade.
          </p>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 text-[11px] mb-1 font-medium">
                <span>Aderência à oferta</span>
                <span className="font-mono font-semibold">{breakdown.aderencia} / 30 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${(breakdown.aderencia / 30) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 text-[11px] mb-1 font-medium">
                <span>Reputação & Avaliações</span>
                <span className="font-mono font-semibold">{breakdown.reputacao} / 25 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${(breakdown.reputacao / 25) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 text-[11px] mb-1 font-medium">
                <span>Canais de contato (WhatsApp / Telefone)</span>
                <span className="font-mono font-semibold">{breakdown.contato} / 20 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-full rounded-full"
                  style={{ width: `${(breakdown.contato / 20) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 text-[11px] mb-1 font-medium">
                <span>Proximidade geográfica</span>
                <span className="font-mono font-semibold">{breakdown.proximidade} / 15 pts</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full"
                  style={{ width: `${(breakdown.proximidade / 15) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 text-[11px] mb-1 font-medium">
                <span>Atividade recente & Horários</span>
                <span className="font-mono font-semibold">
                  {breakdown.atividade > 0 ? `+${breakdown.atividade}` : breakdown.atividade} / 10 pts
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{
                    width: `${Math.max(0, Math.min(100, (breakdown.atividade / 10) * 100))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
