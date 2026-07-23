import React from "react";
import { Briefcase, Star, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { MOCK_BROKERS } from "@/data/mockBrokers";

export default function BrokersPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
          <Briefcase className="w-3.5 h-3.5" />
          STOCK BROKER ANALYSIS
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Compare Stock Brokers for IPO Applications
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
          Evaluate brokerage fees, Demat account AMC, UPI 2.0 mandate speeds, and platform reliability across leading Indian stockbrokers.
        </p>
      </div>

      {/* Broker Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_BROKERS.map((broker) => (
          <div
            key={broker.id}
            className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {broker.name}
                  </h3>
                  <span className="text-xs text-sky-700 font-semibold">{broker.type}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {broker.rating} / 5.0
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Delivery:</span>
                  <strong className="text-emerald-700 font-bold">{broker.equityDeliveryFee}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Intraday:</span>
                  <strong className="text-slate-900 font-bold">{broker.equityIntradayFee}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Demat AMC:</span>
                  <strong className="text-slate-900 font-bold">{broker.dematAnualFee}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Opening:</span>
                  <strong className="text-slate-900 font-bold">{broker.accountOpeningFee}</strong>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Key Advantages:
                </span>
                <ul className="space-y-1 text-slate-700 list-disc list-inside">
                  {broker.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>

              {broker.cons && broker.cons.length > 0 && (
                <div className="space-y-1 text-xs pt-2 border-t border-slate-100">
                  <span className="font-bold text-rose-700 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    Considerations:
                  </span>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    {broker.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <a
              href={broker.openAccountUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              Open Account Online
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
