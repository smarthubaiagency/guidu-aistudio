export type Lead = {
  id: string;
  displayName: string;
  primaryTypeDisplayName: string;
  types: string[];
  formattedAddress: string;
  neighborhood?: string;
  city: string;
  state: string;
  postalCode?: string;
  distanceKm: number;
  rating?: number;
  userRatingCount?: number;
  businessStatus: "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY";
  openNow?: boolean;
  weekdayHours?: string[];
  nationalPhoneNumber?: string;
  isMobile?: boolean;
  websiteUri?: string;
  googleMapsUri: string;
  photoUrl?: string;
  summary?: string;
  priceLevel?: "INEXPENSIVE" | "MODERATE" | "EXPENSIVE";
  paymentOptions?: string[];
  accessibility?: string[];
  latestReview?: { author: string; rating: number; relativeTime: string; text: string };
  score: number;
  scoreBreakdown: { aderencia: number; reputacao: number; contato: number; proximidade: number; atividade: number };
  fit: "alta" | "media" | "baixa";
  sources: ("oficial" | "publico" | "nao_confirmado")[];
  capturedAt: string;
  verifiedAt?: string;
  lastReviewAt?: string;
  isNew: boolean;
};

export type LocationSuggestion = {
  id: string;
  name: string;
  type: "cidade" | "bairro" | "regiao" | "cep";
  city: string;
  state: string;
  subtitle: string;
};

export type MapCategory = {
  id: string;
  name: string;
  group: string;
  iconName?: string;
};

export type RecentProspect = {
  id: string;
  title: string;
  offerSnippet: string;
  location: string;
  radiusKm: number;
  leadsCount: number;
  date: string;
  filtersSummary: string;
};

export const MOCK_CATEGORIES: MapCategory[] = [
  { id: "medical_clinic", name: "Clínica médica", group: "Saúde" },
  { id: "dental_clinic", name: "Consultório odontológico", group: "Saúde" },
  { id: "dermatologist", name: "Dermatologista", group: "Saúde" },
  { id: "physiotherapist", name: "Fisioterapia e reabilitação", group: "Saúde" },
  { id: "psychologist", name: "Psicólogo e psiquiatria", group: "Saúde" },
  { id: "pediatrician", name: "Clínica pediátrica", group: "Saúde" },
  { id: "ophthalmologist", name: "Oftalmologista", group: "Saúde" },
  { id: "gym", name: "Academia e estúdio fitness", group: "Bem-estar" },
  { id: "spa", name: "Clínica de estética e spa", group: "Bem-estar" },
  { id: "law_firm", name: "Escritório de advocacia", group: "Serviços" },
  { id: "accounting", name: "Escritório de contabilidade", group: "Serviços" },
  { id: "restaurant", name: "Restaurante", group: "Alimentação" },
  { id: "veterinary_care", name: "Clínica veterinária e pet shop", group: "Animais" },
  { id: "real_estate_agency", name: "Imobiliária", group: "Imóveis" },
  { id: "architect", name: "Escritório de arquitetura", group: "Design" }
];

export const MOCK_LOCATION_SUGGESTIONS: LocationSuggestion[] = [
  {
    id: "fln-centro",
    name: "Centro, Florianópolis",
    type: "bairro",
    city: "Florianópolis",
    state: "SC",
    subtitle: "Região Central · Alta densidade de clínicas"
  },
  {
    id: "fln-trindade",
    name: "Trindade, Florianópolis",
    type: "bairro",
    city: "Florianópolis",
    state: "SC",
    subtitle: "Polo universitário e centros médicos"
  },
  {
    id: "fln-agronomica",
    name: "Agronômica, Florianópolis",
    type: "bairro",
    city: "Florianópolis",
    state: "SC",
    subtitle: "Avenida Beira-Mar Norte e hospitais"
  },
  {
    id: "fln-lagoa",
    name: "Lagoa da Conceição, Florianópolis",
    type: "bairro",
    city: "Florianópolis",
    state: "SC",
    subtitle: "Leste da Ilha · Clínicas de bem-estar e estética"
  },
  {
    id: "fln-campeche",
    name: "Campeche, Florianópolis",
    type: "bairro",
    city: "Florianópolis",
    state: "SC",
    subtitle: "Sul da Ilha · Região em forte expansão"
  },
  {
    id: "sj-kobrasol",
    name: "Kobrasol, São José",
    type: "bairro",
    city: "São José",
    state: "SC",
    subtitle: "Polo comercial da Grande Florianópolis"
  },
  {
    id: "pal-pagani",
    name: "Pagani, Palhoça",
    type: "bairro",
    city: "Palhoça",
    state: "SC",
    subtitle: "Centro cívico e novos edifícios comerciais"
  },
  {
    id: "cep-88015",
    name: "CEP 88015-100",
    type: "cep",
    city: "Florianópolis",
    state: "SC",
    subtitle: "Av. Pref. Osmar Cunha, Centro"
  }
];

export const MOCK_RECENT_PROSPECTS: RecentProspect[] = [
  {
    id: "rec-1",
    title: "Sites & GMB para Clínicas Médicas",
    offerSnippet: "Desenvolvo sites e gestão de Google Meu Negócio para clínicas e consultórios particulares",
    location: "Centro, Florianópolis - SC",
    radiusKm: 10,
    leadsCount: 48,
    date: "Hoje às 09:14",
    filtersSummary: "Nota 4.0+ · Com WhatsApp · Sem site destacado"
  },
  {
    id: "rec-2",
    title: "Tráfego Pago para Estúdios Fitness",
    offerSnippet: "Assessoria de aquisição de alunos via Meta Ads e Google Ads para academias e estúdios",
    location: "Kobrasol, São José - SC",
    radiusKm: 15,
    leadsCount: 32,
    date: "Ontem às 16:40",
    filtersSummary: "Nota 4.5+ · Somente novos leads"
  },
  {
    id: "rec-3",
    title: "Contabilidade Consultiva p/ Restaurantes",
    offerSnippet: "Redução tributária e BPO financeiro especializado em bares e gastronomia local",
    location: "Lagoa da Conceição, Florianópolis - SC",
    radiusKm: 25,
    leadsCount: 64,
    date: "09 de Outubro",
    filtersSummary: "Em funcionamento · Com telefone"
  }
];

export const MOCK_GENERATED_TERMS = {
  includedTerms: [
    "clínica médica florianópolis",
    "consultório médico particular",
    "dermatologista centro florianópolis",
    "clínica odontológica estética",
    "pediatra consultório particular",
    "fisioterapia ortopédica e pilates"
  ],
  excludedTerms: [
    "hospital público sus",
    "unidade básica de saúde",
    "farmácia de manipulação",
    "distribuidora hospitalar"
  ],
  targetPersona: "Médicos proprietários, dentistas e gestores de clínicas particulares locais",
  keyOpportunityHook: "Empresas com boa reputação (4.5+) mas sem site próprio ou com ficha do Maps sem botão de WhatsApp direto."
};

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead-01",
    displayName: "Clínica DermaFloripa Dermatologia & Laser",
    primaryTypeDisplayName: "Dermatologista",
    types: ["dermatologist", "medical_clinic", "health"],
    formattedAddress: "Av. Prefeito Osmar Cunha, 416, Sala 802, Centro, Florianópolis - SC",
    neighborhood: "Centro",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88015-100",
    distanceKm: 0.8,
    rating: 4.8,
    userRatingCount: 142,
    businessStatus: "OPERATIONAL",
    openNow: true,
    weekdayHours: [
      "Segunda-feira: 08:00 – 19:00",
      "Terça-feira: 08:00 – 19:00",
      "Quarta-feira: 08:00 – 19:00",
      "Quinta-feira: 08:00 – 19:00",
      "Sexta-feira: 08:00 – 18:00",
      "Sábado: Fechado",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 99124-8830",
    isMobile: true,
    websiteUri: undefined, // OPORTUNIDADE QUENTE
    googleMapsUri: "https://maps.google.com/?cid=108392019483019",
    photoUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&auto=format&fit=crop&q=80",
    summary: "Clínica especializada em dermatologia clínica e estética avançada no centro corporativo de Florianópolis. Equipe de duas médicas especialistas.",
    priceLevel: "EXPENSIVE",
    paymentOptions: ["Cartão de crédito", "Cartão de débito", "Pix", "Dinheiro"],
    accessibility: ["Entrada acessível para cadeira de rodas", "Elevador acessível", "Sanitário adaptado"],
    latestReview: {
      author: "Juliana Mendes",
      rating: 5,
      relativeTime: "há 3 dias",
      text: "Atendimento impecável da Dra. Patrícia! Pontual e muito cuidadosa. Tive dificuldade apenas para achar o site para ver os tratamentos, agendei direto pelo WhatsApp."
    },
    score: 95,
    scoreBreakdown: {
      aderencia: 28, // max 30
      reputacao: 25, // max 25
      contato: 20,   // max 20
      proximidade: 12, // max 15
      atividade: 10   // max 10
    },
    fit: "alta",
    sources: ["oficial", "publico"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "12/10/2026, 09:15",
    lastReviewAt: "09/10/2026",
    isNew: true
  },
  {
    id: "lead-02",
    displayName: "Instituto Odontológico Ilha Sul",
    primaryTypeDisplayName: "Consultório odontológico",
    types: ["dental_clinic", "dentist", "health"],
    formattedAddress: "Rua Lauro Linhares, 2123, Sala 304, Trindade, Florianópolis - SC",
    neighborhood: "Trindade",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88036-002",
    distanceKm: 3.4,
    rating: 4.9,
    userRatingCount: 310,
    businessStatus: "OPERATIONAL",
    openNow: true,
    weekdayHours: [
      "Segunda-feira: 08:30 – 19:30",
      "Terça-feira: 08:30 – 19:30",
      "Quarta-feira: 08:30 – 19:30",
      "Quinta-feira: 08:30 – 19:30",
      "Sexta-feira: 08:30 – 18:00",
      "Sábado: 08:30 – 12:30",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 98842-1190",
    isMobile: true,
    websiteUri: "https://institutoilhasulodonto.com.br",
    googleMapsUri: "https://maps.google.com/?cid=894819284918230",
    photoUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&auto=format&fit=crop&q=80",
    summary: "Referência em implantes guiados e alinhadores invisíveis na Trindade. Mais de 12 anos de atuação com três consultórios completos.",
    priceLevel: "MODERATE",
    paymentOptions: ["Cartão de crédito em até 12x", "Pix", "Boleto bancário"],
    accessibility: ["Entrada acessível", "Estacionamento conveniado"],
    latestReview: {
      author: "Rodrigo Fontana",
      rating: 5,
      relativeTime: "há 1 semana",
      text: "Dr. Henrique e equipe excelentes. Consultório ultra moderno com scanner 3D. Estrutura impecável!"
    },
    score: 91,
    scoreBreakdown: {
      aderencia: 27,
      reputacao: 25,
      contato: 20,
      proximidade: 10,
      atividade: 9
    },
    fit: "alta",
    sources: ["oficial", "publico"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "12/10/2026, 09:15",
    lastReviewAt: "05/10/2026",
    isNew: true
  },
  {
    id: "lead-03",
    displayName: "Consultório Dr. Marcos Silveira - Cardiologia",
    primaryTypeDisplayName: "Clínica médica",
    types: ["medical_clinic", "doctor", "health"],
    formattedAddress: "Rua Rui Barbosa, 152, Agronômica, Florianópolis - SC",
    neighborhood: "Agronômica",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88025-300",
    distanceKm: 2.1,
    rating: 4.7,
    userRatingCount: 38,
    businessStatus: "OPERATIONAL",
    openNow: false,
    weekdayHours: [
      "Segunda-feira: 09:00 – 17:00",
      "Terça-feira: 09:00 – 17:00",
      "Quarta-feira: 09:00 – 17:00",
      "Quinta-feira: 09:00 – 17:00",
      "Sexta-feira: 09:00 – 15:00",
      "Sábado: Fechado",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 99615-4422",
    isMobile: true,
    websiteUri: undefined, // OPORTUNIDADE QUENTE
    googleMapsUri: "https://maps.google.com/?cid=384910294820194",
    photoUrl: undefined, // Sem foto do Google
    summary: "Cardiologista intervencionista e exames de ecocardiograma e MAPA. Consultório privativo em edifício comercial na Agronômica.",
    priceLevel: "EXPENSIVE",
    paymentOptions: ["Pix", "Transferência", "Cartão de débito"],
    accessibility: ["Acesso por rampa", "Elevador"],
    latestReview: {
      author: "Clara Bittencourt",
      rating: 5,
      relativeTime: "há 2 semanas",
      text: "Médico atencioso como poucos hoje em dia. Fez checkup completo do meu pai. Super recomendo."
    },
    score: 86,
    scoreBreakdown: {
      aderencia: 28,
      reputacao: 22,
      contato: 19,
      proximidade: 11,
      atividade: 6
    },
    fit: "alta",
    sources: ["oficial", "nao_confirmado"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "11/10/2026, 18:20",
    lastReviewAt: "28/09/2026",
    isNew: false
  },
  {
    id: "lead-04",
    displayName: "Vitalis Fisioterapia Integrada & Studio Pilates",
    primaryTypeDisplayName: "Fisioterapia e reabilitação",
    types: ["physiotherapist", "gym", "health"],
    formattedAddress: "Rodovia Amaro Antônio Vieira, 1050, Itacorubi, Florianópolis - SC",
    neighborhood: "Itacorubi",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88034-101",
    distanceKm: 5.2,
    rating: 4.6,
    userRatingCount: 54,
    businessStatus: "OPERATIONAL",
    openNow: true,
    weekdayHours: [
      "Segunda-feira: 07:00 – 21:00",
      "Terça-feira: 07:00 – 21:00",
      "Quarta-feira: 07:00 – 21:00",
      "Quinta-feira: 07:00 – 21:00",
      "Sexta-feira: 07:00 – 20:00",
      "Sábado: 08:00 – 12:00",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 3234-9011",
    isMobile: false, // Fixo
    websiteUri: "https://vitalisfisioflorianopolis.com.br",
    googleMapsUri: "https://maps.google.com/?cid=748291039482103",
    photoUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80",
    summary: "Reabilitação postural, fisioterapia esportiva e turmas personalizadas de Pilates com no máximo 3 alunos por instrutor.",
    priceLevel: "MODERATE",
    paymentOptions: ["Cartão de crédito", "Pix", "Débito automático"],
    accessibility: ["Entrada no nível da rua", "Vaga exclusiva de embarque"],
    latestReview: {
      author: "Bruno Carvalho",
      rating: 4,
      relativeTime: "há 1 mês",
      text: "Equipe de instrutores muito competente. Espaço agradável no Itacorubi. O telefone fixo às vezes demora um pouco para atender."
    },
    score: 77,
    scoreBreakdown: {
      aderencia: 24,
      reputacao: 21,
      contato: 14,
      proximidade: 10,
      atividade: 8
    },
    fit: "media",
    sources: ["publico"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "10/10/2026, 14:00",
    lastReviewAt: "12/09/2026",
    isNew: true
  },
  {
    id: "lead-05",
    displayName: "Clínica Pediátrica Santa Catarina - Kobrasol",
    primaryTypeDisplayName: "Clínica pediátrica",
    types: ["pediatrician", "medical_clinic", "health"],
    formattedAddress: "Rua Koesa, 298, Kobrasol, São José - SC",
    neighborhood: "Kobrasol",
    city: "São José",
    state: "SC",
    postalCode: "88102-310",
    distanceKm: 7.8,
    rating: 4.9,
    userRatingCount: 189,
    businessStatus: "OPERATIONAL",
    openNow: true,
    weekdayHours: [
      "Segunda-feira: 08:00 – 20:00",
      "Terça-feira: 08:00 – 20:00",
      "Quarta-feira: 08:00 – 20:00",
      "Quinta-feira: 08:00 – 20:00",
      "Sexta-feira: 08:00 – 20:00",
      "Sábado: 08:00 – 14:00",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 99870-5501",
    isMobile: true,
    websiteUri: undefined, // OPORTUNIDADE QUENTE
    googleMapsUri: "https://maps.google.com/?cid=194820194820194",
    photoUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&auto=format&fit=crop&q=80",
    summary: "Espaço humanizado para acompanhamento infantil, neuropediatria e vacinação particular no coração comercial de São José.",
    priceLevel: "MODERATE",
    paymentOptions: ["Cartão de crédito", "Pix", "Convênios selecionados"],
    accessibility: ["Espaço kids adaptado", "Fraldário", "Rampa de acesso"],
    latestReview: {
      author: "Mariana Souza e Silva",
      rating: 5,
      relativeTime: "há 5 dias",
      text: "Dra. Thaís é um anjo! As crianças entram brincando e não têm medo. Ficha do Google sempre atualizada nos horários."
    },
    score: 89,
    scoreBreakdown: {
      aderencia: 28,
      reputacao: 25,
      contato: 20,
      proximidade: 7,
      atividade: 9
    },
    fit: "alta",
    sources: ["oficial", "publico"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "12/10/2026, 09:15",
    lastReviewAt: "07/10/2026",
    isNew: true
  },
  {
    id: "lead-06",
    displayName: "Espaço Integrado de Saúde & Psicoterapia",
    primaryTypeDisplayName: "Psicólogo e psiquiatria",
    types: ["psychologist", "mental_health_clinic", "health"],
    formattedAddress: "Av. Pequeno Príncipe, 1420, Campeche, Florianópolis - SC",
    neighborhood: "Campeche",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88063-000",
    distanceKm: 11.4,
    rating: 4.2,
    userRatingCount: 19,
    businessStatus: "OPERATIONAL",
    openNow: false,
    weekdayHours: [
      "Segunda-feira: 09:00 – 20:00",
      "Terça-feira: 09:00 – 20:00",
      "Quarta-feira: 09:00 – 20:00",
      "Quinta-feira: 09:00 – 20:00",
      "Sexta-feira: 09:00 – 18:00",
      "Sábado: Fechado",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: undefined, // SEM TELEFONE NO MAPS
    isMobile: undefined,
    websiteUri: undefined, // SEM SITE
    googleMapsUri: "https://maps.google.com/?cid=491820491820491",
    photoUrl: undefined,
    summary: "Consultório coletivo de psicólogos clínicos e terapeutas corporais no Sul da Ilha. Atendimento presencial e online.",
    priceLevel: "MODERATE",
    paymentOptions: ["Pix", "Transferência bancária"],
    accessibility: ["Entrada térrea"],
    latestReview: {
      author: "Felipe Nogueira",
      rating: 4,
      relativeTime: "há 3 meses",
      text: "Lugar calmo e acolhedor. Difícil de encontrar contato pela internet, tive que ir pessoalmente pegar o cartão."
    },
    score: 62,
    scoreBreakdown: {
      aderencia: 24,
      reputacao: 18,
      contato: 5,
      proximidade: 8,
      atividade: 7
    },
    fit: "media",
    sources: ["publico", "nao_confirmado"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: undefined,
    lastReviewAt: "14/07/2026",
    isNew: true
  },
  {
    id: "lead-07",
    displayName: "Clínica Oftalmológica Visão Plena",
    primaryTypeDisplayName: "Oftalmologista",
    types: ["ophthalmologist", "medical_clinic", "health"],
    formattedAddress: "Rua Felipe Schmidt, 515, Ed. Pórtico, Centro, Florianópolis - SC",
    neighborhood: "Centro",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88010-001",
    distanceKm: 0.6,
    rating: 4.5,
    userRatingCount: 98,
    businessStatus: "OPERATIONAL",
    openNow: true,
    weekdayHours: [
      "Segunda-feira: 08:00 – 18:00",
      "Terça-feira: 08:00 – 18:00",
      "Quarta-feira: 08:00 – 18:00",
      "Quinta-feira: 08:00 – 18:00",
      "Sexta-feira: 08:00 – 17:00",
      "Sábado: Fechado",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 3224-4000",
    isMobile: false, // Fixo
    websiteUri: "http://visaoplenasc.com.br", // Site antigo sem SSL
    googleMapsUri: "https://maps.google.com/?cid=918273645102938",
    photoUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&auto=format&fit=crop&q=80",
    summary: "Exames de acuidade visual, refração computadorizada, cirurgia refrativa e mapeamento de retina no calçadão do Centro.",
    priceLevel: "EXPENSIVE",
    paymentOptions: ["Cartão de crédito", "Débito", "Pix"],
    accessibility: ["Acesso por elevador", "Portas amplas"],
    latestReview: {
      author: "Renata Abreu",
      rating: 4,
      relativeTime: "há 2 semanas",
      text: "Exames rápidos e precisos. O site deles no link não abre no celular, deu erro de segurança, tive que ligar no fixo."
    },
    score: 74,
    scoreBreakdown: {
      aderencia: 26,
      reputacao: 22,
      contato: 12,
      proximidade: 14,
      atividade: 0
    },
    fit: "media",
    sources: ["oficial"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "08/10/2026, 11:30",
    lastReviewAt: "26/09/2026",
    isNew: false
  },
  {
    id: "lead-08",
    displayName: "Espaço Harmonize Estética Médica Avançada",
    primaryTypeDisplayName: "Clínica de estética e spa",
    types: ["spa", "skin_care_clinic", "health"],
    formattedAddress: "Rua Santos Saraiva, 890, Estreito, Florianópolis - SC",
    neighborhood: "Estreito",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88070-101",
    distanceKm: 4.8,
    rating: 5.0,
    userRatingCount: 76,
    businessStatus: "OPERATIONAL",
    openNow: true,
    weekdayHours: [
      "Segunda-feira: 09:00 – 19:00",
      "Terça-feira: 09:00 – 19:00",
      "Quarta-feira: 09:00 – 19:00",
      "Quinta-feira: 09:00 – 19:00",
      "Sexta-feira: 09:00 – 19:00",
      "Sábado: 09:00 – 14:00",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 99182-3344",
    isMobile: true,
    websiteUri: undefined, // OPORTUNIDADE QUENTE
    googleMapsUri: "https://maps.google.com/?cid=120938475610293",
    photoUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&auto=format&fit=crop&q=80",
    summary: "Harmonização orofacial, bioestimuladores de colágeno e tratamentos estéticos faciais. Foco no público premium continental.",
    priceLevel: "EXPENSIVE",
    paymentOptions: ["Cartão de crédito", "Pix parcelado"],
    accessibility: ["Entrada acessível", "Vaga exclusiva para clientes"],
    latestReview: {
      author: "Gabriela Vasconcelos",
      rating: 5,
      relativeTime: "há 4 dias",
      text: "Simplesmente a melhor clínica de estética de Floripa! Resultados super naturais. Dra. Camila é perfeita!"
    },
    score: 93,
    scoreBreakdown: {
      aderencia: 29,
      reputacao: 25,
      contato: 20,
      proximidade: 10,
      atividade: 9
    },
    fit: "alta",
    sources: ["oficial", "publico"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "12/10/2026, 09:15",
    lastReviewAt: "08/10/2026",
    isNew: true
  },
  {
    id: "lead-09",
    displayName: "Consultório OdontoArte Palhoça",
    primaryTypeDisplayName: "Consultório odontológico",
    types: ["dental_clinic", "dentist", "health"],
    formattedAddress: "Av. Atílio Pedro Pagani, 320, Pagani, Palhoça - SC",
    neighborhood: "Pagani",
    city: "Palhoça",
    state: "SC",
    postalCode: "88132-149",
    distanceKm: 14.2,
    rating: undefined, // SEM AVALIAÇÕES
    userRatingCount: 0, // 0 AVALIAÇÕES
    businessStatus: "OPERATIONAL",
    openNow: true,
    weekdayHours: [
      "Segunda-feira: 08:00 – 18:00",
      "Terça-feira: 08:00 – 18:00",
      "Quarta-feira: 08:00 – 18:00",
      "Quinta-feira: 08:00 – 18:00",
      "Sexta-feira: 08:00 – 18:00",
      "Sábado: Fechado",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 98402-9911",
    isMobile: true,
    websiteUri: "https://odontoartepalhoca.com.br",
    googleMapsUri: "https://maps.google.com/?cid=671029384756102",
    photoUrl: undefined,
    summary: "Clínica recém-inaugurada no centro empresarial de Palhoça. Tratamentos de prótese, limpeza preventiva e clareamento dental.",
    priceLevel: "MODERATE",
    paymentOptions: ["Cartão de crédito", "Pix", "Dinheiro"],
    accessibility: ["Acessível para cadeirantes"],
    latestReview: undefined,
    score: 56,
    scoreBreakdown: {
      aderencia: 24,
      reputacao: 5,
      contato: 18,
      proximidade: 5,
      atividade: 4
    },
    fit: "baixa",
    sources: ["publico", "nao_confirmado"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: undefined,
    lastReviewAt: undefined,
    isNew: true
  },
  {
    id: "lead-10",
    displayName: "Centro de Diagnóstico & Imagem Beira-Mar",
    primaryTypeDisplayName: "Clínica médica",
    types: ["diagnostic_center", "medical_clinic", "health"],
    formattedAddress: "Av. Jornalista Rubens de Arruda Ramos, 1800, Centro, Florianópolis - SC",
    neighborhood: "Centro",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88015-700",
    distanceKm: 1.2,
    rating: 4.4,
    userRatingCount: 412,
    businessStatus: "CLOSED_TEMPORARILY", // FECHADO TEMPORARIAMENTE
    openNow: false,
    weekdayHours: [
      "Fechado temporariamente para expansão e modernização de equipamentos até 20/11/2026."
    ],
    nationalPhoneNumber: "(48) 3212-9000",
    isMobile: false,
    websiteUri: "https://diagnosticosbeiramar.com.br",
    googleMapsUri: "https://maps.google.com/?cid=304918273645102",
    photoUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&auto=format&fit=crop&q=80",
    summary: "Centro de excelência em ressonância magnética, tomografia e ultrassonografia. Unidade Beira-Mar em obras de revitalização.",
    priceLevel: "EXPENSIVE",
    paymentOptions: ["Convênios médicos", "Particular"],
    accessibility: ["Totalmente acessível", "Estacionamento com manobrista"],
    latestReview: {
      author: "Carlos Eduardo Luz",
      rating: 4,
      relativeTime: "há 2 meses",
      text: "Equipe de enfermagem muito cuidadosa na sedação. Espero que reabram logo após a reforma."
    },
    score: 64,
    scoreBreakdown: {
      aderencia: 22,
      reputacao: 22,
      contato: 10,
      proximidade: 14,
      atividade: -4
    },
    fit: "media",
    sources: ["oficial"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "01/10/2026, 10:00",
    lastReviewAt: "15/08/2026",
    isNew: false
  },
  {
    id: "lead-11",
    displayName: "Consultório de Nutrição Clínica & Longevidade Dra. Camila R.",
    primaryTypeDisplayName: "Clínica médica",
    types: ["nutritionist", "medical_clinic", "health"],
    formattedAddress: "Rua Moacir Pereira Júnior, 88, Lagoa da Conceição, Florianópolis - SC",
    neighborhood: "Lagoa da Conceição",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88062-090",
    distanceKm: 12.0,
    rating: 4.9,
    userRatingCount: 44,
    businessStatus: "OPERATIONAL",
    openNow: true,
    weekdayHours: [
      "Segunda-feira: 09:00 – 19:00",
      "Terça-feira: 09:00 – 19:00",
      "Quarta-feira: 09:00 – 19:00",
      "Quinta-feira: 09:00 – 19:00",
      "Sexta-feira: 09:00 – 16:00",
      "Sábado: Fechado",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 99112-7890",
    isMobile: true,
    websiteUri: undefined, // OPORTUNIDADE QUENTE
    googleMapsUri: "https://maps.google.com/?cid=582019482019482",
    photoUrl: "https://images.unsplash.com/photo-1594824813615-585a21040448?w=400&auto=format&fit=crop&q=80",
    summary: "Atendimento nutricional focado em modulação intestinal, atletas de corrida e longevidade saudável no Centrinho da Lagoa.",
    priceLevel: "EXPENSIVE",
    paymentOptions: ["Pix", "Cartão de crédito"],
    accessibility: ["Entrada acessível"],
    latestReview: {
      author: "Vanessa Becker",
      rating: 5,
      relativeTime: "há 6 dias",
      text: "Mudou minha disposição e rotina de treinos! Atendimento pelo WhatsApp da secretária é super ágil."
    },
    score: 87,
    scoreBreakdown: {
      aderencia: 28,
      reputacao: 25,
      contato: 20,
      proximidade: 6,
      atividade: 8
    },
    fit: "alta",
    sources: ["oficial", "publico"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: "12/10/2026, 09:15",
    lastReviewAt: "06/10/2026",
    isNew: true
  },
  {
    id: "lead-12",
    displayName: "Consultório Médico Geral & Medicina Ocupacional Santa Mônica",
    primaryTypeDisplayName: "Clínica médica",
    types: ["doctor", "medical_clinic", "health"],
    formattedAddress: "Av. Madre Benvenuta, 430, Santa Mônica, Florianópolis - SC",
    neighborhood: "Santa Mônica",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88035-000",
    distanceKm: 4.1,
    rating: 3.2,
    userRatingCount: 5,
    businessStatus: "OPERATIONAL",
    openNow: false,
    weekdayHours: [
      "Segunda-feira: 08:00 – 12:00, 14:00 – 17:00",
      "Terça-feira: 08:00 – 12:00, 14:00 – 17:00",
      "Quarta-feira: 08:00 – 12:00, 14:00 – 17:00",
      "Quinta-feira: 08:00 – 12:00, 14:00 – 17:00",
      "Sexta-feira: 08:00 – 12:00",
      "Sábado: Fechado",
      "Domingo: Fechado"
    ],
    nationalPhoneNumber: "(48) 3233-1122",
    isMobile: false, // Fixo
    websiteUri: undefined, // Sem site
    googleMapsUri: "https://maps.google.com/?cid=102938475619283",
    photoUrl: undefined,
    summary: "Exames admissionais e demissionais, ASO e consultas clínicas pontuais. Atendimento por ordem de chegada no turno matutino.",
    priceLevel: "INEXPENSIVE",
    paymentOptions: ["Dinheiro", "Pix"],
    accessibility: ["Entrada com degraus"],
    latestReview: {
      author: "Marcio Silvano",
      rating: 2,
      relativeTime: "há 7 meses",
      text: "Demora no atendimento para fazer o exame do trabalho. Horários confusos na porta."
    },
    score: 41,
    scoreBreakdown: {
      aderencia: 18,
      reputacao: 10,
      contato: 10,
      proximidade: 11,
      atividade: -8
    },
    fit: "baixa",
    sources: ["publico", "nao_confirmado"],
    capturedAt: "12/10/2026, 09:15",
    verifiedAt: undefined,
    lastReviewAt: "04/03/2026",
    isNew: false
  }
];
