import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Compass,
  Sliders,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Search,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Layers,
  ArrowRight,
  Map,
  ShieldCheck,
  Info
} from "lucide-react";
import {
  MOCK_CATEGORIES,
  MOCK_LOCATION_SUGGESTIONS,
  MOCK_RECENT_PROSPECTS,
  MapCategory,
  LocationSuggestion,
  RecentProspect
} from "../mocks/leads";

interface ProspectingFormScreenProps {
  onStartProspecting: (params: ProspectingParams) => void;
}

export interface ProspectingParams {
  offer: string;
  niche: string;
  includedCategories: string[];
  excludedCategories: string[];
  locationMode: "custom" | "current";
  locations: string[];
  radiusKm: number;
  leadsLimit: number;
  requestIntervalSec: number;
  minRating: number;
  minReviews: number;
  onlyWithoutWebsite: boolean;
  onlyWithPhone: boolean;
  onlyNewLeads: boolean;
  onlyOperational: boolean;
}

export const ProspectingFormScreen: React.FC<ProspectingFormScreenProps> = ({
  onStartProspecting,
}) => {
  // Offer state
  const [offer, setOffer] = useState(
    "Desenvolvo sites de alta conversão e gestão de Google Meu Negócio para clínicas e consultórios particulares"
  );
  const [niche, setNiche] = useState("Clínicas Médicas & Odontologia");

  // Categories
  const [includedCategories, setIncludedCategories] = useState<string[]>([
    "medical_clinic",
    "dental_clinic",
    "dermatologist"
  ]);
  const [excludedCategories, setExcludedCategories] = useState<string[]>([
    "hospital_publico"
  ]);
  const [catSearchQuery, setCatSearchQuery] = useState("");

  // Region
  const [locationMode, setLocationMode] = useState<"custom" | "current">("custom");
  const [showLocationDeniedWarning, setShowLocationDeniedWarning] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<LocationSuggestion[]>([
    MOCK_LOCATION_SUGGESTIONS[0] // Centro, Florianópolis
  ]);
  const [locationQuery, setLocationQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [radiusKm, setRadiusKm] = useState<number>(10);

  // Advanced Configurations (Collapsible Card)
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [leadsLimit, setLeadsLimit] = useState<number>(50);
  const [requestIntervalSec, setRequestIntervalSec] = useState<number>(1.5);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [minReviews, setMinReviews] = useState<number>(10);
  const [onlyWithoutWebsite, setOnlyWithoutWebsite] = useState<boolean>(false);
  const [onlyWithPhone, setOnlyWithPhone] = useState<boolean>(true);
  const [onlyNewLeads, setOnlyNewLeads] = useState<boolean>(true);
  const [onlyOperational, setOnlyOperational] = useState<boolean>(true);

  // Pre-fill Offer Examples
  const offerExamples = [
    {
      title: "Clínicas & Médicos",
      text: "Desenvolvo sites e gestão de Google Meu Negócio para clínicas e consultórios",
      niche: "Clínicas Médicas",
      cats: ["medical_clinic", "dental_clinic", "dermatologist"]
    },
    {
      title: "Academias & Studios",
      text: "Gestão de tráfego pago e Meta Ads para atrair alunos para estúdios fitness e crossfit",
      niche: "Fitness & Esportes",
      cats: ["gym"]
    },
    {
      title: "Restaurantes & Bares",
      text: "Fotografia gastronômica e marketing de atração local para restaurantes conceituados",
      niche: "Gastronomia",
      cats: ["restaurant"]
    }
  ];

  const handleApplyExample = (ex: typeof offerExamples[0]) => {
    setOffer(ex.text);
    setNiche(ex.niche);
    setIncludedCategories(ex.cats);
  };

  const handleApplyRecent = (rec: RecentProspect) => {
    setOffer(rec.offerSnippet);
    setRadiusKm(rec.radiusKm);
  };

  const toggleIncludedCategory = (id: string) => {
    if (includedCategories.includes(id)) {
      setIncludedCategories(includedCategories.filter((c) => c !== id));
    } else {
      if (includedCategories.length < 5) {
        setIncludedCategories([...includedCategories, id]);
      }
    }
  };

  const addLocation = (loc: LocationSuggestion) => {
    if (!selectedLocations.some((l) => l.id === loc.id)) {
      setSelectedLocations([...selectedLocations, loc]);
    }
    setLocationQuery("");
    setShowLocationDropdown(false);
  };

  const removeLocation = (id: string) => {
    setSelectedLocations(selectedLocations.filter((l) => l.id !== id));
  };

  const handleUseCurrentLocation = () => {
    setLocationMode("current");
    // Show mock demonstration of permission handling
    setShowLocationDeniedWarning(true);
  };

  const handleStart = () => {
    onStartProspecting({
      offer,
      niche,
      includedCategories,
      excludedCategories,
      locationMode,
      locations: selectedLocations.map((l) => l.name),
      radiusKm,
      leadsLimit,
      requestIntervalSec,
      minRating,
      minReviews,
      onlyWithoutWebsite,
      onlyWithPhone,
      onlyNewLeads,
      onlyOperational,
    });
  };

  const isFormValid = offer.trim().length >= 10 && selectedLocations.length > 0;

  // Filtered categories for autocomplete
  const filteredCategories = MOCK_CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(catSearchQuery.toLowerCase()) ||
      c.group.toLowerCase().includes(catSearchQuery.toLowerCase())
  );

  // Filtered locations
  const filteredLocations = MOCK_LOCATION_SUGGESTIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(locationQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(locationQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Title & Headline */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Nova Prospecção B2B
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Defina sua oferta comercial e encontre empresas no Google Maps com alto potencial de compra e canais diretos de contato.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Step Prospecting Form (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SEÇÃO 1: SUA OFERTA */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Sua Oferta Comercial
                </h2>
              </div>
              <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                {offer.length} caracteres
              </span>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                O que você vende e para quem quer vender?
              </label>
              <textarea
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                rows={3}
                placeholder="Ex.: Crio sites rápidos e faço otimização de ficha do Google Meu Negócio para clínicas e consultórios médicos da região..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              />

              {/* AI conversion indicator */}
              <div className="flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 p-2 rounded-md border border-blue-100 dark:border-blue-900/40">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-[11px]">
                  A IA do SoulLocal decompõe esta descrição em operadores de busca semântica, termos de nicho e exclusões automáticas.
                </span>
              </div>

              {/* Clickable Examples */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Exemplos prontos para testar:
                </span>
                <div className="flex flex-wrap gap-2">
                  {offerExamples.map((ex, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyExample(ex)}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      {ex.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: PÚBLICO-ALVO (OPCIONAL) */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Público-alvo <span className="text-xs font-normal text-slate-400">(opcional)</span>
              </h2>
            </div>

            <div className="space-y-4">
              {/* Nicho */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nicho / Segmento
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="Ex.: Clínicas Médicas, Academias, Restaurantes..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Categorias Google Maps para incluir */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Categorias do Google Maps para incluir (até 5)
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {includedCategories.length}/5 selecionadas
                  </span>
                </div>

                {/* Selected Categories Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2 min-h-[32px] p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  {includedCategories.length === 0 && (
                    <span className="text-xs text-slate-400 italic px-1">
                      Nenhuma categoria selecionada. Clique nas opções abaixo.
                    </span>
                  )}
                  {includedCategories.map((catId) => {
                    const catObj = MOCK_CATEGORIES.find((c) => c.id === catId);
                    return (
                      <span
                        key={catId}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      >
                        {catObj ? catObj.name : catId}
                        <button
                          type="button"
                          onClick={() => toggleIncludedCategory(catId)}
                          className="hover:text-blue-900 dark:hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>

                {/* Searchable dropdown options */}
                <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto p-1 text-xs">
                  {filteredCategories.slice(0, 8).map((cat) => {
                    const isSelected = includedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleIncludedCategory(cat.id)}
                        className={`px-2 py-1 rounded text-xs transition-colors border ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categorias para excluir */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Categorias para excluir da busca
                </label>
                <div className="flex flex-wrap gap-1.5 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  {excludedCategories.map((exc, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      {exc === "hospital_publico" ? "Hospital Público / SUS" : exc}
                      <button
                        type="button"
                        onClick={() => setExcludedCategories(excludedCategories.filter((_, idx) => idx !== i))}
                        className="hover:text-slate-900 dark:hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      if (!excludedCategories.includes("farmacia")) {
                        setExcludedCategories([...excludedCategories, "farmacia"]);
                      }
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1"
                  >
                    + Excluir farmácias
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 3: REGIÃO & LOCALIZAÇÃO */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Região Geográfica & Raio
              </h2>
            </div>

            <div className="space-y-4">
              {/* Mode switch */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLocationMode("custom");
                    setShowLocationDeniedWarning(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    locationMode === "custom"
                      ? "bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-semibold"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Escolher local
                </button>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    locationMode === "current"
                      ? "bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-semibold"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Usar minha localização</span>
                </button>
              </div>

              {/* Location Denied Warning Demonstration */}
              {showLocationDeniedWarning && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 space-y-1 animate-in fade-in">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Permissão de localização do navegador não concedida
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Para usar seu GPS atual, libere o acesso nas configurações do navegador ou digite a cidade/bairro manualmente no campo abaixo.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setLocationMode("custom");
                      setShowLocationDeniedWarning(false);
                    }}
                    className="text-[11px] font-semibold text-amber-900 dark:text-amber-100 underline mt-1"
                  >
                    Digitar local manualmente
                  </button>
                </div>
              )}

              {/* Location Input with Mock Suggestions */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Cidades, bairros ou CEPs de prospecção
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => {
                      setLocationQuery(e.target.value);
                      setShowLocationDropdown(true);
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                    placeholder="Digite Florianópolis, Trindade, São José, Palhoça..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 max-h-52 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => addLocation(loc)}
                        className="w-full text-left p-2.5 hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-white block">
                              {loc.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {loc.subtitle}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                          {loc.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Locations Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedLocations.map((loc) => (
                    <span
                      key={loc.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      <MapPin className="w-3 h-3 text-blue-600" />
                      <span>{loc.name}</span>
                      <button
                        type="button"
                        onClick={() => removeLocation(loc.id)}
                        className="hover:text-rose-600 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Radius Selector: 1, 5, 10, 25 (default), 50, 100, 250 km */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Raio de alcance da varredura
                  </label>
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                    {radiusKm} km ao redor do ponto central
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-xs">
                  {[1, 5, 10, 25, 50, 100, 250].map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => setRadiusKm(km)}
                      className={`py-2 text-center rounded-lg font-mono font-medium transition-all ${
                        radiusKm === km
                          ? "bg-blue-600 text-white font-bold shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {km}k
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 4: CONFIGURAÇÕES DA COLETA (CARD RECOLHÍVEL) */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <button
              type="button"
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-500" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Configurações Avançadas da Coleta
                  </h3>
                  {!isConfigOpen && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {leadsLimit} leads · {requestIntervalSec}s intervalo · Nota min {minRating}★ · {onlyWithoutWebsite ? "Sem website" : "Todos websites"}
                    </p>
                  )}
                </div>
              </div>
              {isConfigOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {isConfigOpen && (
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs bg-slate-50/30 dark:bg-slate-900/40">
                {/* Leads count */}
                <div>
                  <div className="flex justify-between mb-1.5 font-medium">
                    <span>Quantidade máxima de leads</span>
                    <span className="font-mono font-bold text-blue-600 tabular-nums">
                      {leadsLimit} leads
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[10, 25, 50, 100, 250, 500].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setLeadsLimit(q)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                          leadsLimit === q
                            ? "bg-blue-600 text-white font-bold"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intervalo entre pesquisas */}
                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span>Intervalo entre requisições</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                      {requestIntervalSec} s
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={requestIntervalSec}
                    onChange={(e) => setRequestIntervalSec(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Emula comportamento humano de navegação para evitar rate-limiting ou bloqueios temporários.
                  </p>
                </div>

                {/* Nota mínima & Avaliações */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium mb-1.5">Nota mínima no Google</label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value="0">Qualquer nota</option>
                      <option value="3.0">3.0+ estrelas</option>
                      <option value="3.5">3.5+ estrelas</option>
                      <option value="4.0">4.0+ estrelas</option>
                      <option value="4.5">4.5+ estrelas (alta reputação)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-1.5">Mínimo de avaliações</label>
                    <div className="flex items-center gap-1.5">
                      {[0, 10, 50, 100].map((rev) => (
                        <button
                          key={rev}
                          type="button"
                          onClick={() => setMinReviews(rev)}
                          className={`flex-1 py-1 rounded text-xs font-mono border ${
                            minReviews === rev
                              ? "bg-blue-600 text-white border-blue-600 font-bold"
                              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          {rev}+
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Switches */}
                <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-700 dark:text-slate-300">
                      Somente sem website cadastrado <span className="text-teal-600 font-semibold">(Oportunidade)</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={onlyWithoutWebsite}
                      onChange={(e) => setOnlyWithoutWebsite(e.target.checked)}
                      className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-700 dark:text-slate-300">
                      Somente com telefone disponível
                    </span>
                    <input
                      type="checkbox"
                      checked={onlyWithPhone}
                      onChange={(e) => setOnlyWithPhone(e.target.checked)}
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-700 dark:text-slate-300">
                      Somente leads novos (nunca capturados anteriormente)
                    </span>
                    <input
                      type="checkbox"
                      checked={onlyNewLeads}
                      onChange={(e) => setOnlyNewLeads(e.target.checked)}
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-700 dark:text-slate-300">
                      Somente empresas em funcionamento (ignorar fechadas)
                    </span>
                    <input
                      type="checkbox"
                      checked={onlyOperational}
                      onChange={(e) => setOnlyOperational(e.target.checked)}
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>
                </div>

                {/* Estimativa de consultas */}
                <div className="p-2.5 bg-blue-50/50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 flex items-center justify-between">
                  <span>Estimativa de consultas à API do Google Places:</span>
                  <span className="font-mono font-bold">~14 queries · ~35s estimados</span>
                </div>
              </div>
            )}
          </section>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleStart}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white hover:shadow-md hover:scale-[1.005]"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Iniciar Prospecção Inteligente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {!isFormValid && (
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Preencha a descrição da oferta e confirme ao menos uma região para liberar a busca.
              </p>
            )}
          </div>

          {/* PROSPECÇÕES RECENTES */}
          <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Prospecções Recentes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MOCK_RECENT_PROSPECTS.map((rec) => (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => handleApplyRecent(rec)}
                  className="p-3 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-xs group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600">
                      {rec.title}
                    </span>
                    <RotateCcw className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                    {rec.location} · {rec.radiusKm} km
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{rec.leadsCount} leads</span>
                    <span>{rec.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky "Resumo da Prospecção" + Live Interactive Vector Preview (5 cols on lg) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Resumo da Prospecção
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                Tempo Real
              </span>
            </div>

            {/* Live Interactive SVG Geographic Simulation */}
            <div className="relative w-full h-48 rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 mb-4">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 200"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Water background */}
                <rect width="400" height="200" fill="#E0F2FE" className="dark:opacity-10" />

                {/* Simplified mainland & island shape */}
                <path
                  d="M 0 0 L 130 0 Q 140 80 130 140 L 0 200 Z"
                  className="fill-slate-200/90 dark:fill-slate-800"
                />
                <path
                  d="M 160 30 Q 190 10 220 20 Q 260 70 250 140 Q 210 190 180 170 Q 160 120 160 30 Z"
                  className="fill-slate-200/90 dark:fill-slate-800"
                />

                {/* Bridges */}
                <line x1="135" y1="95" x2="165" y2="92" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2,2" />

                {/* Dynamic Radius Circle */}
                <circle
                  cx="180"
                  cy="95"
                  r={Math.min(90, Math.max(15, radiusKm * 2.8))}
                  fill="#3B82F6"
                  fillOpacity="0.15"
                  stroke="#2563EB"
                  strokeWidth="1.5"
                  strokeDasharray="4,2"
                />

                {/* Center marker */}
                <circle cx="180" cy="95" r="5" fill="#2563EB" />
                <circle cx="180" cy="95" r="9" fill="#2563EB" fillOpacity="0.3" />
              </svg>

              <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 dark:bg-slate-900/90 rounded text-[10px] font-mono font-medium backdrop-blur-xs border border-slate-200 dark:border-slate-800">
                Raio: {radiusKm} km · Centro: {selectedLocations[0]?.name.split(",")[0] || "Centro"}
              </div>
            </div>

            {/* Configuration Spec Checklist */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Oferta:</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                  {offer || "Nenhuma oferta descrita"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 text-[11px] block">Nicho:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {niche || "Amplo"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Limite de Leads:</span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {leadsLimit} empresas
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-[11px] block mb-1">
                  Categorias incluídas:
                </span>
                <div className="flex flex-wrap gap-1">
                  {includedCategories.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300"
                    >
                      {MOCK_CATEGORIES.find((cat) => cat.id === c)?.name || c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Nota mínima:</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                    {minRating > 0 ? `${minRating}★` : "Qualquer"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Filtro de oportunidade:</span>
                  <span className="font-medium text-teal-600">
                    {onlyWithoutWebsite ? "Apenas sem website" : "Todos os perfis"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
