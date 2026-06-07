"use client";

import React, { useState, useEffect } from "react";
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
  const [activeSection, setActiveSection] = useState<string>("specs");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-100px 0px -60% 0px" }
    );

    const sections = ["specs", "taxes", "reviews"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

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

      {/* Product Basket */}
      <div className="card" style={{ marginBottom: "2.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "0.4rem" }}>Product Basket</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0 0 1.5rem" }}>
          The segments in which you can invest through this broker (includes Equity, Commodity, Currency, Futures, and Options).
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Equity", supported: broker.segments.equity, icon: "📈" },
            { label: "Commodity", supported: broker.segments.commodity, icon: "🧱" },
            { label: "Currency", supported: broker.segments.currency, icon: "💱" },
            { label: "Futures", supported: broker.segments.futures, icon: "📊" },
            { label: "Options", supported: broker.segments.options, icon: "⚖️" },
          ].map((seg, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.75rem", 
                padding: "0.85rem 1.1rem", 
                borderRadius: "12px", 
                background: seg.supported ? "rgba(16, 185, 129, 0.05)" : "rgba(255, 255, 255, 0.01)",
                border: `1px solid ${seg.supported ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.05)"}`,
                transition: "all 0.2s"
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{seg.icon}</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: seg.supported ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  {seg.label}
                </span>
                <span style={{ fontSize: "0.7rem", fontWeight: "600", color: seg.supported ? "#10b981" : "var(--text-muted)", marginTop: "0.1rem" }}>
                  {seg.supported ? "Available" : "Not Offered"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div style={{ 
        position: "sticky", 
        top: "1rem", 
        zIndex: 100, 
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: "3rem",
      }}>
        <div style={{
          display: "flex", 
          gap: "0.5rem",
          padding: "0.45rem",
          background: "var(--card-bg)", 
          backdropFilter: "blur(18px)", 
          WebkitBackdropFilter: "blur(18px)",
          borderRadius: "30px", 
          border: "1px solid var(--border-color)", 
          boxShadow: "var(--shadow-md)",
        }}>
          <button 
            onClick={() => {
              document.getElementById("specs")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{ 
              padding: "0.6rem 1.25rem", 
              borderRadius: "20px",
              background: activeSection === "specs" ? "var(--primary)" : "transparent",
              color: activeSection === "specs" ? "#ffffff" : "var(--text-secondary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: activeSection === "specs" ? "0 4px 14px rgba(99, 102, 241, 0.4)" : "none"
            }}
          >
            Charges & specs
          </button>
          <button 
            onClick={() => {
              document.getElementById("taxes")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{ 
              padding: "0.6rem 1.25rem", 
              borderRadius: "20px",
              background: activeSection === "taxes" ? "var(--primary)" : "transparent",
              color: activeSection === "taxes" ? "#ffffff" : "var(--text-secondary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: activeSection === "taxes" ? "0 4px 14px rgba(99, 102, 250, 0.4)" : "none"
            }}
          >
            Transaction Taxes
          </button>
          <button 
            onClick={() => {
              document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{ 
              padding: "0.6rem 1.25rem", 
              borderRadius: "20px",
              background: activeSection === "reviews" ? "var(--primary)" : "transparent",
              color: activeSection === "reviews" ? "#ffffff" : "var(--text-secondary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: activeSection === "reviews" ? "0 4px 14px rgba(99, 102, 241, 0.4)" : "none"
            }}
          >
            Ratings & Reviews
          </button>
        </div>
      </div>

      {/* CONTENT FEED (SCROLLABLE SECTIONS) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        
        {/* Section 1: Charges & Specs */}
        <section id="specs" style={{ scrollMarginTop: "80px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--primary)" }}>📋</span> Charges & Specifications
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            
            {/* Brokerage Plans (Single Plan) */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    Brokerage Plans <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "var(--primary)", background: "var(--success-bg)", padding: "0.15rem 0.5rem", borderRadius: "6px", border: "1px solid var(--success-border)" }}>Single Plan</span>
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
                    Detailed account fees, segment brokerage rates, and margins offered by {broker.name}.
                  </p>
                </div>
                <Link 
                  href={`/${countrySlug}/calculator?tab=brokerage&broker=${broker.slug}`}
                  className="btn btn-secondary"
                  style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", textDecoration: "none" }}
                >
                  📊 {broker.name} Brokerage Calculator
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.25rem" }}>
                {/* Account Charges */}
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--primary)", marginBottom: "0.85rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Account Charges
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Account Opening</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.charges.opening}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Account Maintenance (AMC)</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.charges.amc}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Call & Trade</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.charges.callTrade}</strong>
                    </div>
                  </div>
                </div>

                {/* Brokerage Fees */}
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--success)", marginBottom: "0.85rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Brokerage Charges
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Equity Delivery</span>
                      <strong style={{ fontSize: "0.95rem", color: "var(--success)" }}>{broker.brokerage.delivery}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Equity Intraday</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.brokerage.intraday}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Equity Futures</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.brokerage.futures}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Equity Options</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.brokerage.options}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Currency Futures</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.brokerage.currencyFutures || "-"}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Currency Options</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.brokerage.currencyOptions || "-"}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Commodity Futures</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.brokerage.commodityFutures || "-"}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Commodity Options</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.brokerage.commodityOptions || "-"}</strong>
                    </div>
                  </div>
                </div>

                {/* Margins */}
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--warning)", marginBottom: "0.85rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Segment Margins
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Equity Delivery Margin</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.margins.delivery}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Equity Intraday Margin</span>
                      <strong style={{ fontSize: "0.95rem", color: "var(--warning)" }}>{broker.margins.intraday}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Futures Margin</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.margins.futures || "-"}</strong>
                    </div>
                    <div className="premium-spec-cell" style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Options Margin</span>
                      <strong style={{ fontSize: "0.95rem" }}>{broker.margins.options || "-"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Platforms */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800" }}>Available Trading Platforms</h3>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {broker.platforms.map((plat, idx) => (
                  <span key={idx} className="badge badge-primary" style={{ fontSize: "0.85rem", padding: "0.45rem 0.85rem", borderRadius: "8px" }}>
                    🖥️ {plat}
                  </span>
                ))}
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
        </section>

        {/* Section 2: Transaction Taxes */}
        <section id="taxes" style={{ scrollMarginTop: "80px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--success)" }}>💸</span> Transaction Taxes & Statutory Fees
          </h2>
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
        </section>

        {/* Section 3: Ratings & Reviews */}
        <section id="reviews" style={{ scrollMarginTop: "80px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--warning)" }}>⭐</span> Ratings & Editorial Reviews
          </h2>
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
        </section>

      </div>

      {/* Editorial Detailed Article */}
      {broker.detailedArticle && (
        <div className="card" style={{ marginTop: "3rem", padding: "2.5rem" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "900", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }} className="text-gradient-purple">
            {broker.detailedArticle.title}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.75", marginBottom: "2rem" }}>
            {broker.detailedArticle.intro}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
            {broker.detailedArticle.sections.map((sect, idx) => (
              <div key={idx}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--primary)", marginBottom: "0.85rem" }}>
                  {sect.heading}
                </h3>
                {sect.content && (
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.65", marginBottom: "1rem" }}>
                    {sect.content}
                  </p>
                )}
                {sect.items && sect.items.length > 0 && (
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingLeft: "1.2rem" }}>
                    {sect.items.map((item, itemIdx) => {
                      const splitIndex = item.indexOf(":");
                      if (splitIndex !== -1) {
                        const title = item.substring(0, splitIndex);
                        const desc = item.substring(splitIndex + 1);
                        return (
                          <li key={itemIdx} style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.5" }}>
                            <strong style={{ color: "var(--text-primary)" }}>{title}</strong>:{desc}
                          </li>
                        );
                      }
                      return (
                        <li key={itemIdx} style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.5" }}>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
