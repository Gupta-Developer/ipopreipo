import React from "react";
import { Smartphone, Star, CheckCircle2, XCircle, ExternalLink, ShieldCheck, Download } from "lucide-react";
import { MOCK_PAYMENT_APPS } from "@/data/mockPaymentApps";

export default function PaymentAppsPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Smartphone className="w-3.5 h-3.5" />
          UPI &amp; PAYMENT APPS DESK
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Compare Top UPI &amp; Payment Apps in India
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
          Evaluate Indian UPI apps by transaction speed, RuPay credit card integration, UPI Lite features, cashback rewards, free credit score tracking, and security ratings.
        </p>
      </div>

      {/* Payment App Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_PAYMENT_APPS.map((app) => (
          <div
            key={app.id}
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {app.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">{app.developer} ({app.downloadsTier})</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {app.playStoreRating} / 5.0
                </div>
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
                {app.upiLiteSupport && (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    UPI Lite Supported
                  </span>
                )}
                {app.ruPayUpiSupport && (
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                    RuPay Credit Card
                  </span>
                )}
                {app.creditScoreCheckFree && (
                  <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                    Free Credit Score
                  </span>
                )}
              </div>

              {/* Cashback Policy */}
              <p className="text-xs text-slate-600">
                <strong>Cashback Policy:</strong> {app.cashbackPolicy}
              </p>

              {/* Key Features */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-800 block">Supported Core Features:</span>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  {app.keyFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-1 text-xs pt-2 border-t border-slate-100">
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Pros:
                </span>
                <ul className="space-y-0.5 text-slate-600 list-disc list-inside">
                  {app.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action */}
            <a
              href={app.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              Get App Online
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
