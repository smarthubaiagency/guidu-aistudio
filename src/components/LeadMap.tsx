import React, { useState } from "react";
import { MapPin, Navigation, ExternalLink, MessageCircle, Star, Sparkles, X } from "lucide-react";
import { Lead } from "../mocks/leads";
import { ScoreBadge } from "./ScoreBadge";

interface LeadMapProps {
  leads: Lead[];
  radiusKm: number;
  centerLocationName: string;
  onSelectLeadDetails: (lead: Lead) => void;
}

export const LeadMap: React.FC<LeadMapProps> = ({
  leads,
  radiusKm,
  centerLocationName,
  onSelectLeadDetails,
}) => {
  const [activePinLead, setActivePinLead] = useState<Lead | null>(leads[0] || null);

  // Approximate relative (x, y) coordinates for Florianópolis & region based on distance and orientation
  // Center is approx (480, 260) (Centro de Floripa)
  const getCoordinates = (index: number, lead: Lead) => {
    // Generate deterministic scattered points around Centro
    const angles = [35, 120, 200, 75, 230, 160, 310, 280, 210, 15, 85, 340];
    const angle = ((angles[index % angles.length] || 45) * Math.PI) / 180;
    // Scale distance based on radius
    const scale = Math.min(200, Math.max(30, (lead.distanceKm / (radiusKm || 25)) * 180));
    const cx = 450 + Math.cos(angle) * scale;
    const cy = 250 + Math.sin(angle) * scale;
    return { x: cx, y: cy };
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-xs">
      {/* SVG Vector Map Canvas */}
      <svg
        className="w-full h-full select-none"
        viewBox="0 0 900 520"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Water pattern / gradient */}
          <radialGradient id="waterGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.4" />
          </radialGradient>
          <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Ocean / Bay Background */}
        <rect width="900" height="520" fill="url(#waterGrad)" className="dark:opacity-10" />

        {/* Mainland Landmass (São José & Palhoça - Left side) */}
        <path
          d="M 0 0 L 320 0 Q 340 180 330 290 Q 310 400 360 520 L 0 520 Z"
          className="fill-slate-200/90 dark:fill-slate-900 transition-colors"
        />

        {/* Island of Santa Catarina (Florianópolis - Center & Right) */}
        <path
          d="M 380 90 Q 420 40 480 30 Q 550 50 580 120 Q 610 200 590 320 Q 560 440 500 500 Q 440 470 420 380 Q 400 280 370 210 Q 360 140 380 90 Z"
          className="fill-slate-200/90 dark:fill-slate-900 transition-colors"
        />

        {/* Lagoa da Conceição (Lagoon on the island) */}
        <ellipse
          cx="520"
          cy="220"
          rx="32"
          ry="65"
          className="fill-sky-100 dark:fill-slate-950"
        />

        {/* Bridges (Ponte Hercílio Luz & Pedro Ivo) connecting mainland to island */}
        <line x1="335" y1="230" x2="385" y2="225" stroke="#94A3B8" strokeWidth="4" strokeDasharray="3,3" />
        <line x1="333" y1="242" x2="387" y2="238" stroke="#64748B" strokeWidth="3" />

        {/* Major arterial roads (Beira-Mar, BR-101, SC-401) */}
        <path
          d="M 50 180 Q 200 240 330 240"
          stroke="#CBD5E1"
          strokeWidth="3"
          fill="none"
          className="dark:stroke-slate-800"
        />
        <path
          d="M 390 230 Q 450 200 480 100"
          stroke="#CBD5E1"
          strokeWidth="3"
          fill="none"
          className="dark:stroke-slate-800"
        />
        <path
          d="M 390 240 Q 460 300 490 460"
          stroke="#CBD5E1"
          strokeWidth="3"
          fill="none"
          className="dark:stroke-slate-800"
        />

        {/* Search Radius Circle centered at Centro */}
        <circle
          cx="430"
          cy="235"
          r={Math.min(230, Math.max(60, radiusKm * 7))}
          fill="#3B82F6"
          fillOpacity="0.08"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray="6,4"
          className="animate-pulse duration-1000"
        />

        {/* Search Center Marker (Florianópolis Centro) */}
        <g transform="translate(430, 235)">
          <circle r="8" fill="#2563EB" fillOpacity="0.3" />
          <circle r="4" fill="#2563EB" />
          <text
            x="0"
            y="-12"
            textAnchor="middle"
            className="text-[10px] font-bold fill-blue-700 dark:fill-blue-400 font-sans tracking-wide"
          >
            {centerLocationName}
          </text>
        </g>

        {/* Interactive Lead Pins */}
        {leads.map((lead, idx) => {
          const { x, y } = getCoordinates(idx, lead);
          const isSelected = activePinLead?.id === lead.id;
          const pinColor =
            lead.fit === "alta"
              ? "#10B981" // Emerald
              : lead.fit === "media"
              ? "#2563EB" // Blue
              : "#64748B"; // Slate

          return (
            <g
              key={lead.id}
              transform={`translate(${x}, ${y})`}
              className="cursor-pointer transition-transform duration-150"
              onClick={() => setActivePinLead(lead)}
              filter="url(#pinShadow)"
            >
              {/* Outer pulsing ring if selected */}
              {isSelected && (
                <circle
                  r="18"
                  fill={pinColor}
                  fillOpacity="0.25"
                  className="animate-ping"
                />
              )}

              {/* Pin body */}
              <circle
                r={isSelected ? "14" : "10"}
                fill={pinColor}
                stroke="#FFFFFF"
                strokeWidth="2.5"
                className="transition-all"
              />

              {/* Score text inside pin */}
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fill="#FFFFFF"
                className="text-[9px] font-bold font-mono select-none"
              >
                {lead.score}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Map Legend & Stats Overlay */}
      <div className="absolute top-4 left-4 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-xs space-y-2 pointer-events-auto max-w-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-white pb-1 border-b border-slate-100 dark:border-slate-800">
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span>Mapa de Prospecção</span>
        </div>
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 text-[11px]">
          <span>Raio configurado:</span>
          <span className="font-mono font-semibold tabular-nums">{radiusKm} km</span>
        </div>
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 text-[11px]">
          <span>Centro da busca:</span>
          <span className="font-medium truncate max-w-[120px]">{centerLocationName}</span>
        </div>
        <div className="flex items-center gap-3 pt-1 text-[10px] font-medium">
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Alta ({leads.filter((l) => l.fit === "alta").length})</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Média ({leads.filter((l) => l.fit === "media").length})</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span>Baixa ({leads.filter((l) => l.fit === "baixa").length})</span>
          </div>
        </div>
      </div>

      {/* Active Lead Floating Card Overlay (Bottom Right) */}
      {activePinLead && (
        <div className="absolute bottom-4 right-4 max-w-sm w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-1.5">
                {activePinLead.isNew && (
                  <span className="text-[10px] font-bold text-blue-600 uppercase">Novo</span>
                )}
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1">
                  {activePinLead.displayName}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {activePinLead.primaryTypeDisplayName} · {activePinLead.neighborhood || activePinLead.city}
              </p>
            </div>
            <button
              onClick={() => setActivePinLead(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs my-2">
            <ScoreBadge
              score={activePinLead.score}
              fit={activePinLead.fit}
              breakdown={activePinLead.scoreBreakdown}
              size="sm"
            />
            {activePinLead.rating && (
              <div className="flex items-center gap-1 font-mono text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span className="font-bold">{activePinLead.rating.toFixed(1)}</span>
                <span className="text-slate-400">({activePinLead.userRatingCount})</span>
              </div>
            )}
          </div>

          {!activePinLead.websiteUri && (
            <div className="flex items-center gap-1.5 text-[11px] text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 p-1.5 rounded mb-2">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Oportunidade: Sem website oficial</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {activePinLead.nationalPhoneNumber && activePinLead.isMobile && (
              <a
                href={`https://wa.me/55${activePinLead.nationalPhoneNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => onSelectLeadDetails(activePinLead)}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline ml-auto"
            >
              Ver ficha completa →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
