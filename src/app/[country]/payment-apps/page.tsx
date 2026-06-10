"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductLogo from "@/components/ProductLogo";

const COUNTRY_MAP: Record<string, { name: string; title: string }> = {
  "india": { name: "India", title: "India" },
  "united-states": { name: "United States", title: "the United States" },
  "united-kingdom": { name: "United Kingdom", title: "the United Kingdom" }
};

export default function PaymentAppsCountryPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const countryInfo = COUNTRY_MAP[countrySlug] || COUNTRY_MAP["india"];
  const selectedCountryName = countryInfo.name;

  const [searchQuery, setSearchQuery] = useState("");
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/payment-apps?countrySlug=${countrySlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setApps(data.paymentApps);
        }
      })
      .catch((err) => console.error("Error fetching payment apps:", err))
      .finally(() => setLoading(false));
  }, [countrySlug]);

  const filteredApps = apps.filter((app) => {
    if (searchQuery && !app.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 className="text-gradient-purple" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}>
          Payment Apps in {countryInfo.title}
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "1.05rem" }}>
          Compare top digital wallets, UPI clients, and payment ecosystems in <strong>{countryInfo.title}</strong>. Review charges, daily limits, ratings, and features.
        </p>
      </header>

      {/* Country Selection Tabs — now links for SEO */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", flexWrap: "wrap" }}>
        <Link
          href="/india/payment-apps"
          className="btn"
          style={{
            background: countrySlug === "india" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: countrySlug === "india" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: countrySlug === "india" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: countrySlug === "india" ? "700" : "500",
            boxShadow: countrySlug === "india" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇮🇳 India Apps
        </Link>
        <Link
          href="/united-states/payment-apps"
          className="btn"
          style={{
            background: countrySlug === "united-states" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: countrySlug === "united-states" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: countrySlug === "united-states" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: countrySlug === "united-states" ? "700" : "500",
            boxShadow: countrySlug === "united-states" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇺🇸 United States Apps
        </Link>
        <Link
          href="/united-kingdom/payment-apps"
          className="btn"
          style={{
            background: countrySlug === "united-kingdom" ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
            borderColor: countrySlug === "united-kingdom" ? "var(--primary)" : "rgba(255,255,255,0.06)",
            borderStyle: "solid",
            borderWidth: "1px",
            color: countrySlug === "united-kingdom" ? "var(--text-primary)" : "var(--text-secondary)",
            padding: "0.5rem 1.25rem",
            fontSize: "0.85rem",
            borderRadius: "99px",
            fontWeight: countrySlug === "united-kingdom" ? "700" : "500",
            boxShadow: countrySlug === "united-kingdom" ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
            textDecoration: "none"
          }}
        >
          🇬🇧 United Kingdom Apps
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="card" style={{ padding: "1.25rem", marginBottom: "2.5rem", display: "flex", gap: "2rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Find:</strong>
          <div style={{ position: "relative", width: "260px" }}>
            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", opacity: 0.6, fontSize: "0.85rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search payment app..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "2.25rem", paddingRight: "0.75rem", paddingTop: "0.4rem", paddingBottom: "0.4rem", fontSize: "0.8rem", borderRadius: "8px" }}
            />
          </div>
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          Showing <strong>{filteredApps.length}</strong> Payment Apps
        </div>
      </div>

      {/* Payment Apps List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filteredApps.length === 0 && (
          <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <p>No payment apps match your query. Try adjusting your search term.</p>
          </div>
        )}
        {filteredApps.map((app) => (
          <div
            key={app.slug}
            className="premium-row-card"
          >
            {/* Left Column Logo */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ProductLogo logoLetter={app.logoLetter} logoColor={app.logoColor} name={app.name} />
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
                    Active Userbase: {app.activeUsers} • Liked by: {app.likes} members
                  </span>
                </div>
                <Link 
                  href={`/${countrySlug}/payment-apps/${app.slug}`}
                  className="btn btn-primary desktop-only-btn"
                  style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", borderRadius: "8px", textDecoration: "none" }}
                >
                  Full Specs & Reviews
                </Link>
              </div>

              {/* Supported Payment Channels */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {Object.entries(app.features).map(([key, value]) => {
                  const formattedKey = key === "upi" ? "UPI Support" : key.replace(/([A-Z])/g, " $1");
                  return (
                    <span 
                      key={key} 
                      className={`badge ${value ? 'badge-success' : 'badge-danger'}`}
                      style={{ fontSize: "0.65rem", opacity: value ? 1 : 0.45, padding: "0.15rem 0.45rem", textTransform: "capitalize" }}
                    >
                      {formattedKey}
                    </span>
                  );
                })}
              </div>

              {/* Specification Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginTop: "0.25rem" }}>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Joining Bonus</div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>{app.charges.joiningBonus || "₹0"}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Success Rate</div>
                  <strong style={{ color: "var(--success)", fontSize: "0.85rem" }}>{app.charges.paymentSuccessRate || "99%+"}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>First Tx Cashback</div>
                  <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem" }}>{app.charges.firstTransactionCashback || "N/A"}</strong>
                </div>
                <div className="premium-spec-cell" style={{ padding: "0.6rem 0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Recharge Charges</div>
                  <strong style={{ color: "var(--warning)", fontSize: "0.85rem" }}>{app.charges.chargesOnRecharge || "Free"}</strong>
                </div>
              </div>

              <Link 
                href={`/${countrySlug}/payment-apps/${app.slug}`}
                className="btn btn-primary full-review-btn mobile-only-btn"
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
