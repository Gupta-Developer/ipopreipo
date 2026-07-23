import React from "react";
import { RefreshCw } from "lucide-react";
import { MOCK_BUYBACKS } from "@/data/mockBuybacks";

export default function BuybacksPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <RefreshCw className="w-3.5 h-3.5" />
          SHARE BUYBACKS HUB
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Share Buybacks Calendar &amp; Acceptance Ratios
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
          Track upcoming and active corporate share buybacks, buyback mechanisms (Tender Offer vs. Open Market), buyback prices, record dates, and estimated retail acceptance ratios.
        </p>
      </div>

      {/* Buyback Table */}
      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Company Name</th>
              <th className="py-3 px-4">Mechanism</th>
              <th className="py-3 px-4">Buyback Price (CMP)</th>
              <th className="py-3 px-4">Premium (%)</th>
              <th className="py-3 px-4">Issue Size</th>
              <th className="py-3 px-4">Record Date</th>
              <th className="py-3 px-4">Retail Acceptance Ratio</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {MOCK_BUYBACKS.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {item.companyName}
                </td>

                <td className="py-3.5 px-4 font-medium text-slate-600">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 border border-slate-200">
                    {item.issueType}
                  </span>
                </td>

                <td className="py-3.5 px-4 font-bold text-emerald-700">
                  ₹{item.buybackPrice}
                  <span className="text-[11px] text-slate-400 block font-normal">
                    (CMP: ₹{item.currentMarketPrice})
                  </span>
                </td>

                <td className="py-3.5 px-4 font-bold text-emerald-700">
                  +{item.premiumPercent}%
                </td>

                <td className="py-3.5 px-4 font-bold text-slate-900">
                  ₹{item.issueSizeCr} Cr
                </td>

                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {item.recordDate}
                </td>

                <td className="py-3.5 px-4 font-bold text-blue-700">
                  {item.acceptanceRatioEstimate}
                </td>

                <td className="py-3.5 px-4 text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                      item.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : item.status === "Upcoming"
                        ? "bg-sky-50 text-sky-700 border border-sky-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
