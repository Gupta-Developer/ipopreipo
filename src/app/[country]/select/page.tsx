"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BANKS_DATA } from "@/data/banksData";
import { CREDIT_CARDS_CATALOG } from "@/data/cardsData";
import { PAYMENT_APPS_DATA } from "@/data/paymentAppsData";
import { CRYPTO_APPS_DATA } from "@/data/cryptoAppsData";

const COUNTRY_MAP: Record<string, { name: string; title: string; flag: string }> = {
  "india": { name: "India", title: "India", flag: "🇮🇳" },
  "united-states": { name: "United States", title: "the United States", flag: "🇺🇸" },
  "united-kingdom": { name: "United Kingdom", title: "the United Kingdom", flag: "🇬🇧" }
};

export default function SelectSubdomainPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const countryInfo = COUNTRY_MAP[countrySlug] || COUNTRY_MAP["india"];

  // Calculate dynamic stats for the country
  const banksCount = BANKS_DATA.filter(b => b.countrySlug === countrySlug).length;
  const cardsCount = CREDIT_CARDS_CATALOG.filter(c => c.country.toLowerCase() === countryInfo.name.toLowerCase()).length;
  const paymentsCount = PAYMENT_APPS_DATA.filter(p => p.country.toLowerCase() === countryInfo.name.toLowerCase()).length;
  const cryptoCount = CRYPTO_APPS_DATA.filter(c => c.country.toLowerCase() === countryInfo.name.toLowerCase()).length;

  const products = [
    {
      title: "Credit Cards",
      description: "Compare premium cards, cashback slabs, airport lounge access benefits, and reward points.",
      count: cardsCount,
      icon: "💳",
      link: `/${countrySlug}/credit-card`,
      color: "#ff7b00",
      accentBg: "rgba(255, 123, 0, 0.08)"
    },
    {
      title: "Bank Accounts",
      description: "Compare high-yield savings interest rates, maintenance charges, and neobank online channels.",
      count: banksCount,
      icon: "🏦",
      link: `/${countrySlug}/bank-accounts`,
      color: "#00c853",
      accentBg: "rgba(0, 200, 83, 0.08)"
    },
    {
      title: "Payment Channels & Apps",
      description: "Compare transaction speed, loading fees, daily wallet transfer limits, and UPI options.",
      count: paymentsCount,
      icon: "📱",
      link: `/${countrySlug}/payment-apps`,
      color: "#3d5afe",
      accentBg: "rgba(61, 90, 254, 0.08)"
    },
    {
      title: "Crypto Gateways",
      description: "Compare maker/taker commissions, regulatory licensing, deposit limits, and staking options.",
      count: cryptoCount,
      icon: "🪙",
      link: `/${countrySlug}/crypto`,
      color: "#ffd600",
      accentBg: "rgba(255, 214, 0, 0.08)"
    }
  ];

  return (
    <div className="app-container" style={{ paddingTop: "3rem" }}>
      {/* Decorative Glow Elements */}
      <div style={{
        position: "absolute",
        top: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "300px",
        background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <header style={{ marginBottom: "4rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(var(--primary-rgb), 0.06)", border: "1px solid rgba(var(--primary-rgb), 0.15)", padding: "0.4rem 1.25rem", borderRadius: "99px", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.1rem" }}>✨</span>
          <span style={{ fontSize: "0.78rem", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            CNBC Select style finance comparisons
          </span>
        </div>

        <h1 style={{ fontSize: "3.5rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.1, maxWidth: "800px" }}>
          Unified Financial <span className="text-gradient-purple">Product Index</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginTop: "1rem", maxWidth: "600px", lineHeight: 1.5 }}>
          Independent side-by-side reviews, fees breakdown, and live rates for products in <strong>{countryInfo.flag} {countryInfo.title}</strong>.
        </p>

        {/* Dynamic Country Selector Tabs */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {Object.entries(COUNTRY_MAP).map(([slug, info]) => {
            const isActive = countrySlug === slug;
            return (
              <Link
                key={slug}
                href={`/select/${slug}`}
                className="btn"
                style={{
                  background: isActive ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
                  borderColor: isActive ? "var(--primary)" : "rgba(255,255,255,0.06)",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  padding: "0.55rem 1.5rem",
                  fontSize: "0.85rem",
                  borderRadius: "99px",
                  fontWeight: isActive ? "700" : "500",
                  boxShadow: isActive ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
                  textDecoration: "none"
                }}
              >
                {info.flag} {info.name} Products
              </Link>
            );
          })}
        </div>
      </header>

      {/* Grid of Product Categories */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", marginBottom: "4rem", position: "relative", zIndex: 1 }}>
        {products.map((p, idx) => (
          <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "2rem", transition: "transform 0.2s, box-shadow 0.2s" }}>
            <div>
              <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: p.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", marginBottom: "1.5rem", border: `1px solid ${p.color}20` }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text-primary)" }}>{p.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>{p.description}</p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", marginTop: "1rem" }}>
              <span className="badge badge-primary" style={{ fontSize: "0.7rem", padding: "0.25rem 0.6rem" }}>
                {p.count} Options Catalogued
              </span>
              <Link 
                href={p.link}
                className="btn btn-primary"
                style={{ padding: "0.45rem 1.1rem", fontSize: "0.8rem", borderRadius: "8px", textDecoration: "none", background: p.color, borderColor: p.color }}
              >
                Review Specs →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Direct Comparison Portal Banner */}
      <section className="card" style={{ padding: "3rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "600px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800 }}>Side-by-Side Comparison Engine</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem", lineHeight: 1.4 }}>
            Want to compare specific accounts, credit cards, or brokers head-to-head? Use our dynamic side-by-side comparison matrix.
          </p>
        </div>
        <Link 
          href={`/${countrySlug}/compare`}
          className="btn btn-primary"
          style={{ padding: "0.75rem 2rem", fontSize: "0.9rem", borderRadius: "10px", textDecoration: "none" }}
        >
          Compare Side-by-Side
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: "6rem", paddingTop: "2.5rem", borderTop: "1px solid var(--border-color)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
        <p>© 2026 ipopreipo.com Select. Real-time rates and specification reviews. All data gathered from official provider terms.</p>
      </footer>
    </div>
  );
}
