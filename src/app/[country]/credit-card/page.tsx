"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CREDIT_CARDS_CATALOG } from "@/data/cardsData";

const COUNTRY_MAP: Record<string, string> = {
  "india": "India",
  "united-states": "United States",
  "united-kingdom": "United Kingdom",
  "singapore": "Singapore"
};

export default function CreditCardCountryPage() {
  const params = useParams();
  const router = useRouter();
  const countrySlug = (params?.country as string) || "india";
  const selectedCountryName = COUNTRY_MAP[countrySlug] || "India";

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const countries = ["India", "United States", "United Kingdom", "Singapore"];
  const categories = ["All", "Cashback", "Rewards", "Travel", "Premium"];

  // Filter cards based on tab, country, and search query
  const filteredCards = CREDIT_CARDS_CATALOG.filter((card) => {
    // Country filter
    if (card.country.toLowerCase() !== selectedCountryName.toLowerCase()) {
      return false;
    }
    // Search query filter
    if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Category tabs filter
    if (activeFilter === "All") return true;
    if (activeFilter === "Cashback") return card.type === "Cashback";
    if (activeFilter === "Rewards") return card.bestFor === "Rewards" || card.type === "Co-Branded";
    if (activeFilter === "Travel") return card.type === "Premium Travel";
    if (activeFilter === "Premium") return card.type === "Premium" || card.type === "Premium Travel";
    return true;
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const slug = val.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${slug}/credit-card`);
  };

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      
      {/* Breadcrumb nav */}
      <nav style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
        <Link href="/" style={{ color: "var(--text-secondary)" }}>Select</Link> &gt;{" "}
        <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>Credit Cards</span>
      </nav>

      {/* Main Page Title Header */}
      <header style={{ marginBottom: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <h1 className="text-gradient-purple" style={{ fontSize: "2.8rem", fontWeight: 800, textAlign: "center", letterSpacing: "-0.04em" }}>
          Best Credit Cards in {selectedCountryName}
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginTop: "-0.5rem", textAlign: "center", maxWidth: "600px" }}>
          Compare top-tier payment programs, dynamic rewards slabs, and annual percentage charges.
        </p>

        {/* Search & Country Select controls */}
        <div style={{ display: "flex", gap: "1rem", width: "100%", maxWidth: "600px", marginTop: "1rem" }} className="m-flex-column">
          <select
            value={selectedCountryName}
            onChange={handleCountryChange}
            className="input-field"
            style={{ flex: "1", cursor: "pointer" }}
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div style={{ position: "relative", flex: "2" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.6, fontSize: "0.9rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search by card name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.5rem" }}
            />
          </div>
        </div>
      </header>

      {/* Categories filter selector */}
      <div className="flex-between" style={{ marginBottom: "2rem", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1.5rem" }}>
        <div className="tabs-header" style={{ padding: "0.25rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`tab-btn ${activeFilter === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>
          Showing <span style={{ color: "var(--primary)" }}>{filteredCards.length}</span> Cards
        </div>
      </div>

      {/* Credit Cards list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {filteredCards.length === 0 && (
          <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p>No credit cards available for {selectedCountryName} matching your search.</p>
          </div>
        )}
        {filteredCards.map((card) => {
          // Dynamic sheens gradients
          const cardGradients: Record<string, string> = {
            "sbi-cashback-credit-card": "linear-gradient(135deg, #371457 0%, #150527 100%)", // SBI deep violet
            "tata-neu-infinity-hdfc": "linear-gradient(135deg, #2b114d 0%, #110522 100%)", // Tata Neu purple
            "amex-smartearn": "linear-gradient(135deg, #0e3f7c 0%, #04162e 100%)" // Amex deep blue
          };
          
          const gradient = cardGradients[card.slug] || "linear-gradient(135deg, #1e1e24 0%, #0a0a0c 100%)";

          return (
            <div 
              key={card.slug} 
              className="premium-row-card"
            >
              {/* Left Column: Styled 3D Realistic Credit Card */}
              <div className="card-mockup-wrapper">
                <div 
                  className="credit-card-mockup" 
                  style={{ 
                    background: gradient,
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  <div className="card-top">
                    <span style={{ fontSize: "0.6rem", fontWeight: "800", opacity: "0.85", letterSpacing: "0.08em" }}>
                      {card.issuer.toUpperCase()}
                    </span>
                    <div className="card-chip"></div>
                  </div>

                  <div style={{ display: "flex", gap: "0.2rem", alignItems: "baseline", margin: "0.5rem 0" }}>
                    <div className="card-logo-symbol"></div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "800", letterSpacing: "0.03em" }}>
                      {card.name.split(" ").slice(-1)[0].toUpperCase()}
                    </span>
                  </div>

                  <div className="card-bottom">
                    <div className="card-holder">
                      <div className="label">CARDHOLDER</div>
                      <div className="value" style={{ fontSize: "0.7rem" }}>MAYANK PATEL</div>
                    </div>
                    <div className="card-expiry">
                      <div className="label">NETWORK</div>
                      <div className="value" style={{ fontSize: "0.75rem", fontWeight: "bold" }}>{card.network}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Spec layouts & details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                
                {/* Upper Row: Title, Rating */}
                <div className="flex-between" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
                    <h2 style={{ fontSize: "1.6rem", margin: 0, fontWeight: "800", letterSpacing: "-0.03em" }}>{card.name}</h2>
                    
                    {/* Inline ratings scores */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245,158,11,0.2)", padding: "0.25rem 0.5rem", borderRadius: "6px", fontSize: "0.8rem", color: "var(--warning)", fontWeight: "700" }}>
                      <span>★</span>
                      <span>{card.overallRating}</span>
                    </div>
                  </div>
                  <Link 
                    href={`/${countrySlug}/credit-card/${card.slug}`}
                    className="btn btn-primary desktop-only-btn"
                    style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem", borderRadius: "10px", textDecoration: "none" }}
                  >
                    Full Details
                  </Link>
                </div>

                {/* Middle Row: Type pills and dynamic checkers */}
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span className="badge badge-success">{card.type}</span>
                    <span className="badge badge-primary">Best for: {card.bestFor}</span>
                  </div>

                  {/* Dynamic checklist display */}
                  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
                    {Object.entries(card.featuresChecklist).map(([key, value]) => {
                      const formattedLabel = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase());
                      return (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem" }}>
                          <span className={`premium-indicator ${value ? 'premium-indicator-checked' : 'premium-indicator-crossed'}`}>
                            {value ? "✓" : "×"}
                          </span>
                          <span style={{ color: value ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: value ? "600" : "400" }}>
                            {formattedLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lower Row: Specific specs boxes */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", 
                  gap: "0.75rem",
                  marginTop: "0.25rem"
                }}>
                  <div className="premium-spec-cell">
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>Reward Rate</div>
                    <strong style={{ color: "var(--success)", fontSize: "1rem", fontWeight: "700" }}>{card.fees.rewardPointValue}</strong>
                  </div>
                  <div className="premium-spec-cell">
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>Joining Fee</div>
                    <strong style={{ color: "var(--text-primary)", fontSize: "1rem", fontWeight: "700" }}>{card.fees.joiningFee}</strong>
                  </div>
                  <div className="premium-spec-cell">
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>Annual Fee</div>
                    <strong style={{ color: "var(--text-primary)", fontSize: "1rem", fontWeight: "700" }}>{card.fees.annualFee}</strong>
                  </div>
                  <div className="premium-spec-cell">
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>APR</div>
                    <strong style={{ color: "var(--danger)", fontSize: "1rem", fontWeight: "700" }}>{card.fees.apr}</strong>
                  </div>
                </div>

                <Link 
                  href={`/${countrySlug}/credit-card/${card.slug}`} 
                  className="btn btn-primary full-review-btn mobile-only-btn" 
                  style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem", borderRadius: "10px", textDecoration: "none" }}
                >
                  Full Detailed Review
                </Link>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
