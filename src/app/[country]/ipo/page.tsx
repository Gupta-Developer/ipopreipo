"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

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
  segment: "Mainboard" | "SME";
  logoLetter: string;
  logoColor: string;
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
    closeDate: "2026-06-08",
    size: "$850 Million",
    lotSize: 30,
    subscription: { qib: 4.2, nii: 2.8, retail: 6.5, total: 4.8 },
    segment: "Mainboard",
    logoLetter: "C",
    logoColor: "#6366f1",
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
    openDate: "2026-06-04",
    closeDate: "2026-06-09",
    size: "$320 Million",
    lotSize: 75,
    subscription: { qib: 1.1, nii: 0.9, retail: 2.1, total: 1.4 },
    segment: "SME",
    logoLetter: "B",
    logoColor: "#10b981",
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
    segment: "Mainboard",
    logoLetter: "Q",
    logoColor: "#f59e0b",
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
    segment: "SME",
    logoLetter: "A",
    logoColor: "#ef4444",
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
    segment: "Mainboard",
    logoLetter: "O",
    logoColor: "#0ea5e9",
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
    segment: "SME",
    logoLetter: "F",
    logoColor: "#8b5cf6",
    description: "FinTech Flow Systems offers modular core-banking and payment processing infrastructure to regional credit unions and neobanks.",
  }
];

export default function IPOPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";

  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "listed">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIPO, setSelectedIPO] = useState<IPODetails | null>(null);

  // Hero Slider Slide State
  const [activeSlide, setActiveSlide] = useState(0);

  // Apply Now simulation state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appliedCompany, setAppliedCompany] = useState("");

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

  // Filter IPO List based on tab and search query
  const filteredIPOs = IPO_DATA.filter((ipo) => {
    const matchesTab = ipo.status === activeTab;
    const matchesSearch =
      ipo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ipo.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
        ? "CONGRATULATIONS! Bids were successfully allotted. Shares will credit in 24 hours."
        : "UNALLOTTED: Bids not selected in registrar random computer draw. Blocked funds will release shortly.",
    });
  };

  const handleApplyNow = (companyName: string) => {
    setAppliedCompany(companyName);
    setShowApplyModal(true);
    setTimeout(() => {
      setShowApplyModal(false);
    }, 3500);
  };

  // Slider Slides Data
  const sliderSlides = [
    {
      status: "LIVE IPO",
      title: "CloudScale AI Systems (CSAI)",
      subtitle: "Enterprise GPU orchestration computing infrastructure. Heavy institutional interest registered.",
      gmp: "+48% GMP",
      badgeColor: "rgba(239, 68, 68, 0.15)",
      textColor: "#ef4444",
      actionLink: "1"
    },
    {
      status: "HOT OPPORTUNITY",
      title: "Pre-IPO Secondary Equities",
      subtitle: "Direct private trade shares of SpaceX, Stripe and Canva. Lock in pricing before public listings.",
      gmp: "High Demand",
      badgeColor: "rgba(16, 185, 129, 0.15)",
      textColor: "#10b981",
      actionLink: "preipo"
    },
    {
      status: "APP DOWNLOAD",
      title: "Real-Time Push GMP Alerts",
      subtitle: "Install ipopreipo.com tracker on iOS & Android. Receive notifications on syndicate subscription updates.",
      gmp: "Free Install",
      badgeColor: "rgba(99, 102, 241, 0.15)",
      textColor: "#6366f1",
      actionLink: "app"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      
      {/* ── premium Hero Slider (Inspired by ipo-trend swiper) ─────────────────── */}
      <section className="hero-slider-container">
        <div 
          className="hero-slider-track" 
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {sliderSlides.map((slide, idx) => (
            <div key={idx} className="hero-slide-item">
              <div className="hero-slide-content">
                <div style={{ display: "inline-flex", padding: "0.35rem 0.85rem", borderRadius: "99px", background: slide.badgeColor, color: slide.textColor, fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.05em", marginBottom: "1rem" }}>
                  🚨 {slide.status}
                </div>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: "0.75rem" }}>{slide.title}</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.45, maxWidth: "520px", marginBottom: "1.5rem" }}>{slide.subtitle}</p>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  {slide.actionLink === "preipo" ? (
                    <Link href={`/${countrySlug}/preipo`} className="btn btn-primary" style={{ textDecoration: "none" }}>Explore Private Equities</Link>
                  ) : slide.actionLink === "app" ? (
                    <a href="#" onClick={(e) => { e.preventDefault(); alert("Mobile App coming soon to Apple App Store & Google Play!"); }} className="btn btn-primary" style={{ textDecoration: "none" }}>Download Mobile App</a>
                  ) : (
                    <button onClick={() => {
                      const ipo = IPO_DATA.find(i => i.id === slide.actionLink);
                      if (ipo) setSelectedIPO(ipo);
                    }} className="btn btn-primary">Analyze Demand</button>
                  )}
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: slide.textColor }}>★ {slide.gmp}</span>
                </div>
              </div>
              <div className="hero-slide-graphic">
                <div className="slider-decorative-chart" style={{ borderColor: slide.textColor }}>
                  <div className="chart-line" style={{ background: `linear-gradient(90deg, transparent, ${slide.textColor})` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* dots indicator */}
        <div className="slider-dots">
          {sliderSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`slider-dot-btn${activeSlide === idx ? " active" : ""}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Page Title & Search Header */}
      <section style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <h1 className="text-gradient-purple" style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.04em" }}>IPO Markets Directory</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.4rem" }}>
            Live subscription demand metrics, expected Grey Market Premiums (GMP), and registrar databases.
          </p>
        </div>
        
        {/* Search Input */}
        <div className="search-form-wrap">
          <input
            type="text"
            placeholder="Search company name or ticker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ borderRadius: "10px", width: "260px", paddingRight: "1rem", background: "var(--card-bg)" }}
          />
        </div>
      </section>

      {/* Grid Dashboard layout */}
      <div className="grid-dashboard">
        
        {/* Left main: Tab selection & Cards catalog */}
        <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div className="flex-between" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
            {/* Tabs */}
            <div className="tabs-header" style={{ border: "none", padding: 0 }}>
              <button
                className={`tab-btn ${activeTab === "active" ? "active" : ""}`}
                onClick={() => setActiveTab("active")}
                style={{ fontSize: "0.9rem", fontWeight: 700 }}
              >
                🔴 Live IPOs ({IPO_DATA.filter(i => i.status === "active").length})
              </button>
              <button
                className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
                onClick={() => setActiveTab("upcoming")}
                style={{ fontSize: "0.9rem", fontWeight: 700 }}
              >
                📅 Upcoming ({IPO_DATA.filter(i => i.status === "upcoming").length})
              </button>
              <button
                className={`tab-btn ${activeTab === "listed" ? "active" : ""}`}
                onClick={() => setActiveTab("listed")}
                style={{ fontSize: "0.9rem", fontWeight: 700 }}
              >
                📈 Listed ({IPO_DATA.filter(i => i.status === "listed").length})
              </button>
            </div>
            <span className="badge badge-secondary" style={{ fontSize: "0.72rem" }}>YTD 2026 Directory</span>
          </div>

          {/* Cards Grid */}
          <div className="ipo-cards-grid">
            {filteredIPOs.length === 0 ? (
              <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)", gridColumn: "1 / -1" }}>
                🔍 No offerings found matching your search.
              </div>
            ) : (
              filteredIPOs.map((ipo) => (
                <div key={ipo.id} className="ipo-card-premium">
                  
                  {/* Card Header */}
                  <div className="ipo-card-header-flex">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div className="ipo-avatar-box" style={{ background: `${ipo.logoColor}12`, border: `1.5px solid ${ipo.logoColor}40`, color: ipo.logoColor }}>
                        {ipo.logoLetter}
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{ipo.name}</h3>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{ipo.ticker}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
                      <span className="badge badge-primary" style={{ fontSize: "0.6rem", padding: "0.15rem 0.45rem" }}>{ipo.segment}</span>
                      <span className={`badge ${ipo.status === "active" ? "badge-live" : ipo.status === "listed" ? "badge-success" : "badge-secondary"}`} style={{ fontSize: "0.6rem", padding: "0.15rem 0.45rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        {ipo.status === "active" && <span className="pulse-indicator"></span>}
                        {ipo.status === "active" ? "Live" : ipo.status === "listed" ? "Listed" : "Upcoming"}
                      </span>
                    </div>
                  </div>

                  {/* Card Stats Grid */}
                  <div className="ipo-card-stats-grid">
                    <div className="stat-item-premium">
                      <span className="stat-lbl">Offer Date</span>
                      <strong className="stat-val">{ipo.status === "listed" ? ipo.listingDate : `${ipo.openDate} to ${ipo.closeDate}`}</strong>
                    </div>
                    <div className="stat-item-premium">
                      <span className="stat-lbl">Price Band</span>
                      <strong className="stat-val">{ipo.priceBand}</strong>
                    </div>
                    <div className="stat-item-premium">
                      <span className="stat-lbl">Lot Size</span>
                      <strong className="stat-val">{ipo.lotSize} Shares</strong>
                    </div>
                    <div className="stat-item-premium">
                      <span className="stat-lbl">Subscription</span>
                      <strong className="stat-val" style={{ color: ipo.subscription.total > 10 ? "var(--warning)" : "var(--text-primary)" }}>
                        {ipo.status === "upcoming" ? "Not Open" : `${ipo.subscription.total}x Total`}
                      </strong>
                    </div>
                    <div className="stat-item-premium" style={{ gridColumn: "span 2" }}>
                      <span className="stat-lbl">GMP (Premium Today)</span>
                      <strong className="stat-val" style={{ color: ipo.gmp >= 0 ? "#10b981" : "#ef4444" }}>
                        {ipo.gmpAmount} ({ipo.gmp}%)
                      </strong>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="ipo-card-actions-row">
                    <button
                      onClick={() => setSelectedIPO(ipo)}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: "0.5rem", fontSize: "0.82rem", borderRadius: "8px" }}
                    >
                      View Analysis
                    </button>
                    {ipo.status === "active" && (
                      <button
                        onClick={() => handleApplyNow(ipo.name)}
                        className="btn btn-primary apply-now-btn"
                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.82rem", borderRadius: "8px" }}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Details Modal / Drawer Overlay */}
          {selectedIPO && (
            <div className="ipo-inspector-overlay" onClick={() => setSelectedIPO(null)}>
              <div className="ipo-inspector-card" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="flex-between" style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="ipo-avatar-box" style={{ background: `${selectedIPO.logoColor}15`, color: selectedIPO.logoColor, width: 44, height: 44 }}>
                      {selectedIPO.logoLetter}
                    </div>
                    <div>
                      <h2 style={{ fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.03em" }}>{selectedIPO.name}</h2>
                      <span className="badge badge-primary">{selectedIPO.ticker}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedIPO(null)} className="close-inspector-btn" aria-label="Close Analysis">
                    ✕
                  </button>
                </div>

                {/* Body Content */}
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.55, marginBottom: "1.5rem" }}>
                  {selectedIPO.description}
                </p>

                {/* Subscription details */}
                {selectedIPO.status !== "upcoming" && (
                  <div style={{ padding: "1.25rem", background: "rgba(0,0,0,0.18)", borderRadius: "10px", border: "1px solid var(--border-color)", marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: "1rem", fontWeight: 700 }}>
                      Institutional & Retail Bid Multiples
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div>
                        <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>QIB (Qualified Institutional Bidders)</span>
                          <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.qib}x</strong>
                        </div>
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "var(--primary)", width: `${Math.min(100, selectedIPO.subscription.qib * 12)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>NII (Non-Institutional / HNIs)</span>
                          <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.nii}x</strong>
                        </div>
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "var(--warning)", width: `${Math.min(100, selectedIPO.subscription.nii * 12)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>Retail Individual Bidders</span>
                          <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.retail}x</strong>
                        </div>
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "var(--success)", width: `${Math.min(100, selectedIPO.subscription.retail * 8)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Specs row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div className="premium-spec-cell" style={{ padding: "0.6rem 0.8rem" }}>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>Issue size</span>
                    <strong style={{ display: "block", fontSize: "0.9rem", color: "var(--text-primary)", marginTop: "2px" }}>{selectedIPO.size}</strong>
                  </div>
                  <div className="premium-spec-cell" style={{ padding: "0.6rem 0.8rem" }}>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>Price Band</span>
                    <strong style={{ display: "block", fontSize: "0.9rem", color: "var(--text-primary)", marginTop: "2px" }}>{selectedIPO.priceBand}</strong>
                  </div>
                  <div className="premium-spec-cell" style={{ padding: "0.6rem 0.8rem" }}>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>GMP Premium</span>
                    <strong style={{ display: "block", fontSize: "0.9rem", color: "#10b981", marginTop: "2px" }}>{selectedIPO.gmpAmount}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button onClick={() => setSelectedIPO(null)} className="btn btn-secondary" style={{ flex: 1 }}>Close Analysis</button>
                  {selectedIPO.status === "active" && (
                    <button onClick={() => { setSelectedIPO(null); handleApplyNow(selectedIPO.name); }} className="btn btn-primary" style={{ flex: 2 }}>Apply Now via Broker</button>
                  )}
                </div>

              </div>
            </div>
          )}

        </main>

        {/* Right sidebar: Allotment Registrar Status */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>🔍</span> Allotment Registrar
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", marginTop: "-0.8rem", lineHeight: 1.4 }}>
              Query registrar server logs (Link Intime, KFintech, Bigshare) to check allotment status.
            </p>

            <form onSubmit={handleAllotmentSearch} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.03em", fontWeight: 700 }}>Select Company</label>
                <select
                  className="input-field"
                  value={allotmentIPO}
                  onChange={(e) => setAllotmentIPO(e.target.value)}
                  style={{ background: "rgba(13,16,23,0.7)", cursor: "pointer", borderRadius: "8px" }}
                >
                  {IPO_DATA.map((i) => (
                    <option key={i.id} value={i.id}>{i.name} ({i.ticker})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.03em", fontWeight: 700 }}>PAN Card / Application ID</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter PAN (e.g. ABCDE1234F)"
                  value={allotmentSearch}
                  onChange={(e) => setAllotmentSearch(e.target.value.toUpperCase())}
                  maxLength={15}
                  style={{ borderRadius: "8px" }}
                />
                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", display: "block", marginTop: "0.4rem", lineHeight: 1.4 }}>
                  *Use a PAN ending in a vowel or odd digit for a mock allotment success.
                </span>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", borderRadius: "8px", padding: "0.65rem" }}>
                Query Allotment Status
              </button>
            </form>

            {/* Results display */}
            {allotmentResult && allotmentResult.searched && (
              <div style={{
                background: allotmentResult.success ? "rgba(16, 185, 129, 0.05)" : "rgba(239, 68, 68, 0.05)",
                border: `1.5px solid ${allotmentResult.success ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                borderRadius: "10px",
                padding: "1.25rem",
                fontSize: "0.85rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>{allotmentResult.success ? "🎉" : "❌"}</span>
                  <strong style={{ color: allotmentResult.success ? "var(--success)" : "var(--danger)", fontSize: "0.9rem", letterSpacing: "0.02em" }}>
                    {allotmentResult.success ? "SHARES ALLOTTED" : "REFUND INITIATED"}
                  </strong>
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.78rem", marginBottom: "0.4rem" }}>
                  Company: <strong style={{ color: "var(--text-primary)" }}>{allotmentResult.company}</strong>
                </div>
                <p style={{ lineHeight: 1.45, color: "var(--text-primary)", fontSize: "0.78rem" }}>
                  {allotmentResult.statusText}
                </p>
                {allotmentResult.success && allotmentResult.allottedShares && (
                  <div style={{ marginTop: "0.75rem", borderTop: "1px dashed rgba(16, 185, 129, 0.2)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                    <span>Allotted: <strong>{allotmentResult.allottedShares} shares</strong></span>
                    <span>Amount Blocked: <strong>{allotmentResult.amountBlocked}</strong></span>
                  </div>
                )}
              </div>
            )}
          </div>

        </aside>

      </div>

      {/* Mock Apply Notification popup */}
      {showApplyModal && (
        <div style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
          background: "var(--card-bg)",
          border: "1.5px solid rgba(var(--primary-rgb), 0.35)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          padding: "1.5rem",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "350px",
          animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <span style={{ fontSize: "2rem" }}>🚀</span>
          <div>
            <strong style={{ color: "var(--text-primary)", fontSize: "0.9rem", display: "block" }}>Broker Link Dispatched</strong>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem", display: "block", marginTop: "2px", lineHeight: 1.35 }}>
              Connecting bids to Zerodha / Groww gateway for <strong>{appliedCompany}</strong>...
            </span>
          </div>
        </div>
      )}

      <style>{`
        /* ─── Hero Slider ─── */
        .hero-slider-container {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(var(--primary-rgb), 0.02);
          border: 1px solid var(--border-color);
          margin-bottom: 3.5rem;
          min-height: 280px;
        }
        :root:not([data-theme="light"]) .hero-slider-container {
          background: #090c15;
        }
        .hero-slider-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-slide-item {
          flex: 0 0 100%;
          width: 100%;
          padding: 3rem;
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 2rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-slide-item {
            grid-template-columns: 1fr;
            padding: 2rem;
          }
          .hero-slide-graphic {
            display: none;
          }
        }
        .hero-slide-content {
          z-index: 2;
        }
        .hero-slide-graphic {
          position: relative;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slider-decorative-chart {
          width: 150px;
          height: 80px;
          border-bottom: 2px solid;
          border-left: 2px solid;
          position: relative;
          opacity: 0.75;
        }
        .chart-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip-path: polygon(0 90%, 25% 60%, 50% 70%, 75% 30%, 100% 10%, 100% 100%, 0 100%);
          opacity: 0.15;
        }
        .slider-dots {
          position: absolute;
          bottom: 1.25rem;
          left: 3rem;
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .slider-dots {
            left: 2rem;
          }
        }
        .slider-dot-btn {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-muted);
          border: none;
          cursor: pointer;
          opacity: 0.5;
          padding: 0;
          transition: all 0.2s;
        }
        .slider-dot-btn:hover {
          opacity: 0.8;
        }
        .slider-dot-btn.active {
          opacity: 1;
          background: rgb(var(--primary-rgb));
          width: 20px;
          border-radius: 99px;
        }

        /* ─── Cards Grid ─── */
        .ipo-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .ipo-card-premium {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: transform 0.22s, border-color 0.22s;
        }
        .ipo-card-premium:hover {
          transform: translateY(-3px);
          border-color: rgba(var(--primary-rgb), 0.25);
        }
        .ipo-card-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: start;
        }
        .ipo-avatar-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 900;
          flex-shrink: 0;
        }
        .pulse-indicator {
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 1.2s infinite;
        }
        .badge-live {
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .ipo-card-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        [data-theme="light"] .ipo-card-stats-grid {
          border-top-color: rgba(15, 23, 42, 0.05);
          border-bottom-color: rgba(15, 23, 42, 0.05);
        }
        .stat-item-premium {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .stat-lbl {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .stat-val {
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 700;
        }
        .ipo-card-actions-row {
          display: flex;
          gap: 0.75rem;
        }

        /* ─── Inspector Overlay ─── */
        .ipo-inspector-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.25s ease;
        }
        .ipo-inspector-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          max-width: 580px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .close-inspector-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1.1rem;
          cursor: pointer;
          transition: color 0.15s;
        }
        .close-inspector-btn:hover {
          color: var(--text-primary);
        }

        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

    </div>
  );
}
