import React, { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  CheckCircle2,
  Trash2,
  FileEdit,
  AlertCircle,
  MessageCircle,
  Navigation,
  Sparkles,
  Info,
  CreditCard,
  Accessibility,
  DollarSign,
  Building2,
  CalendarClock
} from "lucide-react";
import { Lead } from "../mocks/leads";
import { ScoreBadge } from "./ScoreBadge";

interface LeadCardProps {
  lead: Lead;
  isSelected?: boolean;
  onToggleSelect?: (leadId: string) => void;
  isSaved?: boolean;
  onToggleSave?: (leadId: string) => void;
  isContacted?: boolean;
  onToggleContacted?: (leadId: string) => void;
  onDiscard?: (leadId: string) => void;
  onOpenNote?: (lead: Lead) => void;
  onOpenReport?: (lead: Lead) => void;
  onSelectLeadDetails?: (lead: Lead) => void;
  userNote?: string;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  isSelected = false,
  onToggleSelect,
  isSaved = false,
  onToggleSave,
  isContacted = false,
  onToggleContacted,
  onDiscard,
  onOpenNote,
  onOpenReport,
  onSelectLeadDetails,
  userNote,
}) => {
  const [showHours, setShowHours] = useState(false);
  const [showDatesTooltip, setShowDatesTooltip] = useState(false);

  // Status text & colors
  const statusLabels = {
    OPERATIONAL: {
      label: lead.openNow ? "Aberto agora" : "Fechado agora",
      color: lead.openNow
        ? "text-emerald-700 dark:text-emerald-400"
        : "text-slate-600 dark:text-slate-400",
    },
    CLOSED_TEMPORARILY: {
      label: "Fechado temporariamente",
      color: "text-amber-700 dark:text-amber-400",
    },
    CLOSED_PERMANENTLY: {
      label: "Fechado permanentemente",
      color: "text-rose-700 dark:text-rose-400",
    },
  };

  const status = statusLabels[lead.businessStatus];

  // Price level formatter
  const priceDisplay = {
    INEXPENSIVE: "$ · Econômico",
    MODERATE: "$$ · Moderado",
    EXPENSIVE: "$$$ · Premium",
  };

  // Helper for initials fallback
  const initials = lead.displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <article
      className={`group relative rounded-xl border transition-all duration-200 bg-white dark:bg-slate-900/90 ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md"
          : isContacted
          ? "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-90"
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Top Header Row: Checkbox, Name, Novo Badge, Score, Quick Action */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            {onToggleSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(lead.id)}
                className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer"
                aria-label={`Selecionar ${lead.displayName}`}
              />
            )}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                {lead.isNew && (
                  <span className="inline-flex items-center text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Novo
                  </span>
                )}
                {isContacted && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    Contatado
                  </span>
                )}
                <h3
                  onClick={() => onSelectLeadDetails?.(lead)}
                  className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  {lead.displayName}
                </h3>
              </div>

              {/* Zero-Pill Unboxed Metadata for categories */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {lead.primaryTypeDisplayName}
                </span>
                {lead.neighborhood && (
                  <>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                    <span>{lead.neighborhood}</span>
                  </>
                )}
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                <span className="font-mono tabular-nums">{lead.distanceKm.toFixed(1)} km do centro</span>
              </div>
            </div>
          </div>

          {/* Right Header: Score Badge */}
          <div className="shrink-0 flex flex-col items-end gap-1.5">
            <ScoreBadge
              score={lead.score}
              fit={lead.fit}
              breakdown={lead.scoreBreakdown}
            />
          </div>
        </div>

        {/* Content Body: Photo/Placeholder + Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {/* Left Column: Photo & Basic Ratings (3 cols on md) */}
          <div className="md:col-span-3 flex md:flex-col items-start gap-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-full md:h-28 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700/60">
              {lead.photoUrl ? (
                <img
                  src={lead.photoUrl}
                  alt={`Fachada ou interior de ${lead.displayName}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-850 text-slate-400 dark:text-slate-500">
                  <Building2 className="w-6 h-6 mb-1 text-slate-400" />
                  <span className="font-mono text-xs font-semibold">{initials}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 min-w-0">
              {/* Rating & Reviews */}
              {lead.rating !== undefined ? (
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {lead.rating.toFixed(1)}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono tabular-nums">
                    ({lead.userRatingCount} {lead.userRatingCount === 1 ? "avaliação" : "avaliações"})
                  </span>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">
                  Sem avaliações no Maps
                </div>
              )}

              {/* Status & Open Now */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className={`font-medium ${status.color}`}>
                  {status.label}
                </span>
                {lead.weekdayHours && lead.weekdayHours.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowHours(!showHours)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded transition-colors"
                    title="Ver horários de funcionamento"
                  >
                    {showHours ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Address, Summary, Contacts, Review Quote (9 cols on md) */}
          <div className="md:col-span-9 space-y-3">
            {/* Address */}
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {lead.formattedAddress}
                {lead.postalCode && ` · CEP ${lead.postalCode}`}
              </span>
            </div>

            {/* Expandable Weekly Hours */}
            {showHours && lead.weekdayHours && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1 border border-slate-200 dark:border-slate-700/60 animate-in fade-in">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  Horários semanais
                </div>
                {lead.weekdayHours.map((line, idx) => (
                  <div key={idx} className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    {line}
                  </div>
                ))}
              </div>
            )}

            {/* Editorial Summary if available */}
            {lead.summary && (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {lead.summary}
              </p>
            )}

            {/* OPPORTUNITY CALLOUT: Sem Website */}
            {!lead.websiteUri ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 text-teal-800 dark:text-teal-300 text-xs">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <div className="min-w-0">
                  <span className="font-semibold">Oportunidade Comercial:</span> Esta empresa tem alta reputação local, mas ainda não possui website cadastrado no Google Maps.
                </div>
              </div>
            ) : null}

            {/* Latest Review Snippet if available */}
            {lead.latestReview && (
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    Última avaliação de {lead.latestReview.author}
                  </span>
                  <div className="flex items-center gap-1 font-mono tabular-nums">
                    <span>{lead.latestReview.relativeTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-500 font-semibold">{lead.latestReview.rating}★</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic line-clamp-2 text-[11px] leading-relaxed">
                  "{lead.latestReview.text}"
                </p>
              </div>
            )}

            {/* Extra details row: Price level, Payment, Accessibility */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              {lead.priceLevel && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-slate-400" />
                  <span>{priceDisplay[lead.priceLevel]}</span>
                </div>
              )}
              {lead.paymentOptions && lead.paymentOptions.length > 0 && (
                <div className="flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-slate-400" />
                  <span>{lead.paymentOptions.slice(0, 2).join(", ")}</span>
                </div>
              )}
              {lead.accessibility && lead.accessibility.length > 0 && (
                <div className="flex items-center gap-1">
                  <Accessibility className="w-3 h-3 text-slate-400" />
                  <span>{lead.accessibility[0]}</span>
                </div>
              )}
            </div>

            {/* Saved User Note if present */}
            {userNote && (
              <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
                <strong>Sua anotação:</strong> {userNote}
              </div>
            )}
          </div>
        </div>

        {/* Footer Row: Data Sources & Dates, Contact Buttons, Workflow Action Icons */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Sources & Verified dates with Educational Tooltip */}
          <div className="relative flex flex-wrap items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
            <span className="font-medium text-slate-500 dark:text-slate-400">Fontes:</span>
            {lead.sources.map((src) => (
              <span
                key={src}
                className={`uppercase tracking-wider font-semibold text-[10px] ${
                  src === "oficial"
                    ? "text-blue-600 dark:text-blue-400"
                    : src === "publico"
                    ? "text-slate-500 dark:text-slate-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {src === "oficial" ? "Oficial" : src === "publico" ? "Público" : "Não confirmado"}
              </span>
            ))}

            <span aria-hidden="true">·</span>

            {/* Tooltip trigger for Google dates disclaimer */}
            <div className="relative inline-flex items-center">
              <button
                type="button"
                onClick={() => setShowDatesTooltip(!showDatesTooltip)}
                onMouseEnter={() => setShowDatesTooltip(true)}
                onMouseLeave={() => setShowDatesTooltip(false)}
                className="inline-flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                <CalendarClock className="w-3 h-3" />
                <span>Capturado em {lead.capturedAt.split(",")[0]}</span>
                <Info className="w-3 h-3 opacity-60" />
              </button>

              {showDatesTooltip && (
                <div className="absolute z-50 bottom-full left-0 mb-2 w-72 p-3 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs leading-relaxed pointer-events-none">
                  <div className="font-semibold text-slate-900 dark:text-white mb-1">
                    Como as datas funcionam no Maps
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    O Google Maps não informa a data exata da última edição feita pelo proprietário. O SoulLocal utiliza a data da avaliação pública mais recente ({lead.lastReviewAt || "Sem avaliações"}) e a data de varredura ativa como balizadores de confiabilidade.
                  </p>
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    Última verificação: {lead.verifiedAt || "Pendente"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Action Buttons (WhatsApp, Ligar, Site, Maps, Salvar, Notas) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* WhatsApp Direct Action (Priority for Mobile Cell Phones) */}
            {lead.nationalPhoneNumber && lead.isMobile ? (
              <a
                href={`https://wa.me/55${lead.nationalPhoneNumber.replace(/\D/g, "")}?text=Olá,%20encontrei%20sua%20clínica%20no%20Google%20e%20gostaria%20de%20apresentar%20uma%20oportunidade`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors"
                title="Conversar direto no WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            ) : null}

            {/* Call Action */}
            {lead.nationalPhoneNumber ? (
              <a
                href={`tel:${lead.nationalPhoneNumber.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title={`Ligar para ${lead.nationalPhoneNumber}`}
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono text-[11px]">{lead.nationalPhoneNumber}</span>
              </a>
            ) : (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 italic px-2 py-1">
                Sem telefone
              </span>
            )}

            {/* Website Action */}
            {lead.websiteUri ? (
              <a
                href={lead.websiteUri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Acessar website oficial"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Site</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50">
                Sem site
              </span>
            )}

            {/* Google Maps Route link */}
            <a
              href={lead.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Abrir no Google Maps"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Workflow: Bookmark / Save */}
            <button
              type="button"
              onClick={() => onToggleSave?.(lead.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isSaved
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-950/50"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              title={isSaved ? "Remover dos salvos" : "Salvar lead"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>

            {/* Workflow: Toggle Contacted */}
            <button
              type="button"
              onClick={() => onToggleContacted?.(lead.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isContacted
                  ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              title={isContacted ? "Marcar como não contatado" : "Marcar como contatado"}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>

            {/* Workflow: Note */}
            <button
              type="button"
              onClick={() => onOpenNote?.(lead)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Adicionar anotação"
            >
              <FileEdit className="w-4 h-4" />
            </button>

            {/* Workflow: Report */}
            <button
              type="button"
              onClick={() => onOpenReport?.(lead)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reportar dado incorreto"
            >
              <AlertCircle className="w-4 h-4" />
            </button>

            {/* Workflow: Discard */}
            {onDiscard && (
              <button
                type="button"
                onClick={() => onDiscard(lead.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Descartar este lead"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
