"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductLogo from "@/components/ProductLogo";

export default function PaymentAppDetailPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const slug = params?.slug as string;

  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("rewards");

  useEffect(() => {
    if (!app) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setActiveSection(entry.target.id); }
        });
      },
      { threshold: 0.15, rootMargin: "-100px 0px -60% 0px" }
    );
    const sections = ["rewards", "fees", "features", "specs", "reviews"];
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.unobserve(el); }); };
  }, [app]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/payment-apps?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.paymentApps) {
          setApp(data.paymentApps);
          setLikes(data.paymentApps.likes || 0);
        }
      })
      .catch((err) => console.error("Error fetching payment app details:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="app-container" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)" }}>Loading Payment App Details...</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>Searching Select Registry...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="app-container" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)" }}>Payment App Not Found</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>We couldn't find a payment app with the slug "{slug}".</p>
        <Link href={`/${countrySlug}/payment-apps`} className="btn btn-primary" style={{ marginTop: "2rem" }}>
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
        <Link href={`/${countrySlug}/payment-apps`} style={{ color: "var(--primary)" }}>Payment Apps</Link>
        <span>&gt;</span>
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{app.name} Review</span>
      </nav>

      {/* Hero Header Card */}
      <div className="card m-flex-column" style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: "2.5rem", alignItems: "center", marginBottom: "3rem" }}>
        {/* Logo Representation */}
        <ProductLogo logoLetter={app.logoLetter} logoColor={app.logoColor} name={app.name} size="110px" fontSize="2.8rem" borderRadius="20px" />

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
            <Link href={`/${countrySlug}/payment-apps`} className="btn btn-secondary" style={{ flex: 1, padding: "0.5rem 0.5rem", fontSize: "0.85rem", textAlign: "center", textDecoration: "none" }}>
              Back
            </Link>
          </div>
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
              document.getElementById("rewards")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "20px",
              background: activeSection === "rewards" ? "var(--primary)" : "transparent",
              color: activeSection === "rewards" ? "#ffffff" : "var(--text-secondary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: activeSection === "rewards" ? "0 4px 14px rgba(99, 102, 241, 0.4)" : "none"
            }}
          >
            Cashback & Rewards
          </button>
          <button
            onClick={() => {
              document.getElementById("fees")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "20px",
              background: activeSection === "fees" ? "var(--primary)" : "transparent",
              color: activeSection === "fees" ? "#ffffff" : "var(--text-secondary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: activeSection === "fees" ? "0 4px 14px rgba(99, 102, 250, 0.4)" : "none"
            }}
          >
            Fees & Charges
          </button>
          <button
            onClick={() => {
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "20px",
              background: activeSection === "features" ? "var(--primary)" : "transparent",
              color: activeSection === "features" ? "#ffffff" : "var(--text-secondary)",
              fontWeight: "700",
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: activeSection === "features" ? "0 4px 14px rgba(99, 102, 241, 0.4)" : "none"
            }}
          >
            Key Features
          </button>
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
            Specs
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
            Our Review
          </button>
        </div>
      </div>

      {/* CONTENT FEED (SCROLLABLE SECTIONS) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

        {/* Section 1: Cashback & Rewards */}
        <section id="rewards" style={{ scrollMarginTop: "80px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "var(--primary)" }}>🎁</span> Cashback & Rewards Program
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "-1rem" }}>
              Rewards, scratch cards, loyalty programs, and seasonal cashbacks active for {app.name} clients.
            </p>
            {app.detailedReview.cashbackRewards ? (
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                {app.detailedReview.cashbackRewards}
              </p>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No specific cashback/rewards details registered.</p>
            )}
          </div>
        </section>

        {/* Section 2: Fees & Charges */}
        <section id="fees" style={{ scrollMarginTop: "80px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Detailed Transaction Charges <span style={{ fontSize: "0.75rem", fontWeight: "600", color: "var(--primary)", background: "rgba(99, 102, 241, 0.1)", padding: "0.15rem 0.5rem", borderRadius: "6px", border: "1px solid rgba(99, 102, 241, 0.2)" }}>Standard Tariffs</span>
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
                Brokerage-style structure of user fees and transaction charges.
              </p>
            </div>

            {/* Visual Brokerage Plan style Grid */}
            {app.charges.standardUpi !== undefined ? (
              // Indian/UPI App Charges layout
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "1.2rem", paddingBottom: "0.4rem", borderBottom: "1px solid var(--border-color)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Product Transaction Fees (UPI & Utility)
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem 2rem" }}>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Standard UPI (Bank-to-Bank)</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--success)" }}>{app.charges.standardUpi}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>UPI via RuPay Credit Card</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--success)" }}>{app.charges.upiRuPay}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Mobile Recharges</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--warning)" }}>{app.charges.mobileRecharges}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Utility Bill Payments</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>{app.charges.utilityBills}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Wallet Loading Fees</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>{app.charges.walletLoadingFees}</span>
                  </div>
                </div>
              </div>
            ) : (
              // International App Charges layout
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "1.2rem", paddingBottom: "0.4rem", borderBottom: "1px solid var(--border-color)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  P2P & Account Funding Fees
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem 2rem" }}>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Standard P2P Transfers</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--success)" }}>{app.charges.standardUpi || "$0 (via Linked account)"}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Instant Bank Transfer Out</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>{app.charges.bankTransfer}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Credit Card Funding Fee</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--warning)" }}>{app.charges.walletLoading}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Card Purchase (Commercial)</p>
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>{app.charges.cardPayments}</span>
                  </div>
                  {app.charges.joiningBonus && (
                    <div>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.3rem" }}>Signup / Referral Bonus</p>
                      <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--success)" }}>{app.charges.joiningBonus}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Limits & Platform Availability info integrated into Fees & Charges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }} className="m-flex-column">
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span>⏱️</span> Transaction Limits
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
                  <div className="flex-between">
                    <span style={{ color: "var(--text-secondary)" }}>Daily Cumulative Limit:</span>
                    <strong style={{ color: "var(--text-primary)" }}>{app.limits.dailyLimit}</strong>
                  </div>
                  <div className="flex-between">
                    <span style={{ color: "var(--text-secondary)" }}>Per Transaction Ticket Limit:</span>
                    <strong style={{ color: "var(--text-primary)" }}>{app.limits.transactionLimit}</strong>
                  </div>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--text-primary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span>📱</span> Platform Availability
                </h4>
                <div style={{ fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Available on:</span>{" "}
                  <strong style={{ color: "var(--primary)" }}>{app.platforms.join(", ")}</strong>
                </div>
              </div>
            </div>

            {/* Standard summary list fallback */}
            <div style={{ marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
              <h4 style={{ fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Fee System Specifications</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                  <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>Wallet Loading</strong>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{app.charges.walletLoading}</div>
                </div>
                <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                  <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>Bank Transfer / Outgoing Payout</strong>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{app.charges.bankTransfer}</div>
                </div>
                <div>
                  <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>Card Transactions</strong>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{app.charges.cardPayments}</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Key Features */}
        <section id="features" style={{ scrollMarginTop: "80px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--text-primary)" }}>Key Features & Capabilities</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "-1rem" }}>
              Core functionalities that define the user experience and transactions pipeline in the {app.name} app.
            </p>
            {app.keyFeatures && app.keyFeatures.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {app.keyFeatures.map((feat: string, index: number) => (
                  <div key={index} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                    padding: "1rem",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-color)",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }} className="hover-card">
                    <span style={{ color: "var(--primary)", fontSize: "1.2rem", lineHeight: "1" }}>⚡</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.4" }}>{feat}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No specific key features cataloged yet.</p>
            )}
          </div>
        </section>

        {/* Section 4: Specs */}
        <section id="specs" style={{ scrollMarginTop: "80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--text-primary)" }}>Specs (Pros & Cons)</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "-1rem" }}>
              Key advantages and limitations of utilizing {app.name} for daily transactions.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="m-flex-column">
              <div className="card" style={{ borderLeft: "4px solid #10b981" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#10b981" }}>🟢</span> Pros / Advantages
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingLeft: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.4 }}>
                  {app.pros.map((pro: any, index: number) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>

              <div className="card" style={{ borderLeft: "4px solid #ef4444" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#ef4444" }}>🔴</span> Cons / Limitations
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingLeft: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.4 }}>
                  {app.cons.map((con: any, index: number) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Reviews */}
        <section id="reviews" style={{ scrollMarginTop: "80px" }}>
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
        </section>

      </div>
    </div>
  );
}
