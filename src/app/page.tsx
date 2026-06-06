"use client";

import React, { useState } from "react";
import Link from "next/link";

// Mock data for display
const MINI_IPOS = [
  { name: "CloudScale AI Systems", ticker: "CSAI", gmp: "+48%", size: "$850M", status: "Active" },
  { name: "BioGenex Therapeutics", ticker: "BGNX", gmp: "+12%", size: "$320M", status: "Active" },
  { name: "Quantum Security Lab", ticker: "QSL", gmp: "+35%", size: "$510M", status: "Upcoming" }
];

const MINI_PREIPOS = [
  { name: "SpaceX", estPrice: "$112.50", valuation: "$210B", growth: "+45%", type: "Aerospace" },
  { name: "Stripe", estPrice: "$28.40", valuation: "$70B", growth: "+32%", type: "Fintech" },
  { name: "Canva", estPrice: "$45.20", valuation: "$26B", growth: "+38%", type: "SaaS" }
];

const MINI_CARDS = [
  { name: "SBI Cashback Card", rate: "5% Online Cash Back", fee: "₹999/yr", network: "Visa" },
  { name: "Tata Neu Infinity HDFC", rate: "5% NeuCoins Slabs", fee: "₹1,499/yr", network: "RuPay" }
];

const MINI_BROKERS = [
  { name: "Groww", type: "Discount", delivery: "₹0 (Max ₹20/trade)", rating: "3.8 ★" },
  { name: "Zerodha", type: "Discount", delivery: "₹0 (Flat free)", rating: "4.4 ★" }
];

const MINI_APPS = [
  { name: "PhonePe", type: "UPI & Wallet", limit: "₹1,00,000 daily", logoColor: "#5f259f", letter: "P" },
  { name: "Google Pay", type: "UPI Payments", limit: "₹1,00,000 daily", logoColor: "#4285f4", letter: "G" }
];

export default function Home() {
  // Live Interactive Poll state
  const [votes, setVotes] = useState({ bullish: 1542, bearish: 412, neutral: 285 });
  const [userVoted, setUserVoted] = useState<string | null>(null);

  const handleVote = (type: "bullish" | "bearish" | "neutral") => {
    if (userVoted) return; // Prevent double vote
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setUserVoted(type);
  };

  const totalVotes = votes.bullish + votes.bearish + votes.neutral;
  const percentBullish = Math.round((votes.bullish / totalVotes) * 100);
  const percentBearish = Math.round((votes.bearish / totalVotes) * 100);
  const percentNeutral = Math.round((votes.neutral / totalVotes) * 100);

  return (
    <>
      {/* Live Scrolling Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-item">⚡ <strong>MARKET WATCH:</strong> Live Grey Market Premiums (GMP) and subscription metrics</div>
          <div className="ticker-item">CloudScale AI Systems (CSAI) <span className="badge badge-success">GMP +$21.50 (48%)</span></div>
          <div className="ticker-item">BioGenex Therapeutics (BGNX) <span className="badge badge-primary">GMP +$2.40 (12%)</span></div>
          <div className="ticker-item">Quantum Security Lab (QSL) <span className="badge badge-success">GMP +$10.85 (35%)</span></div>
          <div className="ticker-item">🛸 SpaceX (Pre-IPO) <strong style={{ color: "var(--primary)" }}>$112.50</strong> <span style={{ color: "var(--success)", fontSize: "0.75rem" }}>+45% YoY</span></div>
          <div className="ticker-item">🛸 Stripe (Pre-IPO) <strong style={{ color: "var(--primary)" }}>$28.40</strong> <span style={{ color: "var(--success)", fontSize: "0.75rem" }}>+32% YoY</span></div>
        </div>
      </div>

      {/* Decorative Glow Elements */}
      <div style={{
        position: "absolute",
        top: "100px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(600px, 100vw)",
        height: "300px",
        background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.12) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden"
      }} />

      <div className="app-container" style={{ paddingTop: "3rem", position: "relative", zIndex: 1 }}>
        
        {/* Premium Hero Title Section */}
        <header style={{ marginBottom: "4rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(var(--primary-rgb), 0.06)", border: "1px solid rgba(var(--primary-rgb), 0.15)", padding: "0.35rem 1rem", borderRadius: "99px", marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "var(--success)" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-primary)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Unified Global Asset Intel</span>
          </div>
          
          <h1 style={{ fontSize: "3.5rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.1, maxWidth: "800px" }}>
            Investments & Offering <span className="text-gradient-purple">Intelligence Hub</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem", maxWidth: "600px", lineHeight: 1.5 }}>
            Real-time Grey Market tracking, private unlisted stocks equity metrics, credit reward comparative slabs, and stock brokerage profiles.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
            <Link href="/ipo" className="btn btn-primary" style={{ padding: "0.8rem 1.8rem", minWidth: "150px" }}>
              Explore IPO Tracker
            </Link>
            <Link href="/preipo" className="btn btn-secondary" style={{ padding: "0.8rem 1.8rem", minWidth: "150px" }}>
              Private Markets
            </Link>
          </div>
        </header>

        {/* Global Statistics Cards Grid */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
          <div className="card" style={{ padding: "1.5rem 1.75rem" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>Average Listing Gains</span>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--success)", letterSpacing: "-0.02em" }}>+34.2%</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>Across YTD 2026 Listings</div>
          </div>
          <div className="card" style={{ padding: "1.5rem 1.75rem" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>Capital Raised YTD</span>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>$12.45B</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>Across 42 Global Offerings</div>
          </div>
          <div className="card" style={{ padding: "1.5rem 1.75rem" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>Pre-IPO Capital Flow</span>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--primary)", letterSpacing: "-0.02em" }}>+$3.8B</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>Recorded Secondary Deals</div>
          </div>
          <div className="card" style={{ padding: "1.5rem 1.75rem" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>Oversubscription Max</span>
            <div style={{ fontSize: "2.4rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--warning)", letterSpacing: "-0.02em" }}>12.8x</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>Reflecting Retail Interest</div>
          </div>
        </section>

        {/* Dynamic Interactive Dashboards Area */}
        <div className="grid-dashboard" style={{ marginBottom: "4rem" }}>
          
          <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Module 1: IPO launches list */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="flex-between" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>📅</span> IPO Calendar Intel
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem", fontWeight: "normal" }}>Live Grey Market Premiums (GMP) & prices</p>
                </div>
                <span className="badge badge-primary">3 Live Tracker</span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {MINI_IPOS.map((i, idx) => (
                  <div key={idx} className="premium-spec-cell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{i.name}</strong>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                        Ticker: <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{i.ticker}</span> • Size: {i.size}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span className="badge badge-success" style={{ fontWeight: "700" }}>{i.gmp} GMP</span>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{i.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/ipo" className="btn btn-secondary" style={{ width: "100%", marginTop: "0.5rem" }}>
                Open Full IPO Intelligence Calendar →
              </Link>
            </div>

            {/* Module 2: Pre-IPO section */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="flex-between" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>🛸</span> Private Equity Shares
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem", fontWeight: "normal" }}>Unlisted secondary equity shares trading valuation</p>
                </div>
                <span className="badge badge-success">High Demand</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {MINI_PREIPOS.map((p, idx) => (
                  <div key={idx} className="premium-spec-cell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{p.name}</strong>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                        Valuation: <strong style={{ color: "var(--text-primary)" }}>{p.valuation}</strong> • {p.type}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--text-primary)" }}>{p.estPrice}</div>
                      <span style={{ fontSize: "0.7rem", color: "var(--success)", fontWeight: "600" }}>{p.growth} YoY</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/preipo" className="btn btn-secondary" style={{ width: "100%", marginTop: "0.5rem" }}>
                Explore Private Capital Markets →
              </Link>
            </div>

            {/* Module 3: Payment Apps */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="flex-between" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>📱</span> Payment Channels & Wallets
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem", fontWeight: "normal" }}>Compare limits, loading charges, and channels</p>
                </div>
                <span className="badge badge-primary">New Category</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {MINI_APPS.map((app, idx) => (
                  <div key={idx} className="premium-spec-cell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${app.logoColor}15`, border: `1px solid ${app.logoColor}40`, display: "flex", alignItems: "center", justifyContent: "center", color: app.logoColor, fontWeight: "900" }}>
                        {app.letter}
                      </div>
                      <div>
                        <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>{app.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>{app.type}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-primary)", fontWeight: "600" }}>{app.limit}</span>
                  </div>
                ))}
              </div>

              <Link href="/india/payment-apps" className="btn btn-secondary" style={{ width: "100%", marginTop: "0.5rem" }}>
                Compare Payment Apps →
              </Link>
            </div>

          </main>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Sidebar Module: Interactive Market Sentiment Poll */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📊</span> Sentiment Gauge
              </h2>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "-0.5rem" }}>
                Vote on unlisted & public listings sentiment.
              </p>

              {/* Poll bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "0.5rem 0" }}>
                <div>
                  <div className="flex-between" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "var(--success)", fontWeight: "600" }}>🚀 Bullish</span>
                    <strong>{percentBullish}% ({votes.bullish})</strong>
                  </div>
                  <div style={{ height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--success)", width: `${percentBullish}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
                <div>
                  <div className="flex-between" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "var(--danger)", fontWeight: "600" }}>📉 Bearish</span>
                    <strong>{percentBearish}% ({votes.bearish})</strong>
                  </div>
                  <div style={{ height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--danger)", width: `${percentBearish}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
                <div>
                  <div className="flex-between" style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                    <span style={{ color: "var(--text-secondary)", fontWeight: "600" }}>⚖️ Neutral</span>
                    <strong>{percentNeutral}% ({votes.neutral})</strong>
                  </div>
                  <div style={{ height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--text-muted)", width: `${percentNeutral}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>

              {/* Vote actions */}
              {!userVoted ? (
                <div style={{ display: "flex", gap: "0.5rem", width: "100%", marginTop: "0.5rem" }}>
                  <button onClick={() => handleVote("bullish")} className="btn btn-secondary" style={{ flex: 1, padding: "0.45rem", fontSize: "0.75rem" }}>Bullish</button>
                  <button onClick={() => handleVote("bearish")} className="btn btn-secondary" style={{ flex: 1, padding: "0.45rem", fontSize: "0.75rem" }}>Bearish</button>
                  <button onClick={() => handleVote("neutral")} className="btn btn-secondary" style={{ flex: 1, padding: "0.45rem", fontSize: "0.75rem" }}>Neutral</button>
                </div>
              ) : (
                <div style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--primary)", fontWeight: "700", background: "rgba(var(--primary-rgb), 0.08)", padding: "0.5rem", borderRadius: "6px" }}>
                  ✓ Thank you for voting! Sentiment registered.
                </div>
              )}
            </div>

            {/* Sidebar Module: Premium Credit Cards Preview */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>💳</span> Top Credit Cards
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {MINI_CARDS.map((c, idx) => (
                  <div key={idx} style={{ paddingBottom: "1rem", borderBottom: idx === 0 ? "1px solid var(--border-color)" : "none" }}>
                    <div className="flex-between">
                      <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{c.name}</strong>
                      <span className="badge badge-primary" style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem" }}>{c.network}</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{c.rate}</p>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>Fee: {c.fee}</div>
                  </div>
                ))}
              </div>

              <Link href="/india/credit-card" className="btn btn-secondary" style={{ width: "100%" }}>
                Compare Premium Cards →
              </Link>
            </div>

            {/* Sidebar Module: Brokerage Partner Links */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>🏛️</span> Recommended Brokers
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {MINI_BROKERS.map((b, idx) => (
                  <div key={idx} className="premium-spec-cell" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{b.name}</strong>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>{b.type} • Delivery: {b.delivery}</div>
                    </div>
                    <strong style={{ fontSize: "0.8rem", color: "var(--warning)" }}>{b.rating}</strong>
                  </div>
                ))}
              </div>

              <Link href="/india/brokers" className="btn btn-secondary" style={{ width: "100%" }}>
                Compare Demat Brokers →
              </Link>
            </div>

            {/* Sidebar Module: Latest News Headlines */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📰</span> Market Headlines
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { title: "Bajaj Housing Finance IPO Subscribed 67x — GMP at ₹180", tag: "IPO", sentiment: "bullish" },
                  { title: "SEBI Introduces T+0 Settlement for Top 500 Stocks", tag: "Markets", sentiment: "neutral" },
                  { title: "RBI Holds Repo at 6.25% — Rate Cut Signals H2 2026", tag: "Economy", sentiment: "neutral" },
                ].map((item, idx, arr) => (
                  <div key={idx} style={{ paddingBottom: "0.85rem", paddingTop: idx > 0 ? "0.85rem" : 0, borderBottom: idx < arr.length - 1 ? "1px solid var(--border-color)" : "none" }}>
                    <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.35rem" }}>
                      <span className={`badge ${item.sentiment === "bullish" ? "badge-success" : "badge-secondary"}`} style={{ fontSize: "0.58rem", padding: "0.12rem 0.45rem" }}>
                        {item.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.35, color: "var(--text-primary)" }}>{item.title}</p>
                  </div>
                ))}
              </div>

              <Link href="/india/news" className="btn btn-secondary" style={{ width: "100%" }}>
                All Market News →
              </Link>
            </div>

          </aside>

        </div>

      </div>
    </>
  );
}
