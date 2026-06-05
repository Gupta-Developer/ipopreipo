"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BANKS_DATA } from "@/data/banksData";

const COUNTRY_MAP: Record<string, { code: string; name: string; title: string }> = {
  "india": { code: "india", name: "India", title: "India" },
  "united-states": { code: "united-states", name: "US", title: "the United States" },
  "united-kingdom": { code: "united-kingdom", name: "UK", title: "the United Kingdom" }
};

export default function BankAccountsCountryPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const countryInfo = COUNTRY_MAP[countrySlug] || COUNTRY_MAP["india"];
  const selectedCountrySlug = countryInfo.code;

  const [filterType, setFilterType] = useState<string>("all");

  const filteredBanks = BANKS_DATA.filter((bank) => {
    if (bank.countrySlug !== selectedCountrySlug) return false;
    if (filterType !== "all" && bank.type !== filterType) return false;
    return true;
  });

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 className="text-gradient-purple" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}>
          Bank Accounts in {countryInfo.title}
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "1.05rem" }}>
          Compare savings, digital-only, and neobank accounts in <strong>{countryInfo.title}</strong>. Review interest rates, fees, minimum balance requirements, and features.
        </p>
      </header>

      {/* Country Selection Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", flexWrap: "wrap" }}>
        <Link
          href="/india/bank-accounts"
          className="btn"
          style={{
            background: selectedCountrySlug === "india" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: selectedCountrySlug === "india" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: selectedCountrySlug === "india" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: selectedCountrySlug === "india" ? "700" : "500",
            boxShadow: selectedCountrySlug === "india" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇮🇳 India Banks
        </Link>
        <Link
          href="/united-states/bank-accounts"
          className="btn"
          style={{
            background: selectedCountrySlug === "united-states" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: selectedCountrySlug === "united-states" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: selectedCountrySlug === "united-states" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: selectedCountrySlug === "united-states" ? "700" : "500",
            boxShadow: selectedCountrySlug === "united-states" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇺🇸 United States Banks
        </Link>
        <Link
          href="/united-kingdom/bank-accounts"
          className="btn"
          style={{
            background: selectedCountrySlug === "united-kingdom" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: selectedCountrySlug === "united-kingdom" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: selectedCountrySlug === "united-kingdom" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: selectedCountrySlug === "united-kingdom" ? "700" : "500",
            boxShadow: selectedCountrySlug === "united-kingdom" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇬🇧 United Kingdom Banks
        </Link>
      </div>

      {/* Filter Options */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "2.5rem", display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
        <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Filter Accounts:</strong>
        
        {/* Type Filter */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button 
            onClick={() => setFilterType("all")} 
            className={`badge ${filterType === "all" ? "badge-primary" : "badge-secondary"}`}
            style={{ cursor: "pointer" }}
          >
            All Types
          </button>
          <button 
            onClick={() => setFilterType("Traditional Savings")} 
            className={`badge ${filterType === "Traditional Savings" ? "badge-primary" : "badge-secondary"}`}
            style={{ cursor: "pointer" }}
          >
            Traditional Savings
          </button>
          <button 
            onClick={() => setFilterType("Digital Account")} 
            className={`badge ${filterType === "Digital Account" ? "badge-primary" : "badge-secondary"}`}
            style={{ cursor: "pointer" }}
          >
            Digital Accounts
          </button>
          <button 
            onClick={() => setFilterType("Neobank")} 
            className={`badge ${filterType === "Neobank" ? "badge-primary" : "badge-secondary"}`}
            style={{ cursor: "pointer" }}
          >
            Neobanks
          </button>
        </div>
      </div>

      {/* Banks List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filteredBanks.length === 0 && (
          <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p>No bank accounts match your current filters. Try adjusting the filter options.</p>
          </div>
        )}
        {filteredBanks.map((bank) => (
          <div
            key={bank.slug}
            className="premium-row-card"
          >
            {/* Left Column - Logo */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: "88px",
                height: "88px",
                borderRadius: "16px",
                border: `2px solid ${bank.logoColor}`,
                boxShadow: `0 0 20px ${bank.logoColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${bank.logoColor}12`
              }}>
                <div style={{ fontSize: "2rem", fontWeight: "900", color: bank.logoColor }}>
                  {bank.logoLetter}
                </div>
              </div>
            </div>

            {/* Right Column - Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              
              {/* Header info */}
              <div className="flex-between" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <h3 style={{ fontSize: "1.3rem", margin: 0 }}>
                      {bank.name} <span style={{ color: "var(--warning)", fontWeight: "bold", fontSize: "1rem" }}>({bank.rating} ★)</span>
                    </h3>
                    <span className="badge badge-primary" style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}>{bank.type}</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem", display: "block" }}>
                    Active Users: {bank.activeUsers} • Interest Rate: <strong>{bank.interestRate}</strong>
                  </span>
                </div>
                <Link 
                  href={`/${countrySlug}/bank-accounts/${bank.slug}`}
                  className="btn btn-primary"
                  style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", borderRadius: "8px", textDecoration: "none" }}
                >
                  Full Details Review
                </Link>
              </div>

              {/* Active Features Checklist Badges */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {Object.entries(bank.features).map(([key, value]) => {
                  const label = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
                  return (
                    <span 
                      key={key} 
                      className={`badge ${value ? 'badge-success' : 'badge-danger'}`}
                      style={{ fontSize: "0.65rem", opacity: value ? 1 : 0.45, padding: "0.15rem 0.45rem" }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>

              {/* 4-Metric Comparison Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginTop: "0.25rem" }}>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Min Balance</div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>{bank.charges.minimumBalance}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Maintenance Fee</div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>{bank.charges.maintenanceFee}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>ATM Withdrawal</div>
                  <strong style={{ color: "var(--success)", fontSize: "0.85rem" }}>{bank.charges.atmWithdrawal}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>FX Fee markup</div>
                  <strong style={{ color: "var(--warning)", fontSize: "0.85rem" }}>{bank.charges.foreignExchange}</strong>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
