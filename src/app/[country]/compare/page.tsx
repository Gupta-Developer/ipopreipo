"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BROKERS_DATA } from "@/data/brokersData";
import { CRYPTO_APPS_DATA } from "@/data/cryptoAppsData";
import { PAYMENT_APPS_DATA } from "@/data/paymentAppsData";
import { CREDIT_CARDS_CATALOG } from "@/data/cardsData";
import { BANKS_DATA } from "@/data/banksData";

type Category = "brokers" | "crypto" | "payments" | "cards" | "banks";

const COUNTRIES = [
  { code: "all", name: "🌍 All Countries" },
  { code: "IN", name: "🇮🇳 India" },
  { code: "US", name: "🇺🇸 United States" },
  { code: "UK", name: "🇬🇧 United Kingdom" },
  { code: "SG", name: "🇸🇬 Singapore" }
];

const isFromCountry = (item: any, countryCode: string) => {
  if (countryCode === "all") return true;
  
  const itemCountry = (item.country || "").toUpperCase();
  const itemCountrySlug = (item.countrySlug || "").toUpperCase();
  
  if (countryCode === "IN") {
    return itemCountry === "IN" || itemCountry === "INDIA" || itemCountrySlug === "INDIA";
  }
  if (countryCode === "US") {
    return itemCountry === "US" || itemCountry === "UNITED STATES" || itemCountrySlug === "UNITED-STATES";
  }
  if (countryCode === "UK") {
    return itemCountry === "UK" || itemCountry === "UNITED KINGDOM" || itemCountrySlug === "UNITED-KINGDOM";
  }
  if (countryCode === "SG") {
    return itemCountry === "SG" || itemCountry === "SINGAPORE" || itemCountrySlug === "SINGAPORE";
  }
  return false;
};

export default function ComparePage() {
  const [category, setCategory] = useState<Category>("brokers");
  const [country, setCountry] = useState<string>("all");
  const [item1Id, setItem1Id] = useState<string>("");
  const [item2Id, setItem2Id] = useState<string>("");

  // Select defaults on category or country change
  useEffect(() => {
    let items: any[] = [];
    if (category === "brokers") {
      items = BROKERS_DATA.filter(x => isFromCountry(x, country));
    } else if (category === "crypto") {
      items = CRYPTO_APPS_DATA.filter(x => isFromCountry(x, country));
    } else if (category === "payments") {
      items = PAYMENT_APPS_DATA.filter(x => isFromCountry(x, country));
    } else if (category === "cards") {
      items = CREDIT_CARDS_CATALOG.filter(x => isFromCountry(x, country));
    } else if (category === "banks") {
      items = BANKS_DATA.filter(x => isFromCountry(x, country));
    }

    if (items.length > 0) {
      setItem1Id(items[0]?.slug || "");
      setItem2Id(items[1]?.slug || items[0]?.slug || "");
    } else {
      setItem1Id("");
      setItem2Id("");
    }
  }, [category, country]);

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
  };

  // Extract selected items details
  const getSelectedItems = () => {
    if (category === "brokers") {
      const i1 = BROKERS_DATA.find((x) => x.slug === item1Id);
      const i2 = BROKERS_DATA.find((x) => x.slug === item2Id);
      return { i1, i2 };
    }
    if (category === "crypto") {
      const i1 = CRYPTO_APPS_DATA.find((x) => x.slug === item1Id);
      const i2 = CRYPTO_APPS_DATA.find((x) => x.slug === item2Id);
      return { i1, i2 };
    }
    if (category === "payments") {
      const i1 = PAYMENT_APPS_DATA.find((x) => x.slug === item1Id);
      const i2 = PAYMENT_APPS_DATA.find((x) => x.slug === item2Id);
      return { i1, i2 };
    }
    if (category === "cards") {
      const i1 = CREDIT_CARDS_CATALOG.find((x) => x.slug === item1Id);
      const i2 = CREDIT_CARDS_CATALOG.find((x) => x.slug === item2Id);
      return { i1, i2 };
    }
    if (category === "banks") {
      const i1 = BANKS_DATA.find((x) => x.slug === item1Id);
      const i2 = BANKS_DATA.find((x) => x.slug === item2Id);
      return { i1, i2 };
    }
    return { i1: null, i2: null };
  };

  const { i1, i2 } = getSelectedItems();

  // Helper to render comparative table rows
  const renderComparisonTable = () => {
    if (!i1 || !i2) return null;

    if (category === "brokers") {
      const b1 = i1 as typeof BROKERS_DATA[0];
      const b2 = i2 as typeof BROKERS_DATA[0];
      return (
        <tbody style={{ fontSize: "0.9rem" }}>
          <tr>
            <td><strong>Rating</strong></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {b1.rating}</span></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {b2.rating}</span></td>
          </tr>
          <tr>
            <td><strong>Broker Type</strong></td>
            <td><span className="badge badge-primary">{b1.type}</span></td>
            <td><span className="badge badge-primary">{b2.type}</span></td>
          </tr>
          <tr>
            <td><strong>Depository Support</strong></td>
            <td>{b1.depository}</td>
            <td>{b2.depository}</td>
          </tr>
          <tr>
            <td><strong>Active Client Base</strong></td>
            <td>{b1.activeClients}</td>
            <td>{b2.activeClients}</td>
          </tr>
          <tr>
            <td><strong>Account Opening Charge</strong></td>
            <td style={{ fontWeight: 600 }}>{b1.charges.opening}</td>
            <td style={{ fontWeight: 600 }}>{b2.charges.opening}</td>
          </tr>
          <tr>
            <td><strong>Account AMC</strong></td>
            <td style={{ fontWeight: 600 }}>{b1.charges.amc}</td>
            <td style={{ fontWeight: 600 }}>{b2.charges.amc}</td>
          </tr>
          <tr>
            <td><strong>Equity Delivery Brokerage</strong></td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{b1.brokerage.delivery}</td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{b2.brokerage.delivery}</td>
          </tr>
          <tr>
            <td><strong>Equity Intraday Brokerage</strong></td>
            <td style={{ color: "var(--warning)", fontWeight: 700 }}>{b1.brokerage.intraday}</td>
            <td style={{ color: "var(--warning)", fontWeight: 700 }}>{b2.brokerage.intraday}</td>
          </tr>
          <tr>
            <td><strong>Commodity / Currency</strong></td>
            <td>{b1.segments.commodity ? "✓ Commodity" : "×"} • {b1.segments.currency ? "✓ Currency" : "×"}</td>
            <td>{b2.segments.commodity ? "✓ Commodity" : "×"} • {b2.segments.currency ? "✓ Currency" : "×"}</td>
          </tr>
          <tr>
            <td><strong>Futures & Options</strong></td>
            <td>{b1.segments.futures ? "✓ Futures" : "×"} • {b1.segments.options ? "✓ Options" : "×"}</td>
            <td>{b2.segments.futures ? "✓ Futures" : "×"} • {b2.segments.options ? "✓ Options" : "×"}</td>
          </tr>
          <tr>
            <td><strong>Key Advantages</strong></td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {b1.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {b2.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
          </tr>
        </tbody>
      );
    }

    if (category === "crypto") {
      const c1 = i1 as typeof CRYPTO_APPS_DATA[0];
      const c2 = i2 as typeof CRYPTO_APPS_DATA[0];
      return (
        <tbody style={{ fontSize: "0.9rem" }}>
          <tr>
            <td><strong>Rating</strong></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {c1.rating}</span></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {c2.rating}</span></td>
          </tr>
          <tr>
            <td><strong>App Type</strong></td>
            <td><span className="badge badge-primary">{c1.type}</span></td>
            <td><span className="badge badge-primary">{c2.type}</span></td>
          </tr>
          <tr>
            <td><strong>Maker / Taker Fees</strong></td>
            <td style={{ fontWeight: 600 }}>{c1.charges.makerFee} / {c1.charges.takerFee}</td>
            <td style={{ fontWeight: 600 }}>{c2.charges.makerFee} / {c2.charges.takerFee}</td>
          </tr>
          <tr>
            <td><strong>Withdrawal Fee</strong></td>
            <td>{c1.charges.withdrawalFee}</td>
            <td>{c2.charges.withdrawalFee}</td>
          </tr>
          <tr>
            <td><strong>Minimum Deposit</strong></td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{c1.limits.minimumDeposit}</td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{c2.limits.minimumDeposit}</td>
          </tr>
          <tr>
            <td><strong>Daily Withdrawal limit</strong></td>
            <td>{c1.limits.dailyWithdrawal}</td>
            <td>{c2.limits.dailyWithdrawal}</td>
          </tr>
          <tr>
            <td><strong>Trading features</strong></td>
            <td>
              Spot: {c1.features.spotTrading ? "✓" : "×"} • Futures: {c1.features.futuresTrading ? "✓" : "×"}
            </td>
            <td>
              Spot: {c2.features.spotTrading ? "✓" : "×"} • Futures: {c2.features.futuresTrading ? "✓" : "×"}
            </td>
          </tr>
          <tr>
            <td><strong>Staking & Wallet support</strong></td>
            <td>
              Staking: {c1.features.staking ? "✓" : "×"} • Wallet: {c1.features.wallet ? "✓" : "×"}
            </td>
            <td>
              Staking: {c2.features.staking ? "✓" : "×"} • Wallet: {c2.features.wallet ? "✓" : "×"}
            </td>
          </tr>
          <tr>
            <td><strong>Supported Ecosystems</strong></td>
            <td>{c1.platforms.join(", ")}</td>
            <td>{c2.platforms.join(", ")}</td>
          </tr>
          <tr>
            <td><strong>Key Advantages</strong></td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {c1.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {c2.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
          </tr>
        </tbody>
      );
    }

    if (category === "payments") {
      const p1 = i1 as typeof PAYMENT_APPS_DATA[0];
      const p2 = i2 as typeof PAYMENT_APPS_DATA[0];
      return (
        <tbody style={{ fontSize: "0.9rem" }}>
          <tr>
            <td><strong>Rating</strong></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {p1.rating}</span></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {p2.rating}</span></td>
          </tr>
          <tr>
            <td><strong>App Type</strong></td>
            <td><span className="badge badge-primary">{p1.type}</span></td>
            <td><span className="badge badge-primary">{p2.type}</span></td>
          </tr>
          <tr>
            <td><strong>Daily Transaction Limit</strong></td>
            <td style={{ fontWeight: 600 }}>{p1.limits.dailyLimit}</td>
            <td style={{ fontWeight: 600 }}>{p2.limits.dailyLimit}</td>
          </tr>
          <tr>
            <td><strong>Per Transaction Limit</strong></td>
            <td>{p1.limits.transactionLimit}</td>
            <td>{p2.limits.transactionLimit}</td>
          </tr>
          <tr>
            <td><strong>Wallet Loading Fee</strong></td>
            <td style={{ color: "var(--warning)", fontWeight: 700 }}>{p1.charges.walletLoading}</td>
            <td style={{ color: "var(--warning)", fontWeight: 700 }}>{p2.charges.walletLoading}</td>
          </tr>
          <tr>
            <td><strong>Bank Outgoing Transfer Fee</strong></td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{p1.charges.bankTransfer}</td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{p2.charges.bankTransfer}</td>
          </tr>
          <tr>
            <td><strong>UPI / Wallet Support</strong></td>
            <td>
              UPI: {p1.features.upi ? "✓" : "×"} • Wallet: {p1.features.wallet ? "✓" : "×"}
            </td>
            <td>
              UPI: {p2.features.upi ? "✓" : "×"} • Wallet: {p2.features.wallet ? "✓" : "×"}
            </td>
          </tr>
          <tr>
            <td><strong>Card Payments & FX support</strong></td>
            <td>
              Cards: {p1.features.cards ? "✓" : "×"} • FX: {p1.features.international ? "✓" : "×"}
            </td>
            <td>
              Cards: {p2.features.cards ? "✓" : "×"} • FX: {p2.features.international ? "✓" : "×"}
            </td>
          </tr>
          <tr>
            <td><strong>Key Advantages</strong></td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {p1.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {p2.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
          </tr>
        </tbody>
      );
    }

    if (category === "cards") {
      const d1 = i1 as typeof CREDIT_CARDS_CATALOG[0];
      const d2 = i2 as typeof CREDIT_CARDS_CATALOG[0];
      return (
        <tbody style={{ fontSize: "0.9rem" }}>
          <tr>
            <td><strong>Overall Rating</strong></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {d1.overallRating}</span></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {d2.overallRating}</span></td>
          </tr>
          <tr>
            <td><strong>Card Category</strong></td>
            <td><span className="badge badge-primary">{d1.type}</span></td>
            <td><span className="badge badge-primary">{d2.type}</span></td>
          </tr>
          <tr>
            <td><strong>Best For</strong></td>
            <td><strong>{d1.bestFor}</strong></td>
            <td><strong>{d2.bestFor}</strong></td>
          </tr>
          <tr>
            <td><strong>Issuer / Network</strong></td>
            <td>{d1.issuer} ({d1.network})</td>
            <td>{d2.issuer} ({d2.network})</td>
          </tr>
          <tr>
            <td><strong>Reward Points / Rate</strong></td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{d1.fees.rewardPointValue}</td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{d2.fees.rewardPointValue}</td>
          </tr>
          <tr>
            <td><strong>Joining Fee</strong></td>
            <td style={{ fontWeight: 600 }}>{d1.fees.joiningFee}</td>
            <td style={{ fontWeight: 600 }}>{d2.fees.joiningFee}</td>
          </tr>
          <tr>
            <td><strong>Annual Renewal Fee</strong></td>
            <td style={{ fontWeight: 600 }}>{d1.fees.annualFee}</td>
            <td style={{ fontWeight: 600 }}>{d2.fees.annualFee}</td>
          </tr>
          <tr>
            <td><strong>APR Interest Rate</strong></td>
            <td style={{ color: "var(--danger)", fontWeight: 600 }}>{d1.fees.apr}</td>
            <td style={{ color: "var(--danger)", fontWeight: 600 }}>{d2.fees.apr}</td>
          </tr>
          <tr>
            <td><strong>Welcome Bonus & Travel perks</strong></td>
            <td>
              Bonus: {d1.featuresChecklist.welcomeBonus ? "✓" : "×"} • Travel: {d1.featuresChecklist.travel ? "✓" : "×"}
            </td>
            <td>
              Bonus: {d2.featuresChecklist.welcomeBonus ? "✓" : "×"} • Travel: {d2.featuresChecklist.travel ? "✓" : "×"}
            </td>
          </tr>
          <tr>
            <td><strong>Key Advantages</strong></td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {d1.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {d2.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
          </tr>
        </tbody>
      );
    }

    if (category === "banks") {
      const b1 = i1 as typeof BANKS_DATA[0];
      const b2 = i2 as typeof BANKS_DATA[0];
      return (
        <tbody style={{ fontSize: "0.9rem" }}>
          <tr>
            <td><strong>Rating</strong></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {b1.rating}</span></td>
            <td><span style={{ color: "var(--warning)", fontWeight: "bold" }}>★ {b2.rating}</span></td>
          </tr>
          <tr>
            <td><strong>Account Type</strong></td>
            <td><span className="badge badge-primary">{b1.type}</span></td>
            <td><span className="badge badge-primary">{b2.type}</span></td>
          </tr>
          <tr>
            <td><strong>Interest Rate</strong></td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{b1.interestRate}</td>
            <td style={{ color: "var(--success)", fontWeight: 700 }}>{b2.interestRate}</td>
          </tr>
          <tr>
            <td><strong>Minimum Balance</strong></td>
            <td style={{ fontWeight: 600 }}>{b1.charges.minimumBalance}</td>
            <td style={{ fontWeight: 600 }}>{b2.charges.minimumBalance}</td>
          </tr>
          <tr>
            <td><strong>Monthly Maintenance Fee</strong></td>
            <td style={{ fontWeight: 600 }}>{b1.charges.maintenanceFee}</td>
            <td style={{ fontWeight: 600 }}>{b2.charges.maintenanceFee}</td>
          </tr>
          <tr>
            <td><strong>ATM Withdrawal Fee</strong></td>
            <td>{b1.charges.atmWithdrawal}</td>
            <td>{b2.charges.atmWithdrawal}</td>
          </tr>
          <tr>
            <td><strong>Foreign Exchange markup</strong></td>
            <td>{b1.charges.foreignExchange}</td>
            <td>{b2.charges.foreignExchange}</td>
          </tr>
          <tr>
            <td><strong>Digital Onboarding & App</strong></td>
            <td>
              Digital: {b1.features.digitalOnboarding ? "✓" : "×"} • App: {b1.features.mobileApp ? "✓" : "×"}
            </td>
            <td>
              Digital: {b2.features.digitalOnboarding ? "✓" : "×"} • App: {b2.features.mobileApp ? "✓" : "×"}
            </td>
          </tr>
          <tr>
            <td><strong>Zero Balance & High Yield</strong></td>
            <td>
              Zero Bal: {b1.features.zeroBalance ? "✓" : "×"} • High Yield: {b1.features.highInterest ? "✓" : "×"}
            </td>
            <td>
              Zero Bal: {b2.features.zeroBalance ? "✓" : "×"} • High Yield: {b2.features.highInterest ? "✓" : "×"}
            </td>
          </tr>
          <tr>
            <td><strong>Key Advantages</strong></td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {b1.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
            <td>
              <ul style={{ paddingLeft: "1rem", margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {b2.pros.slice(0, 3).map((p, index) => <li key={index}>{p}</li>)}
              </ul>
            </td>
          </tr>
        </tbody>
      );
    }
    return null;
  };

  // Get option lists
  const getItemList = () => {
    let rawList: any[] = [];
    if (category === "brokers") rawList = BROKERS_DATA;
    if (category === "crypto") rawList = CRYPTO_APPS_DATA;
    if (category === "payments") rawList = PAYMENT_APPS_DATA;
    if (category === "cards") rawList = CREDIT_CARDS_CATALOG;
    if (category === "banks") rawList = BANKS_DATA;

    return rawList
      .filter((x) => isFromCountry(x, country))
      .map((x) => ({
        slug: x.slug,
        name: `${x.name} (${x.countryName || x.country})`
      }));
  };

  const listOptions = getItemList();

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      
      <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <h1 className="text-gradient-purple" style={{ fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.04em" }}>
          Compare Directory Products
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "1.05rem" }}>
          Select a category and country, then compare two items side-by-side to review fees, limits, checklists, and pros/cons.
        </p>
      </header>

      {/* Category selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {(["brokers", "crypto", "payments", "cards", "banks"] as Category[]).map((cat) => {
          const isActive = category === cat;
          const label = cat === "brokers" ? "💼 Stock Brokers" : cat === "crypto" ? "🪙 Crypto Apps" : cat === "payments" ? "📱 Payment Apps" : cat === "cards" ? "💳 Credit Cards" : "🏦 Bank Accounts";
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className="btn"
              style={{
                background: isActive ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
                borderColor: isActive ? "var(--primary)" : "rgba(255,255,255,0.06)",
                borderStyle: "solid",
                borderWidth: "1px",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "0.6rem 1.5rem",
                fontSize: "0.85rem",
                borderRadius: "99px",
                fontWeight: isActive ? "700" : "500",
                boxShadow: isActive ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
                cursor: "pointer"
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Country selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.85rem", flexWrap: "wrap", marginBottom: "3rem" }}>
        {COUNTRIES.map((c) => {
          const isActive = country === c.code;
          return (
            <button
              key={c.code}
              onClick={() => setCountry(c.code)}
              className="btn"
              style={{
                background: isActive ? "rgba(var(--primary-rgb), 0.08)" : "rgba(255,255,255,0.01)",
                borderColor: isActive ? "var(--primary)" : "rgba(255,255,255,0.06)",
                borderStyle: "solid",
                borderWidth: "1px",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "0.5rem 1.25rem",
                fontSize: "0.8rem",
                borderRadius: "99px",
                fontWeight: isActive ? "700" : "500",
                boxShadow: isActive ? "0 0 15px rgba(var(--primary-rgb), 0.15)" : "none",
                cursor: "pointer"
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Select products row */}
      <div className="card m-flex-column" style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "space-around", padding: "2rem", marginBottom: "3rem" }}>
        
        {/* Dropdown 1 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase" }}>Compare Product 1</label>
          <select
            value={item1Id}
            onChange={(e) => setItem1Id(e.target.value)}
            className="input-field"
            style={{ width: "100%", cursor: "pointer" }}
            disabled={listOptions.length === 0}
          >
            {listOptions.length === 0 ? (
              <option value="">No products available</option>
            ) : (
              listOptions.map((opt) => (
                <option key={opt.slug} value={opt.slug} disabled={opt.slug === item2Id}>
                  {opt.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* VS Indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "center", width: "45px", height: "45px", borderRadius: "50%", background: "rgba(var(--primary-rgb), 0.1)", border: "1px solid rgba(var(--primary-rgb), 0.2)", color: "var(--primary)", fontWeight: "bold", fontSize: "0.9rem" }}>
          VS
        </div>

        {/* Dropdown 2 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase" }}>Compare Product 2</label>
          <select
            value={item2Id}
            onChange={(e) => setItem2Id(e.target.value)}
            className="input-field"
            style={{ width: "100%", cursor: "pointer" }}
            disabled={listOptions.length === 0}
          >
            {listOptions.length === 0 ? (
              <option value="">No products available</option>
            ) : (
              listOptions.map((opt) => (
                <option key={opt.slug} value={opt.slug} disabled={opt.slug === item1Id}>
                  {opt.name}
                </option>
              ))
            )}
          </select>
        </div>

      </div>

      {/* Comparison Grid View */}
      {listOptions.length < 2 ? (
        <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚠️</div>
          <p>Not enough products available in this category for the selected country to perform a side-by-side comparison.</p>
        </div>
      ) : i1 && i2 ? (
        <div className="card" style={{ padding: "0", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)", background: "rgba(255, 255, 255, 0.015)" }}>
                <th style={{ padding: "1.5rem", width: "30%", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Parameters Compare</th>
                <th style={{ padding: "1.5rem", width: "35%", fontSize: "1.1rem", fontWeight: 800 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ display: "inline-flex", width: "24px", height: "24px", borderRadius: "5px", background: `rgba(var(--primary-rgb), 0.08)`, border: "1px solid rgba(var(--primary-rgb), 0.15)", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", color: "var(--primary)", fontWeight: "bold" }}>
                      {('logoLetter' in i1 ? i1.logoLetter : '') || i1.name.charAt(0)}
                    </span>
                    {i1.name}
                  </div>
                </th>
                <th style={{ padding: "1.5rem", width: "35%", fontSize: "1.1rem", fontWeight: 800 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ display: "inline-flex", width: "24px", height: "24px", borderRadius: "5px", background: `rgba(var(--primary-rgb), 0.08)`, border: "1px solid rgba(var(--primary-rgb), 0.15)", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", color: "var(--primary)", fontWeight: "bold" }}>
                      {('logoLetter' in i2 ? i2.logoLetter : '') || i2.name.charAt(0)}
                    </span>
                    {i2.name}
                  </div>
                </th>
              </tr>
            </thead>
            {renderComparisonTable()}
          </table>
        </div>
      ) : (
        <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
          Select products above to begin comparison.
        </div>
      )}

      {/* Scoped CSS Table styling overrides */}
      <style>{`
        table td, table th {
          padding: 1.25rem 1.5rem !important;
          border-bottom: 1px solid var(--border-color);
          vertical-align: top;
        }
        table tr:last-child td {
          border-bottom: none;
        }
        table tbody tr:hover {
          background: rgba(255, 255, 255, 0.01);
        }
        [data-theme="light"] table tbody tr:hover {
          background: #fafcff;
        }
      `}</style>

    </div>
  );
}
