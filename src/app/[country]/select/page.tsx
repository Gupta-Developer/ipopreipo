"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

export default function SelectFinologyPage() {
  const params = useParams();
  const router = useRouter();
  const countrySlug = (params?.country as string) || "india";
  const countryInfo = COUNTRY_MAP[countrySlug] || COUNTRY_MAP["india"];

  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Filter products count
  const banks = BANKS_DATA.filter(b => b.countrySlug === countrySlug);
  const cards = CREDIT_CARDS_CATALOG.filter(c => c.country.toLowerCase() === countryInfo.name.toLowerCase());
  const payments = PAYMENT_APPS_DATA.filter(p => p.country.toLowerCase() === countryInfo.name.toLowerCase());
  const crypto = CRYPTO_APPS_DATA.filter(c => c.country.toLowerCase() === countryInfo.name.toLowerCase());
  const brokers = BROKERS_DATA.filter(b => b.countryName.toLowerCase() === countryInfo.name.toLowerCase());

  // Universal search logic
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
    // Determine dynamic link
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const isLocal = hostname.includes("localhost");
      const selectDomain = isLocal ? "select.localhost:3000" : "select.ipopreipo.vercel.app";
      const protocol = isLocal ? "http" : "https";
      window.location.href = `${protocol}://${selectDomain}/${slug}`;
    }
  };

  const productSuites = [
    {
      title: "Credit Cards",
      description: "Compare reward points value, cash back waivers & lounge access.",
      count: cards.length,
      icon: "💳",
      link: `/${countrySlug}/credit-card`,
      color: "#6366f1",
      badge: "Rewards & Miles"
    },
    {
      title: "Bank Accounts",
      description: "Compare high-yield interest rates, digital onboarding & minimum balance.",
      count: banks.length,
      icon: "🏦",
      link: `/${countrySlug}/bank-accounts`,
      color: "#10b981",
      badge: "Savings & Digital"
    },
    {
      title: "Payment Apps",
      description: "Compare wallet charges, daily limits, UPI channels & app speed.",
      count: payments.length,
      icon: "📱",
      link: `/${countrySlug}/payment-apps`,
      color: "#f59e0b",
      badge: "UPI & Wallets"
    },
    {
      title: "Crypto Apps",
      description: "Compare maker/taker commissions, deposit thresholds & security compliance.",
      count: crypto.length,
      icon: "🪙",
      link: `/${countrySlug}/crypto`,
      color: "#ef4444",
      badge: "Exchanges & Wallets"
    }
  ];

  // Top Pick selections for display
  const topCard = cards[0];
  const topBank = banks[0];
  const topBroker = brokers[0];

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      
      {/* Dynamic Subdomain Header */}
      <section style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative" }}>
        {/* Glow grid background */}
        <div style={{
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "800px",
          height: "260px",
          background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.08) 0%, transparent 68%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(var(--primary-rgb), 0.05)", border: "1px solid rgba(var(--primary-rgb), 0.15)", padding: "0.4rem 1.25rem", borderRadius: "99px", marginBottom: "1.25rem" }}>
            <span style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              ⭐ Finology Inspired Select Hub
            </span>
          </div>

          <h1 style={{ fontSize: "3.2rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.15 }}>
            Which financial product are <br/>
            you looking to <span className="text-gradient-purple">select today?</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem", maxWidth: "600px", margin: "1rem auto 2.5rem auto", lineHeight: 1.5 }}>
            Unbiased reviews, transparent comparison metrics, and rate trackers. Choose your product suite to begin.
          </p>

          {/* Search bar inspired by Finology */}
          <div style={{ maxWidth: "580px", margin: "0 auto", position: "relative" }}>
            <div style={{ position: "relative", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", borderRadius: "14px" }}>
              <span style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.1rem" }}>🔍</span>
              <input
                type="text"
                placeholder="Search for credit cards, banks, brokers (e.g. SBI, Groww)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="input-field"
                style={{ paddingLeft: "3rem", paddingRight: "1.25rem", paddingTop: "0.95rem", paddingBottom: "0.95rem", fontSize: "0.95rem", borderRadius: "14px", border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
              />
            </div>

            {/* Live Dropdown search results */}
            {showResults && searchQuery && (
              <div 
                className="card"
                style={{ 
                  position: "absolute", 
                  top: "105%", 
                  left: 0, 
                  right: 0, 
                  zIndex: 200, 
                  padding: "0.75rem", 
                  textAlign: "left",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.2)"
                }}
              >
                <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--text-muted)", padding: "0.25rem 0.5rem", letterSpacing: "0.05em", fontWeight: 700 }}>
                  Matching Products
                </div>
                {searchResults.length === 0 ? (
                  <div style={{ padding: "0.75rem 0.5rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                    No matching products found. Try another query.
                  </div>
                ) : (
                  searchResults.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      onClick={() => setShowResults(false)}
                      style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        padding: "0.6rem 0.5rem", 
                        borderRadius: "8px", 
                        textDecoration: "none",
                        transition: "background 0.15s"
                      }}
                      className="search-result-item"
                    >
                      <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{item.name}</strong>
                      <span className="badge badge-primary" style={{ fontSize: "0.65rem" }}>{item.category}</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Country flag switches */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
            {Object.entries(COUNTRY_MAP).map(([slug, info]) => (
              <button
                key={slug}
                onClick={() => handleCountryChange(slug)}
                className="btn"
                style={{
                  background: countrySlug === slug ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
                  borderColor: countrySlug === slug ? "var(--primary)" : "rgba(255,255,255,0.06)",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  color: countrySlug === slug ? "var(--text-primary)" : "var(--text-secondary)",
                  padding: "0.45rem 1.1rem",
                  fontSize: "0.82rem",
                  borderRadius: "99px",
                  fontWeight: countrySlug === slug ? "700" : "500",
                  cursor: "pointer"
                }}
              >
                {info.flag} {info.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Suite Products */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem", marginBottom: "4rem" }}>
        {productSuites.map((s, idx) => (
          <div 
            key={idx} 
            className="card select-product-card"
            style={{ 
              padding: "1.75rem", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between",
              height: "100%",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            <div>
              <div className="flex-between" style={{ marginBottom: "1.25rem" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "10px", background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", color: s.color, border: `1px solid ${s.color}25` }}>
                  {s.icon}
                </div>
                <span className="badge badge-secondary" style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}>{s.badge}</span>
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>{s.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.45, marginTop: "0.4rem" }}>{s.description}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "1.5rem" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.count} Products Listed</span>
              <Link
                href={s.link}
                className="btn btn-secondary"
                style={{ padding: "0.4rem 1rem", fontSize: "0.78rem", borderRadius: "8px", textDecoration: "none" }}
              >
                Explore →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Handpicked Picks - Curated Recommendations */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Handpicked Recommendations</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Top rated items curated for you in {countryInfo.title}</p>
          </div>
          <Link href={`/${countrySlug}/compare`} style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>
            Open Comparison Hub →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          
          {/* Pick 1: Card */}
          {topCard && (
            <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="flex-between">
                  <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.05em" }}>Top Pick Credit Card</span>
                  <span className="badge badge-success" style={{ fontSize: "0.6rem" }}>★ {topCard.overallRating} Rating</span>
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: "0.75rem" }}>{topCard.name}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem", marginTop: "0.25rem" }}>{topCard.description.slice(0, 110)}...</p>
              </div>
              <div className="flex-between" style={{ marginTop: "1.25rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-primary)" }}>Fee: <strong>{topCard.fees.annualFee}</strong></span>
                <Link href={`/${countrySlug}/credit-card/${topCard.slug}`} style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>
                  View Deal →
                </Link>
              </div>
            </div>
          )}

          {/* Pick 2: Bank Account */}
          {topBank && (
            <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="flex-between">
                  <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.05em" }}>Top Pick Bank Account</span>
                  <span className="badge badge-success" style={{ fontSize: "0.6rem" }}>★ {topBank.rating} Rating</span>
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: "0.75rem" }}>{topBank.name}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem", marginTop: "0.25rem" }}>Compare savings yields, neobank digital portals and ATM charge exemptions.</p>
              </div>
              <div className="flex-between" style={{ marginTop: "1.25rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 700 }}>{topBank.interestRate} Interest</span>
                <Link href={`/${countrySlug}/bank-accounts/${topBank.slug}`} style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>
                  View Deal →
                </Link>
              </div>
            </div>
          )}

          {/* Pick 3: Stock Broker */}
          {topBroker && (
            <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="flex-between">
                  <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.05em" }}>Top Pick Broker</span>
                  <span className="badge badge-success" style={{ fontSize: "0.6rem" }}>★ {topBroker.rating} Rating</span>
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: "0.75rem" }}>{topBroker.name}</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem", marginTop: "0.25rem" }}>Leading {topBroker.type} stockbroker. Active userbase count of {topBroker.activeClients}.</p>
              </div>
              <div className="flex-between" style={{ marginTop: "1.25rem", borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-primary)" }}>Delivery: <strong>{topBroker.brokerage.delivery}</strong></span>
                <Link href={`/${countrySlug}/brokers/${topBroker.slug}`} style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>
                  View Deal →
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Comparative Banner */}
      <section className="card" style={{ padding: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
        <div style={{ maxWidth: "580px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Confused about choices? Compare side-by-side</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.4rem", lineHeight: 1.45 }}>
            Put two financial products side by side to compare rates, joining fee structures, checklists, pros, and cons in a structured grid matrix.
          </p>
        </div>
        <Link href={`/${countrySlug}/compare`} className="btn btn-primary" style={{ padding: "0.75rem 2rem", fontSize: "0.9rem", borderRadius: "10px", textDecoration: "none" }}>
          Compare Side-by-Side
        </Link>
      </section>

      <footer style={{ marginTop: "5rem", paddingTop: "2.5rem", borderTop: "1px solid var(--border-color)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
        <p>© 2026 ipopreipo.com Select. All ratings and metrics compiled through provider disclosures. Invest responsibly.</p>
      </footer>

      {/* Styled overrides for live search and card sheens */}
      <style>{`
        .search-result-item:hover {
          background: var(--spec-bg);
        }
        [data-theme="light"] .search-result-item:hover {
          background: #f1f5f9;
        }
        .select-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
}
