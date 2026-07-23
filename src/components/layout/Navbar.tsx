"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Sparkles, 
  Percent, 
  Briefcase,
  CreditCard,
  Smartphone,
  Building2,
  Menu,
  X
} from "lucide-react";
import { MOCK_IPOS } from "@/data/mockIpos";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeIpos = MOCK_IPOS.filter((i) => i.status === "live" || i.gmp > 0);

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-white border-b border-slate-200 shadow-sm">
      {/* Top Ticker Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 border-b border-slate-800 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2">
          <span className="shrink-0 flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE GMP TICKER:
          </span>

          <div className="overflow-hidden relative w-full flex items-center">
            <div className="animate-ticker flex items-center gap-8 text-[11px]">
              {activeIpos.map((ipo) => (
                <Link
                  key={ipo.id}
                  href={`/ipo/${ipo.slug}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="font-semibold text-slate-100">{ipo.name}</span>
                  <span className="text-emerald-400 font-bold">
                    GMP: +₹{ipo.gmp} (+{ipo.gmpPercent.toFixed(1)}%)
                  </span>
                  <span className="text-slate-400">| Sub: {ipo.totalSubscription}x</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Clean Corporate Navigation */}
      <nav className="max-w-7xl mx-auto w-full px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center text-white shadow-sm">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5">
              <span className="font-black text-xl tracking-tight text-slate-900 font-sans">
                IPO<span className="text-blue-700">PREIPO</span>
              </span>
              <span className="text-xs text-blue-700 font-bold">.com</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">
              Financial Intelligence &amp; Pre-IPO Desk
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 font-semibold text-xs text-slate-700">
          <Link
            href="/"
            className="px-2.5 py-2 rounded-md hover:bg-slate-100 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            IPOs
          </Link>

          <Link
            href="/pre-ipo"
            className="px-2.5 py-2 rounded-md hover:bg-amber-50 hover:text-amber-800 text-amber-700 font-bold transition-colors flex items-center gap-1"
          >
            <Percent className="w-3.5 h-3.5 text-amber-600" />
            Pre-IPO
          </Link>

          <Link
            href="/credit-cards"
            className="px-2.5 py-2 rounded-md hover:bg-slate-100 hover:text-blue-700 transition-colors flex items-center gap-1 text-slate-900 font-bold"
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-700" />
            Credit Cards
          </Link>

          <Link
            href="/payment-apps"
            className="px-2.5 py-2 rounded-md hover:bg-slate-100 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            Payment Apps
          </Link>

          <Link
            href="/banks"
            className="px-2.5 py-2 rounded-md hover:bg-slate-100 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-700" />
            Banks
          </Link>

          <Link
            href="/brokers"
            className="px-2.5 py-2 rounded-md hover:bg-slate-100 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-600" />
            Brokers
          </Link>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 py-3 border-t border-slate-200 bg-slate-50 flex flex-col gap-2 text-sm text-slate-800">
          <Link onClick={() => setMobileMenuOpen(false)} href="/" className="px-3 py-2 rounded-md hover:bg-slate-200">
            Mainboard &amp; SME IPOs
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/pre-ipo" className="px-3 py-2 rounded-md hover:bg-slate-200 text-amber-700 font-bold">
            Pre-IPO Unlisted Shares
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/credit-cards" className="px-3 py-2 rounded-md hover:bg-slate-200 text-blue-700 font-bold">
            Credit Cards Comparison
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/payment-apps" className="px-3 py-2 rounded-md hover:bg-slate-200">
            UPI &amp; Payment Apps
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/banks" className="px-3 py-2 rounded-md hover:bg-slate-200">
            Banks &amp; Savings Accounts
          </Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="/brokers" className="px-3 py-2 rounded-md hover:bg-slate-200">
            Broker Comparisons
          </Link>
        </div>
      )}
    </header>
  );
};
