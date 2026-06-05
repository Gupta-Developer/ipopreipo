"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BANKS_DATA } from "../../../../data/banksData";

export default function BankDetailPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const slug = params?.slug as string;
  const bank = BANKS_DATA.find((b) => b.slug === slug);

  // States inside hook
  const [likes, setLikes] = useState(bank ? bank.likes : 0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "fees" | "reviews">("specs");

  if (!bank) {
    return (
      <div className="app-container" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)" }}>Loading Bank Details...</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>Searching Directory...</p>
        <Link href={`/bank-accounts/${countrySlug}`} className="btn btn-primary" style={{ marginTop: "2rem" }}>
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
        <Link href={`/bank-accounts/${countrySlug}`} style={{ color: "var(--primary)" }}>Bank Accounts</Link>
        <span>&gt;</span>
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{bank.name} Review</span>
      </nav>

      <div className="card m-flex-column" style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: "2.5rem", alignItems: "center", marginBottom: "3rem" }}>
        {/* Logo */}
        <div style={{
          width: "110px",
          height: "110px",
          borderRadius: "20px",
          border: `3px solid ${bank.logoColor}`,
          boxShadow: `0 0 25px ${bank.logoColor}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.5)",
          flexShrink: 0
        }}>
          <span style={{ fontSize: "2.8rem", fontWeight: "900", color: bank.logoColor }}>
            {bank.logoLetter}
          </span>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 900, margin: 0 }}>{bank.name} Review</h1>
            <span className="badge badge-success" style={{ fontSize: "0.8rem" }}>★ {bank.rating} Rating</span>
          </div>
          <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.95rem" }}>
            {bank.type} • Active Users: <strong>{bank.activeUsers}</strong> • Interest: <strong>{bank.interestRate}</strong>
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.4, maxWidth: "600px", margin: "0.25rem 0 0" }}>
            {bank.summary}
          </p>
        </div>

        {/* CTAs & Socials */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "stretch", minWidth: "200px" }}>
          <a 
            href="https://google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ 
              background: `linear-gradient(135deg, ${bank.logoColor} 0%, rgba(var(--primary-rgb), 0.8) 100%)`,
              boxShadow: `0 10px 20px ${bank.logoColor}30`,
              color: "#fff",
              textAlign: "center",
              textDecoration: "none"
            }}
          >
            Apply Online
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
            <Link href={`/bank-accounts/${countrySlug}`} className="btn btn-secondary" style={{ flex: 1, padding: "0.5rem 0.5rem", fontSize: "0.85rem", textAlign: "center", textDecoration: "none" }}>
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
          Account specs
        </button>
        <button 
          onClick={() => setActiveTab("fees")} 
          style={{ 
            padding: "0.85rem 1.5rem", 
            borderBottom: activeTab === "fees" ? "2px solid var(--primary)" : "none", 
            fontWeight: activeTab === "fees" ? "700" : "500",
            color: activeTab === "fees" ? "var(--text-primary)" : "var(--text-secondary)",
            fontSize: "0.95rem"
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
            
            {/* Column 1: Balance & Yield */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", fontSize: "1.1rem", color: "var(--primary)" }}>Yield & Maintenance</h3>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Interest Rate</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{bank.interestRate}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Minimum Balance</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{bank.charges.minimumBalance}</div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Monthly Fee</span>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "0.15rem" }}>{bank.charges.maintenanceFee}</div>
              </div>
            </div>

            {/* Column 2: Key Features Checklist */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", fontSize: "1.1rem", color: "var(--success)" }}>Checklist Features</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" }}>
                {Object.entries(bank.features).map(([key, value]) => {
                  const label = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                      <span className={`premium-indicator ${value ? 'premium-indicator-checked' : 'premium-indicator-crossed'}`}>
                        {value ? "✓" : "×"}
                      </span>
                      <span style={{ color: value ? "var(--text-primary)" : "var(--text-muted)" }}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Platform Availability */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", fontSize: "1.1rem", color: "var(--warning)" }}>Platforms</h3>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Access Channels</span>
                <div style={{ fontSize: "0.95rem", fontWeight: "600", marginTop: "0.35rem", color: "var(--text-primary)" }}>
                  {bank.platforms.map((p, i) => <div key={i} style={{ marginBottom: "0.25rem" }}>📱 {p}</div>)}
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
                {bank.pros.map((pro, index) => (
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
                {bank.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

      {activeTab === "fees" && (
        <div className="card">
          <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>Detailed Fees & Charges</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "-1rem", marginBottom: "1.5rem" }}>
            Below are standard account operation charges for active consumers.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="m-flex-column">
            <div className="premium-spec-cell" style={{ padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>MINIMUM BALANCE REQUIREMENT</div>
              <strong style={{ fontSize: "1rem" }}>{bank.charges.minimumBalance}</strong>
            </div>
            <div className="premium-spec-cell" style={{ padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>MONTHLY ACCOUNT FEE</div>
              <strong style={{ fontSize: "1rem" }}>{bank.charges.maintenanceFee}</strong>
            </div>
            <div className="premium-spec-cell" style={{ padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>ATM WITHDRAWAL FEES</div>
              <strong style={{ fontSize: "1rem" }}>{bank.charges.atmWithdrawal}</strong>
            </div>
            <div className="premium-spec-cell" style={{ padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>FX MARKUP RATES</div>
              <strong style={{ fontSize: "1rem" }}>{bank.charges.foreignExchange}</strong>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2.5rem" }} className="m-flex-column">
          
          {/* Category Stars Panel */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", height: "fit-content" }}>
            <h3 style={{ fontSize: "1.2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Editorial Star Breakdown</h3>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Interest & Rates</span>
                <strong style={{ color: "var(--warning)" }}>{bank.categoryRatings.rates} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--warning)", width: `${bank.categoryRatings.rates * 20}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Platform Usability</span>
                <strong style={{ color: "var(--primary)" }}>{bank.categoryRatings.usability} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--primary)", width: `${bank.categoryRatings.usability * 20}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Customer Helpdesk</span>
                <strong style={{ color: "var(--success)" }}>{bank.categoryRatings.customerService} / 5.0</strong>
              </div>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
                <div style={{ height: "100%", background: "var(--success)", width: `${bank.categoryRatings.customerService * 20}%` }}></div>
              </div>
            </div>
          </div>

          {/* Detailed Editorial Reviews */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <div className="card">
              <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Onboarding & Setup</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{bank.detailedReview.onboarding}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--success)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Fee Structure Assessment</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{bank.detailedReview.fees}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--warning)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Features & Platform Usability</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{bank.detailedReview.features}</p>
            </div>
            <div className="card">
              <h4 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Service Quality & Support</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>{bank.detailedReview.service}</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
