import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Toast } from "./components/Toast";
import { DesignDecisionsModal } from "./components/DesignDecisionsModal";
import { ProspectingFormScreen, ProspectingParams } from "./screens/ProspectingFormScreen";
import { ProcessingScreen } from "./screens/ProcessingScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { UiStatesScreen } from "./screens/UiStatesScreen";
import { CompanyProfileScreen } from "./screens/CompanyProfileScreen";
import { MOCK_LEADS, Lead } from "./mocks/leads";
import { CompanyProfileData, createDefaultProfileData } from "./mocks/companyDetails";

export default function App() {
  // Navigation: "form" | "processing" | "results" | "uistates" | "company"
  const [currentScreen, setCurrentScreen] = useState<"form" | "processing" | "results" | "uistates" | "company">("company");

  // Selected lead for full company profile CRM view
  const [selectedLeadId, setSelectedLeadId] = useState<string>("lead-01");

  // Persistent store of company profile data (activities, notes, deals, enrichment, automations)
  const [companyProfiles, setCompanyProfiles] = useState<Record<string, CompanyProfileData>>({});

  // Dark Mode (false = light mode by default)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Design decisions modal state
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

  // Global Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Active prospecting parameters
  const [activeParams, setActiveParams] = useState<ProspectingParams>({
    offer: "Desenvolvo sites e gestão de Google Meu Negócio para clínicas e consultórios particulares",
    niche: "Clínicas Médicas",
    includedCategories: ["medical_clinic", "dental_clinic", "dermatologist"],
    excludedCategories: ["hospital_publico"],
    locationMode: "custom",
    locations: ["Centro, Florianópolis"],
    radiusKm: 10,
    leadsLimit: 50,
    requestIntervalSec: 1.5,
    minRating: 4.0,
    minReviews: 10,
    onlyWithoutWebsite: false,
    onlyWithPhone: true,
    onlyNewLeads: true,
    onlyOperational: true,
  });

  const handleStartProspecting = (params: ProspectingParams) => {
    setActiveParams(params);
    setCurrentScreen("processing");
  };

  const handleFinishProcessing = () => {
    setCurrentScreen("results");
    showToast("Varredura concluída! 12 oportunidades de alto valor mapeadas.");
  };

  const handleCancelProcessing = () => {
    setCurrentScreen("form");
    showToast("Prospecção cancelada.");
  };

  // Open full company profile CRM screen
  const handleOpenCompanyProfile = (lead: Lead) => {
    setSelectedLeadId(lead.id);
    setCurrentScreen("company");
  };

  // Active lead object
  const activeLead = MOCK_LEADS.find((l) => l.id === selectedLeadId) || MOCK_LEADS[0];

  // Update profile data in persistent store
  const handleUpdateProfileData = (updated: CompanyProfileData) => {
    setCompanyProfiles((prev) => ({ ...prev, [updated.leadId]: updated }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Universal Top Bar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenDesignModal={() => setIsDesignModalOpen(true)}
        leadsCount={MOCK_LEADS.length}
        selectedCompanyName={activeLead?.displayName}
      />

      {/* Main Screen Viewport */}
      <main className="flex-1 pb-16">
        {currentScreen === "form" && (
          <ProspectingFormScreen onStartProspecting={handleStartProspecting} />
        )}

        {currentScreen === "processing" && (
          <ProcessingScreen
            params={activeParams}
            onFinish={handleFinishProcessing}
            onCancel={handleCancelProcessing}
          />
        )}

        {currentScreen === "results" && (
          <ResultsScreen
            params={activeParams}
            onNewProspecting={() => setCurrentScreen("form")}
            onShowToast={showToast}
            onOpenCompanyProfile={handleOpenCompanyProfile}
          />
        )}

        {currentScreen === "company" && activeLead && (
          <CompanyProfileScreen
            lead={activeLead}
            onBackToResults={() => setCurrentScreen("results")}
            onShowToast={showToast}
            initialProfileData={companyProfiles[activeLead.id]}
            onUpdateProfileData={handleUpdateProfileData}
          />
        )}

        {currentScreen === "uistates" && (
          <UiStatesScreen onShowToast={showToast} />
        )}
      </main>

      {/* Design Decisions Modal */}
      <DesignDecisionsModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />

      {/* Global Interactive Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
