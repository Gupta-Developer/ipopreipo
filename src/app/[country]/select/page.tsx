"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BANKS_DATA } from "@/data/banksData";
import { CREDIT_CARDS_CATALOG } from "@/data/cardsData";
import { PAYMENT_APPS_DATA } from "@/data/paymentAppsData";
import { CRYPTO_APPS_DATA } from "@/data/cryptoAppsData";
import { BROKERS_DATA } from "@/data/brokersData";

const COUNTRY_MAP: Record<string, { name: string; title: string; flag: string }> = {
  "india": { name: "India", title: "India", flag: "🇮🇳" },
  "united-states": { name: "United States", title: "the United States", flag: "🇺🇸" },
  "united-kingdom": { name: "United Kingdom", title: "the United Kingdom", flag: "🇬🇧" }
};

export default function SelectFinologyDashboard() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const countryInfo = COUNTRY_MAP[countrySlug] || COUNTRY_MAP["india"];

  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Filter local country data
  const banks = BANKS_DATA.filter(b => b.countrySlug === countrySlug);
  const cards = CREDIT_CARDS_CATALOG.filter(c => c.country.toLowerCase() === countryInfo.name.toLowerCase());
  const payments = PAYMENT_APPS_DATA.filter(p => p.country.toLowerCase() === countryInfo.name.toLowerCase());
  const crypto = CRYPTO_APPS_DATA.filter(c => c.country.toLowerCase() === countryInfo.name.toLowerCase());
  const brokers = BROKERS_DATA.filter(b => b.countryName.toLowerCase() === countryInfo.name.toLowerCase());

  // Universal search dropdown matching
  const allSearchable = [
    ...banks.map(b => ({ name: b.name, category: "Bank Account", link: `/${countrySlug}/bank-accounts/${b.slug}` })),
    ...cards.map(c => ({ name: c.name, category: "Credit Card", link: `/${countrySlug}/credit-card/${c.slug}` })),
    ...payments.map(p => ({ name: p.name, category: "Payment App", link: `/${countrySlug}/payment-apps/${p.slug}` })),
    ...crypto.map(c => ({ name: c.name, category: "Crypto App", link: `/${countrySlug}/crypto/${c.slug}` })),
    ...brokers.map(b => ({ name: b.name, category: "Stock Broker", link: `/${countrySlug}/brokers/${b.slug}` }))
  ];

  const searchResults = searchQuery
    ? allSearchable.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleCountryChange = (slug: string) => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const isLocal = hostname.includes("localhost");
      const selectDomain = isLocal ? "select.localhost:3000" : "select.ipopreipo.vercel.app";
      const protocol = isLocal ? "http" : "https";
      window.location.href = `${protocol}://${selectDomain}/${slug}`;
    }
  };

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      
      {/* ── Finology Select Style Header ────────────────────────────────────────── */}
      <section style={{ marginBottom: "4rem", position: "relative" }}>
        
        {/* Glow behind */}
        <div style={{
          position: "absolute",
          top: "-50px",
          left: "20%",
          width: "min(450px, 100vw)",
          height: "220px",
          background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none"
        }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          
          {/* Left Hero Content */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "0.35rem 1rem", borderRadius: "99px", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#10b981", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                🎯 Independent Financial Reviews
              </span>
            </div>

            <h1 style={{ fontSize: "3rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.15 }}>
              Don't be a sales target.
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem", lineHeight: 1.5 }}>
              Cut the time-taking fuss with in-depth reviews, comparative metrics and verification checklists that make you go <strong>#BigOnLife</strong>.
            </p>
            
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <a href="#featuredbrokers" className="btn btn-primary" style={{ padding: "0.75rem 1.75rem", fontSize: "0.88rem", borderRadius: "10px", textDecoration: "none" }}>
                📈 Featured Brokers
              </a>
              <a href="#featuredcards" className="btn btn-secondary" style={{ padding: "0.75rem 1.75rem", fontSize: "0.88rem", borderRadius: "10px", textDecoration: "none" }}>
                💳 Featured Cards
              </a>
            </div>
          </div>

          {/* Right Metrics & Trust Box */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Search Box */}
            <div style={{ position: "relative", width: "100%" }}>
              <strong style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>
                Quick Search Products:
              </strong>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", opacity: 0.7 }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search brokers, credit cards, banks..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  className="input-field"
                  style={{ paddingLeft: "2.75rem", borderRadius: "12px", border: "1px solid var(--border-color)", paddingRight: "1rem", background: "var(--card-bg)" }}
                />
              </div>

              {/* Search dropdown */}
              {showResults && searchQuery && (
                <div className="card" style={{ position: "absolute", top: "105%", left: 0, right: 0, zIndex: 100, padding: "0.75rem", textAlign: "left", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
                  {searchResults.length === 0 ? (
                    <div style={{ padding: "0.5rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>No matching records found.</div>
                  ) : (
                    searchResults.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.link}
                        onClick={() => setShowResults(false)}
                        className="search-result-item"
                        style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", borderRadius: "6px", textDecoration: "none", color: "inherit" }}
                      >
                        <span style={{ fontSize: "0.85rem", fontWeight: "700" }}>{item.name}</span>
                        <span className="badge badge-primary" style={{ fontSize: "0.6rem" }}>{item.category}</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Metrics Trust Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
              <div>
                <strong style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)" }}>1.5M+</strong>
                <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>Pageviews/mo</div>
              </div>
              <div>
                <strong style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary)" }}>500K+</strong>
                <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>Happy Users</div>
              </div>
              <div>
                <strong style={{ fontSize: "1.6rem", fontWeight: 800, color: "#10b981" }}>100%</strong>
                <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>Agenda Free</div>
              </div>
            </div>

            {/* Country Select */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 700 }}>COUNTRY:</span>
              {Object.entries(COUNTRY_MAP).map(([slug, info]) => (
                <button
                  key={slug}
                  onClick={() => handleCountryChange(slug)}
                  className="btn"
                  style={{
                    background: countrySlug === slug ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
                    borderColor: countrySlug === slug ? "var(--primary)" : "rgba(255,255,255,0.06)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    color: countrySlug === slug ? "var(--text-primary)" : "var(--text-secondary)",
                    padding: "0.35rem 0.85rem",
                    fontSize: "0.78rem",
                    borderRadius: "99px",
                    fontWeight: countrySlug === slug ? "700" : "500"
                  }}
                >
                  {info.flag} {info.name}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── Featured Split Suites ────────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
        
        {/* Panel 1 */}
        <div style={{ background: "rgba(var(--primary-rgb), 0.02)", border: "1px solid rgba(var(--primary-rgb), 0.1)", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", justifySelf: "stretch" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: "0.5rem" }}>Brokers with no agenda.</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
            Compare and analyze top brokers with Select's no-nonsense data. We examine depositories, segments support, account setup fees, and leverage parameters.
          </p>
          <a href="#featuredbrokers" className="btn btn-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.8rem", alignSelf: "flex-start", borderRadius: "8px", textDecoration: "none" }}>
            📈 Featured Brokers ({brokers.length})
          </a>
        </div>

        {/* Panel 2 */}
        <div style={{ background: "rgba(16, 185, 129, 0.02)", border: "1px solid rgba(16, 185, 129, 0.1)", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", justifySelf: "stretch" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: "0.5rem" }}>Cards that don't rob.</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
            Give spending a solid boost. Select's hand-picked credit cards are designed to make your pocket thank you. Review lounge access, reward rates, and APR structures.
          </p>
          <a href="#featuredcards" className="btn btn-secondary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.8rem", alignSelf: "flex-start", borderRadius: "8px", textDecoration: "none" }}>
            💳 Featured Cards ({cards.length})
          </a>
        </div>

      </section>

      {/* ── Featured Brokers Section ───────────────────────────────────────────── */}
      <section style={{ marginBottom: "4rem" }}>
        <a id="featuredbrokers"></a>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
          Featured Stock Brokers
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {brokers.length === 0 ? (
            <div className="card" style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
              No brokers registered for {countryInfo.title}.
            </div>
          ) : (
            brokers.map((b) => {
              const segments = [
                { name: "Equity", ok: b.segments.equity },
                { name: "Commodity", ok: b.segments.commodity },
                { name: "Currency", ok: b.segments.currency },
                { name: "Futures", ok: b.segments.futures },
                { name: "Options", ok: b.segments.options }
              ];

              return (
                <div key={b.slug} className="card" style={{ padding: "2rem" }}>
                  <div className="select-product-grid" style={{ gap: "2rem" }}>
                    
                    {/* Logo letter */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: "84px", height: "84px", borderRadius: "14px", border: `2px solid ${b.logoColor}`, background: `${b.logoColor}0c`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 900, color: b.logoColor }}>
                        {b.logoLetter}
                      </div>
                    </div>

                    {/* Details Column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      
                      {/* Name / Rating Row */}
                      <div className="flex-between" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
                        <div>
                          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            {b.name}
                            <span style={{ fontSize: "0.85rem", color: "var(--warning)", fontWeight: "bold" }}>
                              ★ {b.rating}
                            </span>
                          </h3>
                          <span className="badge badge-secondary" style={{ fontSize: "0.68rem", display: "inline-block", marginTop: "0.25rem" }}>
                            {b.type}
                          </span>
                        </div>
                        <Link href={`/${countrySlug}/brokers/${b.slug}`} className="btn btn-primary desktop-only-btn" style={{ padding: "0.45rem 1.25rem", fontSize: "0.82rem", borderRadius: "8px", textDecoration: "none" }}>
                          Full Details Review
                        </Link>
                      </div>

                      {/* Segments checklist */}
                      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "0.75rem 0" }}>
                        {segments.map((seg, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem" }}>
                            <span style={{ color: seg.ok ? "#10b981" : "var(--text-muted)", fontWeight: "bold" }}>
                              {seg.ok ? "✓" : "×"}
                            </span>
                            <span style={{ color: seg.ok ? "var(--text-primary)" : "var(--text-muted)", fontWeight: seg.ok ? 600 : 400 }}>
                              {seg.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Charges Row */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "1rem" }}>
                        <div className="premium-spec-cell" style={{ padding: "0.5rem 0.75rem" }}>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Account setup</div>
                          <strong style={{ fontSize: "0.85rem" }}>{b.charges.opening}</strong>
                        </div>
                        <div className="premium-spec-cell" style={{ padding: "0.5rem 0.75rem" }}>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Annual AMC</div>
                          <strong style={{ fontSize: "0.85rem" }}>{b.charges.amc}</strong>
                        </div>
                        <div className="premium-spec-cell" style={{ padding: "0.5rem 0.75rem" }}>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Delivery Brokerage</div>
                          <strong style={{ fontSize: "0.85rem", color: "#10b981" }}>{b.brokerage.delivery}</strong>
                        </div>
                        <div className="premium-spec-cell" style={{ padding: "0.5rem 0.75rem" }}>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Intraday Brokerage</div>
                          <strong style={{ fontSize: "0.85rem", color: "var(--warning)" }}>{b.brokerage.intraday}</strong>
                        </div>
                      </div>

                      <Link href={`/${countrySlug}/brokers/${b.slug}`} className="btn btn-primary full-review-btn mobile-only-btn" style={{ padding: "0.45rem 1.25rem", fontSize: "0.82rem", borderRadius: "8px", textDecoration: "none" }}>
                        Full Detailed Review
                      </Link>

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ── Featured Cards Section ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: "4rem" }}>
        <a id="featuredcards"></a>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
          Featured Credit Cards
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {cards.length === 0 ? (
            <div className="card" style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
              No credit cards registered for {countryInfo.title}.
            </div>
          ) : (
            cards.map((c) => {
              const checklist = [
                { name: "Welcome Bonus", ok: c.featuresChecklist.welcomeBonus },
                { name: "Travel Perks", ok: c.featuresChecklist.travel },
                { name: "Fuel Waiver", ok: c.featuresChecklist.fuel },
                { name: "Shopping Offers", ok: c.featuresChecklist.shopping },
                { name: "Point Rewards", ok: c.featuresChecklist.rewards }
              ];

              return (
                <div key={c.slug} className="card" style={{ padding: "2rem" }}>
                  <div className="select-product-grid" style={{ gap: "2rem" }}>
                    
                    {/* Graphic Card */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{
                        width: "100px",
                        height: "64px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "0.5rem",
                        color: "#fff",
                        fontSize: "0.45rem",
                        fontWeight: 800
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.8 }}>
                          <span>{c.issuer.toUpperCase()}</span>
                          <span style={{ width: 8, height: 6, borderRadius: 1, background: "#fbbf24" }} />
                        </div>
                        <div style={{ fontSize: "0.5rem" }}>{c.name.split(" ").slice(-1)[0]}</div>
                      </div>
                    </div>

                    {/* Content details */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      
                      {/* Name and Rating */}
                      <div className="flex-between" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
                        <div>
                          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            {c.name}
                            <span style={{ fontSize: "0.85rem", color: "var(--warning)", fontWeight: "bold" }}>
                              ★ {c.overallRating}
                            </span>
                          </h3>
                          <span className="badge badge-secondary" style={{ fontSize: "0.68rem", display: "inline-block", marginTop: "0.25rem" }}>
                            {c.type} • Best for: {c.bestFor}
                          </span>
                        </div>
                        <Link href={`/${countrySlug}/credit-card/${c.slug}`} className="btn btn-primary desktop-only-btn" style={{ padding: "0.45rem 1.25rem", fontSize: "0.82rem", borderRadius: "8px", textDecoration: "none" }}>
                          Full Details Review
                        </Link>
                      </div>

                      {/* Checklist */}
                      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "0.75rem 0" }}>
                        {checklist.map((item, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.82rem" }}>
                            <span style={{ color: item.ok ? "#10b981" : "var(--text-muted)", fontWeight: "bold" }}>
                              {item.ok ? "✓" : "×"}
                            </span>
                            <span style={{ color: item.ok ? "var(--text-primary)" : "var(--text-muted)", fontWeight: item.ok ? 600 : 400 }}>
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Specs charges */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "1rem" }}>
                        <div className="premium-spec-cell" style={{ padding: "0.5rem 0.75rem" }}>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Reward Rate</div>
                          <strong style={{ fontSize: "0.85rem", color: "#10b981" }}>{c.fees.rewardPointValue}</strong>
                        </div>
                        <div className="premium-spec-cell" style={{ padding: "0.5rem 0.75rem" }}>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Joining Fee</div>
                          <strong style={{ fontSize: "0.85rem" }}>{c.fees.joiningFee}</strong>
                        </div>
                        <div className="premium-spec-cell" style={{ padding: "0.5rem 0.75rem" }}>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Annual Fee</div>
                          <strong style={{ fontSize: "0.85rem" }}>{c.fees.annualFee}</strong>
                        </div>
                        <div className="premium-spec-cell" style={{ padding: "0.5rem 0.75rem" }}>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>APR Interest</div>
                          <strong style={{ fontSize: "0.85rem", color: "var(--danger)" }}>{c.fees.apr}</strong>
                        </div>
                      </div>

                      <Link href={`/${countrySlug}/credit-card/${c.slug}`} className="btn btn-primary full-review-btn mobile-only-btn" style={{ padding: "0.45rem 1.25rem", fontSize: "0.82rem", borderRadius: "8px", textDecoration: "none" }}>
                        Full Detailed Review
                      </Link>

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Directory suites for other products */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "1.5rem" }}>Other Directory Categories</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          
          <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "1.5rem" }}>🏦</span>
              <h4 style={{ fontWeight: 800, marginTop: "0.75rem" }}>Bank Accounts</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: "0.25rem", lineHeight: 1.4 }}>
                Compare digital, neobank and high-interest savings programs in {countryInfo.title}.
              </p>
            </div>
            <Link href={`/${countrySlug}/bank-accounts`} className="btn btn-secondary" style={{ padding: "0.45rem 1rem", fontSize: "0.78rem", borderRadius: "8px", textDecoration: "none", marginTop: "1.25rem" }}>
              Explore Banks ({banks.length}) →
            </Link>
          </div>

          <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "1.5rem" }}>📱</span>
              <h4 style={{ fontWeight: 800, marginTop: "0.75rem" }}>Payment Apps</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: "0.25rem", lineHeight: 1.4 }}>
                Review transaction limits, loading fees and transfer delays in {countryInfo.title}.
              </p>
            </div>
            <Link href={`/${countrySlug}/payment-apps`} className="btn btn-secondary" style={{ padding: "0.45rem 1rem", fontSize: "0.78rem", borderRadius: "8px", textDecoration: "none", marginTop: "1.25rem" }}>
              Explore UPI Apps ({payments.length}) →
            </Link>
          </div>

          <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "1.5rem" }}>🪙</span>
              <h4 style={{ fontWeight: 800, marginTop: "0.75rem" }}>Crypto Apps</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: "0.25rem", lineHeight: 1.4 }}>
                Evaluate trading platforms, taker/maker charges and staking options in {countryInfo.title}.
              </p>
            </div>
            <Link href={`/${countrySlug}/crypto`} className="btn btn-secondary" style={{ padding: "0.45rem 1rem", fontSize: "0.78rem", borderRadius: "8px", textDecoration: "none", marginTop: "1.25rem" }}>
              Explore Crypto ({crypto.length}) →
            </Link>
          </div>

        </div>
      </section>

      {/* Comparison and Calculators Banner */}
      <section className="card" style={{ padding: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
        <div style={{ maxWidth: "580px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Need specific calculators?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.4rem", lineHeight: 1.45 }}>
            Compute brokerage charges, tax breakages, stamp duty levies and transaction markups directly.
          </p>
        </div>
        <Link href={`/${countrySlug}/calculator`} className="btn btn-primary" style={{ padding: "0.75rem 2rem", fontSize: "0.9rem", borderRadius: "10px", textDecoration: "none" }}>
          Open Calculators Hub
        </Link>
      </section>

      <style>{`
        .search-result-item:hover {
          background: var(--spec-bg);
        }
        [data-theme="light"] .search-result-item:hover {
          background: #f1f5f9;
        }
      `}</style>
    </div>
  );
}
