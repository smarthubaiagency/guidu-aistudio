import React, { useState } from "react";
import {
  X,
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  FileText,
  CreditCard,
  Accessibility,
  DollarSign,
  Share2,
  Calendar
} from "lucide-react";
import { Lead } from "../mocks/leads";
import { ScoreBadge } from "./ScoreBadge";

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  userNote?: string;
  onSaveNote: (leadId: string, note: string) => void;
  isSaved?: boolean;
  onToggleSave: (leadId: string) => void;
  isContacted?: boolean;
  onToggleContacted: (leadId: string) => void;
  onShowToast: (msg: string) => void;
}

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  userNote = "",
  onSaveNote,
  isSaved,
  onToggleSave,
  isContacted,
  onToggleContacted,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<"dados" | "pitch" | "anotacoes">("dados");
  const [noteContent, setNoteContent] = useState(userNote);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen || !lead) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(label);
    onShowToast(`${label} copiado para a área de transferência!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Custom AI Pitch generator based on missing website / score
  const pitchProposal = !lead.websiteUri
    ? `Olá equipe da ${lead.displayName}! Notei a excelente avaliação de vocês no Google (${lead.rating || 4.8}★ com ${lead.userRatingCount || 100} avaliações), mas percebi que os pacientes que procuram vocês pelo Maps não encontram um website direto para ver os tratamentos ou agendar online. Desenvolvemos páginas de alta conversão para clínicas e gostaria de apresentar como isso aumentaria em 30% seus agendamentos particulares.`
    : `Olá equipe da ${lead.displayName}! Vi o destaque e a ótima reputação da clínica na região de ${lead.neighborhood || lead.city}. Trabalhamos otimizando a presença digital e atração de pacientes particulares para clínicas médicas. Gostaria de enviar um breve diagnóstico de como potencializar seu posicionamento no Google Maps.`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 shadow-2xl h-full flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {lead.isNew && (
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Lead Novo
                </span>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {lead.primaryTypeDisplayName}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {lead.displayName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lead.neighborhood || lead.city} · {lead.distanceKm.toFixed(1)} km do centro
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-100 dark:border-slate-800 px-5 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("dados")}
            className={`py-3 relative ${
              activeTab === "dados"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            Ficha Completa
          </button>
          <button
            onClick={() => setActiveTab("pitch")}
            className={`py-3 relative flex items-center gap-1.5 ${
              activeTab === "pitch"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            Sugestão de Abordagem
          </button>
          <button
            onClick={() => setActiveTab("anotacoes")}
            className={`py-3 relative flex items-center gap-1.5 ${
              activeTab === "anotacoes"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Notas & Histórico
          </button>
        </div>

        {/* Drawer Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === "dados" && (
            <>
              {/* Score Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Pontuação SoulLocal de Oportunidade
                  </span>
                  <ScoreBadge
                    score={lead.score}
                    fit={lead.fit}
                    breakdown={lead.scoreBreakdown}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-700 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Aderência</span>
                    <span className="font-mono font-semibold">{lead.scoreBreakdown.aderencia} / 30 pts</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Reputação</span>
                    <span className="font-mono font-semibold">{lead.scoreBreakdown.reputacao} / 25 pts</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Contato</span>
                    <span className="font-mono font-semibold">{lead.scoreBreakdown.contato} / 20 pts</span>
                  </div>
                </div>
              </div>

              {/* Opportunity Highlight */}
              {!lead.websiteUri ? (
                <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    Gancho Comercial Quente: Sem Website
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Esta empresa já investe em atendimento presencial e possui reputação comprovada, mas depende unicamente de ligações ou WhatsApp sem um canal proprietário para converter visitantes do Google.
                  </p>
                </div>
              ) : null}

              {/* Contact Channels */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Canais de Contato
                </h4>

                <div className="space-y-2">
                  {lead.nationalPhoneNumber ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <div>
                          <span className="font-mono font-medium">{lead.nationalPhoneNumber}</span>
                          <span className="text-[10px] text-slate-400 block">
                            {lead.isMobile ? "Celular / WhatsApp verificado" : "Telefone fixo"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => copyToClipboard(lead.nationalPhoneNumber!, "Telefone")}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded"
                          title="Copiar telefone"
                        >
                          {copiedField === "Telefone" ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        {lead.isMobile && (
                          <a
                            href={`https://wa.me/55${lead.nationalPhoneNumber.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 text-white hover:bg-emerald-700"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 text-xs text-slate-400 italic bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                      Nenhum telefone público cadastrado
                    </div>
                  )}

                  {lead.websiteUri ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate font-mono">{lead.websiteUri}</span>
                      </div>
                      <a
                        href={lead.websiteUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline shrink-0 ml-2"
                      >
                        Abrir
                      </a>
                    </div>
                  ) : (
                    <div className="p-2.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-lg flex items-center justify-between">
                      <span>Website oficial não registrado</span>
                      <span className="text-[10px] font-semibold text-teal-600 uppercase">
                        Oportunidade
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Opening Hours */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Localização & Horários
                </h4>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p>{lead.formattedAddress}</p>
                      <a
                        href={lead.googleMapsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline text-[11px] mt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Ver no Google Maps
                      </a>
                    </div>
                  </div>

                  {lead.weekdayHours && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                        Horários da semana:
                      </span>
                      {lead.weekdayHours.map((h, i) => (
                        <div key={i} className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                          {h}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Latest Review */}
              {lead.latestReview && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Avaliação mais recente
                  </h4>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {lead.latestReview.author}
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{lead.latestReview.rating}★</span>
                        <span>· {lead.latestReview.relativeTime}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic text-[11px] leading-relaxed">
                      "{lead.latestReview.text}"
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "pitch" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs space-y-1">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Script de Primeiro Contato (WhatsApp / Telefone)
                </h4>
                <p className="text-[11px] text-blue-700 dark:text-blue-400">
                  Gerado a partir das forças e vulnerabilidades digitais mapeadas no Google Maps.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <p className="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed whitespace-pre-line">
                  {pitchProposal}
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => copyToClipboard(pitchProposal, "Script de abordagem")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Script</span>
                  </button>

                  {lead.nationalPhoneNumber && lead.isMobile && (
                    <a
                      href={`https://wa.me/55${lead.nationalPhoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                        pitchProposal
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enviar no WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "anotacoes" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Notas internas deste lead
                </label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={6}
                  placeholder="Registre o que foi conversado, nomes de decisores, horário de retorno..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  onSaveNote(lead.id, noteContent);
                  onShowToast("Anotação salva com sucesso!");
                }}
                className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Salvar Anotação
              </button>
            </div>
          )}
        </div>

        {/* Drawer Bottom Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleContacted(lead.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isContacted
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40"
                  : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {isContacted ? "✓ Contatado" : "Marcar Contatado"}
            </button>
            <button
              onClick={() => onToggleSave(lead.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isSaved
                  ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/40"
                  : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {isSaved ? "★ Salvo" : "Salvar Lead"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
