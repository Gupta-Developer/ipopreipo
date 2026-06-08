"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const country = (params?.country as string) || "india";

  return (
    <>
      {/* Enable scrolling for the footer but design content to fit on the first fold */}
      <style>{`
        footer { display: block !important; }
        body { overflow-y: auto !important; }
      `}</style>

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

      <div className="app-container" style={{ 
        paddingTop: "1.5rem", 
        paddingBottom: "1.5rem", 
        position: "relative", 
        zIndex: 1,
        minHeight: "calc(100vh - 68px)", // fit to first fold viewport height below navbar
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        boxSizing: "border-box"
      }}>
        
        {/* Authority & Unbiased Hero Header */}
        <header style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
          
          <div style={{ fontSize: "clamp(0.8rem, 2vw, 0.95rem)", fontWeight: 550, color: "var(--text-primary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            world's largest website
          </div>
          
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href={`/${country}/ipo`} className="text-neon-primary neon-link">
              ipo
            </Link>
            
            {/* Animated Dashed Pointers */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", verticalAlign: "middle" }}>
              {/* Left Arrow (Moves Right-to-Left since it points Left) */}
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ overflow: "visible" }}>
                <path d="M 5 6 L 60 6" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" style={{ animation: "dash-move-reverse 20s linear infinite" }} />
                <path d="M 9 2 L 5 6 L 9 10" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              
              <span className="divider-neon" style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", textTransform: "lowercase", letterSpacing: "0", display: "inline-block", position: "relative", top: "-1px" }}>
                for
              </span>
              
              {/* Right Arrow (Moves Left-to-Right since it points Right) */}
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ overflow: "visible" }}>
                <path d="M 0 6 L 55 6" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" style={{ animation: "dash-move 20s linear infinite" }} />
                <path d="M 51 2 L 55 6 L 51 10" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <Link href={`/${country}/preipo`} className="text-neon-primary neon-link">
              preipo
            </Link>
          </h1>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem", color: "var(--text-secondary)", fontWeight: 300, marginBottom: "0.1rem" }}>&amp;</span>
            <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)", fontWeight: 400, maxWidth: "600px", margin: 0 }}>
              our daily use financial products
            </p>
          </div>
        </header>

        {/* SELECT Hub Section */}
        <div className="select-hub-wrapper" style={{ margin: "1rem 0" }}>
          <div className="select-node" onClick={() => {
            const el = document.getElementById("product-selection-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}>
            <span className="primary-dot-pulse" />
            SELECT
          </div>

          {/* Animated dashed pointers layout in schematic branch form */}
          <svg className="connector-svg" viewBox="0 0 1000 90" preserveAspectRatio="none">
            {/* Main vertical stem dropping down from SELECT */}
            <path d="M 500 0 L 500 20" className="connector-line" />
            
            {/* Horizontal branch dividing the drop */}
            <path d="M 100 20 L 900 20" className="connector-line" />
            
            {/* 5 Downward-pointing arrows dropping straight to cards */}
            {/* Drop 1 */}
            <path d="M 100 20 L 100 90" className="connector-line" />
            <path d="M 96 84 L 100 90 L 104 84" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Drop 2 */}
            <path d="M 300 20 L 300 90" className="connector-line" />
            <path d="M 296 84 L 300 90 L 304 84" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Drop 3 */}
            <path d="M 500 20 L 500 90" className="connector-line" />
            <path d="M 496 84 L 500 90 L 504 84" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Drop 4 */}
            <path d="M 700 20 L 700 90" className="connector-line" />
            <path d="M 696 84 L 700 90 L 704 84" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Drop 5 */}
            <path d="M 900 20 L 900 90" className="connector-line" />
            <path d="M 896 84 L 900 90 L 904 84" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* Product Selection Cards */}
        <section id="product-selection-section" className="category-row-wrapper" style={{ marginTop: "1rem" }}>
          <div className="product-row-layout">
            <Link href={`/${country}/credit-card`} className="glass-product-card">
              <span className="glass-card-icon">💳</span>
              <span className="glass-card-label">Credit Cards</span>
            </Link>

            <Link href={`/${country}/payment-apps`} className="glass-product-card">
              <span className="glass-card-icon">📱</span>
              <span className="glass-card-label">Payment Apps</span>
            </Link>

            <Link href={`/${country}/bank-accounts`} className="glass-product-card">
              <span className="glass-card-icon">🏦</span>
              <span className="glass-card-label">Banks</span>
            </Link>

            <Link href={`/${country}/crypto`} className="glass-product-card">
              <span className="glass-card-icon">🪙</span>
              <span className="glass-card-label">Crypto Apps</span>
            </Link>

            <Link href={`/${country}/brokers`} className="glass-product-card">
              <span className="glass-card-icon">📈</span>
              <span className="glass-card-label">Brokers</span>
            </Link>
          </div>
        </section>

        {/* Countries Market List */}
        <section style={{ textAlign: "center", margin: "1rem 0 0 0" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: "800", color: "var(--primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            FOR COUNTRIES LIKE
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem 1.5rem", flexWrap: "wrap", maxWidth: "800px", margin: "0 auto", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
            {["United States", "China", "Germany", "Japan", "India", "United Kingdom", "France", "Brazil", "Italy", "Canada"].map((c, i) => (
              <span key={i} style={{ whiteSpace: "nowrap" }}>{c}</span>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
