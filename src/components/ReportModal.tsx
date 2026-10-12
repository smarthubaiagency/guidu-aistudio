import React, { useState } from "react";
import { X, AlertTriangle, Send } from "lucide-react";
import { Lead } from "../mocks/leads";

interface ReportModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadId: string, issue: string) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  lead,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedIssue, setSelectedIssue] = useState("telefone_incorreto");
  const [comments, setComments] = useState("");

  if (!isOpen || !lead) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(lead.id, `${selectedIssue}: ${comments}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Reportar dado incorreto
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-3.5 space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Empresa: <strong className="text-slate-700 dark:text-slate-200">{lead.displayName}</strong>
          </p>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Qual dado está inconsistente?
            </label>
            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="telefone_incorreto">Telefone não atende ou não tem WhatsApp</option>
              <option value="empresa_fechada">Empresa encerrou as atividades permanentemente</option>
              <option value="site_inexistente">Website registrado não existe ou caiu</option>
              <option value="endereco_mudou">Mudou de endereço / bairro</option>
              <option value="categoria_errada">Categoria diferente do nicho de saúde</option>
              <option value="outro">Outro problema</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Detalhes adicionais (opcional)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={2}
              placeholder="Descreva o que você descobriu ao contatar..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Enviar reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
