import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Edit3,
  Bot,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  FileText,
  CheckSquare,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Calendar,
  Share2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Building2,
  UserCheck,
  Send,
  Zap,
  Play,
  Pause,
  Upload,
  File,
  X,
  Star,
  ShieldCheck,
  Check
} from "lucide-react";
import { Lead } from "../mocks/leads";
import {
  CompanyProfileData,
  ActivityItem,
  CompanyDeal,
  CompanyAutomation,
  createDefaultProfileData
} from "../mocks/companyDetails";
import { ScoreBadge } from "../components/ScoreBadge";

interface CompanyProfileScreenProps {
  lead: Lead;
  onBackToResults: () => void;
  onShowToast: (message: string) => void;
  initialProfileData?: CompanyProfileData;
  onUpdateProfileData?: (data: CompanyProfileData) => void;
}

export const CompanyProfileScreen: React.FC<CompanyProfileScreenProps> = ({
  lead,
  onBackToResults,
  onShowToast,
  initialProfileData,
  onUpdateProfileData,
}) => {
  // Main CRM profile data state
  const [profile, setProfile] = useState<CompanyProfileData>(() => {
    return initialProfileData || createDefaultProfileData(lead);
  });

  // Center Feed composer states
  const [activeComposer, setActiveComposer] = useState<"none" | "note" | "task" | "message">("none");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("Amanhã");
  const [taskContent, setTaskContent] = useState("");
  const [messageText, setMessageText] = useState(
    !lead.websiteUri
      ? `Olá equipe da ${lead.displayName}! Notei a excelente avaliação de vocês no Google Maps (${lead.rating || 4.8}★), mas percebi que vocês ainda não possuem um site para agendamentos online. Gostaria de enviar um modelo de alta conversão sem custo.`
      : `Olá equipe da ${lead.displayName}! Encontrei sua clínica no Google Maps com ótimo destaque e gostaria de compartilhar nosso diagnóstico de presença digital para clínicas locais.`
  );

  // Search in feed
  const [searchActivity, setSearchActivity] = useState("");
  const [activityFilter, setActivityFilter] = useState<"all" | "note" | "task" | "message" | "automation">("all");

  // Accordion states in Left Column
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(true);
  const [isMapsOpen, setIsMapsOpen] = useState(true);

  // Enrichment state (simulated async loading)
  const [isEnriching, setIsEnriching] = useState(false);

  // Deal modal state
  const [showNewDealModal, setShowNewDealModal] = useState(false);
  const [newDealTitle, setNewDealTitle] = useState("Gestão Google Meu Negócio + Landing Page");
  const [newDealValue, setNewDealValue] = useState("3500");

  // Save changes to parent state if available
  const updateProfile = (updated: CompanyProfileData) => {
    setProfile(updated);
    onUpdateProfileData?.(updated);
  };

  // Pipeline stage update
  const handleSetStage = (stage: "1" | "2" | "3" | "4" | "5" | "G" | "P") => {
    const updated = { ...profile, statusPipeline: stage };
    updateProfile(updated);
    const stageLabels: Record<string, string> = {
      "1": "Triagem Inicial",
      "2": "Primeiro Contato",
      "3": "Apresentação / Qualificado",
      "4": "Proposta Enviada",
      "5": "Em Negociação",
      "G": "Negócio Ganho!",
      "P": "Perdido",
    };
    onShowToast(`Etapa alterada para: ${stageLabels[stage]}`);
  };

  // Add Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newActivity: ActivityItem = {
      id: "act-" + Date.now(),
      type: "note",
      title: noteTitle.trim() || "Anotação rápida",
      content: noteText.trim(),
      createdAt: "Hoje às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      author: "Você (Consultor SoulLocal)",
    };

    const updated = {
      ...profile,
      activities: [newActivity, ...profile.activities],
    };
    updateProfile(updated);
    setNoteTitle("");
    setNoteText("");
    setActiveComposer("none");
    onShowToast("Anotação adicionada ao histórico!");
  };

  // Add Task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: ActivityItem = {
      id: "act-" + Date.now(),
      type: "task",
      title: taskTitle.trim(),
      content: taskContent.trim() || "Sem descrição adicional",
      createdAt: "Hoje às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      author: "Você",
      isCompleted: false,
      dueDate: taskDueDate,
    };

    const updated = {
      ...profile,
      activities: [newTask, ...profile.activities],
    };
    updateProfile(updated);
    setTaskTitle("");
    setTaskContent("");
    setActiveComposer("none");
    onShowToast("Tarefa criada com sucesso!");
  };

  // Toggle Task Completion
  const handleToggleTask = (taskId: string) => {
    const updatedActivities = profile.activities.map((act) => {
      if (act.id === taskId) {
        const nextState = !act.isCompleted;
        onShowToast(nextState ? "Tarefa marcada como concluída! ✓" : "Tarefa reaberta.");
        return { ...act, isCompleted: nextState };
      }
      return act;
    });
    updateProfile({ ...profile, activities: updatedActivities });
  };

  // Send WhatsApp message
  const handleLogWhatsAppMessage = () => {
    const newMsg: ActivityItem = {
      id: "act-" + Date.now(),
      type: "message",
      title: "Mensagem enviada via WhatsApp",
      content: messageText,
      createdAt: "Hoje às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      author: "Você",
      channel: "whatsapp",
    };

    const updated = {
      ...profile,
      activities: [newMsg, ...profile.activities],
    };
    updateProfile(updated);
    setActiveComposer("none");
    onShowToast("Disparo de mensagem registrado no histórico!");

    if (lead.nationalPhoneNumber && lead.isMobile) {
      const cleanPhone = lead.nationalPhoneNumber.replace(/\D/g, "");
      window.open(
        `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(messageText)}`,
        "_blank"
      );
    }
  };

  // Trigger Data Enrichment simulation
  const handleEnrichData = () => {
    setIsEnriching(true);
    onShowToast("Buscando dados societários na Receita Federal e tecnologias no DNS...");

    setTimeout(() => {
      setIsEnriching(false);
      const enrichedUpdate: CompanyProfileData = {
        ...profile,
        enrichment: {
          ...profile.enrichment,
          isEnriched: true,
          cnpj: "34.891.402/0001-19",
          razaoSocial: lead.displayName + " Serviços Médicos e Diagnósticos Ltda.",
          abertura: "14/03/2018 (6 anos de atividade)",
          capitalSocial: "R$ 180.000,00",
          socios: [
            { nome: "Dra. Patrícia Silveira Mendes", cargo: "Sócia-Administradora (CRM/SC 18290)" },
            { nome: "Dr. Carlos Eduardo Silveira", cargo: "Sócio Cotista" },
          ],
          instagram: "@" + lead.displayName.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16),
          tecnologias: lead.websiteUri
            ? ["WordPress 6.4", "Google Analytics 4", "WhatsApp Click2Call", "Sem Pixel Meta"]
            : ["Sem Website Ativo", "Ficha Google Maps Reivindicada", "WhatsApp Business Comercial"],
          faturamentoEstimado: "R$ 80.000 – R$ 150.000 / mês",
          funcionariosEstimados: "8 a 14 colaboradores",
        },
        activities: [
          {
            id: "act-" + Date.now(),
            type: "enrichment" as const,
            title: "Enriquecimento de dados societários concluído",
            content: "CNPJ 34.891.402/0001-19 identificado com 2 sócios administradores e faturamento estimado.",
            createdAt: "Agora mesmo",
            author: "SoulLocal Enrichment Bot",
          },
          ...profile.activities,
        ],
      };
      updateProfile(enrichedUpdate);
      onShowToast("Dados societários e tecnologia enriquecidos com sucesso!");
    }, 1800);
  };

  // Toggle Automation
  const handleToggleAutomation = () => {
    const isRunning = profile.automation.status === "running";
    const nextStatus = isRunning ? "paused" : "running";
    const updatedAutomation: CompanyAutomation = {
      ...profile.automation,
      status: nextStatus,
      lastExecution: "Hoje às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    const newActivity: ActivityItem = {
      id: "act-" + Date.now(),
      type: "automation",
      title: isRunning ? "Automação pausada pelo consultor" : "Cadência automática de WhatsApp iniciada",
      content: isRunning
        ? "Sequência temporariamente congelada na etapa 1."
        : "Etapa 1 agendada para envio automático com template personalizado.",
      createdAt: "Hoje às " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      author: "SoulLocal Automações",
    };

    updateProfile({
      ...profile,
      automation: updatedAutomation,
      activities: [newActivity, ...profile.activities],
    });

    onShowToast(isRunning ? "Automação pausada." : "Automação iniciada! Mensagens agendadas.");
  };

  // Add new deal
  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newDealValue) || 3000;
    const newDeal: CompanyDeal = {
      id: "deal-" + Date.now(),
      title: newDealTitle,
      value: val,
      stage: "proposta",
      probability: 70,
      expectedCloseDate: "30/10/2026",
    };

    updateProfile({
      ...profile,
      deals: [...profile.deals, newDeal],
    });
    setShowNewDealModal(false);
    onShowToast(`Negócio de R$ ${val.toLocaleString("pt-BR")} criado!`);
  };

  // Filtered activities
  const filteredActivities = profile.activities.filter((act) => {
    if (activityFilter === "note" && act.type !== "note") return false;
    if (activityFilter === "task" && act.type !== "task") return false;
    if (activityFilter === "message" && act.type !== "message") return false;
    if (activityFilter === "automation" && act.type !== "automation") return false;

    if (searchActivity.trim()) {
      const q = searchActivity.toLowerCase();
      return (
        act.title.toLowerCase().includes(q) ||
        act.content.toLowerCase().includes(q) ||
        act.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalDealValue = profile.deals.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* 1. TOP BAR / BREADCRUMB HEADER */}
      <div className="w-full bg-white/95 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-16 z-30 backdrop-blur-md shadow-xs">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 min-w-0">
          <button
            type="button"
            onClick={onBackToResults}
            className="hover:text-blue-600 dark:hover:text-white flex items-center gap-1 transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resultados</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
          <span className="text-slate-500 dark:text-slate-400 hidden md:inline">Empresas</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 hidden md:inline shrink-0" />
          <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
            {lead.displayName}
          </span>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveComposer("note")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors shadow-xs cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Adicionar Nota</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveComposer("message")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Abordagem Inteligente</span>
          </button>
        </div>
      </div>

      {/* 2. 3-COLUMN WORKSPACE CANVAS */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================= */}
          {/* COLUMN 1: LEFT SIDEBAR (~3 / 12 cols)                     */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 space-y-4">
            {/* Header Identity Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                {/* Photo / Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700/80 shadow-xs">
                    {lead.photoUrl ? (
                      <img
                        src={lead.photoUrl}
                        alt={lead.displayName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/60 dark:to-slate-900 text-blue-600 dark:text-blue-400 font-bold">
                        <Building2 className="w-7 h-7 mb-0.5 opacity-80" />
                        <span className="text-xs font-mono">{lead.displayName.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  {lead.isNew && (
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white shadow-xs uppercase tracking-wider">
                      LEAD
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <ScoreBadge
                    score={lead.score}
                    fit={lead.fit}
                    breakdown={lead.scoreBreakdown}
                    size="sm"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {lead.displayName}
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                  {lead.primaryTypeDisplayName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">
                  {lead.neighborhood || lead.city} · {lead.distanceKm.toFixed(1)} km do centro
                </p>
              </div>

              {/* FUNIL / PIPELINE STAGE SELECTOR (Matching reference numbers 1 2 3 4 5 G P) */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  <span>ESTÁGIO DO FUNIL</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                    {profile.statusPipeline === "1"
                      ? "1. Triagem"
                      : profile.statusPipeline === "2"
                      ? "2. Contato"
                      : profile.statusPipeline === "3"
                      ? "3. Apresentação"
                      : profile.statusPipeline === "4"
                      ? "4. Proposta"
                      : profile.statusPipeline === "5"
                      ? "5. Negociação"
                      : profile.statusPipeline === "G"
                      ? "Ganho ✓"
                      : "Perdido"}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {(["1", "2", "3", "4", "5", "G", "P"] as const).map((st) => {
                    const isActive = profile.statusPipeline === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleSetStage(st)}
                        className={`py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          isActive
                            ? st === "G"
                              ? "bg-emerald-600 text-white ring-2 ring-emerald-500/30 shadow-xs"
                              : st === "P"
                              ? "bg-rose-600 text-white ring-2 ring-rose-500/30 shadow-xs"
                              : "bg-blue-600 text-white ring-2 ring-blue-500/30 shadow-xs"
                            : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                        }`}
                        title={
                          st === "1"
                            ? "Triagem"
                            : st === "2"
                            ? "Primeiro Contato"
                            : st === "3"
                            ? "Qualificado"
                            : st === "4"
                            ? "Proposta"
                            : st === "5"
                            ? "Negociação"
                            : st === "G"
                            ? "Ganho"
                            : "Perdido"
                        }
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Accordion 1: Detalhes Cadastrais */}
            <div className="rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Detalhes da Empresa
                </span>
                {isDetailsOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {isDetailsOpen && (
                <div className="p-4 pt-0 space-y-3 text-xs border-t border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-300">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Razão Social</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{profile.enrichment.razaoSocial}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">CNPJ</span>
                    <span className="font-mono text-slate-800 dark:text-white font-medium">
                      {profile.enrichment.cnpj}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Tempo de Atividade</span>
                    <span>{profile.enrichment.abertura}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Faturamento Estimado</span>
                    <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{profile.enrichment.faturamentoEstimado}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Status Operacional Maps</span>
                    <span className={lead.openNow ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-amber-600 dark:text-amber-400"}>
                      {lead.openNow ? "Aberto agora" : "Fechado agora"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Contato & Canais */}
            <div className="rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Contato & Canais
                </span>
                {isContactOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {isContactOpen && (
                <div className="p-4 pt-0 space-y-3 text-xs border-t border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-300">
                  {lead.nationalPhoneNumber ? (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Telefone</span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="font-mono text-slate-900 dark:text-white font-medium">{lead.nationalPhoneNumber}</span>
                        {lead.isMobile && (
                          <a
                            href={`https://wa.me/55${lead.nationalPhoneNumber.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 dark:text-slate-500 italic">Sem telefone registrado</div>
                  )}

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">E-mail Corporativo</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 block truncate">{profile.enrichment.emailCorporativo}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Website Oficial</span>
                    {lead.websiteUri ? (
                      <a
                        href={lead.websiteUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5 truncate font-mono text-[11px]"
                      >
                        <Globe className="w-3 h-3 shrink-0" />
                        <span className="truncate">{lead.websiteUri}</span>
                      </a>
                    ) : (
                      <span className="text-teal-700 dark:text-teal-400 font-semibold text-[11px] flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                        Sem website (Oportunidade)
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Endereço Completo</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                      {lead.formattedAddress}
                    </p>
                    <a
                      href={lead.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline mt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Abrir no Google Maps</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Dados de Reputação Maps */}
            <div className="rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setIsMapsOpen(!isMapsOpen)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  Reputação no Google Maps
                </span>
                {isMapsOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {isMapsOpen && (
                <div className="p-4 pt-0 space-y-2.5 text-xs border-t border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Avaliação do público:</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-900 dark:text-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{lead.rating ? lead.rating.toFixed(1) : "-"}</span>
                      <span className="text-slate-400 dark:text-slate-500 font-normal">({lead.userRatingCount || 0})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Distância do centro:</span>
                    <span className="font-mono text-slate-900 dark:text-white font-medium">{lead.distanceKm.toFixed(1)} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Capturado em:</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">{lead.capturedAt.split(",")[0]}</span>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ========================================================= */}
          {/* COLUMN 2: CENTER WORKSPACE & ACTIVITY FEED (6 / 12 cols) */}
          {/* ========================================================= */}
          <main className="lg:col-span-6 space-y-5">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchActivity}
                onChange={(e) => setSearchActivity(e.target.value)}
                placeholder="Buscar atividades, notas, emails, tarefas e mais..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
              />
            </div>

            {/* Quick Action Navigation Bar */}
            <div className="p-1 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex items-center gap-1 overflow-x-auto text-xs shadow-xs">
              <button
                type="button"
                onClick={() => setActiveComposer("none")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeComposer === "none"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Atividades</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveComposer("note")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeComposer === "note"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>Notas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveComposer("task")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeComposer === "task"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Tarefas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveComposer("message")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeComposer === "message"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Mensagens (WhatsApp)</span>
              </button>

              <button
                type="button"
                onClick={handleToggleAutomation}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap ml-auto cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Automação</span>
              </button>
            </div>

            {/* Quick KPI Strip (Valor Total, Negócios Abertos, Última Interação) */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">VALOR ESTIMADO</span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    R$ {totalDealValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">NEGÓCIOS ABERTOS</span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    {profile.deals.length} ativo
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">CADÊNCIA ATIVA</span>
                  <span className={`text-base font-bold font-mono ${profile.automation.status === "running" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
                    {profile.automation.status === "running" ? "Rodando" : "Pausada"}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Quick Composer Area (When clicking Notes, Tasks, or Messages) */}
            {activeComposer === "note" && (
              <form onSubmit={handleAddNote} className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-amber-300 dark:border-blue-500/40 shadow-lg space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Nova Anotação de Prospecção
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveComposer("none")}
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Título da anotação (ex: Conversa com recepcionista)..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={3}
                  placeholder="Escreva detalhes da abordagem, objeções ouvidas, nomes de decisores..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveComposer("none")}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
                  >
                    Salvar Nota
                  </button>
                </div>
              </form>
            )}

            {activeComposer === "task" && (
              <form onSubmit={handleAddTask} className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-emerald-300 dark:border-emerald-500/40 shadow-lg space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4" />
                    Nova Tarefa / Follow-up
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveComposer("none")}
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="O que precisa ser feito? (ex: Enviar proposta no WhatsApp da Dra.)..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    placeholder="Prazo (ex: Amanhã às 14h, Sexta-feira)..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                    placeholder="Observação rápida (opcional)..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveComposer("none")}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
                  >
                    Criar Tarefa
                  </button>
                </div>
              </form>
            )}

            {activeComposer === "message" && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-teal-300 dark:border-teal-500/40 shadow-lg space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 dark:text-teal-400 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    Abordagem Personalizada para WhatsApp
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveComposer("none")}
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none font-sans"
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Destinatário: {lead.nationalPhoneNumber || "Não informado no Maps"}
                  </span>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveComposer("none")}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleLogWhatsAppMessage}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Abrir no WhatsApp & Registrar</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Activities Feed Header & Sub-filter tabs */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Atividades</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono text-xs font-normal">
                    ({filteredActivities.length})
                  </span>
                </h2>

                {/* Sub-filter tabs (Todas, Nota, Tarefa, WhatsApp) */}
                <div className="flex items-center gap-1 text-xs">
                  {(
                    [
                      { id: "all", label: `Todas (${profile.activities.length})` },
                      { id: "task", label: `Tarefas (${profile.activities.filter((a) => a.type === "task").length})` },
                      { id: "note", label: `Notas (${profile.activities.filter((a) => a.type === "note").length})` },
                      { id: "message", label: "WhatsApp" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActivityFilter(tab.id as any)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                        activityFilter === tab.id
                          ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed Items List */}
              <div className="space-y-3">
                {filteredActivities.length === 0 ? (
                  <div className="p-8 rounded-xl bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 text-center text-xs text-slate-400 dark:text-slate-500">
                    Nenhuma atividade encontrada com o filtro selecionado.
                  </div>
                ) : (
                  filteredActivities.map((act) => {
                    const isTask = act.type === "task";
                    const isNote = act.type === "note";
                    const isMsg = act.type === "message";
                    const isAuto = act.type === "automation";

                    return (
                      <div
                        key={act.id}
                        className={`p-4 rounded-xl border transition-all shadow-xs ${
                          act.isCompleted
                            ? "bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-900 opacity-60"
                            : "bg-white dark:bg-slate-950/70 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Left icon / Checkbox */}
                          <div className="mt-0.5 shrink-0">
                            {isTask ? (
                              <button
                                type="button"
                                onClick={() => handleToggleTask(act.id)}
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                  act.isCompleted
                                    ? "bg-emerald-600 border-emerald-600 text-white"
                                    : "border-slate-400 dark:border-slate-600 hover:border-emerald-500"
                                }`}
                              >
                                {act.isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                              </button>
                            ) : isNote ? (
                              <div className="w-4 h-4 rounded text-amber-500 flex items-center justify-center">
                                <FileText className="w-3.5 h-3.5" />
                              </div>
                            ) : isMsg ? (
                              <div className="w-4 h-4 rounded text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <MessageCircle className="w-3.5 h-3.5" />
                              </div>
                            ) : isAuto ? (
                              <div className="w-4 h-4 rounded text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <Zap className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>

                          {/* Activity Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                              <span
                                className={`text-xs font-semibold ${
                                  act.isCompleted
                                    ? "line-through text-slate-400 dark:text-slate-500"
                                    : "text-slate-900 dark:text-white"
                                }`}
                              >
                                {isTask && <strong className="text-emerald-700 dark:text-emerald-400 font-medium mr-1.5">Tarefa:</strong>}
                                {isNote && <strong className="text-amber-700 dark:text-amber-400 font-medium mr-1.5">Nota:</strong>}
                                {isMsg && <strong className="text-teal-700 dark:text-teal-400 font-medium mr-1.5">WhatsApp:</strong>}
                                {isAuto && <strong className="text-purple-700 dark:text-purple-400 font-medium mr-1.5">Automação:</strong>}
                                {act.title}
                              </span>

                              <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                                {act.dueDate && !act.isCompleted && (
                                  <span className="text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-900/60">
                                    Vence: {act.dueDate}
                                  </span>
                                )}
                                <span>{act.createdAt}</span>
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                              {act.content}
                            </p>

                            <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 mt-2">
                              <span>Por: {act.author}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </main>

          {/* ========================================================= */}
          {/* COLUMN 3: RIGHT SIDEBAR (~3 / 12 cols)                    */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 space-y-4">
            {/* Widget 1: Enriquecimento de Dados & IA */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Enriquecimento & Sócios
                </span>
                {profile.enrichment.isEnriched ? (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Enriquecido
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">Pendente</span>
                )}
              </div>

              {!profile.enrichment.isEnriched ? (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Identifique automaticamente CNPJ, capital social, sócios administradores e tecnologias instaladas no domínio.
                  </p>
                  <button
                    type="button"
                    disabled={isEnriching}
                    onClick={handleEnrichData}
                    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    {isEnriching ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Consultando Receita Federal...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Enriquecer Dados com IA</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Sócios Administradores</span>
                    <div className="space-y-1 mt-1">
                      {profile.enrichment.socios.map((s, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 text-[11px]">
                          <span className="font-semibold text-slate-900 dark:text-white block">{s.nome}</span>
                          <span className="text-slate-500 dark:text-slate-400 text-[10px]">{s.cargo}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">Tecnologias Mapeadas</span>
                    <div className="flex flex-wrap gap-1">
                      {profile.enrichment.tecnologias.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-500">Instagram:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-medium">{profile.enrichment.instagram}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Widget 2: Negócios & Oportunidades (Deals) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Negócios ({profile.deals.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowNewDealModal(true)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Novo</span>
                </button>
              </div>

              {profile.deals.map((deal) => (
                <div key={deal.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{deal.title}</h4>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                      R$ {deal.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900/60">
                      {deal.probability}% prob.
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Estágio: Proposta</span>
                    <span>Previsto: {deal.expectedCloseDate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Widget 3: Automações de Prospecção & Sequências */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Automação SoulLocal
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    profile.automation.status === "running"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                      : "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800"
                  }`}
                >
                  {profile.automation.status === "running" ? "Em execução" : "Pausada"}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{profile.automation.name}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Sequência multicanal de 3 etapas com gatilhos automáticos.
                </p>
              </div>

              {/* Steps timeline in right column */}
              <div className="space-y-2 pt-1">
                {profile.automation.steps.map((st) => (
                  <div
                    key={st.stepNumber}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-purple-700 dark:text-purple-300">Etapa {st.stepNumber}</span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        {st.delayDays === 0 ? "Imediato" : `+${st.delayDays} dias`}
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-300 font-medium">{st.title}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{st.description}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleToggleAutomation}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  profile.automation.status === "running"
                    ? "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                    : "bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
                }`}
              >
                {profile.automation.status === "running" ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pausar Automação</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Iniciar Automação Agora</span>
                  </>
                )}
              </button>
            </div>

            {/* Widget 4: Arquivos & Propostas (PDFs) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <File className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Arquivos ({profile.files.length})
                </span>
                <button
                  type="button"
                  onClick={() => onShowToast("Arquivo simulado anexado com sucesso!")}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Anexar</span>
                </button>
              </div>

              <div className="space-y-2">
                {profile.files.map((f) => (
                  <div
                    key={f.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-800 dark:text-white truncate block text-[11px]">{f.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{f.size} · {f.date}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onShowToast(`Download iniciado: ${f.name}`)}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-[11px] shrink-0 font-medium cursor-pointer"
                    >
                      Baixar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* New Deal Modal */}
      {showNewDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Criar Novo Negócio para {lead.displayName}
              </h3>
              <button onClick={() => setShowNewDealModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Título do Serviço / Proposta</label>
                <input
                  type="text"
                  value={newDealTitle}
                  onChange={(e) => setNewDealTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">Valor Total Proposto (R$)</label>
                <input
                  type="number"
                  value={newDealValue}
                  onChange={(e) => setNewDealValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewDealModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
                >
                  Salvar Negócio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
