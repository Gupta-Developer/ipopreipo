"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const COUNTRY_NAMES: Record<string, string> = {
  "india": "🇮🇳 India",
  "united-states": "🇺🇸 United States",
  "united-kingdom": "🇬🇧 United Kingdom"
};

export default function Sitemap() {
  const params = useParams();
  const countrySlug = (params?.country as string) || "india";
  const countryName = COUNTRY_NAMES[countrySlug] || "India";

  const getUrl = (path: string) => `/${countrySlug}${path}`;

  return (
    <div className="app-container" style={{ paddingTop: "3rem", maxWidth: "900px" }}>
      
      {/* Header */}
      <header style={{ marginBottom: "3.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.04em" }}>Platform Sitemap</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          Localized directory and site index structure for <strong style={{ color: "var(--text-primary)" }}>{countryName}</strong>.
        </p>
      </header>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2.5rem" }}>
        
        {/* Col 1: Investments */}
        <section className="sitemap-card">
          <h2 className="sitemap-title">📈 Investment Markets</h2>
          <ul className="sitemap-list">
            <li>
              <Link href={getUrl("/ipo")} className="sitemap-link">
                <strong>IPO Tracker Hub</strong>
                <span>Grey Market Premiums (GMP), subscriptions and lists</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/preipo")} className="sitemap-link">
                <strong>Pre-IPO Markets</strong>
                <span>Private equity metrics, unlisted stock shares trading rates</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/news")} className="sitemap-link">
                <strong>Market News & Analysis</strong>
                <span>IPO alerts, economic data, earnings and market intelligence</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/compare")} className="sitemap-link">
                <strong>Compare Assets</strong>
                <span>Multi-asset cross comparisons checklists</span>
              </Link>
            </li>
          </ul>
        </section>

        {/* Col 2: Consumer Finance */}
        <section className="sitemap-card">
          <h2 className="sitemap-title">🎯 Consumer Finance (Select)</h2>
          <ul className="sitemap-list">
            <li>
              <Link href={getUrl("/select")} className="sitemap-link">
                <strong>Select Dashboard</strong>
                <span>The independent curated reviews homepage</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/bank-accounts")} className="sitemap-link">
                <strong>Bank Accounts</strong>
                <span>High-interest savings accounts and neobank accounts comparison</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/credit-card")} className="sitemap-link">
                <strong>Credit Cards</strong>
                <span>Reward rates, lounge visits, annual fees and APR limits comparison</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/brokers")} className="sitemap-link">
                <strong>Stock Brokers</strong>
                <span>Account setup, delivery AMC, discount vs premium platforms review</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/payment-apps")} className="sitemap-link">
                <strong>Payment Channels & UPI Apps</strong>
                <span>Wallet load charges, transaction speeds and limits comparison</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/crypto")} className="sitemap-link">
                <strong>Crypto Exchanges</strong>
                <span>Taker/maker pricing and staking options comparison</span>
              </Link>
            </li>
          </ul>
        </section>

        {/* Col 3: Tools & Authentication */}
        <section className="sitemap-card">
          <h2 className="sitemap-title">⚙️ Utilities & Accounts</h2>
          <ul className="sitemap-list">
            <li>
              <Link href={getUrl("/calculator")} className="sitemap-link">
                <strong>Calculators Hub</strong>
                <span>Brokerage tax fee computation and compound interest calculators</span>
              </Link>
            </li>
            <li>
              <Link href={getUrl("/login")} className="sitemap-link">
                <strong>Account Login</strong>
                <span>Access your saved portfolios and favorites watchlist</span>
              </Link>
            </li>
            <li>
              <Link href="/signup" className="sitemap-link">
                <strong>Create Account</strong>
                <span>Sign up for premium grey market syndicate notifications</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="sitemap-link">
                <strong>Main Homepage</strong>
                <span>Root investment intelligence landing hub page</span>
              </Link>
            </li>
          </ul>
        </section>

      </div>

      <style>{`
        .sitemap-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .sitemap-title {
          font-size: 1.15rem;
          fontWeight: 900;
          color: var(--text-primary);
          border-bottom: 2px solid var(--border-color);
          padding-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .sitemap-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .sitemap-link {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          color: var(--text-primary);
          transition: transform 0.18s;
        }
        .sitemap-link:hover {
          transform: translateX(4px);
        }
        .sitemap-link strong {
          font-size: 0.9rem;
          color: rgb(var(--primary-rgb));
        }
        .sitemap-link span {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }
      `}</style>
    </div>
  );
}
