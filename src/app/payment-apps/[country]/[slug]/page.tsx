"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PAYMENT_APPS_DATA } from "../../../../data/paymentAppsData";

export default function PaymentAppDetailPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const slug = params?.slug as string;
  const app = PAYMENT_APPS_DATA.find((a) => a.slug === slug);

  // Likes & Tabs states
  const [likes, setLikes] = useState(app ? app.likes : 0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "fees" | "reviews" >("specs");

  if (!app) {
    return (
      <div className="app-container" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)" }}>Loading Payment App Details...</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>Searching Select Registry...</p>
        <Link href={`/payment-apps/${countrySlug}`} className="btn btn-primary" style={{ marginTop: "2rem" }}>
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
        <Link href={`/payment-apps/${countrySlug}`} style={{ color: "var(--primary)" }}>Payment Apps</Link>
        <span>&gt;</span>
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{app.name} Review</span>
      </nav>

      {/* Hero Header Card */}
      <div className="card m-flex-column" style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: "2.5rem", alignItems: "center", marginBottom: "3rem" }}>
        {/* Logo Representation */}
        <div style={{
          width: "110px",
          height: "110px",
          borderRadius: "20px",
          border: `3px solid ${app.logoColor}`,
          boxShadow: `0 0 25px ${app.logoColor}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.5)",
          flexShrink: 0
        }}>
          <span style={{ fontSize: "2.8rem", fontWeight: "900", color: app.logoColor }}>
            {app.logoLetter}
          </span>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 900, margin: 0 }}>{app.name} Review</h1>
            <span className="badge badge-success" style={{ fontSize: "0.8rem" }}>★ {app.rating} Rating</span>
          </div>
          <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.95rem" }}>
            Category: <strong>{app.type}</strong> • Target Market: <strong>{app.country}</strong> • User Base: <strong>{app.activeUsers}</strong>
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.4, maxWidth: "600px", margin: "0.25rem 0 0" }}>
            {app.summary}
          </p>
        </div>

        {/* Action Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "stretch", minWidth: "200px" }}>
          <button 
            className="btn btn-primary"
            style={{ 
              background: `linear-gradient(135deg, ${app.logoColor}e0 0%, ${app.logoColor} 100%)`,
              boxShadow: `0 10px 20px ${app.logoColor}30`
            }}
          >
            Download {app.name} App
          </button>
          
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
            <Link href={`/payment-apps/${countrySlug}`} className="btn btn-secondary" style={{ flex: 1, padding: "0.5rem 0.5rem", fontSize: "0.85rem", textAlign: "center", textDecoration: "none" }}>
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "2.5rem", gap: "1rem" }}>
        <button 
          onClick={() => setActiveTab("specs")} 
          style={{ 
            padding: "0.85rem 1.5rem", 
            borderBottom: activeTab === "specs" ? "2px solid var(--primary)" : "none", 
            fontWeight: activeTab === "specs" ? "700" : "500",
            color: activeTab === "specs" ? "var(--text-primary)" : "var(--text-secondary)",
            fontSize: "0.95rem",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          Limits & specs
        </button>
        <button 
          onClick={() => setActiveTab("fees")} 
          style={{ 
            padding: "0.85rem 1.5rem", 
            borderBottom: activeTab === "fees" ? "2px solid var(--primary)" : "none", 
            fontWeight: activeTab === "fees" ? "700" : "500",
            color: activeTab === "fees" ? "var(--text-primary)" : "var(--text-secondary)",
            fontSize: "0.95rem",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          Fees & Charges
        </button>
        <button 
          onClick={() => setActiveTab("reviews")} 
          style={{ 
            padding: "0.85rem 1.5rem", 
            borderBottom: activeTab === "reviews" ? "2px solid var(--primary)" : "none", 
            fontWeight: activeTab === "reviews" ? "700" : "500",
            color: activeTab === "reviews" ? "var(--text-primary)" : "var(--text-secondary)",
            fontSize: "0.95rem",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >
          Expert Review
        </button>
      </div>

      {/* RENDER ACTIVE MODULES */}

      {activeTab === "specs" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          
          {/* Main specifications grids */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="m-flex-column">
            
            {/* Spec Card: Transaction Limits */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", fontSize: "1.1rem", color: "var(--primary)" }}>Transaction Limits</h3>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Daily Cumulative Limit</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem", color: "var(--text-primary)" }}>{app.limits.dailyLimit}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Per Transaction Ticket Limit</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem", color: "var(--text-primary)" }}>{app.limits.transactionLimit}</div>
              </div>
            </div>

            {/* Spec Card: Technical & Support specs */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", fontSize: "1.1rem", color: "var(--warning)" }}>System Parameters</h3>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Supported App Ecosystems</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{app.platforms.join(", ")}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Target Country</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem", color: "var(--warning)" }}>{app.country}</div>
              </div>
            </div>

          </div>

          {/* Pros & Cons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="m-flex-column">
            <div className="card" style={{ borderLeft: "4px solid #10b981" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "#10b981" }}>🟢</span> Pros / Advantages
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingLeft: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.4 }}>
                {app.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>

            <div className="card" style={{ borderLeft: "4px solid #ef4444" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "#ef4444" }}>🔴</span> Cons / Limitations
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingLeft: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.4 }}>
                {app.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

      {activeTab === "fees" && (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h3 style={{ fontSize: "1.3rem" }}>Standard Transaction Charges</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "-1rem" }}>
            Charges billed dynamically to your account based on payment funding method.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>Wallet Loading Charges</strong>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{app.charges.walletLoading}</div>
            </div>
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>Bank Transfer / Outgoing Payout Charges</strong>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{app.charges.bankTransfer}</div>
            </div>
            <div>
              <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>Card Transaction Charges</strong>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{app.charges.cardPayments}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2.5rem" }} className="m-flex-column">
          
          {/* Rating Breakdown */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", height: "fit-content" }}>
            <h3 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Expert Rating Score</h3>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Transaction Speed</span>
                <strong style={{ color: "var(--success)" }}>{app.categoryRatings.speed} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--success)", width: `${app.categoryRatings.speed * 20}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Interface Usability</span>
                <strong style={{ color: "var(--primary)" }}>{app.categoryRatings.usability} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--primary)", width: `${app.categoryRatings.usability * 20}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Security Infrastructure</span>
                <strong style={{ color: "var(--warning)" }}>{app.categoryRatings.security} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--warning)", width: `${app.categoryRatings.security * 20}%` }}></div>
              </div>
            </div>
          </div>

          {/* Detailed Review text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <div className="card">
              <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Interface & User Experience Review</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{app.detailedReview.interface}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--success)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Charges & Fee Transparency</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{app.detailedReview.charges}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--warning)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Onboarding & Setup Speed</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{app.detailedReview.onboarding}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Security Controls & Shielding</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{app.detailedReview.security}</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
