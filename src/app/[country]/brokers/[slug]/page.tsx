"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { BROKERS_DATA } from "@/data/brokersData";

export default function BrokerDetailPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const slug = params?.slug as string;
  const broker = BROKERS_DATA.find((b) => b.slug === slug);

  // States inside hook
  const [likes, setLikes] = useState(broker ? broker.likes : 0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "taxes" | "reviews">("specs");

  if (!broker) {
    return (
      <div className="app-container" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)" }}>Loading Broker Details...</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>Searching Select Directory...</p>
        <Link href={`/${countrySlug}/brokers`} className="btn btn-primary" style={{ marginTop: "2rem" }}>
          Back to Directory
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    if (liked) {
      setLikes((l) => l - 1);
    } else {
      setLikes((l) => l + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      
      {/* Breadcrumbs */}
      <nav style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
        <Link href="/" style={{ color: "var(--primary)" }}>Select</Link>
        <span>&gt;</span>
        <Link href={`/${countrySlug}/brokers`} style={{ color: "var(--primary)" }}>Stock Brokers</Link>
        <span>&gt;</span>
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{broker.name} Review</span>
      </nav>

      <div className="card m-flex-column" style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: "2.5rem", alignItems: "center", marginBottom: "3rem" }}>
        {/* Logo */}
        <div style={{
          width: "110px",
          height: "110px",
          borderRadius: "20px",
          border: `3px solid ${broker.logoColor}`,
          boxShadow: `0 0 25px ${broker.logoColor}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.5)",
          flexShrink: 0
        }}>
          <span style={{ fontSize: "2.8rem", fontWeight: "900", color: broker.logoColor }}>
            {broker.logoLetter}
          </span>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 900, margin: 0 }}>{broker.name} Review</h1>
            <span className="badge badge-success" style={{ fontSize: "0.8rem" }}>★ {broker.rating} Rating</span>
          </div>
          <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.95rem" }}>
            {broker.type} • Depository: <strong>{broker.depository}</strong> • Client Base: <strong>{broker.activeClients}</strong>
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.4, maxWidth: "600px", margin: "0.25rem 0 0" }}>
            {broker.summary}
          </p>
        </div>

        {/* CTAs & Socials */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "stretch", minWidth: "200px" }}>
          <a 
            href="https://groww.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ 
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              boxShadow: "0 10px 20px rgba(16, 185, 129, 0.2)"
            }}
          >
            Open Demat Account
          </a>
          
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button 
              onClick={handleLike}
              className="btn btn-secondary" 
              style={{ 
                flex: 1, 
                padding: "0.5rem 1rem", 
                fontSize: "0.85rem",
                color: liked ? "#ef4444" : "var(--text-primary)",
                borderColor: liked ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.06)",
                background: liked ? "rgba(239, 68, 68, 0.05)" : "transparent"
              }}
            >
              ❤️ {likes} Likes
            </button>
            <Link href={`/${countrySlug}/brokers`} className="btn btn-secondary" style={{ flex: 1, padding: "0.5rem 0.5rem", fontSize: "0.85rem", textAlign: "center", textDecoration: "none" }}>
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "2.5rem", gap: "1rem" }}>
        <button 
          onClick={() => setActiveTab("specs")} 
          style={{ 
            padding: "0.85rem 1.5rem", 
            borderBottom: activeTab === "specs" ? "2px solid var(--primary)" : "none", 
            fontWeight: activeTab === "specs" ? "700" : "500",
            color: activeTab === "specs" ? "var(--text-primary)" : "var(--text-secondary)",
            fontSize: "0.95rem"
          }}
        >
          Charges & specs
        </button>
        <button 
          onClick={() => setActiveTab("taxes")} 
          style={{ 
            padding: "0.85rem 1.5rem", 
            borderBottom: activeTab === "taxes" ? "2px solid var(--primary)" : "none", 
            fontWeight: activeTab === "taxes" ? "700" : "500",
            color: activeTab === "taxes" ? "var(--text-primary)" : "var(--text-secondary)",
            fontSize: "0.95rem"
          }}
        >
          Transaction Taxes
        </button>
        <button 
          onClick={() => setActiveTab("reviews")} 
          style={{ 
            padding: "0.85rem 1.5rem", 
            borderBottom: activeTab === "reviews" ? "2px solid var(--primary)" : "none", 
            fontWeight: activeTab === "reviews" ? "700" : "500",
            color: activeTab === "reviews" ? "var(--text-primary)" : "var(--text-secondary)",
            fontSize: "0.95rem"
          }}
        >
          Ratings & Reviews
        </button>
      </div>

      {/* CONTENT MODULES */}

      {activeTab === "specs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          
          {/* Main specifications grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }} className="m-flex-column">
            
            {/* Column 1: Core Charges */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", fontSize: "1.1rem", color: "var(--primary)" }}>Core Charges</h3>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Account Opening</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{broker.charges.opening}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Account AMC</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{broker.charges.amc}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Call & Trade Charge</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{broker.charges.callTrade}</div>
              </div>
            </div>

            {/* Column 2: Brokerage Rates */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", fontSize: "1.1rem", color: "var(--success)" }}>Brokerage Fees</h3>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Equity Delivery</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem", color: "var(--success)" }}>{broker.brokerage.delivery}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Equity Intraday</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{broker.brokerage.intraday}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Futures & Options (F&O)</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>F: {broker.brokerage.futures} | O: {broker.brokerage.options}</div>
              </div>
            </div>

            {/* Column 3: Margins & Platforms */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", fontSize: "1.1rem", color: "var(--warning)" }}>Margins & Platforms</h3>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Delivery margin (MTF)</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{broker.margins.delivery}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Intraday Margin limit</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem", color: "var(--warning)" }}>{broker.margins.intraday}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Trading Platforms</span>
                <div style={{ fontSize: "0.85rem", fontWeight: "600", marginTop: "0.25rem", color: "var(--text-primary)" }}>
                  {broker.platforms.join(", ")}
                </div>
              </div>
            </div>

          </div>

          {/* Pros & Cons Columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="m-flex-column">
            
            {/* Pros card */}
            <div className="card" style={{ borderLeft: "4px solid #10b981" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "#10b981" }}>🟢</span> Advantages (Pros)
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingLeft: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.4 }}>
                {broker.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>

            {/* Cons card */}
            <div className="card" style={{ borderLeft: "4px solid #ef4444" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "#ef4444" }}>🔴</span> Disadvantages (Cons)
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingLeft: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.4 }}>
                {broker.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Checklists grids */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="m-flex-column">
            {/* Features check */}
            <div className="card">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Additional Service Features</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                {broker.additionalFeatures.map((f, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                    <span className={`premium-indicator ${f.supported ? 'premium-indicator-checked' : 'premium-indicator-crossed'}`}>
                      {f.supported ? "✓" : "×"}
                    </span>
                    <span style={{ color: f.supported ? "var(--text-primary)" : "var(--text-muted)" }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other assets check */}
            <div className="card">
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Available Investment Products</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                {broker.otherInvestments.map((inv, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                    <span className={`premium-indicator ${inv.supported ? 'premium-indicator-checked' : 'premium-indicator-crossed'}`}>
                      {inv.supported ? "✓" : "×"}
                    </span>
                    <span style={{ color: inv.supported ? "var(--text-primary)" : "var(--text-muted)" }}>{inv.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === "taxes" && (
        <div className="card">
          <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>Detailed Transaction Taxes & Statutory Fees</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "-1rem", marginBottom: "1.5rem" }}>
            Below are standard regulatory transaction taxes charged directly in your contract notes.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                  <th style={{ padding: "0.85rem 1rem" }}>Fee Category</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Equity Delivery</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Equity Intraday</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Futures</th>
                  <th style={{ padding: "0.85rem 1rem" }}>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "1rem", fontWeight: "700" }}>Securities Transaction Tax (STT)</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.stt.delivery}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.stt.intraday}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.stt.futures}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.stt.options}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "1rem", fontWeight: "700" }}>Stamp Duty Charges</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.stampDuty.delivery}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.stampDuty.intraday}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.stampDuty.futures}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.stampDuty.options}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "1rem", fontWeight: "700" }}>Exchange Tx Charges</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.exchangeCharges.delivery}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.exchangeCharges.intraday}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.exchangeCharges.futures}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.exchangeCharges.options}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "1rem", fontWeight: "700" }}>SEBI Turnover Fees</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.sebiFees.delivery}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.sebiFees.intraday}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.sebiFees.futures}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.sebiFees.options}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "1rem", fontWeight: "700" }}>GST Tax Rate</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.gst.delivery}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.gst.intraday}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.gst.futures}</td>
                  <td style={{ padding: "1rem" }}>{broker.taxes.gst.options}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="premium-spec-cell" style={{ marginTop: "1.5rem" }}>
            <strong>Depository Participant (DP) Charges:</strong> {broker.taxes.dpCharges}
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2.5rem" }} className="m-flex-column">
          
          {/* Category Stars Panel */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", height: "fit-content" }}>
            <h3 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Finology Star Breakdown</h3>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Charges & Affordability</span>
                <strong style={{ color: "var(--warning)" }}>{broker.categoryRatings.charges} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--warning)", width: `${broker.categoryRatings.charges * 20}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Platform Usability</span>
                <strong style={{ color: "var(--primary)" }}>{broker.categoryRatings.usability} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--primary)", width: `${broker.categoryRatings.usability * 20}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Customer Helpdesk</span>
                <strong style={{ color: "var(--success)" }}>{broker.categoryRatings.customerService} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--success)", width: `${broker.categoryRatings.customerService * 20}%` }}></div>
              </div>
            </div>
          </div>

          {/* Detailed Editorial Reviews */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <div className="card">
              <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Usability & Interface Review</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{broker.detailedReviews.usability}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--success)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Charges & Transaction Pricing</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{broker.detailedReviews.charges}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--warning)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Onboarding & Activation Process</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{broker.detailedReviews.opening}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Customer Desk & Support Resolution</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{broker.detailedReviews.service}</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
