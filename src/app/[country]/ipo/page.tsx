"use client";

import React, { useState, useEffect, Suspense } from "react";
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
  offerPriceNum: number;
  listingPriceNum?: number;
  currentPriceNum?: number;
  countrySlug: string;
}

const IPO_DATA: IPODetails[] = [
  // India Listings
  {
    id: "in-1",
    name: "Hexagon Nutrition Limited",
    ticker: "HEXA",
    status: "active",
    priceBand: "₹42 - ₹45",
    gmp: 26.6,
    gmpAmount: "+₹12",
    openDate: "2026-06-05",
    closeDate: "2026-06-09",
    size: "₹1,200 Cr",
    lotSize: 333,
    subscription: { qib: 1.2, nii: 1.8, retail: 2.1, total: 1.65 },
    segment: "Mainboard",
    logoLetter: "H",
    logoColor: "#4f46e5",
    description: "Hexagon Nutrition manufactures micro-nutrient premixes, clinical nutrition supplements, and therapeutic foods for global FMCG and healthcare sectors.",
    offerPriceNum: 45,
    countrySlug: "india"
  },
  {
    id: "in-2",
    name: "UHM Vacation Limited",
    ticker: "UHMV",
    status: "active",
    priceBand: "₹157 - ₹166",
    gmp: 16.8,
    gmpAmount: "+₹28",
    openDate: "2026-06-04",
    closeDate: "2026-06-08",
    size: "₹48 Cr",
    lotSize: 800,
    subscription: { qib: 0.2, nii: 0.5, retail: 1.1, total: 0.71 },
    segment: "SME",
    logoLetter: "U",
    logoColor: "#10b981",
    description: "UHM Vacation operates premium resort suites and experiential tour packages targeting leisure travelers across Southern India.",
    offerPriceNum: 166,
    countrySlug: "india"
  },
  {
    id: "in-3",
    name: "Vahh Chemicals Limited",
    ticker: "VAHH",
    status: "active",
    priceBand: "₹60 - ₹60",
    gmp: 16.6,
    gmpAmount: "+₹10",
    openDate: "2026-06-04",
    closeDate: "2026-06-08",
    size: "₹18 Cr",
    lotSize: 2000,
    subscription: { qib: 4.1, nii: 6.2, retail: 8.5, total: 6.01 },
    segment: "SME",
    logoLetter: "V",
    logoColor: "#f59e0b",
    description: "Vahh Chemicals processes specialty intermediates and high-purity solvents utilized in API pharmaceutical manufacturing.",
    offerPriceNum: 60,
    countrySlug: "india"
  },
  {
    id: "in-4",
    name: "CMR Green Technologies",
    ticker: "CMRG",
    status: "listed",
    priceBand: "₹182 - ₹192",
    gmp: 36.9,
    gmpAmount: "+₹71",
    openDate: "2026-06-01",
    closeDate: "2026-06-03",
    listingDate: "2026-06-09",
    size: "₹950 Cr",
    lotSize: 78,
    subscription: { qib: 154.2, nii: 98.4, retail: 42.1, total: 127.04 },
    segment: "Mainboard",
    logoLetter: "C",
    logoColor: "#8b5cf6",
    description: "CMR Green Technologies is India's largest metal recycling processor, producing aluminum alloys with a 70% lower carbon footprint.",
    offerPriceNum: 192,
    listingPriceNum: 263,
    currentPriceNum: 278,
    listingGain: 36.9,
    countrySlug: "india"
  },

  // US Listings
  {
    id: "us-1",
    name: "CloudScale AI Systems",
    ticker: "CSAI",
    status: "active",
    priceBand: "$42 - $45",
    gmp: 48.0,
    gmpAmount: "+$21.50",
    openDate: "2026-06-03",
    closeDate: "2026-06-08",
    size: "$850M",
    lotSize: 30,
    subscription: { qib: 4.2, nii: 2.8, retail: 6.5, total: 4.8 },
    segment: "Mainboard",
    logoLetter: "C",
    logoColor: "#6366f1",
    description: "CloudScale AI provides next-gen GPU scheduling and cluster orchestration tooling, cutting training compute overheads by 40%.",
    offerPriceNum: 45,
    countrySlug: "united-states"
  },
  {
    id: "us-2",
    name: "Apex Logistics & Swyft",
    ticker: "APSL",
    status: "upcoming",
    priceBand: "$14 - $16",
    gmp: 6.2,
    gmpAmount: "+$1.00",
    openDate: "2026-06-18",
    closeDate: "2026-06-22",
    size: "$120M",
    lotSize: 100,
    subscription: { qib: 0, nii: 0, retail: 0, total: 0 },
    segment: "SME",
    logoLetter: "A",
    logoColor: "#ef4444",
    description: "Apex Swyft operates automated mid-mile delivery drone networks, coordinating cargo across regional e-commerce distribution warehouses.",
    offerPriceNum: 16,
    countrySlug: "united-states"
  },
  {
    id: "us-3",
    name: "Orbit Launch Corp",
    ticker: "ORBT",
    status: "listed",
    priceBand: "$15",
    gmp: 55.0,
    gmpAmount: "+$8.25",
    openDate: "2026-05-18",
    closeDate: "2026-05-20",
    listingDate: "2026-05-28",
    size: "$400M",
    lotSize: 50,
    subscription: { qib: 18.4, nii: 12.1, retail: 34.5, total: 22.8 },
    offerPriceNum: 15,
    listingPriceNum: 23.25,
    currentPriceNum: 26.80,
    listingGain: 55.0,
    segment: "Mainboard",
    logoLetter: "O",
    logoColor: "#0ea5e9",
    description: "Orbit Launch manufactures lightweight orbital rockets, offering dedicated microsatellite deployments at record cost efficiency.",
    countrySlug: "united-states"
  },

  // UK Listings
  {
    id: "uk-1",
    name: "Verdant Energy Grid",
    ticker: "VERD",
    status: "active",
    priceBand: "£2.10 - £2.40",
    gmp: 12.5,
    gmpAmount: "+£0.30",
    openDate: "2026-06-03",
    closeDate: "2026-06-09",
    size: "£140M",
    lotSize: 250,
    subscription: { qib: 1.5, nii: 0.8, retail: 3.2, total: 1.85 },
    segment: "Mainboard",
    logoLetter: "V",
    logoColor: "#10b981",
    description: "Verdant Energy builds utility-scale battery storage facilities, stabilizing volatile grid inputs from North Sea offshore wind assets.",
    offerPriceNum: 2.40,
    countrySlug: "united-kingdom"
  },
  {
    id: "uk-2",
    name: "Beacon CyberSec Ltd",
    ticker: "BCON",
    status: "upcoming",
    priceBand: "£0.80 - £0.95",
    gmp: 15.7,
    gmpAmount: "+£0.15",
    openDate: "2026-06-16",
    closeDate: "2026-06-19",
    size: "£18M",
    lotSize: 1000,
    subscription: { qib: 0, nii: 0, retail: 0, total: 0 },
    segment: "SME",
    logoLetter: "B",
    logoColor: "#ec4899",
    description: "Beacon provides AI-powered penetration testing and automated audit logs for UK corporate financial platforms.",
    offerPriceNum: 0.95,
    countrySlug: "united-kingdom"
  }
];

// Country Configurations Map
const COUNTRY_CONFIGS: Record<string, {
  currency: string;
  mainboardLabel: string;
  smeLabel: string;
  subscriptionLabel: string;
  qibHeader: string;
  niiHeader: string;
  retailHeader: string;
  hasAllotment: boolean;
}> = {
  "india": {
    currency: "₹",
    mainboardLabel: "Mainboard IPO",
    smeLabel: "SME IPO",
    subscriptionLabel: "Bidding Times",
    qibHeader: "QIB (Institutional)",
    niiHeader: "NII (HNI / Corporate)",
    retailHeader: "Retail Individual",
    hasAllotment: true
  },
  "united-states": {
    currency: "$",
    mainboardLabel: "Major Exchange (NYSE/NASDAQ)",
    smeLabel: "SME Listing (OTC / Reg A+)",
    subscriptionLabel: "Interest Index",
    qibHeader: "Institutional Allocations",
    niiHeader: "Hedge Fund Allocations",
    retailHeader: "Retail Bid Multiples",
    hasAllotment: false
  },
  "united-kingdom": {
    currency: "£",
    mainboardLabel: "LSE Main Market",
    smeLabel: "LSE AIM (SME Listing)",
    subscriptionLabel: "Retail Allocation Rate",
    qibHeader: "Institutional Allocations",
    niiHeader: "Venture Allocations",
    retailHeader: "PrimaryBid Retail Multiples",
    hasAllotment: false
  }
};

function LocalizedIPOPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const countrySlug = (params?.country as string) || "india";
  const config = COUNTRY_CONFIGS[countrySlug] || COUNTRY_CONFIGS["india"];

  // Tab state (Active, Upcoming, Listed)
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "listed">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIPO, setSelectedIPO] = useState<IPODetails | null>(null);

  // Sub-view Tab state ("overview" | "calendar" | "performance")
  const [subView, setSubView] = useState<"overview" | "calendar" | "performance">("overview");

  // Sync subView with search query param
  useEffect(() => {
    if (searchParams) {
      const view = searchParams.get("view");
      if (view === "calendar") {
        setSubView("calendar");
      } else if (view === "performance") {
        setSubView("performance");
      } else if (view === "overview") {
        setSubView("overview");
      }
    }
  }, [searchParams]);

  // Hero Slider Slide State
  const [activeSlide, setActiveSlide] = useState(0);

  // Apply simulation state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appliedCompany, setAppliedCompany] = useState("");

  // Allotment Checker State
  const [allotmentSearch, setAllotmentSearch] = useState("");
  const [allotmentIPO, setAllotmentIPO] = useState("");
  const [allotmentResult, setAllotmentResult] = useState<{
    searched: boolean;
    success: boolean;
    company: string;
    allottedShares?: number;
    amountBlocked?: string;
    statusText: string;
  } | null>(null);

  // Filter IPOs by active country and tab / query
  const countryIPOs = IPO_DATA.filter((ipo) => ipo.countrySlug === countrySlug);
  const listedIPOs = countryIPOs.filter((ipo) => ipo.status === "listed");

  const filteredIPOs = countryIPOs.filter((ipo) => {
    const matchesTab = ipo.status === activeTab;
    const matchesSearch =
      ipo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ipo.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Default the allotment select value to first active country IPO
  useEffect(() => {
    if (countryIPOs.length > 0) {
      setAllotmentIPO(countryIPOs[0].id);
    }
  }, [countrySlug]);

  const handleAllotmentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allotmentSearch.trim() || !allotmentIPO) return;

    const company = countryIPOs.find((i) => i.id === allotmentIPO);
    if (!company) return;

    const lastChar = allotmentSearch.trim().slice(-1);
    const isSuccess = /[13579aeiouAEIOU]/.test(lastChar);
    const shares = isSuccess ? company.lotSize : 0;

    let priceVal = company.offerPriceNum;
    const amtBlocked = `${config.currency}${(priceVal * company.lotSize).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

    setAllotmentResult({
      searched: true,
      success: isSuccess,
      company: company.name,
      allottedShares: shares,
      amountBlocked: amtBlocked,
      statusText: isSuccess
        ? "CONGRATULATIONS! Shares have been successfully allotted to your portfolio."
        : "UNALLOTTED: Bids were not selected in the computerized random draw. Blocked funds will release shortly.",
    });
  };

  const handleApplyNow = (companyName: string) => {
    setAppliedCompany(companyName);
    setShowApplyModal(true);
    setTimeout(() => {
      setShowApplyModal(false);
    }, 3500);
  };

  // Slider Slides
  const sliderSlides = [
    {
      status: "TRENDING NOW",
      title: countrySlug === "india" ? "CMR Green Recyclers Listed" : "Orbit Launch (ORBT) Listed YTD",
      subtitle: countrySlug === "india" ? "Heavy oversubscription (127x) leads to strong listing premiums." : "Commercial microsatellite launch systems developer lists at +55% premium gain.",
      metric: countrySlug === "india" ? "+36.9% Listing Gain" : "+55.0% YTD Gain",
      badgeColor: "rgba(16, 185, 129, 0.15)",
      textColor: "#10b981"
    },
    {
      status: "PRE-IPO ACCESS",
      title: "Unlisted Tech Equities",
      subtitle: "Direct secondary unlisted shares of SpaceX, Stripe and Canva. Lock in positions pre-listing.",
      metric: "Premium Holdings",
      badgeColor: "rgba(99, 102, 241, 0.15)",
      textColor: "#6366f1"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      
      {/* ── interactive Hero Slider ────────────────────────────────────────────── */}
      <section className="hero-slider-container">
        <div 
          className="hero-slider-track" 
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {sliderSlides.map((slide, idx) => (
            <div key={idx} className="hero-slide-item">
              <div className="hero-slide-content">
                <div style={{ display: "inline-flex", padding: "0.35rem 0.85rem", borderRadius: "99px", background: slide.badgeColor, color: slide.textColor, fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.05em", marginBottom: "1rem" }}>
                  🔥 {slide.status}
                </div>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.75rem" }}>{slide.title}</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.45, maxWidth: "520px", marginBottom: "1.5rem" }}>{slide.subtitle}</p>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <Link href={`/${countrySlug}/preipo`} className="btn btn-primary" style={{ textDecoration: "none" }}>Access Secondary Desk</Link>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: slide.textColor }}>★ {slide.metric}</span>
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

        {/* dots */}
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

      {/* Title & View Switcher */}
      <section style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <h1 className="text-gradient-purple" style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.04em" }}>IPO offerings dashboard</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.4rem" }}>
            Localized updates, grey market premium estimates, and allotment indexes.
          </p>
        </div>
        
        {/* Main Sub-View Tabs */}
        <div className="tabs-header" style={{ border: "1px solid var(--border-color)", padding: "0.25rem", borderRadius: "10px", background: "var(--card-bg)" }}>
          <button
            className={`tab-btn ${subView === "overview" ? "active" : ""}`}
            onClick={() => setSubView("overview")}
            style={{ fontSize: "0.82rem", padding: "0.45rem 1rem", borderRadius: "8px" }}
          >
            📊 Catalog
          </button>
          <button
            className={`tab-btn ${subView === "calendar" ? "active" : ""}`}
            onClick={() => setSubView("calendar")}
            style={{ fontSize: "0.82rem", padding: "0.45rem 1rem", borderRadius: "8px" }}
          >
            📅 Calendar
          </button>
          <button
            className={`tab-btn ${subView === "performance" ? "active" : ""}`}
            onClick={() => setSubView("performance")}
            style={{ fontSize: "0.82rem", padding: "0.45rem 1rem", borderRadius: "8px" }}
          >
            📈 Performance
          </button>
        </div>
      </section>

      {/* Main Dynamic View Layout */}
      <div className="grid-dashboard">
        
        <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* ── VIEW 1: CATALOG OVERVIEW ─────────────────────────────────────────── */}
          {subView === "overview" && (
            <>
              {/* Tab Switcher & Search */}
              <div className="flex-between" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem", flexWrap: "wrap", gap: "1rem" }}>
                <div className="tabs-header" style={{ border: "none", padding: 0 }}>
                  <button
                    className={`tab-btn ${activeTab === "active" ? "active" : ""}`}
                    onClick={() => setActiveTab("active")}
                  >
                    🔴 Live IPOs ({countryIPOs.filter(i => i.status === "active").length})
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
                    onClick={() => setActiveTab("upcoming")}
                  >
                    📅 Upcoming ({countryIPOs.filter(i => i.status === "upcoming").length})
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "listed" ? "active" : ""}`}
                    onClick={() => setActiveTab("listed")}
                  >
                    Listed ({countryIPOs.filter(i => i.status === "listed").length})
                  </button>
                </div>
                
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                  style={{ width: "200px", borderRadius: "8px", background: "var(--card-bg)" }}
                />
              </div>

              {/* Cards Catalog Grid */}
              <div className="ipo-cards-grid">
                {filteredIPOs.length === 0 ? (
                  <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)", gridColumn: "1 / -1" }}>
                    No matching records found.
                  </div>
                ) : (
                  filteredIPOs.map((ipo) => (
                    <div key={ipo.id} className="ipo-card-premium">
                      
                      <div className="ipo-card-header-flex">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div className="ipo-avatar-box" style={{ background: `${ipo.logoColor}12`, border: `1.5px solid ${ipo.logoColor}40`, color: ipo.logoColor }}>
                            {ipo.logoLetter}
                          </div>
                          <div>
                            <h3 style={{ fontSize: "1.05rem", fontWeight: 800 }}>{ipo.name}</h3>
                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{ipo.ticker}</span>
                          </div>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
                          <span className="badge badge-secondary" style={{ fontSize: "0.6rem" }}>
                            {ipo.segment === "Mainboard" ? config.mainboardLabel : config.smeLabel}
                          </span>
                          <span className={`badge ${ipo.status === "active" ? "badge-live" : ipo.status === "listed" ? "badge-success" : "badge-secondary"}`} style={{ fontSize: "0.6rem" }}>
                            {ipo.status === "active" ? "Live Bidding" : ipo.status === "listed" ? "Listed" : "Upcoming"}
                          </span>
                        </div>
                      </div>

                      <div className="ipo-card-stats-grid">
                        <div className="stat-item-premium">
                          <span className="stat-lbl">Timeline</span>
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
                          <span className="stat-lbl">{config.subscriptionLabel}</span>
                          <strong className="stat-val">
                            {ipo.status === "upcoming" ? "Not Open" : `${ipo.subscription.total}x`}
                          </strong>
                        </div>
                        <div className="stat-item-premium" style={{ gridColumn: "span 2" }}>
                          <span className="stat-lbl">GMP Forecast (Premium)</span>
                          <strong className="stat-val" style={{ color: ipo.gmp >= 0 ? "#10b981" : "#ef4444" }}>
                            {ipo.gmpAmount} ({ipo.gmp}%)
                          </strong>
                        </div>
                      </div>

                      <div className="ipo-card-actions-row">
                        <button onClick={() => setSelectedIPO(ipo)} className="btn btn-secondary" style={{ flex: 1, padding: "0.45rem" }}>
                          Analyze Details
                        </button>
                        {ipo.status === "active" && (
                          <button onClick={() => handleApplyNow(ipo.name)} className="btn btn-primary apply-now-btn" style={{ flex: 1, padding: "0.45rem" }}>
                            Apply Now
                          </button>
                        )}
                      </div>

                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* ── VIEW 2: IPO CALENDAR TIMELINE ─────────────────────────────────────── */}
          {subView === "calendar" && (
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.5rem" }}>📅 IPO Calendar Index</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {countryIPOs.length === 0 ? (
                  <div style={{ textAlign: "center", color: "var(--text-secondary)", padding: "1.5rem" }}>No calendar entries available.</div>
                ) : (
                  countryIPOs.map((ipo) => (
                    <div key={ipo.id} style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1.5rem" }}>
                      
                      {/* Timeline dates */}
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgb(var(--primary-rgb))" }}>Open: {ipo.openDate}</div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)", marginTop: "0.25rem" }}>Close: {ipo.closeDate}</div>
                        {ipo.listingDate && (
                          <div style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 600, marginTop: "0.5rem" }}>List: {ipo.listingDate}</div>
                        )}
                      </div>

                      {/* Details */}
                      <div>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>{ipo.name} ({ipo.ticker})</h3>
                          <span className="badge badge-secondary" style={{ fontSize: "0.6rem" }}>{ipo.segment}</span>
                        </div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", marginTop: "0.4rem", lineHeight: 1.4 }}>
                          {ipo.description}
                        </p>
                        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem", fontSize: "0.78rem" }}>
                          <span>Price Band: <strong>{ipo.priceBand}</strong></span>
                          <span>Issue Size: <strong>{ipo.size}</strong></span>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ── VIEW 3: PERFORMANCE TRACKING TABLE ───────────────────────────────── */}
          {subView === "performance" && (
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.5rem" }}>📈 IPO Performance Index</h2>
              
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-color)", opacity: 0.8 }}>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Company</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Listing Date</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Offer Price</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Listing Price</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Listing Gain</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", textAlign: "right" }}>Current Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listedIPOs.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>
                          No listed companies logged YTD.
                        </td>
                      </tr>
                    ) : (
                      listedIPOs.map((ipo) => (
                        <tr key={ipo.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                          <td style={{ padding: "1.25rem 0.5rem" }}>
                            <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{ipo.name}</strong>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{ipo.ticker} • {ipo.segment}</div>
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                            {ipo.listingDate}
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.85rem", fontWeight: 700 }}>
                            {config.currency}{ipo.offerPriceNum}
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.85rem", fontWeight: 700 }}>
                            {config.currency}{ipo.listingPriceNum}
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem" }}>
                            <strong style={{ color: ipo.listingGain && ipo.listingGain >= 0 ? "#10b981" : "#ef4444", fontSize: "0.85rem" }}>
                              {ipo.listingGain && ipo.listingGain >= 0 ? "+" : ""}{ipo.listingGain}%
                            </strong>
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", textAlign: "right", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            {config.currency}{ipo.currentPriceNum}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Details Inspector Modal */}
          {selectedIPO && (
            <div className="ipo-inspector-overlay" onClick={() => setSelectedIPO(null)}>
              <div className="ipo-inspector-card" onClick={(e) => e.stopPropagation()}>
                
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
                  <button onClick={() => setSelectedIPO(null)} className="close-inspector-btn" aria-label="Close Analysis">✕</button>
                </div>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.55, marginBottom: "1.5rem" }}>
                  {selectedIPO.description}
                </p>

                {selectedIPO.status !== "upcoming" && (
                  <div style={{ padding: "1.25rem", background: "rgba(0,0,0,0.18)", borderRadius: "10px", border: "1px solid var(--border-color)", marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: "1rem", fontWeight: 700 }}>
                      Bid Multiples ({config.subscriptionLabel})
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div>
                        <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>{config.qibHeader}</span>
                          <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.qib}x</strong>
                        </div>
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "var(--primary)", width: `${Math.min(100, selectedIPO.subscription.qib * 12)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>{config.niiHeader}</span>
                          <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.nii}x</strong>
                        </div>
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "var(--warning)", width: `${Math.min(100, selectedIPO.subscription.nii * 12)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.35rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>{config.retailHeader}</span>
                          <strong style={{ color: "var(--text-primary)" }}>{selectedIPO.subscription.retail}x</strong>
                        </div>
                        <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "var(--success)", width: `${Math.min(100, selectedIPO.subscription.retail * 8)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
              <span>🔍</span> Registrar Status
            </h2>
            
            {config.hasAllotment ? (
              <>
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
                      {countryIPOs.map((i) => (
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
                      <strong style={{ color: allotmentResult.success ? "var(--success)" : "var(--danger)", fontSize: "0.9rem" }}>
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
              </>
            ) : (
              <div style={{ textAlign: "center", color: "var(--text-secondary)", padding: "1rem 0" }}>
                <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "0.5rem" }}>💼</span>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.4 }}>
                  Allotment checks are only applicable for the Indian (BSE/NSE) market system. 
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.5rem", lineHeight: 1.45 }}>
                  In {countrySlug === "united-states" ? "the United States" : "the United Kingdom"}, shares are allocated directly via brokerage applications (e.g. Robinhood / PrimaryBid) at execution.
                </p>
              </div>
            )}
          </div>

        </aside>

      </div>

      {/* Mock Apply Notification */}
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
              Connecting bids to broker gateway for <strong>{appliedCompany}</strong>...
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

export default function LocalizedIPOPage() {
  return (
    <Suspense fallback={<div className="app-container" style={{ padding: "4rem", textAlign: "center" }}>Loading IPO Dashboard...</div>}>
      <LocalizedIPOPageContent />
    </Suspense>
  );
}
