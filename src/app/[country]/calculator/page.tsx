"use client";

import React, { useState, useMemo, useEffect } from "react";
import { BROKERS_DATA } from "@/data/brokersData";

// ─── Types ────────────────────────────────────────────────────────────────────
type CalcId = "sip" | "lumpsum" | "emi" | "fd" | "brokerage" | "ipo" | "cagr" | "ppf";

interface CalcMeta {
  id: CalcId;
  icon: string;
  label: string;
  tag: string;
  color: string;
}

// ─── Calculator registry ──────────────────────────────────────────────────────
const CALCULATORS: CalcMeta[] = [
  { id: "sip",       icon: "📈", label: "SIP Calculator",          tag: "Mutual Fund",   color: "#6366f1" },
  { id: "lumpsum",   icon: "💰", label: "Lump Sum",                tag: "One-time",      color: "#10b981" },
  { id: "emi",       icon: "🏠", label: "EMI Calculator",          tag: "Loan",          color: "#f59e0b" },
  { id: "fd",        icon: "🏦", label: "FD / RD Calculator",      tag: "Fixed Deposit", color: "#0ea5e9" },
  { id: "brokerage", icon: "🏛️", label: "Brokerage & Taxes",       tag: "Trading",       color: "#8b5cf6" },
  { id: "ipo",       icon: "🎲", label: "IPO Allotment",           tag: "Probability",   color: "#ef4444" },
  { id: "cagr",      icon: "📊", label: "CAGR Calculator",         tag: "Growth",        color: "#06b6d4" },
  { id: "ppf",       icon: "🛡️", label: "PPF Calculator",          tag: "Tax-saving",    color: "#84cc16" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number, locale = "en-IN") =>
  Math.round(n).toLocaleString(locale);

function RangeSlider({
  label, value, min, max, step, onChange, display, color = "var(--primary)",
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; display: string; color?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", alignItems: "baseline" }}>
        <span style={{ fontSize: "0.83rem", color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: "1.05rem", fontWeight: 800, color, minWidth: 90, textAlign: "right" }}>{display}</span>
      </div>
      <div style={{ position: "relative", height: 36, display: "flex", alignItems: "center" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: 6,
          background: "var(--spec-border)", borderRadius: 99, overflow: "hidden"
        }}>
          <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.1s" }} />
        </div>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: "100%", accentColor: color, position: "relative", zIndex: 1, background: "transparent", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

function StatBox({ label, value, sub, color = "var(--text-primary)", big = false }: {
  label: string; value: string; sub?: string; color?: string; big?: boolean;
}) {
  return (
    <div style={{
      background: "var(--spec-bg)", border: "1px solid var(--spec-border)",
      borderRadius: 14, padding: "1.1rem 1.25rem",
    }}>
      <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: big ? "1.9rem" : "1.35rem", fontWeight: 900, color, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>{sub}</div>}
    </div>
  );
}

function DonutChart({ invested, returns, color = "#6366f1" }: { invested: number; returns: number; color?: string }) {
  const total = invested + returns;
  if (total <= 0) return null;
  const returnsPct = (returns / total) * 100;
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (returnsPct / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={70} cy={70} r={r} fill="none" stroke="var(--spec-border)" strokeWidth={16} />
        <circle cx={70} cy={70} r={r} fill="none" stroke={color} strokeWidth={16}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 70 70)" style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <text x={70} y={66} textAnchor="middle" fill="var(--text-primary)" fontSize={13} fontWeight={800}>{Math.round(returnsPct)}%</text>
        <text x={70} y={82} textAnchor="middle" fill="var(--text-muted)" fontSize={10}>returns</text>
      </svg>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--spec-border)" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Invested</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Returns</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CalculatorHub() {
  const [activeTab, setActiveTab] = useState<CalcId>("sip");
  const [brokerSlug, setBrokerSlug] = useState("groww");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") as CalcId;
      const broker = params.get("broker");
      if (tab && CALCULATORS.some((c) => c.id === tab)) {
        setActiveTab(tab);
      }
      if (broker && BROKERS_DATA.some((b) => b.slug === broker)) {
        setBrokerSlug(broker);
      }
    }
  }, []);

  // SIP
  const [sipMonthly, setSipMonthly] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // Lump Sum
  const [lsAmount, setLsAmount] = useState(100000);
  const [lsRate, setLsRate] = useState(12);
  const [lsYears, setLsYears] = useState(10);

  // EMI
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [loanRate, setLoanRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  // FD
  const [fdAmount, setFdAmount] = useState(100000);
  const [fdRate, setFdRate] = useState(7.1);
  const [fdYears, setFdYears] = useState(5);
  const [fdCompounding, setFdCompounding] = useState<"quarterly" | "monthly" | "annually">("quarterly");

  // Brokerage
  const [txType, setTxType] = useState<"delivery" | "intraday">("delivery");
  const [buyPrice, setBuyPrice] = useState(1000);
  const [sellPrice, setSellPrice] = useState(1100);
  const [qty, setQty] = useState(100);

  // IPO
  const [subscriptionRate, setSubscriptionRate] = useState(15);
  const [accountsCount, setAccountsCount] = useState(1);

  // CAGR
  const [cagrInitial, setCagrInitial] = useState(10000);
  const [cagrFinal, setCagrFinal] = useState(25000);
  const [cagrYears, setCagrYears] = useState(5);

  // PPF
  const [ppfYearly, setPpfYearly] = useState(150000);
  const [ppfYears, setPpfYears] = useState(15);

  // ─── Computed results ───────────────────────────────────────────────────────
  const sip = useMemo(() => {
    const mr = sipRate / 12 / 100;
    const n = sipYears * 12;
    const invested = sipMonthly * n;
    const total = mr > 0
      ? sipMonthly * (((Math.pow(1 + mr, n) - 1) / mr) * (1 + mr))
      : invested;
    return { invested, total, returns: total - invested };
  }, [sipMonthly, sipRate, sipYears]);

  const lumpsum = useMemo(() => {
    const total = lsAmount * Math.pow(1 + lsRate / 100, lsYears);
    return { invested: lsAmount, total, returns: total - lsAmount };
  }, [lsAmount, lsRate, lsYears]);

  const emi = useMemo(() => {
    const mr = loanRate / 12 / 100;
    const n = loanTenure * 12;
    if (mr === 0) return { emi: loanAmount / n, totalPayable: loanAmount, totalInterest: 0 };
    const e = (loanAmount * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
    return { emi: e, totalPayable: e * n, totalInterest: e * n - loanAmount };
  }, [loanAmount, loanRate, loanTenure]);

  const fd = useMemo(() => {
    const n = fdCompounding === "annually" ? 1 : fdCompounding === "quarterly" ? 4 : 12;
    const total = fdAmount * Math.pow(1 + fdRate / (100 * n), n * fdYears);
    return { invested: fdAmount, total, returns: total - fdAmount };
  }, [fdAmount, fdRate, fdYears, fdCompounding]);

  const brokerage = useMemo(() => {
    const broker = BROKERS_DATA.find((b) => b.slug === brokerSlug) || BROKERS_DATA[0];
    const turnover = (buyPrice + sellPrice) * qty;
    let fee = 0;
    if (txType === "delivery") {
      if (broker.slug === "groww") fee = Math.min(20, turnover * 0.0005);
      else if (["zerodha", "angelone", "robinhood", "trading212"].includes(broker.slug)) fee = 0;
      else if (broker.slug === "ibkr") fee = qty * 0.005;
    } else {
      if (broker.slug === "groww") fee = Math.min(20, turnover * 0.0005);
      else if (["zerodha", "angelone"].includes(broker.slug)) fee = Math.min(20, turnover * 0.0003);
      else if (broker.slug === "ibkr") fee = qty * 0.005;
      else if (["robinhood", "trading212"].includes(broker.slug)) fee = 0;
    }
    const indian = broker.country === "IN";
    const stt = indian
      ? txType === "delivery" ? turnover * 0.001 : sellPrice * qty * 0.00025
      : 0;
    const etf = indian ? turnover * 0.0000322 : (["robinhood", "ibkr"].includes(broker.slug) ? sellPrice * qty * 0.0000278 : 0);
    const stamp = indian
      ? txType === "delivery" ? buyPrice * qty * 0.00015 : buyPrice * qty * 0.00003
      : (broker.slug === "trading212" && txType === "delivery" ? buyPrice * qty * 0.005 : 0);
    const sebi = indian ? turnover * 0.0000001 : 0;
    const dp = indian && txType === "delivery" ? (broker.slug === "angelone" ? 23.6 : 15.93) : 0;
    const gst = indian ? (fee + etf + sebi) * 0.18 : 0;
    const totalCharges = fee + stt + etf + stamp + sebi + dp + gst;
    const raw = (sellPrice - buyPrice) * qty;
    return { fee, stt, gst, stamp, etf, sebi, dp, totalCharges, raw, net: raw - totalCharges, broker };
  }, [brokerSlug, txType, buyPrice, sellPrice, qty]);

  const ipoChance = useMemo(
    () => Math.min(100, (1 - Math.pow(1 - 1 / subscriptionRate, accountsCount)) * 100),
    [subscriptionRate, accountsCount]
  );

  const cagr = useMemo(() => {
    const rate = cagrInitial > 0 && cagrFinal > 0 && cagrYears > 0
      ? (Math.pow(cagrFinal / cagrInitial, 1 / cagrYears) - 1) * 100 : 0;
    return { rate, multiplier: cagrFinal / Math.max(1, cagrInitial) };
  }, [cagrInitial, cagrFinal, cagrYears]);

  const ppf = useMemo(() => {
    // PPF: 7.1% p.a. compounded annually, deposit at start of year
    const r = 0.071;
    let balance = 0;
    for (let y = 0; y < ppfYears; y++) {
      balance = (balance + ppfYearly) * (1 + r);
    }
    const invested = ppfYearly * ppfYears;
    return { invested, total: balance, returns: balance - invested };
  }, [ppfYearly, ppfYears]);

  const activeCalc = CALCULATORS.find((c) => c.id === activeTab)!;

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>

      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(var(--primary-rgb),0.07)", border: "1px solid rgba(var(--primary-rgb),0.18)", borderRadius: 99, padding: "0.3rem 0.85rem", marginBottom: "1rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.05em" }}>8 CALCULATORS</span>
        </div>
        <h1 className="text-gradient-purple" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>
          Financial Calculators Hub
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 560, lineHeight: 1.6 }}>
          Professional-grade tools to plan your SIPs, loans, FDs, IPO bets, and portfolio growth — all in one place.
        </p>
      </header>

      {/* ── Layout ──────────────────────────────────────────────────────────── */}
      <div className="calc-layout">

        {/* ── Sidebar Calculator Nav ──────────────────────────────────────── */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", position: "sticky", top: 88 }}>
          {CALCULATORS.map((c) => {
            const active = activeTab === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.85rem",
                  padding: "0.85rem 1rem", borderRadius: 12, cursor: "pointer",
                  background: active ? `${c.color}14` : "transparent",
                  border: `1px solid ${active ? c.color + "40" : "var(--spec-border)"}`,
                  transition: "all 0.2s", textAlign: "left", width: "100%",
                  boxShadow: active ? `0 4px 16px ${c.color}18` : "none",
                }}
              >
                <span style={{
                  width: 38, height: 38, borderRadius: 10, display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
                  background: active ? `${c.color}20` : "var(--spec-bg)",
                  border: `1px solid ${active ? c.color + "30" : "var(--spec-border)"}`,
                  flexShrink: 0,
                }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: active ? 700 : 500, color: active ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.2 }}>{c.label}</div>
                  <div style={{ fontSize: "0.7rem", color: active ? c.color : "var(--text-muted)", fontWeight: 600, marginTop: 2 }}>{c.tag}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* ── Calculator Panel ─────────────────────────────────────────────── */}
        <div>
          {/* Panel header */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.75rem" }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "1.5rem",
              background: `${activeCalc.color}16`, border: `1px solid ${activeCalc.color}30`,
            }}>{activeCalc.icon}</div>
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0 }}>{activeCalc.label}</h2>
              <span style={{ fontSize: "0.75rem", color: activeCalc.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{activeCalc.tag}</span>
            </div>
          </div>

          {/* ════════ SIP ════════ */}
          {activeTab === "sip" && (
            <div className="calc-grid">
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.75rem" }}>Parameters</h3>
                <RangeSlider label="Monthly SIP Amount" value={sipMonthly} min={500} max={100000} step={500} onChange={setSipMonthly} display={`₹${sipMonthly.toLocaleString("en-IN")}`} color="#6366f1" />
                <RangeSlider label="Expected Return Rate" value={sipRate} min={1} max={30} step={0.5} onChange={setSipRate} display={`${sipRate}% p.a.`} color="#10b981" />
                <RangeSlider label="Investment Period" value={sipYears} min={1} max={40} step={1} onChange={setSipYears} display={`${sipYears} Years`} color="#f59e0b" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
                  <DonutChart invested={sip.invested} returns={sip.returns} color="#6366f1" />
                </div>
                <StatBox label="Total Invested" value={`₹${fmt(sip.invested)}`} color="var(--text-primary)" />
                <StatBox label="Est. Returns" value={`+ ₹${fmt(sip.returns)}`} color="#10b981" />
                <StatBox label="Total Value" value={`₹${fmt(sip.total)}`} big color="#6366f1" sub={`In ${sipYears} years at ${sipRate}% p.a.`} />
              </div>
            </div>
          )}

          {/* ════════ LUMP SUM ════════ */}
          {activeTab === "lumpsum" && (
            <div className="calc-grid">
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.75rem" }}>Parameters</h3>
                <RangeSlider label="One-time Investment" value={lsAmount} min={10000} max={5000000} step={10000} onChange={setLsAmount} display={`₹${lsAmount.toLocaleString("en-IN")}`} color="#10b981" />
                <RangeSlider label="Expected Return Rate" value={lsRate} min={1} max={30} step={0.5} onChange={setLsRate} display={`${lsRate}% p.a.`} color="#6366f1" />
                <RangeSlider label="Investment Period" value={lsYears} min={1} max={40} step={1} onChange={setLsYears} display={`${lsYears} Years`} color="#f59e0b" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
                  <DonutChart invested={lumpsum.invested} returns={lumpsum.returns} color="#10b981" />
                </div>
                <StatBox label="Invested Principal" value={`₹${fmt(lumpsum.invested)}`} />
                <StatBox label="Capital Gains" value={`+ ₹${fmt(lumpsum.returns)}`} color="#10b981" />
                <StatBox label="Total Corpus" value={`₹${fmt(lumpsum.total)}`} big color="#10b981" sub={`${lsYears}yr growth at ${lsRate}% p.a.`} />
              </div>
            </div>
          )}

          {/* ════════ EMI ════════ */}
          {activeTab === "emi" && (
            <div className="calc-grid">
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.75rem" }}>Loan Parameters</h3>
                <RangeSlider label="Loan Amount" value={loanAmount} min={100000} max={10000000} step={100000} onChange={setLoanAmount} display={`₹${loanAmount.toLocaleString("en-IN")}`} color="#f59e0b" />
                <RangeSlider label="Annual Interest Rate" value={loanRate} min={4} max={20} step={0.1} onChange={setLoanRate} display={`${loanRate}% p.a.`} color="#ef4444" />
                <RangeSlider label="Loan Tenure" value={loanTenure} min={1} max={30} step={1} onChange={setLoanTenure} display={`${loanTenure} Years`} color="#f59e0b" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
                  <DonutChart invested={loanAmount} returns={emi.totalInterest} color="#ef4444" />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Monthly EMI</div>
                    <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#f59e0b" }}>₹{fmt(emi.emi)}</div>
                  </div>
                </div>
                <StatBox label="Principal" value={`₹${fmt(loanAmount)}`} />
                <StatBox label="Total Interest" value={`₹${fmt(emi.totalInterest)}`} color="#ef4444" />
                <StatBox label="Total Payable" value={`₹${fmt(emi.totalPayable)}`} big color="#f59e0b" sub={`Over ${loanTenure} years`} />
              </div>
            </div>
          )}

          {/* ════════ FD ════════ */}
          {activeTab === "fd" && (
            <div className="calc-grid">
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.75rem" }}>FD Parameters</h3>
                <RangeSlider label="Deposit Amount" value={fdAmount} min={1000} max={5000000} step={1000} onChange={setFdAmount} display={`₹${fdAmount.toLocaleString("en-IN")}`} color="#0ea5e9" />
                <RangeSlider label="Interest Rate" value={fdRate} min={2} max={10} step={0.1} onChange={setFdRate} display={`${fdRate}% p.a.`} color="#10b981" />
                <RangeSlider label="Tenure" value={fdYears} min={1} max={10} step={1} onChange={setFdYears} display={`${fdYears} Years`} color="#0ea5e9" />
                <div style={{ marginTop: "0.5rem" }}>
                  <label style={{ fontSize: "0.83rem", color: "var(--text-secondary)", fontWeight: 500, marginBottom: "0.5rem", display: "block" }}>Compounding Frequency</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {(["quarterly", "monthly", "annually"] as const).map((f) => (
                      <button key={f} onClick={() => setFdCompounding(f)}
                        style={{ flex: 1, padding: "0.45rem", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", border: `1px solid ${fdCompounding === f ? "#0ea5e9" : "var(--spec-border)"}`, background: fdCompounding === f ? "#0ea5e914" : "var(--spec-bg)", color: fdCompounding === f ? "#0ea5e9" : "var(--text-secondary)", transition: "all 0.2s" }}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <DonutChart invested={fd.invested} returns={fd.returns} color="#0ea5e9" />
                </div>
                <StatBox label="Principal Deposited" value={`₹${fmt(fd.invested)}`} />
                <StatBox label="Interest Earned" value={`+ ₹${fmt(fd.returns)}`} color="#0ea5e9" />
                <StatBox label="Maturity Amount" value={`₹${fmt(fd.total)}`} big color="#0ea5e9" sub={`${fdCompounding} compounding`} />
              </div>
            </div>
          )}

          {/* ════════ BROKERAGE ════════ */}
          {activeTab === "brokerage" && (
            <div className="calc-grid">
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>Transaction Details</h3>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ fontSize: "0.83rem", color: "var(--text-secondary)", fontWeight: 500, marginBottom: "0.5rem", display: "block" }}>Select Broker</label>
                  <select value={brokerSlug} onChange={(e) => setBrokerSlug(e.target.value)} className="input-field">
                    {BROKERS_DATA.map((b) => <option key={b.slug} value={b.slug}>{b.name} ({b.countryName})</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem" }}>
                  {(["delivery", "intraday"] as const).map((t) => (
                    <button key={t} onClick={() => setTxType(t)}
                      style={{ flex: 1, padding: "0.55rem", borderRadius: 9, fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", border: `1px solid ${txType === t ? "#8b5cf6" : "var(--spec-border)"}`, background: txType === t ? "#8b5cf614" : "var(--spec-bg)", color: txType === t ? "#8b5cf6" : "var(--text-secondary)", transition: "all 0.2s" }}>
                      {t === "delivery" ? "📦 Delivery" : "⚡ Intraday"}
                    </button>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                  {([["Buy Price", buyPrice, setBuyPrice], ["Sell Price", sellPrice, setSellPrice], ["Quantity", qty, setQty]] as [string, number, (v: number) => void][]).map(([l, v, s]) => (
                    <div key={l}>
                      <label style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500, marginBottom: "0.35rem", display: "block" }}>{l}</label>
                      <input type="number" value={v} onChange={(e) => s(Number(e.target.value))} className="input-field" style={{ padding: "0.6rem 0.75rem", fontSize: "0.9rem" }} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div className="card" style={{ padding: "1.25rem", textAlign: "center", background: brokerage.net >= 0 ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)", border: `1px solid ${brokerage.net >= 0 ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}` }}>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Net P&L</div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: brokerage.net >= 0 ? "#10b981" : "#ef4444" }}>
                    {brokerage.net >= 0 ? "+" : ""}{fmt(brokerage.net)}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                    Gross: {fmt(brokerage.raw)} · Charges: {brokerage.totalCharges.toFixed(2)}
                  </div>
                </div>
                <div className="card" style={{ padding: "1.25rem" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.85rem" }}>Charges Breakdown</div>
                  {([
                    ["Brokerage", brokerage.fee],
                    ["STT / Transaction Tax", brokerage.stt],
                    ["GST (18%)", brokerage.gst],
                    ["Stamp Duty", brokerage.stamp],
                    ["Exchange / Regulatory Fees", brokerage.etf],
                    ["SEBI Turnover Fee", brokerage.sebi],
                    ["DP Charges", brokerage.dp],
                  ] as [string, number][]).map(([l, v]) => v > 0 ? (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid var(--spec-border)", fontSize: "0.82rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>{l}</span>
                      <strong style={{ color: "var(--text-primary)" }}>{v.toFixed(2)}</strong>
                    </div>
                  ) : null)}
                </div>
              </div>
            </div>
          )}

          {/* ════════ IPO ════════ */}
          {activeTab === "ipo" && (
            <div className="calc-grid">
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.75rem" }}>Allotment Parameters</h3>
                <RangeSlider label="Oversubscription Rate" value={subscriptionRate} min={2} max={200} step={1} onChange={setSubscriptionRate} display={`${subscriptionRate}x`} color="#ef4444" />
                <RangeSlider label="Demat Accounts Applied" value={accountsCount} min={1} max={8} step={1} onChange={setAccountsCount} display={`${accountsCount} Account${accountsCount > 1 ? "s" : ""}`} color="#8b5cf6" />
                <div style={{ background: "rgba(var(--primary-rgb),0.04)", border: "1px solid rgba(var(--primary-rgb),0.14)", borderRadius: 12, padding: "1rem", marginTop: "1rem" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.4rem" }}>💡 Strategy Tip</div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    Applying for multiple lots from a single demat does <strong>not</strong> improve lottery chances. Apply for <strong>1 lot each</strong> from multiple family PANs to maximise probability.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Allotment Probability</div>
                  <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 160, height: 160 }}>
                    <svg width={160} height={160} viewBox="0 0 160 160" style={{ position: "absolute" }}>
                      <circle cx={80} cy={80} r={68} fill="none" stroke="var(--spec-border)" strokeWidth={14} />
                      <circle cx={80} cy={80} r={68} fill="none"
                        stroke={ipoChance > 50 ? "#10b981" : ipoChance > 20 ? "#f59e0b" : "#ef4444"}
                        strokeWidth={14} strokeLinecap="round"
                        strokeDasharray={`${(ipoChance / 100) * 2 * Math.PI * 68} ${2 * Math.PI * 68}`}
                        transform="rotate(-90 80 80)"
                        style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)" }}
                      />
                    </svg>
                    <div>
                      <div style={{ fontSize: "2.4rem", fontWeight: 900, color: ipoChance > 50 ? "#10b981" : ipoChance > 20 ? "#f59e0b" : "#ef4444" }}>
                        {ipoChance.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "1rem" }}>
                    {ipoChance > 70 ? "🟢 High chance of allotment" : ipoChance > 30 ? "🟡 Moderate — apply from more accounts" : "🔴 Low probability — IPO is heavily oversubscribed"}
                  </div>
                </div>
                {[1, 2, 3, 4, 5, 6].map((n) => {
                  const p = Math.min(100, (1 - Math.pow(1 - 1 / subscriptionRate, n)) * 100);
                  return (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", width: 70, flexShrink: 0 }}>{n} account{n > 1 ? "s" : ""}</span>
                      <div style={{ flex: 1, height: 8, background: "var(--spec-border)", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${p}%`, height: "100%", background: p > 50 ? "#10b981" : p > 25 ? "#f59e0b" : "#ef4444", borderRadius: 99, transition: "width 0.4s" }} />
                      </div>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-primary)", width: 48, textAlign: "right" }}>{p.toFixed(1)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════ CAGR ════════ */}
          {activeTab === "cagr" && (
            <div className="calc-grid">
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>Growth Variables</h3>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ fontSize: "0.83rem", color: "var(--text-secondary)", fontWeight: 500, marginBottom: "0.5rem", display: "block" }}>Initial Investment</label>
                  <input type="number" value={cagrInitial} onChange={(e) => setCagrInitial(Number(e.target.value))} className="input-field" />
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ fontSize: "0.83rem", color: "var(--text-secondary)", fontWeight: 500, marginBottom: "0.5rem", display: "block" }}>Final Value</label>
                  <input type="number" value={cagrFinal} onChange={(e) => setCagrFinal(Number(e.target.value))} className="input-field" />
                </div>
                <RangeSlider label="Duration" value={cagrYears} min={1} max={30} step={1} onChange={setCagrYears} display={`${cagrYears} Years`} color="#06b6d4" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Compound Annual Growth Rate</div>
                  <div style={{ fontSize: "4rem", fontWeight: 900, color: "#06b6d4", lineHeight: 1 }}>{cagr.rate.toFixed(2)}%</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.75rem" }}>
                    Total Multiplier: <strong style={{ color: "var(--text-primary)" }}>{cagr.multiplier.toFixed(2)}x</strong>
                  </div>
                </div>
                <StatBox label="Starting Value" value={`₹${fmt(cagrInitial)}`} />
                <StatBox label="Ending Value" value={`₹${fmt(cagrFinal)}`} color="#06b6d4" />
                <StatBox label="Total Gain" value={`₹${fmt(cagrFinal - cagrInitial)}`} big color={cagrFinal >= cagrInitial ? "#10b981" : "#ef4444"} sub={`Over ${cagrYears} years`} />
              </div>
            </div>
          )}

          {/* ════════ PPF ════════ */}
          {activeTab === "ppf" && (
            <div className="calc-grid">
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1.75rem" }}>PPF Parameters</h3>
                <div style={{ background: "rgba(132,204,22,0.07)", border: "1px solid rgba(132,204,22,0.2)", borderRadius: 10, padding: "0.85rem", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#84cc16", marginBottom: 2 }}>🛡️ Tax Benefits</div>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>PPF qualifies under EEE status — contributions, interest, and withdrawals are all tax-exempt. Current interest rate: <strong>7.1% p.a.</strong></p>
                </div>
                <RangeSlider label="Yearly Contribution" value={ppfYearly} min={500} max={150000} step={500} onChange={setPpfYearly} display={`₹${ppfYearly.toLocaleString("en-IN")}`} color="#84cc16" />
                <RangeSlider label="Investment Period" value={ppfYears} min={15} max={50} step={1} onChange={setPpfYears} display={`${ppfYears} Years`} color="#10b981" />
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Min lock-in: 15 years. Annual limit: ₹1,50,000</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <DonutChart invested={ppf.invested} returns={ppf.returns} color="#84cc16" />
                </div>
                <StatBox label="Total Contributions" value={`₹${fmt(ppf.invested)}`} />
                <StatBox label="Tax-Free Interest" value={`+ ₹${fmt(ppf.returns)}`} color="#84cc16" />
                <StatBox label="Maturity Value" value={`₹${fmt(ppf.total)}`} big color="#84cc16" sub={`At 7.1% EEE — fully tax-free`} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
