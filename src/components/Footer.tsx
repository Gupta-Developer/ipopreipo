"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

const COUNTRIES = [
  { slug: "india", name: "India", flag: "🇮🇳" },
  { slug: "united-states", name: "United States", flag: "🇺🇸" },
  { slug: "united-kingdom", name: "United Kingdom", flag: "🇬🇧" }
];

export default function Footer() {
  const pathname = usePathname();
  const params = useParams();
  const currentCountry = (params?.country as string) || "india";

  const getDynamicHref = (href: string) => {
    if (href === "/") return "/";
    const segment = href.split("/").filter(Boolean)[0];
    return `/${currentCountry}/${segment}`;
  };

  const handleCountryChange = (slug: string) => {
    document.cookie = `user-country=${slug}; path=/; max-age=31536000`;
    
    // Replace dynamic country segment in active path
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] && ["india", "united-states", "united-kingdom"].includes(segments[0])) {
      segments[0] = slug;
      window.location.href = "/" + segments.join("/");
    } else {
      window.location.href = `/${slug}${pathname}`;
    }
  };

  return (
    <footer className="ft-root">
      <div className="ft-container">
        
        {/* Main Sitemap Grid */}
        <div className="ft-grid">
          
          {/* Col 1: Bio */}
          <div className="ft-col ft-bio">
            <Link href="/" className="ft-logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 17L9 11L13 15L21 7M21 7H16M21 7V12" stroke="rgb(var(--primary-rgb))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 21H21" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
              </svg>
              <span className="ft-wordmark">
                <span>IPO</span>
                <span className="text-primary">pre</span>
                <span>IPO</span>
                <span className="text-muted">.com</span>
              </span>
            </Link>
            <p className="ft-desc">
              Unified global syndicate offering intelligence. In-depth quantitative data for public IPOs, private unlisted equities, and consumer finance directories.
            </p>
            <div className="ft-socials">
              <a href="#" aria-label="Twitter">🕊️</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Github">🐙</a>
            </div>
          </div>

          {/* Col 2: Investments */}
          <div className="ft-col">
            <h4 className="ft-heading">Investments</h4>
            <nav className="ft-nav">
              <Link href={getDynamicHref("/ipo")} className="ft-link">IPO Tracker</Link>
              <Link href={getDynamicHref("/preipo")} className="ft-link">Pre-IPO Unlisted</Link>
              <Link href={getDynamicHref("/compare")} className="ft-link">Asset Compare</Link>
            </nav>
          </div>

          {/* Col 3: Select (Consumer Finance) */}
          <div className="ft-col">
            <h4 className="ft-heading">Select Products</h4>
            <nav className="ft-nav">
              <Link href={getDynamicHref("/select")} className="ft-link">Select Hub</Link>
              <Link href={getDynamicHref("/bank-accounts")} className="ft-link">Bank Accounts</Link>
              <Link href={getDynamicHref("/credit-card")} className="ft-link">Credit Cards</Link>
              <Link href={getDynamicHref("/brokers")} className="ft-link">Stock Brokers</Link>
              <Link href={getDynamicHref("/payment-apps")} className="ft-link">Payment Apps</Link>
              <Link href={getDynamicHref("/crypto")} className="ft-link">Crypto Apps</Link>
            </nav>
          </div>

          {/* Col 4: Platform */}
          <div className="ft-col">
            <h4 className="ft-heading">Platform</h4>
            <nav className="ft-nav">
              <Link href={getDynamicHref("/calculator")} className="ft-link">Calculators</Link>
              <Link href={getDynamicHref("/sitemap")} className="ft-link">Sitemap</Link>
              <Link href={getDynamicHref("/login")} className="ft-link">Account Access</Link>
              <Link href="/signup" className="ft-link">Sign Up</Link>
            </nav>
          </div>

        </div>

        {/* Middle row: Country Selector */}
        <div className="ft-country-row">
          <span className="ft-country-label">Regional Directory:</span>
          <div className="ft-countries">
            {COUNTRIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => handleCountryChange(c.slug)}
                className={`ft-country-btn${currentCountry === c.slug ? " active" : ""}`}
              >
                <span className="flag">{c.flag}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom row: Legal */}
        <div className="ft-bottom">
          <p>© 2026 ipopreipo.com. Institutional asset intelligence dashboard.</p>
          <p className="ft-disclaimer">
            Disclaimer: ipopreipo.com is an independent publisher and comparison directory. All data points, including Grey Market Premiums (GMP), allotment details, and interest rates are curated from syndicate sources on a best-effort basis and should be independently verified before financial commitment.
          </p>
        </div>

      </div>

      <style>{`
        .ft-root {
          width: 100%;
          border-top: 1px solid var(--border-color);
          margin-top: 6rem;
          padding: 5rem 0 3rem;
          position: relative;
          z-index: 10;
        }
        :root:not([data-theme="light"]) .ft-root {
          background: #060810;
        }
        [data-theme="light"] .ft-root {
          background: #f8fafc;
          border-top-color: rgba(15, 23, 42, 0.06);
        }

        .ft-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .ft-grid {
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: 4rem;
          margin-bottom: 4rem;
        }
        @media (max-width: 900px) {
          .ft-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }
        }
        @media (max-width: 600px) {
          .ft-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .ft-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          margin-bottom: 1.25rem;
        }
        .ft-wordmark {
          display: inline-flex;
          align-items: baseline;
          font-size: 1.15rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }
        .ft-wordmark .text-primary {
          color: rgb(var(--primary-rgb));
        }
        .ft-wordmark .text-muted {
          color: var(--text-muted);
          font-weight: 400;
          opacity: 0.85;
        }

        .ft-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          max-width: 320px;
        }

        .ft-socials {
          display: flex;
          gap: 1rem;
          font-size: 1.1rem;
        }
        .ft-socials a {
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.2s;
        }
        .ft-socials a:hover {
          opacity: 1;
        }

        .ft-heading {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        .ft-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ft-link {
          font-size: 0.82rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-link:hover {
          color: var(--text-primary);
        }

        .ft-country-row {
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 1.5rem 0;
          margin-bottom: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        [data-theme="light"] .ft-country-row {
          border-top-color: rgba(15, 23, 42, 0.05);
          border-bottom-color: rgba(15, 23, 42, 0.05);
        }

        .ft-country-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .ft-countries {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .ft-country-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-secondary);
          padding: 0.45rem 1rem;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        [data-theme="light"] .ft-country-btn {
          border-color: rgba(15, 23, 42, 0.08);
        }
        .ft-country-btn:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }
        .ft-country-btn.active {
          background: rgba(var(--primary-rgb), 0.08);
          border-color: rgb(var(--primary-rgb));
          color: var(--text-primary);
          font-weight: 700;
        }

        .ft-bottom {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.6;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ft-disclaimer {
          opacity: 0.8;
          max-width: 1000px;
        }
      `}</style>
    </footer>
  );
}
