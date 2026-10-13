import { Lead } from "./leads";

export interface ActivityItem {
  id: string;
  type: "task" | "note" | "message" | "automation" | "enrichment";
  title: string;
  content: string;
  createdAt: string;
  author: string;
  isCompleted?: boolean;
  dueDate?: string;
  channel?: "whatsapp" | "email" | "phone";
}

export interface CompanyDeal {
  id: string;
  title: string;
  value: number;
  stage: "qualificacao" | "apresentacao" | "proposta" | "negociacao" | "ganho" | "perdido";
  probability: number;
  expectedCloseDate: string;
}

export interface CompanyAutomation {
  id: string;
  name: string;
  channel: "whatsapp" | "email" | "multicanal";
  status: "idle" | "running" | "completed" | "paused";
  currentStep: number;
  totalSteps: number;
  lastExecution?: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    delayDays: number;
    status: "done" | "current" | "pending";
  }[];
}

export interface CompanyEnrichment {
  cnpj: string;
  razaoSocial: string;
  abertura: string;
  capitalSocial: string;
  socios: { nome: string; cargo: string }[];
  instagram?: string;
  linkedin?: string;
  tecnologias: string[];
  faturamentoEstimado: string;
  funcionariosEstimados: string;
  emailCorporativo: string;
  isEnriched: boolean;
}

export interface CompanyProfileData {
  leadId: string;
  statusPipeline: "1" | "2" | "3" | "4" | "5" | "G" | "P"; // 1=Triagem, 2=Contato, 3=Qualificado, 4=Proposta, 5=Negociação, G=Ganho, P=Perdido
  enrichment: CompanyEnrichment;
  deals: CompanyDeal[];
  automation: CompanyAutomation;
  activities: ActivityItem[];
  files: { id: string; name: string; size: string; date: string }[];
}

export const DEFAULT_AUTOMATION: CompanyAutomation = {
  id: "auto-1",
  name: "Cadência WhatsApp · Clínicas Sem Website",
  channel: "whatsapp",
  status: "idle",
  currentStep: 1,
  totalSteps: 3,
  steps: [
    {
      stepNumber: 1,
      title: "Mensagem de Apresentação & Elogio",
      description: "Elogia reputação no Maps e pontua ausência de site para agendamentos online.",
      delayDays: 0,
      status: "pending",
    },
    {
      stepNumber: 2,
      title: "Follow-up com Mini Diagnóstico",
      description: "Envia prévia de página mobile e comparativo com concorrentes da região.",
      delayDays: 2,
      status: "pending",
    },
    {
      stepNumber: 3,
      title: "Chamada para Demonstração de 15 Min",
      description: "Convite direto para apresentação de modelo de alta conversão.",
      delayDays: 4,
      status: "pending",
    },
  ],
};

export const createDefaultProfileData = (lead: Lead): CompanyProfileData => {
  const isMedical = lead.primaryTypeDisplayName.toLowerCase().includes("médic") || lead.primaryTypeDisplayName.toLowerCase().includes("dermato");
  const isDental = lead.primaryTypeDisplayName.toLowerCase().includes("odonto");

  return {
    leadId: lead.id,
    statusPipeline: "1",
    enrichment: {
      cnpj: lead.id === "lead-01" ? "34.891.402/0001-19" : "28.192.839/0001-84",
      razaoSocial: lead.displayName + " Ltda.",
      abertura: "14/03/2018 (6 anos de atividade)",
      capitalSocial: "R$ 150.000,00",
      socios: [
        { nome: "Dra. Patrícia Silveira Mendes", cargo: "Sócia-Administradora" },
        { nome: "Dr. Carlos Eduardo Silveira", cargo: "Sócio Cotista" },
      ],
      instagram: "@" + lead.displayName.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 18),
      linkedin: "linkedin.com/company/" + lead.displayName.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 15),
      tecnologias: lead.websiteUri
        ? ["WordPress 6.4", "Google Analytics 4", "WhatsApp Click2Call", "Sem Pixel Meta"]
        : ["Sem Website Registrado", "Google Business Profile Ativo", "WhatsApp Business", "Ausência de SEO"],
      faturamentoEstimado: "R$ 60.000 – R$ 120.000 / mês",
      funcionariosEstimados: "6 a 12 colaboradores",
      emailCorporativo: "contato@" + lead.displayName.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12) + ".com.br",
      isEnriched: lead.id === "lead-01",
    },
    deals: [
      {
        id: "deal-1",
        title: "Criação de Website + Gestão Google Meu Negócio",
        value: 3800,
        stage: "qualificacao",
        probability: 60,
        expectedCloseDate: "28/10/2026",
      },
    ],
    automation: { ...DEFAULT_AUTOMATION },
    activities: [
      {
        id: "act-1",
        type: "task",
        title: "Ligar para recepcionista e mapear horário da Dra. Patrícia",
        content: "Confirmar se o WhatsApp comercial (48) 99124-8830 é atendido diretamente por ela ou pela secretária Paula.",
        createdAt: "Hoje às 11:30",
        author: "SoulLocal Prospecção",
        isCompleted: false,
        dueDate: "Amanhã às 14:00",
      },
      {
        id: "act-2",
        type: "task",
        title: "Enviar prévia do mockup mobile do consultório",
        content: "Preparar 2 telas no Figma com botão flutuante de agendamento integrado ao WhatsApp.",
        createdAt: "Hoje às 10:15",
        author: "SoulLocal Prospecção",
        isCompleted: false,
        dueDate: "Quarta-feira",
      },
      {
        id: "act-3",
        type: "note",
        title: "Diagnóstico inicial da ficha do Google Maps",
        content: `A empresa possui excelente nota (${lead.rating || 4.8}★ com ${lead.userRatingCount || 100} avaliações). Pacientes elogiam o atendimento, mas comentam que não encontram link de agendamento online. Gancho perfeito para venda de site institucional.`,
        createdAt: "Ontem às 16:45",
        author: "Marcelo Menezes",
      },
      {
        id: "act-4",
        type: "enrichment",
        title: "Varredura automática e cálculo de score concluído",
        content: `Score de aderência calculado em ${lead.score}/100 pts. Fit classificado como '${lead.fit}'. Distância de ${lead.distanceKm.toFixed(1)} km do centro de busca.`,
        createdAt: lead.capturedAt,
        author: "SoulLocal Engine",
      },
    ],
    files: [
      {
        id: "f-1",
        name: "Proposta_Comercial_SoulLocal_Clinicas.pdf",
        size: "1.4 MB",
        date: "Hoje às 09:30",
      },
      {
        id: "f-2",
        name: "Diagnostico_Presenca_GoogleMaps.pdf",
        size: "820 KB",
        date: "Ontem",
      },
    ],
  };
};
