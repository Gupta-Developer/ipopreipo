"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface IPODetails {
  id: string;
  name: string;
  ticker: string;
  status: "active" | "upcoming" | "listed";
  priceBand: string;
  gmp: number;
  gmpAmount: string;
  openDate: string;
  closeDate: string;
  listingDate?: string;
  size: string;
  lotSize: number;
  subscription: {
    qib: number;
    nii: number;
    retail: number;
    total: number;
  };
  description: string;
  listingGain?: number;
  currentPrice?: string;
}

const IPO_DATA: IPODetails[] = [
  {
    id: "1",
    name: "CloudScale AI Systems",
    ticker: "CSAI",
    status: "active",
    priceBand: "$42.00 - $45.00",
    gmp: 48,
    gmpAmount: "+$21.50",
    openDate: "2026-06-03",
    closeDate: "2026-06-05",
    size: "$850 Million",
    lotSize: 30,
    subscription: { qib: 4.2, nii: 2.8, retail: 6.5, total: 4.8 },
    description: "CloudScale AI Systems provides next-generation enterprise GPU orchestration and optimization software, enabling companies to run large-scale training workloads at 40% lower cost.",
  },
  {
    id: "2",
    name: "BioGenex Therapeutics",
    ticker: "BGNX",
    status: "active",
    priceBand: "$18.00 - $20.00",
    gmp: 12,
    gmpAmount: "+$2.40",
    openDate: "2026-06-02",
    closeDate: "2026-06-04",
    size: "$320 Million",
    lotSize: 75,
    subscription: { qib: 1.1, nii: 0.9, retail: 2.1, total: 1.4 },
    description: "BioGenex Therapeutics is a clinical-stage biotechnology company developing programmable mRNA therapies targeting auto-immune disorders and chronic inflammation.",
  },
  {
    id: "3",
    name: "Quantum Security Lab",
    ticker: "QSL",
    status: "upcoming",
    priceBand: "$28.00 - $31.00",
    gmp: 35,
    gmpAmount: "+$10.85",
    openDate: "2026-06-12",
    closeDate: "2026-06-15",
    size: "$510 Million",
    lotSize: 45,
    subscription: { qib: 0, nii: 0, retail: 0, total: 0 },
    description: "Quantum Security Lab builds hardware security modules and cryptographic suites designed to secure web and cloud infrastructure against future quantum computing attacks.",
  },
  {
    id: "4",
    name: "Apex Logistics & Swyft",
    ticker: "APSL",
    status: "upcoming",
    priceBand: "$64.00 - $68.00",
    gmp: 5,
    gmpAmount: "+$3.40",
    openDate: "2026-06-20",
    closeDate: "2026-06-23",
    size: "$1.2 Billion",
    lotSize: 20,
    subscription: { qib: 0, nii: 0, retail: 0, total: 0 },
    description: "Apex Swyft operates a global smart delivery network utilizing autonomous drones and electric vehicles to provide ultra-fast 1-hour middle mile transit.",
  },
  {
    id: "5",
    name: "Orbit Launch Corp",
    ticker: "ORBT",
    status: "listed",
    priceBand: "$15.00",
    gmp: 55,
    gmpAmount: "+$8.25",
    openDate: "2026-05-18",
    closeDate: "2026-05-20",
    listingDate: "2026-05-28",
    size: "$400 Million",
    lotSize: 80,
    subscription: { qib: 18.4, nii: 12.1, retail: 34.5, total: 22.8 },
    listingGain: 62.4,
    currentPrice: "$26.80",
    description: "Orbit Launch Corp manufactures reusable orbital micro-launchers for rapid small satellite constellation deployments, offering weekly launch schedules.",
  },
  {
    id: "6",
    name: "FinTech Flow Systems",
    ticker: "FTFS",
    status: "listed",
    priceBand: "$32.00",
    gmp: -3,
    gmpAmount: "-$0.95",
    openDate: "2026-05-10",
    closeDate: "2026-05-12",
    listingDate: "2026-05-19",
    size: "$650 Million",
    lotSize: 25,
    subscription: { qib: 1.5, nii: 1.1, retail: 0.8, total: 1.2 },
    listingGain: -4.8,
    currentPrice: "$30.20",
    description: "FinTech Flow Systems offers modular core-banking and payment processing infrastructure to regional credit unions and neobanks.",
  },
  {
    id: "7",
    name: "Verdant Energy Solutions",
    ticker: "VES",
    status: "listed",
    priceBand: "$50.00",
    gmp: 18,
    gmpAmount: "+$9.00",
    openDate: "2026-04-22",
    closeDate: "2026-04-25",
    listingDate: "2026-05-05",
    size: "$1.1 Billion",
    lotSize: 15,
    subscription: { qib: 6.7, nii: 4.8, retail: 11.2, total: 7.9 },
    listingGain: 19.5,
    currentPrice: "$61.15",
    description: "Verdant Energy designs and operates mega-scale grid battery installations combined with predictive AI load-balancing algorithms.",
  }
];

export default function IPOPage() {
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "listed">("active");
  const [selectedIPO, setSelectedIPO] = useState<IPODetails | null>(null);

  // Allotment State
  const [allotmentSearch, setAllotmentSearch] = useState("");
  const [allotmentIPO, setAllotmentIPO] = useState("1");
  const [allotmentResult, setAllotmentResult] = useState<{
    searched: boolean;
    success: boolean;
    company: string;
    allottedShares?: number;
    amountBlocked?: string;
    statusText: string;
  } | null>(null);

  useEffect(() => {
    const filtered = IPO_DATA.filter((item) => item.status === activeTab);
    if (filtered.length > 0) {
      setSelectedIPO(filtered[0]);
    } else {
      setSelectedIPO(null);
    }
  }, [activeTab]);

  const handleAllotmentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allotmentSearch.trim()) return;

    const company = IPO_DATA.find((i) => i.id === allotmentIPO);
    if (!company) return;

    const lastChar = allotmentSearch.trim().slice(-1);
    const isSuccess = /[13579aeiouAEIOU]/.test(lastChar);
    const shares = isSuccess ? company.lotSize : 0;

    let priceVal = 0;
    if (company.priceBand.includes("-")) {
      priceVal = parseFloat(company.priceBand.split("-")[1].replace(/[^0-9.]/g, ""));
    } else {
      priceVal = parseFloat(company.priceBand.replace(/[^0-9.]/g, ""));
    }
    const amtBlocked = `$${(priceVal * company.lotSize).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    setAllotmentResult({
      searched: true,
      success: isSuccess,
      company: company.name,
      allottedShares: shares,
      amountBlocked: amtBlocked,
      statusText: isSuccess
        ? "CONGRATULATIONS! Shares have been successfully allotted to your account."
        : "UNALLOTTED: Bids were not selected in the computerized random draw. Funds will be unblocked in 24 hours.",
    });
  };

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 className="text-gradient-purple" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}>IPO Intelligence Calendar</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "1.05rem" }}>
          Real-time tracking of active subscription demand, Grey Market Premiums (GMP), and registrar databases.
        </p>
      </header>

      <div className="grid-dashboard">
        <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Main Launch Calendar */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="flex-between" style={{ flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📅</span> Public Offerings
              </h2>
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === "active" ? "active" : ""}`}
                  onClick={() => setActiveTab("active")}
                >
                  Active / Live
                </button>
                <button
                  className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`tab-btn ${activeTab === "listed" ? "active" : ""}`}
                  onClick={() => setActiveTab("listed")}
                >
                  Recently Listed
                </button>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", opacity: 0.8 }}>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Company</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Price Band</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>GMP (Premium)</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Timeline</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {IPO_DATA.filter((item) => item.status === activeTab).map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedIPO(item)}
                      style={{
                        borderBottom: "1px solid var(--border-color)",
                        cursor: "pointer",
                        background: selectedIPO?.id === item.id ? "rgba(255, 255, 255, 0.02)" : "transparent",
                        transition: "background var(--transition-fast)",
                      }}
                      className="ipo-table-row"
                    >
                      <td style={{ padding: "1.25rem 0.5rem" }}>
                        <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>{item.name}</div>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{item.ticker}</span>
                      </td>
                      <td style={{ padding: "1.25rem 0.5rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {item.priceBand}
                      </td>
                      <td style={{ padding: "1.25rem 0.5rem" }}>
                        <span className={`badge ${item.gmp > 20 ? "badge-success" : "badge-primary"}`}>
                          {item.gmpAmount} ({item.gmp}%)
                        </span>
                      </td>
                      <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        {item.status === "listed" ? item.listingDate : `${item.openDate} to ${item.closeDate}`}
                      </td>
                      <td style={{ padding: "1.25rem 0.5rem", textAlign: "right" }}>
                        {item.status === "listed" ? (
                          <strong style={{ color: item.listingGain && item.listingGain > 0 ? "var(--success)" : "var(--danger)", fontSize: "1rem" }}>
                            {item.listingGain && item.listingGain > 0 ? "+" : ""}{item.listingGain}%
                          </strong>
                        ) : item.status === "active" ? (
                          <span style={{ color: "var(--warning)", fontWeight: 700 }}>{item.subscription.total}x Sub</span>
                        ) : (
                          <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Upcoming</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Inspector */}
          {selectedIPO && (
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
              <div className="flex-between">
                <div>
                  <span className="badge badge-primary">{selectedIPO.ticker}</span>
                  <h3 style={{ fontSize: "1.6rem", marginTop: "0.5rem", letterSpacing: "-0.03em" }}>{selectedIPO.name}</h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Issue Size</span>
                  <div style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--text-primary)" }}>{selectedIPO.size}</div>
                </div>
              </div>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {selectedIPO.description}
              </p>

              {selectedIPO.status !== "upcoming" && (
                <div style={{ padding: "1.25rem", background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                  <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                    Institutional & Retail Demand
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>QIB (Qualified Institutional)</span>
                        <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.qib}x</strong>
                      </div>
                      <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "var(--primary)", width: `${Math.min(100, selectedIPO.subscription.qib * 15)}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>NII (HNIs & Corporate Bids)</span>
                        <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.nii}x</strong>
                      </div>
                      <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "var(--warning)", width: `${Math.min(100, selectedIPO.subscription.nii * 15)}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>Retail Individual Bidders</span>
                        <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.retail}x</strong>
                      </div>
                      <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "var(--success)", width: `${Math.min(100, selectedIPO.subscription.retail * 10)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
                <div className="premium-spec-cell">
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Price Band</div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)", marginTop: "0.25rem" }}>{selectedIPO.priceBand}</div>
                </div>
                <div className="premium-spec-cell">
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Lot Size</div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)", marginTop: "0.25rem" }}>{selectedIPO.lotSize} Shares</div>
                </div>
                <div className="premium-spec-cell">
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>GMP Forecast</div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--success)", marginTop: "0.25rem" }}>{selectedIPO.gmpAmount} ({selectedIPO.gmp}%)</div>
                </div>
              </div>
            </div>
          )}
        </main>

        <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Allotment Status Checker */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h2 style={{ fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>🔍</span> Registrar Status
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "-0.75rem" }}>
              Simulate querying Registrar database logs (Link Intime & KFintech).
            </p>

            <form onSubmit={handleAllotmentSearch} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>Select IPO Company</label>
                <select
                  className="input-field"
                  value={allotmentIPO}
                  onChange={(e) => setAllotmentIPO(e.target.value)}
                  style={{ background: "rgba(13,16,23,0.7)", cursor: "pointer" }}
                >
                  {IPO_DATA.map((i) => (
                    <option key={i.id} value={i.id}>{i.name} ({i.ticker})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>PAN Number / Application ID</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter PAN (e.g. ABCDE1234F)"
                  value={allotmentSearch}
                  onChange={(e) => setAllotmentSearch(e.target.value.toUpperCase())}
                  maxLength={15}
                />
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginTop: "0.4rem", lineHeight: 1.4 }}>
                  *Use a PAN ending in a vowel or odd number for a mock allotment.
                </span>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Check Status
              </button>
            </form>

            {allotmentResult && allotmentResult.searched && (
              <div style={{
                background: allotmentResult.success ? "rgba(16, 185, 129, 0.06)" : "rgba(239, 68, 68, 0.06)",
                border: `1px solid ${allotmentResult.success ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)"}`,
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                fontSize: "0.85rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>{allotmentResult.success ? "🎉" : "❌"}</span>
                  <strong style={{ color: allotmentResult.success ? "var(--success)" : "var(--danger)", fontSize: "0.95rem" }}>
                    {allotmentResult.success ? "ALLOTTED" : "REFUND INITIATED"}
                  </strong>
                </div>
                <div style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  Company: <strong style={{ color: "var(--text-primary)" }}>{allotmentResult.company}</strong>
                </div>
                <p style={{ lineHeight: 1.5, color: "var(--text-primary)", fontSize: "0.8rem" }}>
                  {allotmentResult.statusText}
                </p>
                {allotmentResult.success && allotmentResult.allottedShares && (
                  <div style={{ marginTop: "0.75rem", borderTop: "1px dashed rgba(16, 185, 129, 0.2)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between" }}>
                    <span>Shares: <strong>{allotmentResult.allottedShares}</strong></span>
                    <span>Amt Blocked: <strong>{allotmentResult.amountBlocked}</strong></span>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
