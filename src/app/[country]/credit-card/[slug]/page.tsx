"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CardReviewPage() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const slug = params?.slug as string;

  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/credit-cards?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.creditCards) {
          setCard(data.creditCards);
          setLikeCount(data.creditCards.likes || 0);
        }
      })
      .catch((err) => console.error("Error fetching card:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="app-container" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)" }}>Loading Credit Card Details...</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>Searching the select registry for {slug}</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="app-container" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)" }}>Card Not Found</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>We couldn't find "{slug}" in our catalog.</p>
        <Link href={`/${countrySlug}/credit-card`} className="btn btn-primary" style={{ marginTop: "2rem" }}>
          Back to Credit Cards
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    if (hasLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setHasLiked(!hasLiked);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return (
      <div style={{ display: "inline-flex", gap: "0.2rem", color: "var(--warning)", fontSize: "1.1rem" }}>
        {"★".repeat(fullStars)}
        {hasHalf ? "½" : ""}
        {"☆".repeat(5 - fullStars - (hasHalf ? 1 : 0))}
        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginLeft: "0.4rem", fontWeight: "600" }}>
          ({rating})
        </span>
      </div>
    );
  };

  return (
    <div className="app-container" style={{ paddingTop: "2rem" }}>
      
      {/* Breadcrumbs */}
      <nav style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
        <Link href="/">Select</Link> &gt;{" "}
        <Link href={`/${countrySlug}/credit-card`}>Credit Cards</Link> &gt;{" "}
        <span style={{ color: "var(--text-primary)", fontWeight: "500" }}>{card.name}</span>
      </nav>

      {/* Main Review Card (Hero Card Header) */}
      <section className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem", background: "linear-gradient(to right, var(--card-bg), rgba(99,102,241,0.02))" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "2rem", alignItems: "center" }} className="m-flex-column">
          {/* Left: Image / Micro-card preview */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: "200px",
              height: "125px",
              borderRadius: "10px",
              background: card.slug === "sbi-cashback-credit-card" ? "linear-gradient(135deg, #1e1e24 0%, #0a0a0c 100%)" : "linear-gradient(135deg, #2b3a4a 0%, #121a24 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "1rem",
              position: "relative"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.6rem", fontWeight: "700", opacity: "0.8", letterSpacing: "0.05em" }}>{card.issuer.toUpperCase()}</span>
                <span style={{ fontSize: "0.8rem" }}>🪙</span>
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: "600", letterSpacing: "0.05em", color: "var(--text-primary)" }}>{card.name.split(" ")[0]}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "0.55rem", opacity: "0.6" }}>
                <span>MAYANK PATEL</span>
                <span>{card.network}</span>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <h1 style={{ fontSize: "2rem", margin: 0 }}>{card.name}</h1>
              {renderStars(card.overallRating)}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", margin: "0.25rem 0", flexWrap: "wrap" }}>
              <span className="badge badge-success">{card.type}</span>
              <span className="badge badge-primary">Best for: {card.bestFor}</span>
              <span className="badge badge-warning" style={{ textTransform: "none" }}>Issuer: {card.issuer}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
              <button 
                onClick={handleLike} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.4rem", 
                  fontSize: "0.85rem", 
                  color: hasLiked ? "var(--danger)" : "var(--text-secondary)", 
                  cursor: "pointer",
                  background: "transparent",
                  border: "none"
                }}
              >
                <span>{hasLiked ? "❤️" : "🤍"}</span>
                <strong>{likeCount} Likes</strong>
              </button>
              <button style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: "600", background: "transparent", border: "none", cursor: "pointer" }}>
                ⭐ Write Review
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "0.5rem" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>{card.description}</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
            <button className="btn btn-primary">Apply Now</button>
            <button className="btn btn-secondary">Check Credit Score</button>
          </div>
        </div>
      </section>

      {/* Features Checklist Panel */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "0.25rem" }}>Features and Benefits Checklist</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
          Quick overview of key features supported by this card.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {Object.entries(card.featuresChecklist).map(([key, value]) => {
            const formattedLabel = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            return (
              <div 
                key={key} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.75rem", 
                  padding: "0.75rem", 
                  background: "#090a0f", 
                  borderRadius: "var(--radius-md)", 
                  border: "1px solid var(--border-color)" 
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{value ? "✅" : "❌"}</span>
                <span style={{ fontSize: "0.85rem", color: value ? "var(--text-primary)" : "var(--text-muted)", fontWeight: value ? "600" : "400" }}>
                  {formattedLabel}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed Perks Grid */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1.25rem" }}>Detailed Privileges & Rewards</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {card.perks.map((perk: any, index: number) => (
            <div key={index} className="card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.5rem" }}>
                  {perk.category === "cashback" ? "💰" : perk.category === "fuel" ? "⛽" : perk.category === "emi" ? "📊" : perk.category === "lounge" ? "🛫" : perk.category === "rewards" ? "🎁" : "✨"}
                </span>
                <h3 style={{ fontSize: "1.05rem" }}>{perk.title}</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                {perk.details.map((bullet: string, idx: number) => (
                  <li key={idx} style={{ display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: "var(--primary)" }}>•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Fees & Charges Section */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "0.25rem" }}>Fees & Charges</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
          Detailed costs associated with maintaining and running this credit card.
        </p>

        {/* Charges grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", margin: "1rem 0" }}>
          {Object.entries(card.fees).map(([key, value]: [string, any]) => {
            const formattedLabel = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            return (
              <div key={key} style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>{formattedLabel}</div>
                <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-primary)" }}>{String(value)}</div>
              </div>
            );
          })}
        </div>

        {/* Late payment charges */}
        <div style={{ marginTop: "2rem", borderTop: "1px dashed var(--border-color)", paddingTop: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Late Payment Penalty Slabs</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
            {card.latePaymentCharges.map((slab: any, idx: number) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", background: "#090a0f", padding: "0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "0.8rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>{slab.range}</span>
                <strong style={{ color: "var(--text-primary)" }}>{slab.fee}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pros & Cons Columns */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }} className="m-flex-column">
        <div className="card" style={{ borderTop: "4px solid var(--success)" }}>
          <h3 style={{ fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--success)" }}>
            <span>✓</span> Pros / Benefits
          </h3>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            {card.pros.map((pro: string, idx: number) => (
              <li key={idx} style={{ display: "flex", gap: "0.5rem" }}>
                <span style={{ color: "var(--success)" }}>✔</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ borderTop: "4px solid var(--danger)" }}>
          <h3 style={{ fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--danger)" }}>
            <span>✗</span> Cons / Limitations
          </h3>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            {card.cons.map((con: string, idx: number) => (
              <li key={idx} style={{ display: "flex", gap: "0.5rem" }}>
                <span style={{ color: "var(--danger)" }}>✖</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rating & Detailed Review */}
      <section className="grid-dashboard" style={{ marginBottom: "4rem" }}>
        
        {/* Review Content */}
        <main className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h2 style={{ fontSize: "1.3rem" }}>{card.reviewTitle}</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            <p>{card.reviewContent}</p>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Card Specifications</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
              <tbody>
                {card.reviewOverviewTable.map((row: any, idx: number) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.75rem 0.5rem", color: "var(--text-secondary)", fontWeight: "500" }}>{row.label}</td>
                    <td style={{ padding: "0.75rem 0.5rem", color: "var(--text-primary)", fontWeight: "600" }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Sidebar Rating Metrics */}
        <aside className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", height: "fit-content" }}>
          <h3 style={{ fontSize: "1.15rem" }}>Rating Breakdown</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Charges & Fees</span>
                <strong>{card.ratingsBreakdown.charges} / 5</strong>
              </div>
              <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--warning)", width: `${card.ratingsBreakdown.charges * 20}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Rewards Value</span>
                <strong>{card.ratingsBreakdown.rewards} / 5</strong>
              </div>
              <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--success)", width: `${card.ratingsBreakdown.rewards * 20}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex-between" style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                <span>Customer Support</span>
                <strong>{card.ratingsBreakdown.customerService} / 5</strong>
              </div>
              <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--primary)", width: `${card.ratingsBreakdown.customerService * 20}%` }}></div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Editorial Detailed Article */}
      {card.detailedArticle && (
        <div className="card" style={{ marginTop: "3rem", padding: "2.5rem" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "900", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }} className="text-gradient-purple">
            {card.detailedArticle.title}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.75", marginBottom: "2rem" }}>
            {card.detailedArticle.intro}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
            {card.detailedArticle.sections.map((sect: any, idx: number) => (
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
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
                    {sect.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx} style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.5" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {sect.table && (
                  <div style={{ overflowX: "auto", margin: "1rem 0 1.5rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                          {sect.table.headers.map((th: string, thIdx: number) => (
                            <th key={thIdx} style={{ padding: "0.75rem 0.5rem" }}>{th}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sect.table.rows.map((row: string[], rowIdx: number) => (
                          <tr key={rowIdx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                            {row.map((td: string, tdIdx: number) => (
                              <td key={tdIdx} style={{ padding: "0.75rem 0.5rem", color: tdIdx === 0 ? "var(--text-secondary)" : "var(--text-primary)", fontWeight: tdIdx === 0 ? "500" : "600" }}>{td}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
