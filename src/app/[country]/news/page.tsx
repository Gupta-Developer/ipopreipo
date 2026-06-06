"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
type NewsCategory = "all" | "ipo" | "markets" | "economy" | "crypto" | "select";
type Sentiment = "bullish" | "bearish" | "neutral";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: NewsCategory;
  tags: string[];
  sentiment: Sentiment;
  isBreaking?: boolean;
  isTrending?: boolean;
  readTime: number;
  countrySlug: string;
}

// ─── Mock news data (organized by country) ────────────────────────────────────
const NEWS_DATABASE: NewsArticle[] = [
  // ─── INDIA NEWS ────────────────────────────────────────────────────────────
  {
    id: "in-001",
    title: "Bajaj Housing Finance IPO Subscribed 67x on Final Day — GMP Surges to ₹180",
    summary: "The Bajaj Housing Finance IPO witnessed extraordinary investor participation, with retail category oversubscribed by 47x and QIB portion by 209x. Grey market premium jumped to ₹180 per share, signaling a stellar listing day gain ahead.",
    source: "IPO Watch India",
    sourceUrl: "#",
    publishedAt: "2026-06-05T09:30:00Z",
    category: "ipo",
    tags: ["IPO", "Bajaj", "Housing Finance", "GMP", "Allotment"],
    sentiment: "bullish",
    isBreaking: true,
    isTrending: true,
    readTime: 4,
    countrySlug: "india"
  },
  {
    id: "in-002",
    title: "SEBI Introduces T+0 Settlement Cycle for Top 500 Stocks by October 2026",
    summary: "The Securities and Exchange Board of India (SEBI) has approved a voluntary T+0 same-day settlement for the top 500 stocks starting October 2026. Brokers have been given a roadmap with infrastructure requirements. This follows the successful pilot run with 25 scrips from March 2024.",
    source: "Financial Express",
    sourceUrl: "#",
    publishedAt: "2026-06-04T14:15:00Z",
    category: "markets",
    tags: ["SEBI", "T+0", "Settlement", "NSE", "BSE", "Regulatory"],
    sentiment: "bullish",
    isTrending: true,
    readTime: 5,
    countrySlug: "india"
  },
  {
    id: "in-003",
    title: "HDFC Bank Q1 FY27 Results: PAT Rises 18% YoY to ₹16,750 Crore",
    summary: "HDFC Bank reported strong first-quarter earnings with net interest income growing 14% and net NPA falling to an all-time low of 0.3%. Management guided for continued loan growth momentum across retail and SME segments.",
    source: "Economic Times",
    sourceUrl: "#",
    publishedAt: "2026-06-04T11:00:00Z",
    category: "markets",
    tags: ["HDFC Bank", "Q1 Results", "Banking", "PAT", "NII"],
    sentiment: "bullish",
    readTime: 3,
    countrySlug: "india"
  },
  {
    id: "in-004",
    title: "RBI Holds Repo Rate at 6.25% — MPC Notes Easing Inflation Trajectory",
    summary: "The Monetary Policy Committee unanimously voted to keep the repo rate unchanged at 6.25% for the fourth consecutive meeting. Governor Sanjay Malhotra indicated that inflation is trending towards the 4% target and rate cuts could be on the table in H2 2026.",
    source: "Mint",
    sourceUrl: "#",
    publishedAt: "2026-06-03T16:45:00Z",
    category: "economy",
    tags: ["RBI", "Repo Rate", "Monetary Policy", "Inflation", "GDP"],
    sentiment: "neutral",
    readTime: 6,
    countrySlug: "india"
  },
  {
    id: "in-005",
    title: "WazirX Resumes INR Withdrawals After 8-Month Freeze Post Security Breach",
    summary: "WazirX crypto exchange has announced partial resumption of Indian Rupee withdrawals after an extended freeze following its $235M hack in July 2024. The exchange has completed a court-supervised restructuring process and will process withdrawals in phases.",
    source: "CoinDesk India",
    sourceUrl: "#",
    publishedAt: "2026-06-03T08:00:00Z",
    category: "crypto",
    tags: ["WazirX", "Crypto", "INR", "Hack", "Security", "Withdrawal"],
    sentiment: "neutral",
    readTime: 4,
    countrySlug: "india"
  },
  {
    id: "in-006",
    title: "NTPC Green Energy IPO: ₹10,000 Crore Public Issue Opens June 9",
    summary: "NTPC Green Energy Ltd will launch its ₹10,000 crore IPO on June 9 with a price band of ₹98-103 per share. The issue comprises fresh equity of ₹7,500 crore plus OFS of ₹2,500 crore. Lot size is set at 145 shares.",
    source: "IPO Monitor",
    sourceUrl: "#",
    publishedAt: "2026-06-02T10:30:00Z",
    category: "ipo",
    tags: ["NTPC", "Green Energy", "IPO", "Renewable", "PSU"],
    sentiment: "bullish",
    readTime: 3,
    countrySlug: "india"
  },
  {
    id: "in-007",
    title: "Zerodha Reports 22% Decline in Active Clients Amid F&O Restrictions",
    summary: "India's largest broker by active clients saw trading volumes drop following SEBI's new F&O regulations that restricted weekly expiry to Tuesday only. However, delivery volumes in equities rose 15%, indicating a shift to long-term investing.",
    source: "Business Standard",
    sourceUrl: "#",
    publishedAt: "2026-06-02T07:15:00Z",
    category: "select",
    tags: ["Zerodha", "F&O", "SEBI", "Regulation", "Brokers"],
    sentiment: "bearish",
    readTime: 5,
    countrySlug: "india"
  },
  {
    id: "in-008",
    title: "India GDP Growth Clocks 7.4% in FY26 — Highest in 3 Years",
    summary: "India's GDP expanded 7.4% in fiscal year 2025-26, beating estimates of 7.1%. Strong domestic consumption, improved government capex, and a robust services sector drove the growth. The IMF has revised its FY27 outlook upward to 7.1%.",
    source: "Reuters India",
    sourceUrl: "#",
    publishedAt: "2026-05-31T12:00:00Z",
    category: "economy",
    tags: ["GDP", "India Economy", "Growth", "IMF", "Fiscal Policy"],
    sentiment: "bullish",
    readTime: 4,
    countrySlug: "india"
  },

  // ─── UNITED STATES NEWS ────────────────────────────────────────────────────
  {
    id: "us-001",
    title: "CoreWeave NASDAQ IPO: AI Infrastructure Firm Prices at $40 — 31% Above Range",
    summary: "AI cloud infrastructure company CoreWeave priced its Nasdaq IPO at $40 per share, 31% above the original $28-32 price range, raising $1.5 billion. The company's GPU-as-a-service model has attracted hyperscaler clients including Microsoft and Meta.",
    source: "Bloomberg",
    sourceUrl: "#",
    publishedAt: "2026-06-05T13:00:00Z",
    category: "ipo",
    tags: ["CoreWeave", "IPO", "NASDAQ", "AI", "GPU", "Cloud"],
    sentiment: "bullish",
    isBreaking: true,
    isTrending: true,
    readTime: 5,
    countrySlug: "united-states"
  },
  {
    id: "us-002",
    title: "Federal Reserve Signals Two Rate Cuts in 2026 — Powell Flags Disinflation Progress",
    summary: "Fed Chair Jerome Powell acknowledged meaningful progress on inflation but maintained a data-dependent stance. The dot plot now shows a median expectation of two 25bps cuts in 2026, down from three. Markets rallied on the dovish pivot signal.",
    source: "Wall Street Journal",
    sourceUrl: "#",
    publishedAt: "2026-06-04T19:00:00Z",
    category: "economy",
    tags: ["Federal Reserve", "FOMC", "Rate Cut", "Inflation", "Powell"],
    sentiment: "bullish",
    isTrending: true,
    readTime: 6,
    countrySlug: "united-states"
  },
  {
    id: "us-003",
    title: "NVIDIA Reports $28B Revenue in Q2 — Data Center Segment Up 147% YoY",
    summary: "NVIDIA shattered analyst expectations once again with quarterly revenue of $28B driven entirely by AI-related data center GPU demand. The company guided for Q3 revenue of $32.5B as Blackwell GPU shipments ramp up globally.",
    source: "CNBC",
    sourceUrl: "#",
    publishedAt: "2026-06-04T16:30:00Z",
    category: "markets",
    tags: ["NVIDIA", "Earnings", "AI", "GPU", "Data Center", "Blackwell"],
    sentiment: "bullish",
    readTime: 4,
    countrySlug: "united-states"
  },
  {
    id: "us-004",
    title: "SEC Approves Ethereum Spot ETF — Spot BTC ETFs Cross $45B AUM",
    summary: "The Securities and Exchange Commission approved the first Ethereum spot exchange-traded funds from BlackRock, Fidelity, and four other issuers. Existing Bitcoin spot ETFs crossed $45B in combined AUM as institutional demand surges.",
    source: "CoinTelegraph",
    sourceUrl: "#",
    publishedAt: "2026-06-03T11:30:00Z",
    category: "crypto",
    tags: ["Ethereum", "ETF", "SEC", "Bitcoin", "Crypto", "Institutional"],
    sentiment: "bullish",
    isTrending: true,
    readTime: 5,
    countrySlug: "united-states"
  },
  {
    id: "us-005",
    title: "Robinhood Acquires TradePMR to Enter RIA Custody Market",
    summary: "Robinhood announced a definitive agreement to acquire TradePMR, an RIA custodian, for $300M. This marks a strategic push into the wealth management space, targeting registered investment advisors who collectively manage over $40 trillion in AUM.",
    source: "Financial Times",
    sourceUrl: "#",
    publishedAt: "2026-06-02T14:00:00Z",
    category: "select",
    tags: ["Robinhood", "RIA", "Custody", "Wealth Management", "Fintech"],
    sentiment: "bullish",
    readTime: 4,
    countrySlug: "united-states"
  },
  {
    id: "us-006",
    title: "US Jobs Report: 210K Nonfarm Payrolls Added — Unemployment Ticks to 3.9%",
    summary: "The Bureau of Labor Statistics reported 210,000 nonfarm payrolls added in May 2026, above the 185K consensus estimate. Average hourly earnings rose 0.3% MoM, consistent with the Fed's 2% inflation target. The dollar strengthened on the beat.",
    source: "Reuters",
    sourceUrl: "#",
    publishedAt: "2026-06-01T08:30:00Z",
    category: "economy",
    tags: ["Jobs Report", "NFP", "Unemployment", "Fed", "Labor Market"],
    sentiment: "neutral",
    readTime: 3,
    countrySlug: "united-states"
  },

  // ─── UNITED KINGDOM NEWS ───────────────────────────────────────────────────
  {
    id: "uk-001",
    title: "ARM Holdings Reports Strongest Quarter Since IPO — AI Chip Royalties Surge 48%",
    summary: "ARM Holdings posted record quarterly revenue of $1.1B, driven by AI chip royalties as hyperscalers license its v9 architecture for next-gen data center chips. The company raised FY27 guidance to $4.5B, above analyst consensus of $4.1B.",
    source: "London Stock Exchange News",
    sourceUrl: "#",
    publishedAt: "2026-06-05T09:00:00Z",
    category: "markets",
    tags: ["ARM", "AI", "Royalties", "Chip", "NASDAQ", "Earnings"],
    sentiment: "bullish",
    isBreaking: true,
    isTrending: true,
    readTime: 4,
    countrySlug: "united-kingdom"
  },
  {
    id: "uk-002",
    title: "Bank of England Cuts Base Rate to 4.25% — First Back-to-Back Cut Since 2009",
    summary: "The Monetary Policy Committee voted 7-2 to cut the base rate by 25bps to 4.25%, marking the second consecutive cut. Governor Andrew Bailey cited cooling wage growth and services inflation as key factors enabling the dovish shift.",
    source: "The Times",
    sourceUrl: "#",
    publishedAt: "2026-06-04T12:00:00Z",
    category: "economy",
    tags: ["Bank of England", "Rate Cut", "MPC", "Inflation", "GBP"],
    sentiment: "bullish",
    isTrending: true,
    readTime: 5,
    countrySlug: "united-kingdom"
  },
  {
    id: "uk-003",
    title: "London Stock Exchange Targets 15 New Tech IPOs in 2026 — Reform Bears Fruit",
    summary: "The FCA's listing rule reforms appear to be working, with 15 technology companies preparing LSE main market listings in 2026. The dual-class share structure changes have attracted Silicon Roundabout startups that previously chose NASDAQ.",
    source: "City A.M.",
    sourceUrl: "#",
    publishedAt: "2026-06-03T10:00:00Z",
    category: "ipo",
    tags: ["LSE", "IPO", "Tech", "FCA", "London", "Listing Rules"],
    sentiment: "bullish",
    readTime: 4,
    countrySlug: "united-kingdom"
  },
  {
    id: "uk-004",
    title: "Revolut Granted Full UK Banking Licence — Targets 1M Premium Accounts by 2027",
    summary: "Revolut has received its long-awaited UK banking licence from the Prudential Regulation Authority after a three-year wait. The fintech giant now offers FSCS-protected deposits up to £85,000 and plans to launch a mortgage product by Q1 2027.",
    source: "BBC Business",
    sourceUrl: "#",
    publishedAt: "2026-06-02T08:00:00Z",
    category: "select",
    tags: ["Revolut", "Banking Licence", "PRA", "FSCS", "Fintech", "UK"],
    sentiment: "bullish",
    readTime: 4,
    countrySlug: "united-kingdom"
  },
  {
    id: "uk-005",
    title: "UK CPI Falls to 2.2% — On Target for Bank of England's H2 2026 Roadmap",
    summary: "Consumer price inflation in the UK fell to 2.2% in May 2026, the closest to the 2% BoE target since 2021. Services inflation, which had been sticky, finally moderated to 4.8%. Markets are pricing in two more cuts before year-end.",
    source: "Office for National Statistics",
    sourceUrl: "#",
    publishedAt: "2026-06-01T07:00:00Z",
    category: "economy",
    tags: ["UK CPI", "Inflation", "BoE", "Services", "Rate Cut"],
    sentiment: "bullish",
    readTime: 3,
    countrySlug: "united-kingdom"
  }
];

const CATEGORIES: { id: NewsCategory; label: string; icon: string }[] = [
  { id: "all",      label: "All News",      icon: "📰" },
  { id: "ipo",      label: "IPO News",      icon: "🏦" },
  { id: "markets",  label: "Markets",       icon: "📈" },
  { id: "economy",  label: "Economy",       icon: "🌐" },
  { id: "crypto",   label: "Crypto",        icon: "🪙" },
  { id: "select",   label: "Select",        icon: "💼" },
];

const COUNTRY_MAP: Record<string, { name: string; flag: string; code: string }> = {
  "india":          { name: "India",          flag: "🇮🇳", code: "IN" },
  "united-states":  { name: "United States",  flag: "🇺🇸", code: "US" },
  "united-kingdom": { name: "United Kingdom", flag: "🇬🇧", code: "UK" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const timeAgo = (iso: string) => {
  const now = new Date();
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffH = Math.floor(diffMs / 3600000);
  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return diffD === 1 ? "Yesterday" : `${diffD}d ago`;
};

const sentimentConfig = {
  bullish: { color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", label: "📈 Bullish" },
  bearish: { color: "#ef4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)",  label: "📉 Bearish" },
  neutral: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", label: "➡️ Neutral"  },
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function MarketNewsPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const countryInfo = COUNTRY_MAP[countrySlug] || COUNTRY_MAP["india"];

  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all");
  const [searchQuery, setSearchQuery]        = useState("");
  const [sortBy, setSortBy]                  = useState<"latest" | "trending">("latest");
  const [tickerOffset, setTickerOffset]      = useState(0);

  // Ticker animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Filter & sort articles
  const articles = NEWS_DATABASE
    .filter((a) => a.countrySlug === countrySlug)
    .filter((a) => activeCategory === "all" || a.category === activeCategory)
    .filter((a) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (sortBy === "trending") {
        if (a.isBreaking && !b.isBreaking) return -1;
        if (!a.isBreaking && b.isBreaking) return 1;
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
      }
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  const breakingNews  = articles.filter((a) => a.isBreaking);
  const trendingNews  = articles.filter((a) => a.isTrending);
  const featuredArticle = articles[0];
  const sideArticles    = articles.slice(1, 4);
  const moreArticles    = articles.slice(4);

  // Ticker data
  const allCountryArticles = NEWS_DATABASE.filter(a => a.countrySlug === countrySlug);
  const tickerItems = allCountryArticles.filter(a => a.isBreaking || a.isTrending);

  return (
    <div className="app-container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "0.72rem", background: "rgba(239,68,68,0.08)", color: "#ef4444",
            border: "1px solid rgba(239,68,68,0.2)", padding: "0.3rem 0.8rem",
            borderRadius: "99px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em"
          }}>
            📡 Live Market Intelligence
          </span>
          {breakingNews.length > 0 && (
            <span style={{
              fontSize: "0.72rem", background: "rgba(239,68,68,0.9)", color: "#ffffff",
              padding: "0.3rem 0.8rem", borderRadius: "99px", fontWeight: 800,
              animation: "pulse 1.5s ease-in-out infinite"
            }}>
              🔴 {breakingNews.length} BREAKING
            </span>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 className="text-gradient-purple" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em" }}>
              {countryInfo.flag} Market News & Analysis
            </h1>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.4rem", fontSize: "0.95rem" }}>
              Curated IPO alerts, market moves, economic updates and broker intelligence for {countryInfo.name}.
            </p>
          </div>
          {/* Country Switcher */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {Object.entries(COUNTRY_MAP).map(([slug, info]) => (
              <Link
                key={slug}
                href={`/${slug}/news`}
                className="btn"
                style={{
                  padding: "0.4rem 1rem", fontSize: "0.78rem", borderRadius: "99px",
                  background: slug === countrySlug ? "rgba(var(--primary-rgb),0.08)" : "rgba(255,255,255,0.01)",
                  borderColor: slug === countrySlug ? "var(--primary)" : "rgba(255,255,255,0.06)",
                  borderStyle: "solid", borderWidth: "1px",
                  color: slug === countrySlug ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: slug === countrySlug ? 700 : 500, textDecoration: "none"
                }}
              >
                {info.flag} {info.code}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ── Breaking News Ticker ─────────────────────────────────────────────── */}
      {tickerItems.length > 0 && (
        <div style={{
          background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)",
          borderRadius: "10px", padding: "0.65rem 1rem", marginBottom: "2rem",
          display: "flex", alignItems: "center", gap: "1rem", overflow: "hidden"
        }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#ef4444", textTransform: "uppercase", whiteSpace: "nowrap", letterSpacing: "0.06em" }}>
            🔴 BREAKING
          </span>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ display: "flex", gap: "4rem", whiteSpace: "nowrap", animation: "ticker-anim 25s linear infinite" }}>
              {[...tickerItems, ...tickerItems].map((item, idx) => (
                <span key={idx} style={{ fontSize: "0.82rem", color: "var(--text-secondary)", flexShrink: 0 }}>
                  <span style={{ color: sentimentConfig[item.sentiment].color, marginRight: "0.4rem", fontWeight: 700 }}>
                    {item.sentiment === "bullish" ? "▲" : item.sentiment === "bearish" ? "▼" : "●"}
                  </span>
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Filters Row ─────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        {/* Category Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="btn"
                style={{
                  padding: "0.45rem 1.1rem", fontSize: "0.8rem", borderRadius: "99px",
                  background: isActive ? "rgba(var(--primary-rgb),0.08)" : "rgba(255,255,255,0.01)",
                  borderColor: isActive ? "var(--primary)" : "rgba(255,255,255,0.06)",
                  borderStyle: "solid", borderWidth: "1px",
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: isActive ? 700 : 500,
                  boxShadow: isActive ? "0 0 12px rgba(var(--primary-rgb),0.12)" : "none"
                }}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search + Sort */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder="🔍 Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ width: "200px", fontSize: "0.82rem", padding: "0.5rem 0.85rem", borderRadius: "99px" }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="input-field"
            style={{ width: "130px", fontSize: "0.82rem", padding: "0.5rem 0.85rem", borderRadius: "99px" }}
          >
            <option value="latest">Latest First</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {articles.length === 0 && (
        <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
          <p>No news articles match your current filters.</p>
        </div>
      )}

      {articles.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem" }} className="news-grid">

          {/* ── Main Feed ────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Featured Article */}
            {featuredArticle && (
              <article className="card" style={{ padding: "2rem", cursor: "pointer" }}>
                {/* Meta Row */}
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
                  {featuredArticle.isBreaking && (
                    <span style={{ fontSize: "0.65rem", background: "#ef4444", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "99px", fontWeight: 800 }}>
                      🔴 BREAKING
                    </span>
                  )}
                  {featuredArticle.isTrending && (
                    <span style={{ fontSize: "0.65rem", background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)", padding: "0.2rem 0.6rem", borderRadius: "99px", fontWeight: 700 }}>
                      🔥 TRENDING
                    </span>
                  )}
                  <span style={{
                    fontSize: "0.65rem", padding: "0.2rem 0.6rem", borderRadius: "99px", fontWeight: 700,
                    background: sentimentConfig[featuredArticle.sentiment].bg,
                    color: sentimentConfig[featuredArticle.sentiment].color,
                    border: `1px solid ${sentimentConfig[featuredArticle.sentiment].border}`
                  }}>
                    {sentimentConfig[featuredArticle.sentiment].label}
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: "0.6rem" }}>
                    {CATEGORIES.find(c => c.id === featuredArticle.category)?.icon} {featuredArticle.category.toUpperCase()}
                  </span>
                </div>

                <h2 style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1.25, marginBottom: "0.85rem" }}>
                  {featuredArticle.title}
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {featuredArticle.summary}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                  {featuredArticle.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="badge badge-secondary" style={{ fontSize: "0.6rem" }}>#{tag}</span>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    📰 {featuredArticle.source} · {timeAgo(featuredArticle.publishedAt)} · {featuredArticle.readTime} min read
                  </span>
                  <a href={featuredArticle.sourceUrl} className="btn btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.78rem", borderRadius: "8px" }}>
                    Read Full Story →
                  </a>
                </div>
              </article>
            )}

            {/* Side Articles (2-4) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {sideArticles.map((article) => (
                <article key={article.id} className="card" style={{ padding: "1.5rem", cursor: "pointer" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    {article.isBreaking && (
                      <span style={{ fontSize: "0.6rem", background: "#ef4444", color: "#fff", padding: "0.15rem 0.5rem", borderRadius: "99px", fontWeight: 800 }}>BREAKING</span>
                    )}
                    <span style={{
                      fontSize: "0.6rem", padding: "0.15rem 0.5rem", borderRadius: "99px", fontWeight: 700,
                      background: sentimentConfig[article.sentiment].bg,
                      color: sentimentConfig[article.sentiment].color,
                      border: `1px solid ${sentimentConfig[article.sentiment].border}`
                    }}>
                      {sentimentConfig[article.sentiment].label}
                    </span>
                    <span className="badge badge-secondary" style={{ fontSize: "0.58rem" }}>
                      {CATEGORIES.find(c => c.id === article.category)?.icon} {article.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "0.98rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "0.6rem" }}>
                    {article.title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.55, marginBottom: "0.75rem" }}>
                    {article.summary.slice(0, 130)}...
                  </p>

                  <div style={{ fontSize: "0.73rem", color: "var(--text-muted)", borderTop: "1px solid var(--border-color)", paddingTop: "0.6rem" }}>
                    {article.source} · {timeAgo(article.publishedAt)} · {article.readTime} min
                  </div>
                </article>
              ))}
            </div>

            {/* More Articles List */}
            {moreArticles.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
                  More Stories
                </h3>
                {moreArticles.map((article, idx) => (
                  <div
                    key={article.id}
                    style={{
                      display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "1rem 0",
                      borderBottom: idx < moreArticles.length - 1 ? "1px solid var(--border-color)" : "none",
                      cursor: "pointer"
                    }}
                  >
                    {/* Index */}
                    <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--text-muted)", minWidth: "30px", lineHeight: 1 }}>
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.35rem" }}>
                        <span style={{
                          fontSize: "0.58rem", fontWeight: 700, padding: "0.12rem 0.45rem", borderRadius: "99px",
                          background: sentimentConfig[article.sentiment].bg, color: sentimentConfig[article.sentiment].color,
                          border: `1px solid ${sentimentConfig[article.sentiment].border}`
                        }}>{sentimentConfig[article.sentiment].label}</span>
                        <span className="badge badge-secondary" style={{ fontSize: "0.58rem" }}>
                          {CATEGORIES.find(c => c.id === article.category)?.icon}
                        </span>
                      </div>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.25rem" }}>
                        {article.title}
                      </h4>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {article.source} · {timeAgo(article.publishedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Top Trending */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                🔥 Trending Stories
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {(trendingNews.length > 0 ? trendingNews : articles).slice(0, 4).map((article, idx) => (
                  <div key={article.id} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontSize: "0.9rem", fontWeight: 900, color: idx === 0 ? "var(--primary)" : "var(--text-muted)",
                      minWidth: "20px", marginTop: "1px"
                    }}>
                      {idx + 1}
                    </span>
                    <div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "0.2rem" }}>
                        {article.title.slice(0, 70)}{article.title.length > 70 ? "..." : ""}
                      </div>
                      <span style={{ fontSize: "0.68rem", color: sentimentConfig[article.sentiment].color, fontWeight: 600 }}>
                        {sentimentConfig[article.sentiment].label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Pulse KPIs */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.25rem" }}>📊 Market Pulse</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {countrySlug === "india" ? [
                  { label: "NIFTY 50", val: "24,812.30", chg: "+0.84%", up: true },
                  { label: "SENSEX",   val: "81,423.00", chg: "+0.91%", up: true },
                  { label: "USD/INR",  val: "₹83.42",    chg: "-0.12%", up: false },
                  { label: "GOLD",     val: "₹71,500/10g", chg: "+0.4%", up: true },
                ] : countrySlug === "united-states" ? [
                  { label: "S&P 500",  val: "5,748.90", chg: "+0.62%", up: true },
                  { label: "NASDAQ",   val: "18,340.00", chg: "+1.14%", up: true },
                  { label: "EUR/USD",  val: "1.082",    chg: "-0.08%", up: false },
                  { label: "Gold",     val: "$2,325/oz", chg: "+0.31%", up: true },
                ] : [
                  { label: "FTSE 100", val: "8,254.00",  chg: "+0.45%", up: true },
                  { label: "GBP/USD",  val: "1.274",     chg: "+0.22%", up: true },
                  { label: "EUR/GBP",  val: "0.854",     chg: "-0.07%", up: false },
                  { label: "Gold",     val: "£1,831/oz", chg: "+0.18%", up: true },
                ]
                .map((kpi, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.6rem 0.85rem", borderRadius: "8px", background: "var(--spec-bg)",
                    border: "1px solid var(--spec-border)"
                  }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>{kpi.label}</span>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 800 }}>{kpi.val}</div>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, color: kpi.up ? "#10b981" : "#ef4444" }}>
                        {kpi.chg}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: "0.75rem", textAlign: "center" }}>
                Indicative prices · Not for trading use
              </p>
            </div>

            {/* Categories Summary */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.25rem" }}>📂 Browse by Topic</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {CATEGORIES.filter(c => c.id !== "all").map((cat) => {
                  const count = NEWS_DATABASE.filter(a => a.countrySlug === countrySlug && a.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "0.6rem 0.85rem", borderRadius: "8px",
                        background: activeCategory === cat.id ? "rgba(var(--primary-rgb),0.06)" : "var(--spec-bg)",
                        border: `1px solid ${activeCategory === cat.id ? "rgba(var(--primary-rgb),0.2)" : "var(--spec-border)"}`,
                        cursor: "pointer", transition: "all 0.2s",
                        color: activeCategory === cat.id ? "var(--primary)" : "var(--text-secondary)",
                        fontFamily: "inherit"
                      }}
                    >
                      <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{cat.icon} {cat.label}</span>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700 }}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1rem" }}>⚡ Quick Navigation</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "📊 Live IPO Dashboard", href: `/${countrySlug}/ipo` },
                  { label: "📅 IPO Calendar", href: `/${countrySlug}/ipo?view=calendar` },
                  { label: "🏷️ Pre-IPO / Unlisted", href: `/${countrySlug}/preipo` },
                  { label: "💼 Compare Products", href: `/${countrySlug}/compare` },
                  { label: "🧮 Financial Calculators", href: `/${countrySlug}/calculator` },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: "0.82rem", padding: "0.55rem 0.85rem", borderRadius: "8px",
                      background: "var(--spec-bg)", border: "1px solid var(--spec-border)",
                      display: "block", color: "var(--text-secondary)", fontWeight: 500,
                      transition: "all 0.2s", textDecoration: "none"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.borderColor = "rgba(var(--primary-rgb),0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.borderColor = "var(--spec-border)";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      )}

      {/* Responsive CSS override */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @media (max-width: 900px) {
          .news-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
