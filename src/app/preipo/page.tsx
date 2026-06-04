"use client";

import React, { useState } from "react";

interface PreIPOCompany {
  id: string;
  name: string;
  logoText: string;
  sector: string;
  valuation: string;
  lastRound: string;
  estSharePrice: number;
  gmpTrend: number[];
  backers: string[];
  growthRate: string;
  metrics: { label: string; value: string }[];
  comparablePublic: { name: string; multiplier: number };
}

const PRE_IPO_DATA: PreIPOCompany[] = [
  {
    id: "p1",
    name: "SpaceX",
    logoText: "SX",
    sector: "Aerospace & Defense",
    valuation: "$210 Billion",
    lastRound: "Series N",
    estSharePrice: 112.50,
    gmpTrend: [105, 108, 107, 110, 112.50],
    backers: ["Fidelity", "Google", "Founders Fund"],
    growthRate: "+45% YoY",
    metrics: [
      { label: "Active Launches", value: "98 (YTD)" },
      { label: "Starlink Users", value: "3.8M" }
    ],
    comparablePublic: { name: "Boeing / Northrop", multiplier: 3.2 }
  },
  {
    id: "p2",
    name: "Stripe",
    logoText: "ST",
    sector: "Fintech & Payments",
    valuation: "$70 Billion",
    lastRound: "Series I",
    estSharePrice: 28.40,
    gmpTrend: [24.10, 25.50, 26.80, 27.20, 28.40],
    backers: ["Sequoia", "Andreessen Horowitz", "Tiger Global"],
    growthRate: "+32% YoY",
    metrics: [
      { label: "Annual Volume", value: "$1.1T" },
      { label: "Developer API Uptime", value: "99.999%" }
    ],
    comparablePublic: { name: "Adyen / PayPal", multiplier: 1.8 }
  },
  {
    id: "p3",
    name: "Canva",
    logoText: "CV",
    sector: "SaaS & Collaboration",
    valuation: "$26 Billion",
    lastRound: "Series F",
    estSharePrice: 45.20,
    gmpTrend: [42.00, 43.10, 42.80, 44.50, 45.20],
    backers: ["Blackbird", "Bessemer", "General Catalyst"],
    growthRate: "+38% YoY",
    metrics: [
      { label: "Monthly Active Users", value: "185M" },
      { label: "Enterprise Seats", value: "12M" }
    ],
    comparablePublic: { name: "Adobe", multiplier: 2.1 }
  },
  {
    id: "p4",
    name: "Epic Games",
    logoText: "EG",
    sector: "Gaming & Engine",
    valuation: "$32 Billion",
    lastRound: "Strategic Round",
    estSharePrice: 76.80,
    gmpTrend: [82.00, 80.50, 78.00, 77.50, 76.80],
    backers: ["Tencent", "Sony", "KKR"],
    growthRate: "+15% YoY",
    metrics: [
      { label: "Unreal Engine Developers", value: "7.5M" },
      { label: "Epic Store Customers", value: "230M" }
    ],
    comparablePublic: { name: "Unity / EA", multiplier: 1.4 }
  }
];

export default function PreIPOPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState("p1");
  const [customGrowthMultiplier, setCustomGrowthMultiplier] = useState(1.2);

  const selected = PRE_IPO_DATA.find((c) => c.id === selectedCompanyId) || PRE_IPO_DATA[0];

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 className="text-gradient-purple" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}>Pre-IPO Secondary Market</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "1.05rem" }}>
          Explore unlisted tech giants, track secondary market share estimates, and run comparative valuations against public competitors.
        </p>
      </header>

      <div className="grid-dashboard">
        <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Companies List */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h2 style={{ fontSize: "1.4rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>🛸 Unlisted Shares Directory</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="m-flex-column">
              {PRE_IPO_DATA.map((company) => (
                <div
                  key={company.id}
                  className="card"
                  onClick={() => setSelectedCompanyId(company.id)}
                  style={{
                    background: selectedCompanyId === company.id ? "rgba(99, 102, 241, 0.05)" : "rgba(13, 16, 23, 0.3)",
                    borderColor: selectedCompanyId === company.id ? "var(--primary)" : "var(--border-color)",
                    cursor: "pointer",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-md)",
                    transition: "all var(--transition-normal)"
                  }}
                >
                  <div className="flex-between">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "900",
                        color: "var(--primary)",
                        border: "1px solid var(--border-color)",
                      }}>
                        {company.logoText}
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.1rem", margin: 0, fontWeight: "700" }}>{company.name}</h3>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{company.sector}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Est. Share</span>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>${company.estSharePrice.toFixed(2)}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: "1.25rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem", display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <div>Valuation: <strong style={{ color: "var(--text-primary)" }}>{company.valuation}</strong></div>
                    <div>Growth: <strong style={{ color: "var(--success)" }}>{company.growthRate}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Card */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
            <div className="flex-between">
              <div>
                <span className="badge badge-primary">{selected.sector}</span>
                <h3 style={{ fontSize: "1.6rem", marginTop: "0.5rem" }}>{selected.name} Corporate Intelligence</h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Last Round</span>
                <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--text-primary)" }}>{selected.lastRound}</div>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {selected.metrics.map((m, idx) => (
                <div key={idx} className="premium-spec-cell">
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{m.label}</div>
                  <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)", marginTop: "0.25rem" }}>{m.value}</div>
                </div>
              ))}
              <div className="premium-spec-cell">
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>Strategic Backers</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {selected.backers.map((b, idx) => (
                    <span key={idx} className="badge badge-primary" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Trend Chart representation */}
            <div style={{ padding: "1.25rem", background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                Secondary Market Valuation Trend
              </h4>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "120px", padding: "0 1.5rem" }}>
                {selected.gmpTrend.map((val, idx) => {
                  const max = Math.max(...selected.gmpTrend);
                  const min = Math.min(...selected.gmpTrend);
                  const heightPercent = max === min ? 50 : ((val - min) / (max - min)) * 60 + 20;
                  return (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "16%", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: "600" }}>${val.toFixed(2)}</span>
                      <div style={{ 
                        height: `${heightPercent}px`, 
                        width: "100%", 
                        background: "linear-gradient(to top, var(--primary) 0%, #818cf8 100%)", 
                        borderRadius: "4px 4px 0 0",
                        boxShadow: "0 0 10px rgba(99,102,241,0.2)"
                      }}></div>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Q{idx + 1} 2026</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Valuation Comparator */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", background: "linear-gradient(to bottom, var(--card-bg), rgba(99, 102, 241, 0.03))" }}>
            <h3 style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>🧮</span> Valuation Comparator
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "-0.75rem" }}>
              Model projected public listings based on competitor multiples and growth premiums.
            </p>

            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Company: <strong style={{ color: "var(--text-primary)" }}>{selected.name}</strong>
              </div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                <span>Growth Premium Multiplier:</span>
                <strong style={{ color: "var(--primary)" }}>{customGrowthMultiplier.toFixed(1)}x</strong>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={customGrowthMultiplier}
                onChange={(e) => setCustomGrowthMultiplier(parseFloat(e.target.value))}
                className="calc-slider"
              />
            </div>

            <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem" }}>
              <div className="flex-between">
                <span style={{ color: "var(--text-secondary)" }}>Public Competitors:</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{selected.comparablePublic.name}</span>
              </div>
              <div className="flex-between">
                <span style={{ color: "var(--text-secondary)" }}>Base Peer P/S:</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{selected.comparablePublic.multiplier}x</span>
              </div>
              <div className="flex-between">
                <span style={{ color: "var(--text-secondary)" }}>Private Valuation:</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{selected.valuation}</span>
              </div>
              <div style={{ borderTop: "1px dashed var(--border-color)", marginTop: "0.5rem", paddingTop: "0.75rem" }} className="flex-between">
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>Projected Public Market Cap:</span>
                <strong style={{ color: "var(--success)", fontSize: "1.2rem" }}>
                  ${(parseFloat(selected.valuation.split(" ")[0].replace(/[^0-9.]/g, "")) * selected.comparablePublic.multiplier * customGrowthMultiplier).toFixed(1)}B
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
