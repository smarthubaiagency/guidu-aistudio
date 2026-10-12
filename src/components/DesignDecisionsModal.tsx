import React from "react";
import { X, Palette, Compass, ShieldCheck } from "lucide-react";
import { SoulLocalLogo } from "./SoulLocalLogo";

interface DesignDecisionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignDecisionsModal: React.FC<DesignDecisionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <SoulLocalLogo size="sm" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Decisões de Design & Arquitetura de UI
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/60">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5 mb-1">
              <Compass className="w-4 h-4 text-blue-600" />
              Filosofia Visual & Densidade Analítica
            </h4>
            <p>
              O <strong>SoulLocal</strong> foi concebido como uma estação de inteligência comercial B2B para prospecção ativa no Google Maps, priorizando escaneabilidade cirúrgica sobre ornamentos de landing page. A composição adota a disciplina <em>zero-pill</em> (metadados estruturados com pontuação sutil · em vez de cápsulas coloridas estáticas), números tabulares alinhados verticalmente para métricas geográficas e de reputação, e uma paleta semântica estrita onde o azul (#2563EB) ancora a confiança, o verde (#16A34A) sinaliza prontidão de canal (WhatsApp e alta aderência) e o teal evidencia a ausência de website como uma oportunidade imediata de venda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <h5 className="font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-blue-600" />
                Cores & Acessibilidade
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Contraste AA estrito, modo escuro nativo com compensação óptica, ausência de bordas esquerdas grossas artificiais e foco visível em todos os controles navegáveis por teclado.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <h5 className="font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Tratamento dos Dados do Maps
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tratamento transparente das limitações da Google Places API: tooltips educativos sobre a defasagem de atualização da ficha e distinção clara entre dados oficiais, públicos e não confirmados.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
