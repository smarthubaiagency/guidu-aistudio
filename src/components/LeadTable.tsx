import React from "react";
import {
  Star,
  ExternalLink,
  MessageCircle,
  Phone,
  Bookmark,
  CheckCircle2,
  FileEdit,
  Globe
} from "lucide-react";
import { Lead } from "../mocks/leads";
import { ScoreBadge } from "./ScoreBadge";

interface LeadTableProps {
  leads: Lead[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  contactedIds: Set<string>;
  onToggleContacted: (id: string) => void;
  onOpenNote: (lead: Lead) => void;
  onSelectLeadDetails: (lead: Lead) => void;
  onOpenCompanyProfile?: (lead: Lead) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  savedIds,
  onToggleSave,
  contactedIds,
  onToggleContacted,
  onOpenNote,
  onSelectLeadDetails,
  onOpenCompanyProfile,
}) => {
  const allSelected = leads.length > 0 && leads.every((l) => selectedIds.has(l.id));

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
            <th className="py-3 px-3 w-10 text-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleSelectAll}
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer"
                aria-label="Selecionar todos os leads"
              />
            </th>
            <th className="py-3 px-3 min-w-[200px]">Empresa</th>
            <th className="py-3 px-3 min-w-[130px]">Categoria</th>
            <th className="py-3 px-3 min-w-[120px]">Score / Fit</th>
            <th className="py-3 px-3 min-w-[100px]">Nota</th>
            <th className="py-3 px-3 min-w-[90px]">Avaliações</th>
            <th className="py-3 px-3 min-w-[90px]">Distância</th>
            <th className="py-3 px-3 min-w-[130px]">Telefone</th>
            <th className="py-3 px-3 min-w-[100px]">Site</th>
            <th className="py-3 px-3 min-w-[110px]">Bairro</th>
            <th className="py-3 px-3 min-w-[110px]">Capturado em</th>
            <th className="py-3 px-3 text-right min-w-[120px]">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {leads.map((lead) => {
            const isSelected = selectedIds.has(lead.id);
            const isSaved = savedIds.has(lead.id);
            const isContacted = contactedIds.has(lead.id);

            return (
              <tr
                key={lead.id}
                className={`transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${
                  isSelected ? "bg-blue-50/40 dark:bg-blue-950/20" : ""
                } ${isContacted ? "opacity-75" : ""}`}
              >
                {/* Checkbox */}
                <td className="py-3 px-3 text-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(lead.id)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer"
                  />
                </td>

                {/* Empresa */}
                <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">
                  <div className="flex items-center gap-1.5">
                    {lead.isNew && (
                      <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">
                        Novo
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelectLeadDetails(lead)}
                      className="font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 text-left truncate max-w-[220px]"
                    >
                      {lead.displayName}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[220px]">
                    {lead.formattedAddress}
                  </div>
                </td>

                {/* Categoria */}
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  {lead.primaryTypeDisplayName}
                </td>

                {/* Score */}
                <td className="py-3 px-3">
                  <ScoreBadge
                    score={lead.score}
                    fit={lead.fit}
                    breakdown={lead.scoreBreakdown}
                    size="sm"
                  />
                </td>

                {/* Nota */}
                <td className="py-3 px-3">
                  {lead.rating !== undefined ? (
                    <div className="flex items-center gap-1 font-mono font-semibold tabular-nums text-slate-800 dark:text-slate-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{lead.rating.toFixed(1)}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Sem nota</span>
                  )}
                </td>

                {/* Avaliações */}
                <td className="py-3 px-3 font-mono tabular-nums text-slate-600 dark:text-slate-400">
                  {lead.userRatingCount ? `${lead.userRatingCount} avaliações` : "0"}
                </td>

                {/* Distância */}
                <td className="py-3 px-3 font-mono tabular-nums text-slate-600 dark:text-slate-400">
                  {lead.distanceKm.toFixed(1)} km
                </td>

                {/* Telefone */}
                <td className="py-3 px-3">
                  {lead.nationalPhoneNumber ? (
                    <div className="flex items-center gap-1.5">
                      {lead.isMobile && (
                        <a
                          href={`https://wa.me/55${lead.nationalPhoneNumber.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 p-0.5"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                        {lead.nationalPhoneNumber}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Não informado</span>
                  )}
                </td>

                {/* Site */}
                <td className="py-3 px-3">
                  {lead.websiteUri ? (
                    <a
                      href={lead.websiteUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Ver site</span>
                    </a>
                  ) : (
                    <span className="text-teal-600 dark:text-teal-400 font-medium">
                      Sem website
                    </span>
                  )}
                </td>

                {/* Bairro */}
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                  {lead.neighborhood || lead.city}
                </td>

                {/* Capturado em */}
                <td className="py-3 px-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {lead.capturedAt.split(",")[0]}
                </td>

                {/* Ações */}
                <td className="py-3 px-3 text-right">
                  <div className="inline-flex items-center gap-1">
                    {onOpenCompanyProfile && (
                      <button
                        type="button"
                        onClick={() => onOpenCompanyProfile(lead)}
                        className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 hover:bg-blue-100"
                        title="Abrir Perfil Completo no CRM"
                      >
                        CRM ↗
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onToggleSave(lead.id)}
                      className={`p-1 rounded ${
                        isSaved ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Salvar"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleContacted(lead.id)}
                      className={`p-1 rounded ${
                        isContacted ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Contatado"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenNote(lead)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600"
                      title="Nota"
                    >
                      <FileEdit className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={lead.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-slate-400 hover:text-slate-600"
                      title="Abrir no Maps"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
