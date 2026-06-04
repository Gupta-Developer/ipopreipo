"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BROKERS_DATA } from "../../../data/brokersData";

const COUNTRY_MAP: Record<string, { code: string; name: string; title: string }> = {
  "india": { code: "IN", name: "India", title: "India" },
  "united-states": { code: "US", name: "US", title: "the United States" },
  "united-kingdom": { code: "UK", name: "UK", title: "the United Kingdom" }
};

export default function BrokersCountryPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const countryInfo = COUNTRY_MAP[countrySlug] || COUNTRY_MAP["india"];
  const selectedCountry = countryInfo.code;

  const [filterType, setFilterType] = useState<string>("all");
  const [filterSegment, setFilterSegment] = useState<string>("all");

  const filteredBrokers = BROKERS_DATA.filter((broker) => {
    if (broker.country !== selectedCountry) return false;
    if (filterType !== "all" && broker.type.toLowerCase() !== filterType.toLowerCase()) return false;
    if (filterSegment !== "all") {
      const seg = filterSegment as keyof typeof broker.segments;
      if (!broker.segments[seg]) return false;
    }
    return true;
  });

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 className="text-gradient-purple" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}>
          Stock Brokers in {countryInfo.title}
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "1.05rem" }}>
          Compare discount and full-service stockbrokers in <strong>{countryInfo.title}</strong>. Review charges, ratings, segments, and platform capabilities.
        </p>
      </header>

      {/* Country Selection Tabs — now links for SEO */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", flexWrap: "wrap" }}>
        <Link
          href="/brokers/india"
          className="btn"
          style={{
            background: selectedCountry === "IN" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: selectedCountry === "IN" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: selectedCountry === "IN" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: selectedCountry === "IN" ? "700" : "500",
            boxShadow: selectedCountry === "IN" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇮🇳 India Brokers
        </Link>
        <Link
          href="/brokers/united-states"
          className="btn"
          style={{
            background: selectedCountry === "US" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: selectedCountry === "US" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: selectedCountry === "US" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: selectedCountry === "US" ? "700" : "500",
            boxShadow: selectedCountry === "US" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇺🇸 United States Brokers
        </Link>
        <Link
          href="/brokers/united-kingdom"
          className="btn"
          style={{
            background: selectedCountry === "UK" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: selectedCountry === "UK" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: selectedCountry === "UK" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: selectedCountry === "UK" ? "700" : "500",
            boxShadow: selectedCountry === "UK" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇬🇧 United Kingdom Brokers
        </Link>
      </div>

      {/* Filter Options */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "2.5rem", display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
        <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Filter Brokers:</strong>
        
        {/* Type Filter */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button 
            onClick={() => setFilterType("all")} 
            className={`badge ${filterType === "all" ? "badge-primary" : "badge-secondary"}`}
            style={{ cursor: "pointer" }}
          >
            All Types
          </button>
          <button 
            onClick={() => setFilterType("Discount Broker")} 
            className={`badge ${filterType === "Discount Broker" ? "badge-primary" : "badge-secondary"}`}
            style={{ cursor: "pointer" }}
          >
            Discount Brokers
          </button>
          <button 
            onClick={() => setFilterType("Full Service Broker")} 
            className={`badge ${filterType === "Full Service Broker" ? "badge-primary" : "badge-secondary"}`}
            style={{ cursor: "pointer" }}
          >
            Full Service
          </button>
        </div>

        {/* Segment Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Supports:</span>
          <select 
            value={filterSegment}
            onChange={(e) => setFilterSegment(e.target.value)}
            className="input-field"
            style={{ width: "160px", padding: "0.35rem 0.75rem", fontSize: "0.8rem", borderRadius: "8px" }}
          >
            <option value="all">Any Segment</option>
            <option value="commodity">Commodity</option>
            <option value="currency">Currency</option>
            <option value="futures">Futures</option>
            <option value="options">Options</option>
          </select>
        </div>
      </div>

      {/* Brokers List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filteredBrokers.length === 0 && (
          <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p>No brokers match your current filters. Try adjusting the filter options.</p>
          </div>
        )}
        {filteredBrokers.map((broker) => (
          <div
            key={broker.slug}
            className="premium-row-card"
            style={{ gridTemplateColumns: "130px 1fr" }}
          >
            {/* Left Column */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: "88px",
                height: "88px",
                borderRadius: "16px",
                border: `2px solid ${broker.logoColor}`,
                boxShadow: `0 0 20px ${broker.logoColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${broker.logoColor}12`
              }}>
                <div style={{ fontSize: "2rem", fontWeight: "900", color: broker.logoColor }}>
                  {broker.logoLetter}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              
              {/* Header info */}
              <div className="flex-between" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <h3 style={{ fontSize: "1.3rem", margin: 0 }}>
                      {broker.name} <span style={{ color: "var(--text-secondary)", fontWeight: "500", fontSize: "1rem" }}>({broker.rating} ★)</span>
                    </h3>
                    <span className="badge badge-primary" style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}>{broker.type}</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem", display: "block" }}>
                    Depository: {broker.depository} • Active Clients: {broker.activeClients}
                  </span>
                </div>
                <Link 
                  href={`/brokers/${countrySlug}/${broker.slug}`}
                  className="btn btn-primary"
                  style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", borderRadius: "8px", textDecoration: "none" }}
                >
                  Full Details Review
                </Link>
              </div>

              {/* Active Trading Segment Badges */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {Object.entries(broker.segments).map(([key, value]) => (
                  <span 
                    key={key} 
                    className={`badge ${value ? 'badge-success' : 'badge-danger'}`}
                    style={{ fontSize: "0.65rem", opacity: value ? 1 : 0.45, padding: "0.15rem 0.45rem" }}
                  >
                    {key}
                  </span>
                ))}
              </div>

              {/* 4-Metric Comparison Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginTop: "0.25rem" }}>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Account Opening</div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>{broker.charges.opening}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Account AMC</div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>{broker.charges.amc}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Equity Delivery</div>
                  <strong style={{ color: "var(--success)", fontSize: "0.85rem" }}>{broker.brokerage.delivery}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Equity Intraday</div>
                  <strong style={{ color: "var(--warning)", fontSize: "0.85rem" }}>{broker.brokerage.intraday}</strong>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
