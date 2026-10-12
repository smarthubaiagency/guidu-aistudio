import React, { useState, useMemo } from "react";
import {
  List,
  Table as TableIcon,
  Map as MapIcon,
  Download,
  Filter,
  ArrowUpDown,
  Search,
  Sparkles,
  Phone,
  MessageCircle,
  Globe,
  Star,
  CheckCircle2,
  Bookmark,
  Trash2,
  X,
  SlidersHorizontal,
  ChevronDown,
  Info
} from "lucide-react";
import { Lead, MOCK_LEADS, MOCK_GENERATED_TERMS } from "../mocks/leads";
import { LeadCard } from "../components/LeadCard";
import { LeadTable } from "../components/LeadTable";
import { LeadMap } from "../components/LeadMap";
import { LeadDetailDrawer } from "../components/LeadDetailDrawer";
import { NoteModal } from "../components/NoteModal";
import { ReportModal } from "../components/ReportModal";
import { ProspectingParams } from "./ProspectingFormScreen";

interface ResultsScreenProps {
  params: ProspectingParams;
  onNewProspecting: () => void;
  onShowToast: (message: string) => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  params,
  onNewProspecting,
  onShowToast,
}) => {
  // Leads data state (initialized with MOCK_LEADS)
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

  // Workflow states (saved, contacted, notes, discarded)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(["lead-01"]));
  const [contactedIds, setContactedIds] = useState<Set<string>>(new Set());
  const [discardedIds, setDiscardedIds] = useState<Set<string>>(new Set());
  const [userNotes, setUserNotes] = useState<Record<string, string>>({
    "lead-01": "Liguei para secretária Paula. Pediu proposta pelo WhatsApp.",
  });

  // Selected lead IDs for batch actions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Active view mode: list | table | map
  const [viewMode, setViewMode] = useState<"list" | "table" | "map">("list");

  // Sorting
  const [sortBy, setSortBy] = useState<"score" | "distance" | "rating" | "reviews" | "recent">("score");

  // Search input filter (name or address)
  const [searchQuery, setSearchQuery] = useState("");

  // Quick filter toggles
  const [quickFilterNoWebsite, setQuickFilterNoWebsite] = useState(false);
  const [quickFilterWhatsApp, setQuickFilterWhatsApp] = useState(false);
  const [quickFilterHighFit, setQuickFilterHighFit] = useState(false);
  const [quickFilterOpenNow, setQuickFilterOpenNow] = useState(false);

  // Sidebar Filters
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [fitFilter, setFitFilter] = useState<"all" | "alta" | "media" | "baixa">("all");
  const [websiteFilter, setWebsiteFilter] = useState<"all" | "no_site" | "with_site">("all");
  const [phoneFilter, setPhoneFilter] = useState<"all" | "mobile" | "fixed" | "none">("all");
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(params.radiusKm || 25);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

  // Modals and Drawers
  const [detailLead, setDetailLead] = useState<Lead | null>(null);
  const [noteLead, setNoteLead] = useState<Lead | null>(null);
  const [reportLead, setReportLead] = useState<Lead | null>(null);

  // Editable AI terms
  const [activeTerms, setActiveTerms] = useState<string[]>([
    "clínica médica",
    "consultório odontológico",
    "dermatologista",
    "fisioterapia",
  ]);

  // Extract unique neighborhoods from leads
  const availableNeighborhoods = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.neighborhood) set.add(l.neighborhood);
    });
    return Array.from(set);
  }, [leads]);

  // Filter and Sort Logic
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => !discardedIds.has(lead.id))
      .filter((lead) => {
        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = lead.displayName.toLowerCase().includes(q);
          const matchAddr = lead.formattedAddress.toLowerCase().includes(q);
          const matchCat = lead.primaryTypeDisplayName.toLowerCase().includes(q);
          if (!matchName && !matchAddr && !matchCat) return false;
        }

        // Quick filters
        if (quickFilterNoWebsite && lead.websiteUri) return false;
        if (quickFilterWhatsApp && (!lead.nationalPhoneNumber || !lead.isMobile)) return false;
        if (quickFilterHighFit && lead.fit !== "alta") return false;
        if (quickFilterOpenNow && !lead.openNow) return false;

        // Sidebar filters
        if (fitFilter !== "all" && lead.fit !== fitFilter) return false;
        if (websiteFilter === "no_site" && lead.websiteUri) return false;
        if (websiteFilter === "with_site" && !lead.websiteUri) return false;
        if (phoneFilter === "mobile" && (!lead.nationalPhoneNumber || !lead.isMobile)) return false;
        if (phoneFilter === "fixed" && (!lead.nationalPhoneNumber || lead.isMobile)) return false;
        if (phoneFilter === "none" && lead.nationalPhoneNumber) return false;
        if (minRatingFilter > 0 && (!lead.rating || lead.rating < minRatingFilter)) return false;
        if (lead.distanceKm > maxDistanceKm) return false;
        if (
          selectedNeighborhoods.length > 0 &&
          (!lead.neighborhood || !selectedNeighborhoods.includes(lead.neighborhood))
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.score - a.score;
        if (sortBy === "distance") return a.distanceKm - b.distanceKm;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "reviews") return (b.userRatingCount || 0) - (a.userRatingCount || 0);
        return 0;
      });
  }, [
    leads,
    discardedIds,
    searchQuery,
    quickFilterNoWebsite,
    quickFilterWhatsApp,
    quickFilterHighFit,
    quickFilterOpenNow,
    fitFilter,
    websiteFilter,
    phoneFilter,
    minRatingFilter,
    maxDistanceKm,
    selectedNeighborhoods,
    sortBy,
  ]);

  // KPI calculations
  const totalCount = filteredLeads.length;
  const withWhatsAppCount = filteredLeads.filter((l) => l.nationalPhoneNumber && l.isMobile).length;
  const withoutWebsiteCount = filteredLeads.filter((l) => !l.websiteUri).length;
  const avgRating =
    filteredLeads.filter((l) => l.rating !== undefined).length > 0
      ? (
          filteredLeads.reduce((acc, l) => acc + (l.rating || 0), 0) /
          filteredLeads.filter((l) => l.rating !== undefined).length
        ).toFixed(1)
      : "-";
  const avgScore =
    totalCount > 0 ? Math.round(filteredLeads.reduce((acc, l) => acc + l.score, 0) / totalCount) : 0;

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.size === filteredLeads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredLeads.map((l) => l.id)));
    }
  };

  // Workflow toggle handlers
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      const isNowSaved = !next.has(id);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onShowToast(isNowSaved ? "Lead salvo com sucesso!" : "Lead removido dos salvos.");
      return next;
    });
  };

  const handleToggleContacted = (id: string) => {
    setContactedIds((prev) => {
      const next = new Set(prev);
      const isNowContacted = !next.has(id);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onShowToast(isNowContacted ? "Marcado como contatado!" : "Marcado como não contatado.");
      return next;
    });
  };

  const handleDiscard = (id: string) => {
    setDiscardedIds((prev) => new Set(prev).add(id));
    onShowToast("Lead descartado da listagem.");
  };

  // Batch actions
  const handleBatchMarkContacted = () => {
    setContactedIds((prev) => {
      const next = new Set(prev);
      selectedIds.forEach((id) => next.add(id));
      return next;
    });
    onShowToast(`${selectedIds.size} leads marcados como contatados!`);
    setSelectedIds(new Set());
  };

  const handleBatchSave = () => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      selectedIds.forEach((id) => next.add(id));
      return next;
    });
    onShowToast(`${selectedIds.size} leads adicionados aos salvos!`);
    setSelectedIds(new Set());
  };

  const handleBatchDiscard = () => {
    setDiscardedIds((prev) => {
      const next = new Set(prev);
      selectedIds.forEach((id) => next.add(id));
      return next;
    });
    onShowToast(`${selectedIds.size} leads descartados!`);
    setSelectedIds(new Set());
  };

  const handleExport = (format: "CSV" | "Excel") => {
    onShowToast(`Exportando ${filteredLeads.length} leads em formato ${format}...`);
  };

  const removeTerm = (t: string) => {
    setActiveTerms(activeTerms.filter((term) => term !== t));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 1. TOP HEADER & SEARCH RECAP */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Prospecção Finalizada
            </span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-xs text-slate-500 font-mono">
              Centro, Florianópolis (+{params.radiusKm || 10} km)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>{totalCount} oportunidades encontradas</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
            Oferta: "{params.offer || "Desenvolvimento de sites e GMB para clínicas"}"
          </p>
        </div>

        {/* AI Terms Used (Interactive Chips) */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Termos ativos:
          </span>
          {activeTerms.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              <span>{t}</span>
              <button
                type="button"
                onClick={() => removeTerm(t)}
                className="text-slate-400 hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onNewProspecting}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1"
          >
            Refinar oferta
          </button>
        </div>
      </div>

      {/* 2. 5 KPI CARDS STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">
            Total de Oportunidades
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {totalCount}
            </span>
            <span className="text-[10px] text-slate-400">no raio de {params.radiusKm} km</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
            <MessageCircle className="w-3 h-3 text-emerald-600" />
            Com WhatsApp Direto
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
              {withWhatsAppCount}
            </span>
            <span className="text-[10px] text-slate-400 font-mono tabular-nums">
              {totalCount > 0 ? Math.round((withWhatsAppCount / totalCount) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20 shadow-xs">
          <span className="text-[11px] font-semibold text-teal-800 dark:text-teal-300 block mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-600" />
            Sem Website (Oportunidades)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono tabular-nums text-teal-700 dark:text-teal-300">
              {withoutWebsiteCount}
            </span>
            <span className="text-[10px] text-teal-600 font-mono tabular-nums">
              Gancho quente
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
            Nota Média no Maps
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
              {avgRating}★
            </span>
            <span className="text-[10px] text-slate-400">avaliações</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">
            Score Médio SoulLocal
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black font-mono tabular-nums text-blue-600 dark:text-blue-400">
              {avgScore}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              / 100 pts
            </span>
          </div>
        </div>
      </div>

      {/* 3. TOOLBAR: Search, Quick Filters, Sort, View Toggle, Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Left: Search input & quick filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Input */}
          <div className="relative min-w-[200px] flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar por nome, bairro..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quick Filter buttons */}
          <button
            type="button"
            onClick={() => setQuickFilterNoWebsite(!quickFilterNoWebsite)}
            className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
              quickFilterNoWebsite
                ? "bg-teal-600 text-white border-teal-600 font-semibold"
                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            }`}
          >
            Sem site
          </button>

          <button
            type="button"
            onClick={() => setQuickFilterWhatsApp(!quickFilterWhatsApp)}
            className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
              quickFilterWhatsApp
                ? "bg-emerald-600 text-white border-emerald-600 font-semibold"
                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            }`}
          >
            Com WhatsApp
          </button>

          <button
            type="button"
            onClick={() => setQuickFilterHighFit(!quickFilterHighFit)}
            className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
              quickFilterHighFit
                ? "bg-blue-600 text-white border-blue-600 font-semibold"
                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            }`}
          >
            Aderência Alta
          </button>

          <button
            type="button"
            onClick={() => setQuickFilterOpenNow(!quickFilterOpenNow)}
            className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
              quickFilterOpenNow
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            }`}
          >
            Aberto agora
          </button>

          {/* Mobile Filter Drawer trigger */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="md:hidden px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center gap-1"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Mais filtros</span>
          </button>
        </div>

        {/* Right: Sort, View Switcher & Export */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="score">Score SoulLocal (Maior)</option>
              <option value="distance">Menor Distância</option>
              <option value="rating">Maior Nota</option>
              <option value="reviews">Mais Avaliações</option>
            </select>
          </div>

          {/* View Switcher: Lista / Tabela / Mapa */}
          <div className="flex items-center p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Visualização em Lista com Cards Detalhados"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Visualização em Tabela Densa"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "map"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Visualização em Mapa com Pinos"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Export Dropdown */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleExport("CSV")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={() => handleExport("Excel")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MULTI-SELECTION BATCH ACTIONS BAR (Appears when items are selected) */}
      {selectedIds.size > 0 && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold font-mono text-blue-700 dark:text-blue-300 tabular-nums">
              {selectedIds.size} {selectedIds.size === 1 ? "lead selecionado" : "leads selecionados"}
            </span>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="text-slate-500 hover:underline"
            >
              Limpar seleção
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBatchMarkContacted}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Marcar como contatados</span>
            </button>
            <button
              type="button"
              onClick={handleBatchSave}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Salvar em lote</span>
            </button>
            <button
              type="button"
              onClick={handleBatchDiscard}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-semibold hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Descartar</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. MAIN CONTENT AREA: Filters Sidebar (Desktop) + Leads View */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Filter Sidebar (3 cols on md) */}
        <aside className="hidden md:block md:col-span-3 space-y-5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              Filtros Avançados
            </span>
            {(fitFilter !== "all" ||
              websiteFilter !== "all" ||
              phoneFilter !== "all" ||
              minRatingFilter > 0 ||
              selectedNeighborhoods.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setFitFilter("all");
                  setWebsiteFilter("all");
                  setPhoneFilter("all");
                  setMinRatingFilter(0);
                  setSelectedNeighborhoods([]);
                }}
                className="text-[11px] text-blue-600 hover:underline"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Fit Level */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nível de Aderência
            </label>
            <div className="space-y-1">
              {[
                { id: "all", label: "Todas as aderências" },
                { id: "alta", label: "Alta aderência (90+ pts)" },
                { id: "media", label: "Média aderência" },
                { id: "baixa", label: "Baixa aderência" },
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fit"
                    checked={fitFilter === opt.id}
                    onChange={() => setFitFilter(opt.id as any)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Website Status */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Presença de Website
            </label>
            <div className="space-y-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="web"
                  checked={websiteFilter === "all"}
                  onChange={() => setWebsiteFilter("all")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Todos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="web"
                  checked={websiteFilter === "no_site"}
                  onChange={() => setWebsiteFilter("no_site")}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <span className="text-teal-700 dark:text-teal-400 font-medium">
                  Sem website (Oportunidade)
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="web"
                  checked={websiteFilter === "with_site"}
                  onChange={() => setWebsiteFilter("with_site")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Com website cadastrado</span>
              </label>
            </div>
          </div>

          {/* Phone Status */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Canal de Telefone
            </label>
            <div className="space-y-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ph"
                  checked={phoneFilter === "all"}
                  onChange={() => setPhoneFilter("all")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Todos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ph"
                  checked={phoneFilter === "mobile"}
                  onChange={() => setPhoneFilter("mobile")}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  Com celular / WhatsApp
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ph"
                  checked={phoneFilter === "fixed"}
                  onChange={() => setPhoneFilter("fixed")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Telefone fixo apenas</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ph"
                  checked={phoneFilter === "none"}
                  onChange={() => setPhoneFilter("none")}
                  className="text-slate-500"
                />
                <span>Sem telefone público</span>
              </label>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nota Mínima
            </label>
            <div className="flex items-center gap-1">
              {[0, 3.5, 4.0, 4.5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRatingFilter(r)}
                  className={`flex-1 py-1 rounded text-xs font-mono border ${
                    minRatingFilter === r
                      ? "bg-blue-600 text-white border-blue-600 font-bold"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600"
                  }`}
                >
                  {r === 0 ? "Todas" : `${r}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Max Distance Slider */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Distância Máxima</span>
              <span className="font-mono text-blue-600">{maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Neighborhoods */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Bairros na Região
            </label>
            <div className="space-y-1 max-h-36 overflow-y-auto">
              {availableNeighborhoods.map((n) => {
                const isChecked = selectedNeighborhoods.includes(n);
                return (
                  <label key={n} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        if (isChecked) {
                          setSelectedNeighborhoods(selectedNeighborhoods.filter((item) => item !== n));
                        } else {
                          setSelectedNeighborhoods([...selectedNeighborhoods, n]);
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="truncate">{n}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Center / Right Content: Leads Display (9 cols on md) */}
        <main className="md:col-span-9 space-y-4">
          {/* Header of results list */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Exibindo <strong className="text-slate-900 dark:text-white font-mono">{filteredLeads.length}</strong> de{" "}
              {leads.length} empresas
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleSelectAll}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {selectedIds.size === filteredLeads.length && filteredLeads.length > 0
                  ? "Desmarcar todos"
                  : "Selecionar todos visíveis"}
              </button>
            </div>
          </div>

          {/* EMPTY STATE */}
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Nenhuma empresa encontrada com estes filtros
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Tente relaxar os critérios de busca: desmarque filtros de nota mínima ou aumente o raio de alcance para descobrir mais clínicas na Grande Florianópolis.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setQuickFilterNoWebsite(false);
                  setQuickFilterWhatsApp(false);
                  setQuickFilterHighFit(false);
                  setQuickFilterOpenNow(false);
                  setFitFilter("all");
                  setWebsiteFilter("all");
                  setPhoneFilter("all");
                  setMinRatingFilter(0);
                  setMaxDistanceKm(50);
                  setSelectedNeighborhoods([]);
                }}
                className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : viewMode === "list" ? (
            /* LIST VIEW */
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  isSelected={selectedIds.has(lead.id)}
                  onToggleSelect={handleToggleSelect}
                  isSaved={savedIds.has(lead.id)}
                  onToggleSave={handleToggleSave}
                  isContacted={contactedIds.has(lead.id)}
                  onToggleContacted={handleToggleContacted}
                  onDiscard={handleDiscard}
                  onOpenNote={(l) => setNoteLead(l)}
                  onOpenReport={(l) => setReportLead(l)}
                  onSelectLeadDetails={(l) => setDetailLead(l)}
                  userNote={userNotes[lead.id]}
                />
              ))}
            </div>
          ) : viewMode === "table" ? (
            /* TABLE VIEW */
            <LeadTable
              leads={filteredLeads}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              contactedIds={contactedIds}
              onToggleContacted={handleToggleContacted}
              onOpenNote={(l) => setNoteLead(l)}
              onSelectLeadDetails={(l) => setDetailLead(l)}
            />
          ) : (
            /* MAP VIEW */
            <LeadMap
              leads={filteredLeads}
              radiusKm={params.radiusKm || 10}
              centerLocationName={params.locations[0] || "Centro, Florianópolis"}
              onSelectLeadDetails={(l) => setDetailLead(l)}
            />
          )}
        </main>
      </div>

      {/* Slide-over Lead Detail Drawer */}
      <LeadDetailDrawer
        lead={detailLead}
        isOpen={!!detailLead}
        onClose={() => setDetailLead(null)}
        userNote={detailLead ? userNotes[detailLead.id] : ""}
        onSaveNote={(leadId, note) => {
          setUserNotes((prev) => ({ ...prev, [leadId]: note }));
        }}
        isSaved={detailLead ? savedIds.has(detailLead.id) : false}
        onToggleSave={handleToggleSave}
        isContacted={detailLead ? contactedIds.has(detailLead.id) : false}
        onToggleContacted={handleToggleContacted}
        onShowToast={onShowToast}
      />

      {/* Note Modal */}
      <NoteModal
        lead={noteLead}
        initialNote={noteLead ? userNotes[noteLead.id] || "" : ""}
        isOpen={!!noteLead}
        onClose={() => setNoteLead(null)}
        onSave={(leadId, note) => {
          setUserNotes((prev) => ({ ...prev, [leadId]: note }));
          onShowToast("Nota salva com sucesso!");
        }}
      />

      {/* Report Modal */}
      <ReportModal
        lead={reportLead}
        isOpen={!!reportLead}
        onClose={() => setReportLead(null)}
        onSubmit={(leadId, issue) => {
          onShowToast("Reporte enviado para a curadoria do SoulLocal. Obrigado!");
        }}
      />
    </div>
  );
};
