import React from "react";
import Link from "next/link";
import { TrendingUp, ShieldCheck, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white">
                IPO<span className="text-blue-400">PREIPO</span>
                <span className="text-xs text-blue-400 font-bold">.com</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              <strong>ipopreipo.com</strong> is a professional financial intelligence portal for tracking Indian Mainboard IPOs, SME IPOs, exchange bidding data, grey market rates (GMP), anchor lock-in release timelines, and pre-IPO equities.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Financial Market Data
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Mainboard IPO List
                </Link>
              </li>
              <li>
                <Link href="/?tab=sme" className="hover:text-white transition-colors">
                  SME IPO Market
                </Link>
              </li>
              <li>
                <Link href="/pre-ipo" className="hover:text-white text-amber-400 transition-colors">
                  Pre-IPO &amp; Unlisted Shares
                </Link>
              </li>
              <li>
                <Link href="/anchor-lockins" className="hover:text-white transition-colors">
                  Anchor Lock-In Expiry Tracker
                </Link>
              </li>
              <li>
                <Link href="/allotment" className="hover:text-white transition-colors">
                  Check Allotment Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Registrars & Resources */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">IPO Registrars</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://linkintime.co.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  Link Intime Portal <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://kfintech.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  KFintech Portal <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://bigshareonline.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  Bigshare Services <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/buybacks" className="hover:text-white">
                  Share Buybacks Calendar
                </Link>
              </li>
              <li>
                <Link href="/brokers" className="hover:text-white">
                  Best Stock Brokers for IPO
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Subscribe to ipopreipo.com</h4>
            <p className="text-slate-400 mb-3">
              Get instant GMP updates, bidding alerts, and allotment notices directly to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 flex-1"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-bold transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-6 text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> Investments in equity shares and initial public offerings (IPOs) are subject to market risks. Grey Market Premium (GMP) data provided on <strong>ipopreipo.com</strong> is purely informational and based on unofficial market quotes. It does not constitute financial advice or official listing price guarantees. Always consult a certified financial advisor before making investment decisions.
          </p>
          <p className="text-center text-slate-500 pt-4">
            © {new Date().getFullYear()} <strong>ipopreipo.com</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
