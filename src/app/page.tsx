"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BROKERS_DATA } from "@/data/brokersData";
import { CREDIT_CARDS_CATALOG } from "@/data/cardsData";
import { BANKS_DATA } from "@/data/banksData";
import { PAYMENT_APPS_DATA } from "@/data/paymentAppsData";

// Core unlisted equity listings (Pre-IPO)
const PRE_IPO_PREVIEWS = [
  { name: "SpaceX", estPrice: "₹9,450", valuation: "$210 Billion", growth: "+45%", type: "Aerospace & Satellite", slug: "spacex" },
  { name: "Stripe", estPrice: "₹2,385", valuation: "$70 Billion", growth: "+32%", type: "Fintech infrastructure", slug: "stripe" },
  { name: "Canva", estPrice: "₹3,790", valuation: "$26 Billion", growth: "+38%", type: "SaaS design suite", slug: "canva" },
  { name: "NSE India", estPrice: "₹6,800", valuation: "₹3.2 Lakh Cr", growth: "+58%", type: "Financial Exchange", slug: "nse" }
];

// Live IPO GMP Listings
const IPO_PREVIEWS = [
  { name: "Hexagon Nutrition Limited", ticker: "HEXA", gmp: "+₹12 (26.6%)", size: "₹1,200 Cr", lotSize: 333, status: "Active" },
  { name: "UHM Vacation Limited", ticker: "UHMV", gmp: "+₹28 (16.8%)", size: "₹48 Cr", lotSize: 800, status: "Active" },
  { name: "Vahh Chemicals Limited", ticker: "VAHH", gmp: "+₹10 (16.6%)", size: "₹18 Cr", lotSize: 2000, status: "Active" },
  { name: "CMR Green Technologies", ticker: "CMRG", gmp: "+₹71 (36.9%)", size: "₹950 Cr", lotSize: 78, status: "Listed" }
];

export default function Home() {
  const router = useRouter();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ipo" | "preipo" | "select">("ipo");
  
  // Select Category state
  const [selectCategory, setSelectCategory] = useState<"cards" | "brokers" | "banks" | "apps">("cards");

  // Vote state
  const [votes, setVotes] = useState({ bullish: 1845, bearish: 489, neutral: 312 });
  const [userVoted, setUserVoted] = useState<string | null>(null);

  const handleVote = (type: "bullish" | "bearish" | "neutral") => {
    if (userVoted) return;
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setUserVoted(type);
  };

  const totalVotes = votes.bullish + votes.bearish + votes.neutral;
  const percentBullish = Math.round((votes.bullish / totalVotes) * 100);
  const percentBearish = Math.round((votes.bearish / totalVotes) * 100);
  const percentNeutral = Math.round((votes.neutral / totalVotes) * 100);

  // Search matching algorithm
  const searchResults = (() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();

    const matchedIpos = IPO_PREVIEWS.filter(ipo => 
      ipo.name.toLowerCase().includes(query) || ipo.ticker.toLowerCase().includes(query)
    ).slice(0, 3).map(x => ({ ...x, category: "Public IPO", url: "/india/ipo" }));

    const matchedPreIpos = PRE_IPO_PREVIEWS.filter(p => 
      p.name.toLowerCase().includes(query)
    ).slice(0, 3).map(x => ({ ...x, ticker: "", category: "Pre-IPO Share", url: "/india/preipo" }));

    const matchedCards = CREDIT_CARDS_CATALOG.filter(c => 
      c.name.toLowerCase().includes(query) || c.issuer.toLowerCase().includes(query)
    ).slice(0, 3).map(x => ({ name: x.name, ticker: x.issuer, category: "Credit Card", url: `/india/credit-card/${x.slug}` }));

    const matchedBrokers = BROKERS_DATA.filter(b => 
      b.name.toLowerCase().includes(query)
    ).slice(0, 3).map(x => ({ name: x.name, ticker: x.type, category: "Demat Broker", url: `/india/brokers/${x.slug}` }));

    const matchedBanks = BANKS_DATA.filter(bk => 
      bk.name.toLowerCase().includes(query)
    ).slice(0, 3).map(x => ({ name: x.name, ticker: x.type, category: "Bank Account", url: `/india/bank-accounts/${x.slug}` }));

    const matchedApps = PAYMENT_APPS_DATA.filter(app => 
      app.name.toLowerCase().includes(query)
    ).slice(0, 3).map(x => ({ name: x.name, ticker: x.type, category: "Payment App", url: `/india/payment-apps/${x.slug}` }));

    return [...matchedIpos, ...matchedPreIpos, ...matchedCards, ...matchedBrokers, ...matchedBanks, ...matchedApps];
  })();

  return (
    <>
      {/* Live Scrolling Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-item">⚡ <strong>PLATFORM INTEL:</strong> 100% Unbiased Private & Public Listings Directory</div>
          <div className="ticker-item">Hexagon Nutrition (HEXA) <span className="badge badge-success">GMP +26.6%</span></div>
          <div className="ticker-item">CMR Green Tech (CMRG) <span className="badge badge-success">Listing Premium +36.9%</span></div>
          <div className="ticker-item">🛸 SpaceX (Pre-IPO) <strong style={{ color: "var(--primary)" }}>₹9,450</strong> <span style={{ color: "var(--success)", fontSize: "0.75rem" }}>+45% YoY</span></div>
          <div className="ticker-item">🛸 NSE India (Pre-IPO) <strong style={{ color: "var(--primary)" }}>₹6,800</strong> <span style={{ color: "var(--success)", fontSize: "0.75rem" }}>+58% YoY</span></div>
          <div className="ticker-item">🛡️ Zero Affiliate Kickbacks Guarantee</div>
        </div>
      </div>

      {/* Decorative Glow Elements */}
      <div style={{
        position: "absolute",
        top: "100px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(600px, 100vw)",
        height: "300px",
        background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.12) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden"
      }} />

      <div className="app-container" style={{ paddingTop: "3.5rem", position: "relative", zIndex: 1 }}>
        
        {/* Authority & Unbiased Hero Header */}
        <header style={{ marginBottom: "3.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(var(--primary-rgb), 0.06)", border: "1px solid rgba(var(--primary-rgb), 0.15)", padding: "0.4rem 1.25rem", borderRadius: "99px", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "var(--success)" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              🛡️ 100% Unbiased Audited Capital Intel
            </span>
          </div>
          
          <h1 style={{ fontSize: "3.5rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.1, maxWidth: "880px" }}>
            India's Leading Authority on <span className="text-gradient-purple">Public & Private Markets</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem", maxWidth: "680px", lineHeight: 1.6 }}>
            The largest, commission-free platform for Grey Market premiums, unlisted Pre-IPO valuations, and Select banking products. No affiliations, just pure data.
          </p>

          {/* Unified Search Engine Bar */}
          <div style={{ position: "relative", width: "100%", maxWidth: "600px", zIndex: 99 }}>
            <div className="home-search-bar">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search IPO, Pre-IPO unlisted stock, broker, card, bank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", marginRight: "1rem" }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown Floating Search Results */}
            {searchResults && (
              <div 
                className="card" 
                style={{ 
                  position: "absolute", 
                  top: "105%", 
                  left: 0, 
                  right: 0, 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--card-border)", 
                  borderRadius: "16px", 
                  padding: "0.75rem", 
                  maxHeight: "350px", 
                  overflowY: "auto", 
                  textAlign: "left",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                }}
              >
                {searchResults.length === 0 ? (
                  <div style={{ padding: "1rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                    No assets matching your query.
                  </div>
                ) : (
                  searchResults.map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => router.push(item.url)}
                      style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        padding: "0.75rem 1rem", 
                        borderRadius: "8px", 
                        cursor: "pointer", 
                        transition: "background 0.2s" 
                      }}
                      className="premium-spec-cell"
                    >
                      <div>
                        <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{item.name}</strong>
                        {item.ticker && (
                          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "0.5rem", fontFamily: "var(--font-mono)" }}>
                            ({item.ticker})
                          </span>
                        )}
                      </div>
                      <span className="badge badge-primary" style={{ fontSize: "0.65rem" }}>{item.category}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </header>

        {/* Global Statistics & Trust Counters Bar */}
        <section className="trust-stats-bar">
          <div className="trust-stat-item">
            <div className="trust-stat-value">₹0</div>
            <div className="trust-stat-label">Affiliate Kickbacks</div>
          </div>
          <div className="trust-stat-item">
            <div className="trust-stat-value">48+</div>
            <div className="trust-stat-label">Audited IPOs YTD</div>
          </div>
          <div className="trust-stat-item">
            <div className="trust-stat-value">120+</div>
            <div className="trust-stat-label">Pre-IPO Benchmarks</div>
          </div>
          <div className="trust-stat-item">
            <div className="trust-stat-value">100%</div>
            <div className="trust-stat-label">Unbiased Audits</div>
          </div>
        </section>

        {/* Value Pillars (Why We Are Unbiased & Large) */}
        <section className="pillar-grid">
          <div className="pillar-card">
            <div className="pillar-icon-wrapper">🛡️</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Audit Over Commission</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
              Most reviews are paid by affiliate tracking tags. We do not accept broker commission structures, keeping every listing opening, AMC, and delivery markup completely raw.
            </p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon-wrapper">🛸</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Unified Capital Access</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
              Map private unlisted benchmarks alongside live public listings. From SpaceX secondary equity to SME launches, track premiums without switching platforms.
            </p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon-wrapper">💎</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Select Audited Catalog</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
              Handpicked cards, bank account limits, and payment app configurations. Use our integrated brokerage plans checker to calculate exact transaction costs.
            </p>
          </div>
        </section>

        {/* Interactive Asset Explorer Dashboard */}
        <div className="grid-dashboard" style={{ marginBottom: "4rem" }}>
          
          <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Explorer Section Card */}
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 900 }}>Capital Listings Explorer</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                  Select a category below to explore live audited ratings and metrics.
                </p>
              </div>

              {/* Tab Selector */}
              <div className="home-tab-nav">
                <button 
                  onClick={() => setActiveTab("ipo")} 
                  className={`home-tab-btn ${activeTab === "ipo" ? "active" : ""}`}
                >
                  📅 Public IPOs
                </button>
                <button 
                  onClick={() => setActiveTab("preipo")} 
                  className={`home-tab-btn ${activeTab === "preipo" ? "active" : ""}`}
                >
                  🛸 Private Pre-IPOs
                </button>
                <button 
                  onClick={() => setActiveTab("select")} 
                  className={`home-tab-btn ${activeTab === "select" ? "active" : ""}`}
                >
                  💎 Select Catalog
                </button>
              </div>

              {/* TAB CONTENT 1: PUBLIC IPOS */}
              {activeTab === "ipo" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {IPO_PREVIEWS.map((ipo, idx) => (
                    <div key={idx} className="premium-spec-cell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <strong style={{ fontSize: "1rem", color: "var(--text-primary)" }}>{ipo.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                          Ticker: <span style={{ fontFamily: "var(--font-mono)" }}>{ipo.ticker}</span> • Size: {ipo.size}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <span className="badge badge-success" style={{ fontWeight: 800 }}>{ipo.gmp} GMP</span>
                        <span className="badge badge-secondary" style={{ fontSize: "0.65rem" }}>{ipo.status}</span>
                      </div>
                    </div>
                  ))}
                  <Link href="/india/ipo" className="btn btn-primary" style={{ textAlign: "center", marginTop: "1rem", textDecoration: "none" }}>
                    Explore All IPO Listings →
                  </Link>
                </div>
              )}

              {/* TAB CONTENT 2: PRIVATE PRE-IPOS */}
              {activeTab === "preipo" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {PRE_IPO_PREVIEWS.map((p, idx) => (
                    <div key={idx} className="premium-spec-cell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <strong style={{ fontSize: "1rem", color: "var(--text-primary)" }}>{p.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                          Valuation: <strong>{p.valuation}</strong> • {p.type}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <strong style={{ color: "var(--primary)" }}>{p.estPrice}</strong>
                        <div style={{ fontSize: "0.7rem", color: "var(--success)" }}>{p.growth} YoY</div>
                      </div>
                    </div>
                  ))}
                  <Link href="/india/preipo" className="btn btn-primary" style={{ textAlign: "center", marginTop: "1rem", textDecoration: "none" }}>
                    Explore All Pre-IPO Offerings →
                  </Link>
                </div>
              )}

              {/* TAB CONTENT 3: SELECT CATALOG */}
              {activeTab === "select" && (
                <div>
                  {/* Select Sub categories */}
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                    <button 
                      onClick={() => setSelectCategory("cards")} 
                      className="badge" 
                      style={{ background: selectCategory === "cards" ? "var(--primary)" : "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", border: "none" }}
                    >
                      💳 Credit Cards ({CREDIT_CARDS_CATALOG.length})
                    </button>
                    <button 
                      onClick={() => setSelectCategory("brokers")} 
                      className="badge" 
                      style={{ background: selectCategory === "brokers" ? "var(--primary)" : "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", border: "none" }}
                    >
                      🏛️ Brokers ({BROKERS_DATA.length})
                    </button>
                    <button 
                      onClick={() => setSelectCategory("banks")} 
                      className="badge" 
                      style={{ background: selectCategory === "banks" ? "var(--primary)" : "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", border: "none" }}
                    >
                      🏦 Banks ({BANKS_DATA.length})
                    </button>
                    <button 
                      onClick={() => setSelectCategory("apps")} 
                      className="badge" 
                      style={{ background: selectCategory === "apps" ? "var(--primary)" : "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", border: "none" }}
                    >
                      📱 Apps ({PAYMENT_APPS_DATA.length})
                    </button>
                  </div>

                  {/* Sub category preview */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {selectCategory === "cards" && CREDIT_CARDS_CATALOG.slice(0, 3).map((c, idx) => (
                      <div key={idx} className="premium-spec-cell flex-between">
                        <div>
                          <strong>{c.name}</strong>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                            Best For: {c.bestFor} • Joining Fee: {c.fees.joiningFee}
                          </div>
                        </div>
                        <Link href={`/india/credit-card/${c.slug}`} className="btn btn-secondary" style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", textDecoration: "none" }}>
                          Review
                        </Link>
                      </div>
                    ))}

                    {selectCategory === "brokers" && BROKERS_DATA.slice(0, 3).map((b, idx) => (
                      <div key={idx} className="premium-spec-cell flex-between">
                        <div>
                          <strong>{b.name}</strong>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                            Depository: {b.depository} • AMC: {b.charges.amc}
                          </div>
                        </div>
                        <Link href={`/india/brokers/${b.slug}`} className="btn btn-secondary" style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", textDecoration: "none" }}>
                          Review
                        </Link>
                      </div>
                    ))}

                    {selectCategory === "banks" && BANKS_DATA.slice(0, 3).map((bk, idx) => (
                      <div key={idx} className="premium-spec-cell flex-between">
                        <div>
                          <strong>{bk.name}</strong>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                            Rate: {bk.interestRate} • Balance: {bk.charges.minimumBalance}
                          </div>
                        </div>
                        <Link href={`/india/bank-accounts/${bk.slug}`} className="btn btn-secondary" style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", textDecoration: "none" }}>
                          Review
                        </Link>
                      </div>
                    ))}

                    {selectCategory === "apps" && PAYMENT_APPS_DATA.slice(0, 3).map((app, idx) => (
                      <div key={idx} className="premium-spec-cell flex-between">
                        <div>
                          <strong>{app.name}</strong>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                            Daily Limit: {app.limits.dailyLimit} • Load Fee: {app.charges.walletLoading}
                          </div>
                        </div>
                        <Link href={`/india/payment-apps/${app.slug}`} className="btn btn-secondary" style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", textDecoration: "none" }}>
                          Review
                        </Link>
                      </div>
                    ))}
                  </div>

                  <Link href="/india/select" className="btn btn-primary" style={{ textAlign: "center", display: "block", marginTop: "1.5rem", textDecoration: "none" }}>
                    Explore Select Dashboard →
                  </Link>
                </div>
              )}

            </div>
          </main>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Sentiment Gauge Card */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📊</span> Sentiment Gauge
              </h2>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "-0.5rem" }}>
                Vote on unlisted & public listings sentiment.
              </p>

              {/* Poll bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "0.5rem 0" }}>
                <div>
                  <div className="flex-between" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "var(--success)", fontWeight: "600" }}>🚀 Bullish</span>
                    <strong>{percentBullish}% ({votes.bullish})</strong>
                  </div>
                  <div style={{ height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--success)", width: `${percentBullish}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
                <div>
                  <div className="flex-between" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "var(--danger)", fontWeight: "600" }}>📉 Bearish</span>
                    <strong>{percentBearish}% ({votes.bearish})</strong>
                  </div>
                  <div style={{ height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--danger)", width: `${percentBearish}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
                <div>
                  <div className="flex-between" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "var(--text-secondary)", fontWeight: "600" }}>⚖️ Neutral</span>
                    <strong>{percentNeutral}% ({votes.neutral})</strong>
                  </div>
                  <div style={{ height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--text-muted)", width: `${percentNeutral}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>

              {/* Vote actions */}
              {!userVoted ? (
                <div style={{ display: "flex", gap: "0.5rem", width: "100%", marginTop: "0.5rem" }}>
                  <button onClick={() => handleVote("bullish")} className="btn btn-secondary" style={{ flex: 1, padding: "0.45rem", fontSize: "0.75rem" }}>Bullish</button>
                  <button onClick={() => handleVote("bearish")} className="btn btn-secondary" style={{ flex: 1, padding: "0.45rem", fontSize: "0.75rem" }}>Bearish</button>
                  <button onClick={() => handleVote("neutral")} className="btn btn-secondary" style={{ flex: 1, padding: "0.45rem", fontSize: "0.75rem" }}>Neutral</button>
                </div>
              ) : (
                <div style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--primary)", fontWeight: "700", background: "rgba(var(--primary-rgb), 0.08)", padding: "0.5rem", borderRadius: "6px" }}>
                  ✓ Sentiment registered.
                </div>
              )}
            </div>

            {/* Latest Headlines */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📰</span> Market Headlines
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { title: "Bajaj Housing Finance IPO Subscribed 67x — GMP at ₹180", tag: "IPO", sentiment: "bullish" },
                  { title: "SEBI Introduces T+0 Settlement for Top 500 Stocks", tag: "Markets", sentiment: "neutral" },
                  { title: "RBI Holds Repo at 6.25% — Rate Cut Signals H2 2026", tag: "Economy", sentiment: "neutral" },
                ].map((item, idx, arr) => (
                  <div key={idx} style={{ paddingBottom: "0.85rem", paddingTop: idx > 0 ? "0.85rem" : 0, borderBottom: idx < arr.length - 1 ? "1px solid var(--border-color)" : "none" }}>
                    <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.35rem" }}>
                      <span className={`badge ${item.sentiment === "bullish" ? "badge-success" : "badge-secondary"}`} style={{ fontSize: "0.58rem", padding: "0.12rem 0.45rem" }}>
                        {item.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.35, color: "var(--text-primary)" }}>{item.title}</p>
                  </div>
                ))}
              </div>

              <Link href="/india/news" className="btn btn-secondary" style={{ width: "100%" }}>
                All Market News →
              </Link>
            </div>

          </aside>

        </div>

      </div>
    </>
  );
}
