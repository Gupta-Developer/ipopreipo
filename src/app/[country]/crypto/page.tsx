"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CRYPTO_APPS_DATA } from "@/data/cryptoAppsData";

const COUNTRY_MAP: Record<string, { name: string; title: string }> = {
  "india": { name: "India", title: "India" },
  "united-states": { name: "United States", title: "the United States" },
  "united-kingdom": { name: "United Kingdom", title: "the United Kingdom" },
  "singapore": { name: "Singapore", title: "Singapore" }
};

export default function CryptoAppsCountryPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const countryInfo = COUNTRY_MAP[countrySlug] || COUNTRY_MAP["india"];
  const selectedCountryName = countryInfo.name;

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredApps = CRYPTO_APPS_DATA.filter((app) => {
    if (app.country.toLowerCase() !== selectedCountryName.toLowerCase()) return false;
    if (searchQuery && !app.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType !== "all") {
      if (filterType === "Exchange" && !app.type.toLowerCase().includes("exchange")) return false;
      if (filterType === "Wallet" && !app.type.toLowerCase().includes("wallet")) return false;
    }
    return true;
  });

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 className="text-gradient-purple" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}>
          Crypto Apps in {countryInfo.title}
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "1.05rem" }}>
          Compare top-rated cryptocurrency exchanges, custodial wallets, and investment gateways in <strong>{countryInfo.title}</strong>. Review trading commissions, withdrawal fees, and regulatory compliance.
        </p>
      </header>

      {/* Country Selection Tabs — now links for SEO */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", flexWrap: "wrap" }}>
        {Object.entries(COUNTRY_MAP).map(([slug, info]) => {
          const isActive = countrySlug === slug;
          const flag = slug === "india" ? "🇮🇳" : slug === "united-states" ? "🇺🇸" : slug === "united-kingdom" ? "🇬🇧" : "🇸🇬";
          return (
            <Link
              key={slug}
              href={`/${slug}/crypto`}
              className="btn"
              style={{
                background: isActive ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
                borderColor: isActive ? "var(--primary)" : "rgba(255,255,255,0.06)",
                borderStyle: "solid",
                borderWidth: "1px",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "0.5rem 1.25rem",
                fontSize: "0.85rem",
                borderRadius: "99px",
                fontWeight: isActive ? "700" : "500",
                boxShadow: isActive ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
                textDecoration: "none"
              }}
            >
              {flag} {info.name} Apps
            </Link>
          );
        })}
      </div>

      {/* Filter and Search */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "2.5rem", display: "flex", gap: "2rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Find:</strong>
            <div style={{ position: "relative", width: "240px" }}>
              <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", opacity: 0.6, fontSize: "0.85rem" }}>🔍</span>
              <input
                type="text"
                placeholder="Search app name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: "2.25rem", paddingRight: "0.75rem", paddingTop: "0.4rem", paddingBottom: "0.4rem", fontSize: "0.8rem", borderRadius: "8px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button 
              onClick={() => setFilterType("all")} 
              className={`badge ${filterType === "all" ? "badge-primary" : "badge-secondary"}`}
              style={{ cursor: "pointer" }}
            >
              All Types
            </button>
            <button 
              onClick={() => setFilterType("Exchange")} 
              className={`badge ${filterType === "Exchange" ? "badge-primary" : "badge-secondary"}`}
              style={{ cursor: "pointer" }}
            >
              Exchanges
            </button>
            <button 
              onClick={() => setFilterType("Wallet")} 
              className={`badge ${filterType === "Wallet" ? "badge-primary" : "badge-secondary"}`}
              style={{ cursor: "pointer" }}
            >
              Wallets
            </button>
          </div>
        </div>

        <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          Showing <strong>{filteredApps.length}</strong> Crypto Apps
        </div>
      </div>

      {/* Crypto Apps List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filteredApps.length === 0 && (
          <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p>No crypto apps match your filters. Try adjusting options.</p>
          </div>
        )}
        {filteredApps.map((app) => (
          <div
            key={app.slug}
            className="premium-row-card"
          >
            {/* Left Column Logo */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: "88px",
                height: "88px",
                borderRadius: "16px",
                border: `2px solid ${app.logoColor}`,
                boxShadow: `0 0 20px ${app.logoColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${app.logoColor}12`
              }}>
                <div style={{ fontSize: "2rem", fontWeight: "900", color: app.logoColor }}>
                  {app.logoLetter}
                </div>
              </div>
            </div>

            {/* Right Column Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              
              {/* Header */}
              <div className="flex-between" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <h3 style={{ fontSize: "1.3rem", margin: 0 }}>
                      {app.name} <span style={{ color: "var(--text-secondary)", fontWeight: "500", fontSize: "1rem" }}>({app.rating} ★)</span>
                    </h3>
                    <span className="badge badge-primary" style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}>{app.type}</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem", display: "block" }}>
                    Userbase: {app.activeUsers} • Liked by: {app.likes} members
                  </span>
                </div>
              </div>

              {/* Supported Trading Channels */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {Object.entries(app.features).map(([key, value]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
                  return (
                    <span 
                      key={key} 
                      className={`badge ${value ? 'badge-success' : 'badge-danger'}`}
                      style={{ fontSize: "0.65rem", opacity: value ? 1 : 0.45, padding: "0.15rem 0.45rem" }}
                    >
                      {formattedKey}
                    </span>
                  );
                })}
              </div>

              {/* Specification Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginTop: "0.25rem" }}>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Maker Fee</div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>{app.charges.makerFee}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Taker Fee</div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>{app.charges.takerFee}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Min Deposit</div>
                  <strong style={{ color: "var(--success)", fontSize: "0.85rem" }}>{app.limits.minimumDeposit}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Platforms</div>
                  <strong style={{ color: "var(--warning)", fontSize: "0.85rem" }}>{app.platforms.slice(0, 2).join(", ")}</strong>
                </div>
              </div>

              <Link 
                href={`/${countrySlug}/crypto/${app.slug}`}
                className="btn btn-primary full-review-btn"
                style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", borderRadius: "8px", textDecoration: "none" }}
              >
                Full Detailed Review
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
