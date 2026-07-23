import React from "react";
import Link from "next/link";
import { Lock, ArrowUpRight, Info } from "lucide-react";
import { MOCK_ANCHOR_LOCKINS } from "@/data/mockAnchorLockins";
import { Badge } from "@/components/common/Badge";

export default function AnchorLockInsPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
          <Lock className="w-3.5 h-3.5" />
          ANCHOR LOCK-IN EXPIRY TRACKER
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Anchor Lock-In Release Schedule
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
          Institutional anchor investors are bound by a 30-day (50% shares) and 90-day (50% shares) lock-in period. Track release dates to anticipate market liquidity &amp; potential selling pressure.
        </p>
      </div>

      {/* Info Notice */}
      <div className="p-3.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-2">
        <Info className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
        <div>
          <strong>Market Impact Note:</strong> Expiration of the 30-day and 90-day lock-in periods enables institutional anchor investors (FIIs, DIIs, Mutual Funds) to trade their allotted shares, frequently impacting short-term post-listing price volatility.
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">IPO Company Name</th>
              <th className="py-3 px-4">Listing Date</th>
              <th className="py-3 px-4">Anchor Capital</th>
              <th className="py-3 px-4">30-Day Release (50%)</th>
              <th className="py-3 px-4">90-Day Release (50%)</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {MOCK_ANCHOR_LOCKINS.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <Link href={`/ipo/${item.slug}`} className="hover:text-blue-700">
                    {item.ipoName}
                  </Link>
                  <div className="mt-1">
                    <Badge category={item.category} />
                  </div>
                </td>

                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {item.listingDate}
                </td>

                <td className="py-3.5 px-4 font-bold text-indigo-800">
                  ₹{item.anchorAmountCr} Cr
                  <span className="text-[11px] text-slate-500 block font-normal">
                    ({(item.totalAnchorShares / 1000000).toFixed(2)}M Shares)
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.lockIn30DaysDate}</div>
                  <span
                    className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.lockIn30DaysStatus === "Expiring Soon"
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : item.lockIn30DaysStatus === "Expired"
                        ? "bg-rose-50 text-rose-800"
                        : "bg-emerald-50 text-emerald-800"
                    }`}
                  >
                    {item.lockIn30DaysStatus}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.lockIn90DaysDate}</div>
                  <span
                    className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.lockIn90DaysStatus === "Expiring Soon"
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : item.lockIn90DaysStatus === "Expired"
                        ? "bg-rose-50 text-rose-800"
                        : "bg-indigo-50 text-indigo-800"
                    }`}
                  >
                    {item.lockIn90DaysStatus}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/ipo/${item.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-xs text-blue-700 hover:underline"
                  >
                    View <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
