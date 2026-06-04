"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const THEMES = [
  { id: "indigo",  name: "Indigo",  primary: "99, 102, 241",  light: "129, 140, 248", color: "#6366f1" },
  { id: "emerald", name: "Emerald", primary: "16, 185, 129",  light: "52, 211, 153",  color: "#10b981" },
  { id: "amber",   name: "Amber",   primary: "245, 158, 11",  light: "251, 191, 36",  color: "#f59e0b" },
  { id: "crimson", name: "Crimson", primary: "239, 68, 68",   light: "248, 113, 113", color: "#ef4444" },
  { id: "ocean",   name: "Ocean",   primary: "14, 165, 233",  light: "56, 189, 248",  color: "#0ea5e9" },
];

const NAV_ITEMS = [
  { label: "Home",         href: "/" },
  { label: "IPO Tracker",  href: "/ipo" },
  { label: "Pre-IPO",      href: "/preipo" },
  { label: "Credit Cards", href: "/credit-card/india" },
  { label: "Brokers",      href: "/brokers/india" },
  { label: "Payment Apps", href: "/payment-apps/india" },
  { label: "Calculators",  href: "/calculator" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [currentTheme, setCurrentTheme] = useState("indigo");
  const [themeMode, setThemeMode]       = useState("light");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);

  const searchRef    = useRef<HTMLInputElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("site-theme") || "indigo";
    const savedMode  = localStorage.getItem("site-theme-mode") || "light";
    setCurrentTheme(savedTheme);
    setThemeMode(savedMode);
    applyTheme(savedTheme);
    applyMode(savedMode);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node))
        setShowThemeMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const applyTheme = (id: string) => {
    const t = THEMES.find((x) => x.id === id) || THEMES[0];
    document.documentElement.style.setProperty("--primary-rgb", t.primary);
    document.documentElement.style.setProperty("--primary-light-rgb", t.light);
    localStorage.setItem("site-theme", id);
  };

  const applyMode = (mode: string) => {
    if (mode === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("site-theme-mode", mode);
  };

  const handleThemeChange = (id: string) => {
    setCurrentTheme(id);
    applyTheme(id);
    setShowThemeMenu(false);
  };

  const toggleMode = () => {
    const next = themeMode === "dark" ? "light" : "dark";
    setThemeMode(next);
    applyMode(next);
  };

  const activeColor = THEMES.find((t) => t.id === currentTheme)?.color || "#6366f1";
  const isDark = themeMode === "dark";

  return (
    <>
      {/* ── Main Navbar ──────────────────────────────────────────────────────── */}
      <header className={`nb-root${scrolled ? " nb-scrolled" : ""}`}>
        <div className="nb-inner">

          {/* Logo */}
          <Link href="/" className="nb-logo">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <rect width="22" height="22" rx="6" fill={`rgb(var(--primary-rgb))`} />
              <path d="M5 16 L11 6 L17 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 12 L14.5 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.65"/>
            </svg>
            <span className="nb-wordmark">
              <span className="nb-ipo">ipo</span>
              <span className="nb-pre">pre</span>
              <span className="nb-ipo">ipo</span>
              <span className="nb-tld">.com</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nb-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.substring(0, item.href.lastIndexOf("/"))));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nb-link${active ? " nb-link-active" : ""}`}
                >
                  {item.label}
                  {active && <span className="nb-link-pip" />}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="nb-controls">

            {/* Search */}
            <div className="nb-search-wrap">
              {searchOpen ? (
                <div className="nb-search-open">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:"var(--text-muted)",flexShrink:0}}>
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search IPO, broker, card…"
                    className="nb-search-input"
                    onBlur={() => setSearchOpen(false)}
                  />
                  <button className="nb-search-close" onMouseDown={() => setSearchOpen(false)} aria-label="Close search">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <button className="nb-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Theme colour */}
            <div ref={themeMenuRef} className="nb-theme-wrap">
              <button className="nb-icon-btn" onClick={() => setShowThemeMenu(!showThemeMenu)} aria-label="Change accent colour">
                <span className="nb-color-dot" style={{ background: activeColor, boxShadow: `0 0 6px ${activeColor}` }} />
              </button>
              {showThemeMenu && (
                <div className="nb-dropdown">
                  <div className="nb-dropdown-label">Accent colour</div>
                  {THEMES.map((t) => (
                    <button key={t.id} className={`nb-dropdown-item${currentTheme === t.id ? " active" : ""}`} onClick={() => handleThemeChange(t.id)}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, boxShadow: `0 0 5px ${t.color}`, display: "block", flexShrink: 0 }} />
                      <span className="nb-dropdown-item-label">{t.name}</span>
                      {currentTheme === t.id && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:"auto"}}>
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light mode */}
            <button className="nb-icon-btn nb-mode-btn" onClick={toggleMode} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Light mode" : "Dark mode"}>
              {isDark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Divider */}
            <div className="nb-divider" />

            {/* User */}
            <button className="nb-user-btn" aria-label="Account">
              <span className="nb-avatar">M</span>
              <span className="nb-user-info">
                <span className="nb-user-name">Mayank</span>
                <span className="nb-user-badge">PRO</span>
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color:"var(--text-muted)"}}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              className="nb-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={`nb-ham-bar${mobileOpen ? " nb-ham-bar-top-open" : ""}`} />
              <span className={`nb-ham-bar${mobileOpen ? " nb-ham-bar-mid-open" : ""}`} />
              <span className={`nb-ham-bar${mobileOpen ? " nb-ham-bar-bot-open" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Overlay ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="nb-overlay" onClick={() => setMobileOpen(false)} aria-hidden />
      )}

      {/* ── Mobile Drawer ─────────────────────────────────────────────────────── */}
      <div className={`nb-drawer${mobileOpen ? " nb-drawer-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="nb-drawer-header">
          <Link href="/" className="nb-logo" onClick={() => setMobileOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <rect width="22" height="22" rx="6" fill={`rgb(var(--primary-rgb))`} />
              <path d="M5 16 L11 6 L17 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 12 L14.5 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.65"/>
            </svg>
            <span className="nb-wordmark">
              <span className="nb-ipo">ipo</span>
              <span className="nb-pre">pre</span>
              <span className="nb-ipo">ipo</span>
              <span className="nb-tld">.com</span>
            </span>
          </Link>
          <button className="nb-icon-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav className="nb-drawer-nav">
          <div className="nb-drawer-section-label">Navigation</div>
           {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.substring(0, item.href.lastIndexOf("/"))));
            return (
              <Link key={item.href} href={item.href} className={`nb-drawer-link${active ? " nb-drawer-link-active" : ""}`}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: active ? `rgb(var(--primary-rgb))` : "var(--text-muted)", flexShrink: 0, display: "block", marginTop: 1 }} />
                {item.label}
                {active && <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: `rgb(var(--primary-rgb))`, fontWeight: 700 }}>Active</span>}
              </Link>
            );
          })}
        </nav>

        <div className="nb-drawer-footer">
          <div className="nb-drawer-section-label">Preferences</div>
          <div className="nb-drawer-pref-row">
            <span className="nb-drawer-pref-label">Mode</span>
            <button className="nb-pref-toggle" onClick={toggleMode}>
              {isDark ? "Dark" : "Light"}
            </button>
          </div>
          <div className="nb-drawer-pref-row">
            <span className="nb-drawer-pref-label">Accent colour</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  aria-label={t.name}
                  style={{
                    width: 22, height: 22, borderRadius: "50%", background: t.color,
                    border: `2px solid ${currentTheme === t.id ? t.color : "transparent"}`,
                    outline: currentTheme === t.id ? `2px solid ${t.color}` : "none",
                    outlineOffset: 2,
                    cursor: "pointer", padding: 0, boxShadow: currentTheme === t.id ? `0 0 8px ${t.color}` : "none",
                    transition: "all 0.18s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────────────────────── */}
      <style>{`
        /* ─── Root ─── */
        .nb-root {
          position: sticky;
          top: 0;
          z-index: 300;
          width: 100%;
          height: 60px;
          border-bottom: 1px solid var(--border-color);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        :root:not([data-theme="light"]) .nb-root {
          background: rgba(6, 8, 16, 0.84);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
        }
        [data-theme="light"] .nb-root {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom-color: rgba(15, 23, 42, 0.07);
        }
        .nb-scrolled {
          box-shadow: 0 1px 16px rgba(0,0,0,0.18);
        }
        [data-theme="light"] .nb-scrolled {
          box-shadow: 0 1px 12px rgba(15,23,42,0.09);
        }

        /* ─── Inner layout ─── */
        .nb-inner {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* ─── Logo ─── */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 0.5rem;
        }
        .nb-wordmark {
          display: inline-flex;
          align-items: baseline;
          gap: 0;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        /* 'ipo' parts — small, muted grey */
        .nb-ipo {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: -0.02em;
        }
        /* 'pre' — larger, brand accent colour */
        .nb-pre {
          font-size: 1.15rem;
          font-weight: 900;
          color: rgb(var(--primary-rgb));
          letter-spacing: -0.04em;
        }
        /* '.com' — same size as 'ipo', same muted grey */
        .nb-tld {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0;
        }

        /* ─── Desktop nav ─── */
        .nb-nav {
          display: flex;
          align-items: center;
          gap: 0;
          flex: 1;
        }
        .nb-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 0.85rem;
          border-radius: 7px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: color 0.15s, background 0.15s;
        }
        .nb-link:hover {
          color: var(--text-primary);
          background: var(--spec-bg);
        }
        .nb-link-active {
          color: var(--text-primary);
          font-weight: 700;
        }
        .nb-link-pip {
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 2px;
          border-radius: 99px;
          background: rgb(var(--primary-rgb));
        }

        /* ─── Right controls ─── */
        .nb-controls {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-left: auto;
          flex-shrink: 0;
        }
        .nb-divider {
          width: 1px;
          height: 20px;
          background: var(--border-color);
          margin: 0 0.2rem;
          flex-shrink: 0;
        }

        /* ─── Icon button (generic) ─── */
        .nb-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
          padding: 0;
          font-family: inherit;
        }
        .nb-icon-btn:hover {
          color: var(--text-primary);
          background: var(--spec-bg);
          border-color: var(--spec-border);
        }
        [data-theme="light"] .nb-icon-btn { color: #64748b; }
        [data-theme="light"] .nb-icon-btn:hover { color: #0f172a; background: #f1f5f9; border-color: rgba(15,23,42,0.1); }

        /* ─── Search ─── */
        .nb-search-wrap { position: relative; display: flex; align-items: center; }
        .nb-search-open {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--spec-bg);
          border: 1px solid rgba(var(--primary-rgb), 0.3);
          border-radius: 8px;
          padding: 0 0.75rem;
          height: 34px;
          box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.08);
        }
        .nb-search-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.84rem;
          width: 210px;
          font-family: inherit;
        }
        .nb-search-input::placeholder { color: var(--text-muted); }
        .nb-search-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          padding: 0;
          flex-shrink: 0;
        }
        .nb-search-close:hover { color: var(--text-primary); }

        /* ─── Colour dot ─── */
        .nb-color-dot {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ─── Theme dropdown ─── */
        .nb-theme-wrap { position: relative; }
        .nb-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          z-index: 400;
          min-width: 172px;
          border-radius: 12px;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: 0 12px 36px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12);
        }
        :root:not([data-theme="light"]) .nb-dropdown {
          background: #111520;
          border: 1px solid rgba(255,255,255,0.07);
        }
        [data-theme="light"] .nb-dropdown {
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.09);
          box-shadow: 0 8px 28px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.06);
        }
        .nb-dropdown-label {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          padding: 0.25rem 0.6rem 0.4rem;
        }
        .nb-dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
          padding: 0.45rem 0.6rem;
          border-radius: 7px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.12s;
        }
        .nb-dropdown-item:hover { background: var(--spec-bg); }
        [data-theme="light"] .nb-dropdown-item:hover { background: #f8fafc; }
        .nb-dropdown-item.active { background: var(--spec-bg); }
        .nb-dropdown-item-label { font-size: 0.84rem; font-weight: 500; color: var(--text-primary); }

        /* ─── User chip ─── */
        .nb-user-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.28rem 0.65rem 0.28rem 0.3rem;
          border-radius: 8px;
          background: var(--spec-bg);
          border: 1px solid var(--spec-border);
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          font-family: inherit;
        }
        .nb-user-btn:hover {
          border-color: rgba(var(--primary-rgb), 0.28);
          background: var(--card-bg);
        }
        .nb-avatar {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: linear-gradient(135deg, rgb(var(--primary-rgb)), rgb(var(--primary-light-rgb)));
          color: #fff;
          font-size: 0.75rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nb-user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }
        .nb-user-name { font-size: 0.8rem; font-weight: 600; color: var(--text-primary); }
        .nb-user-badge {
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: rgb(var(--primary-rgb));
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ─── Hamburger ─── */
        .nb-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 34px;
          height: 34px;
          border: 1px solid var(--spec-border);
          border-radius: 8px;
          background: var(--spec-bg);
          cursor: pointer;
          padding: 0 7px;
          flex-shrink: 0;
          transition: border-color 0.15s;
        }
        .nb-hamburger:hover { border-color: rgba(var(--primary-rgb),0.35); }
        .nb-ham-bar {
          display: block;
          height: 1.5px;
          background: var(--text-secondary);
          border-radius: 99px;
          transition: transform 0.22s ease, opacity 0.22s ease;
          transform-origin: center;
        }
        .nb-ham-bar-top-open  { transform: translateY(6.5px) rotate(45deg); }
        .nb-ham-bar-mid-open  { opacity: 0; transform: scaleX(0); }
        .nb-ham-bar-bot-open  { transform: translateY(-6.5px) rotate(-45deg); }

        /* ─── Mobile overlay ─── */
        .nb-overlay {
          position: fixed;
          inset: 0;
          z-index: 298;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }
        [data-theme="light"] .nb-overlay { background: rgba(15,23,42,0.25); }

        /* ─── Mobile drawer ─── */
        .nb-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 299;
          width: 300px;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }
        :root:not([data-theme="light"]) .nb-drawer {
          background: #0d1119;
          border-left: 1px solid rgba(255,255,255,0.06);
        }
        [data-theme="light"] .nb-drawer {
          background: #ffffff;
          border-left: 1px solid rgba(15,23,42,0.08);
          box-shadow: -8px 0 32px rgba(15,23,42,0.1);
        }
        .nb-drawer-open { transform: translateX(0); }

        .nb-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-color);
          flex-shrink: 0;
        }
        .nb-drawer-nav {
          flex: 1;
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .nb-drawer-section-label {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          padding: 0 0.5rem;
          margin-bottom: 0.4rem;
        }
        .nb-drawer-link {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 0.75rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .nb-drawer-link:hover { background: var(--spec-bg); color: var(--text-primary); }
        .nb-drawer-link-active {
          background: rgba(var(--primary-rgb), 0.07);
          color: var(--text-primary);
          font-weight: 700;
          border: 1px solid rgba(var(--primary-rgb), 0.15);
        }
        [data-theme="light"] .nb-drawer-link-active { background: rgba(var(--primary-rgb), 0.06); }

        .nb-drawer-footer {
          border-top: 1px solid var(--border-color);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-shrink: 0;
        }
        .nb-drawer-pref-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nb-drawer-pref-label {
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .nb-pref-toggle {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: 6px;
          background: var(--spec-bg);
          border: 1px solid var(--spec-border);
          color: var(--text-primary);
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
        }
        .nb-pref-toggle:hover { border-color: rgba(var(--primary-rgb),0.35); }

        /* ─── Responsive breakpoints ─── */
        @media (max-width: 1024px) {
          .nb-nav { display: none; }
          .nb-hamburger { display: flex; }
          .nb-user-info { display: none; }
          .nb-user-btn { padding: 0.28rem; gap: 0; }
        }
        @media (max-width: 640px) {
          .nb-inner { padding: 0 1rem; }
          .nb-wordmark { font-size: 1rem; }
          .nb-search-input { width: 160px; }
          .nb-user-btn { display: none; }
        }
        @media (max-width: 400px) {
          .nb-search-open { display: none; }
        }
      `}</style>
    </>
  );
}
