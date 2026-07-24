"use client";

import React, { useState } from "react";
import {
  Microscope,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Star,
  Award,
  Sparkles,
  TrendingUp,
  X,
  Sliders
} from "lucide-react";
import { MOCK_RESEARCH_REPORTS } from "@/data/mockArticles";
import { IPOResearchReport } from "@/types/editor";

export default function IPOResearchDeskPage() {
  const [reports, setReports] = useState<IPOResearchReport[]>(MOCK_RESEARCH_REPORTS);
  const [showModal, setShowModal] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Form state for IPO Research Report
  const [ipoName, setIpoName] = useState("");
  const [verdict, setVerdict] = useState<IPOResearchReport["verdict"]>("Apply for Long Term");
  const [targetPrice, setTargetPrice] = useState("₹2,200 - ₹2,400");
  const [financialScore, setFinancialScore] = useState(8.5);
  const [managementScore, setManagementScore] = useState(9.0);
  const [valuationScore, setValuationScore] = useState(7.0);
  const [industryScore, setIndustryScore] = useState(8.8);
  const [summary, setSummary] = useState("");
  const [bullPointsInput, setBullPointsInput] = useState(
    "High market share leadership in SUVs\nStrong cash-flow balance sheet"
  );
  const [bearPointsInput, setBearPointsInput] = useState(
    "100% OFS issue\nIncreased royalty payout to Korean parent"
  );

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipoName.trim()) return;

    const newReport: IPOResearchReport = {
      id: "rep-" + Date.now(),
      ipoName,
      ipoSlug: ipoName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      analystName: "Lead Equity Analyst",
      publishDate: new Date().toISOString().split("T")[0],
      verdict,
      targetPriceRange: targetPrice,
      financialScore,
      managementScore,
      valuationScore,
      industryScore,
      overallRating: parseFloat(
        ((financialScore + managementScore + valuationScore + industryScore) / 8).toFixed(1)
      ),
      bullPoints: bullPointsInput.split("\n").filter((p) => p.trim()),
      bearPoints: bearPointsInput.split("\n").filter((p) => p.trim()),
      summary: summary || `${ipoName} valuation analysis report.`,
      status: "Published"
    };

    setReports([newReport, ...reports]);
    setShowModal(false);
    setSuccessToast("IPO Research Report published live!");
    setTimeout(() => setSuccessToast(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
            ANALYST VALUATION ENGINE
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">IPO Research Desk ({reports.length})</h1>
          <p className="text-xs text-slate-400">Build 360° IPO valuation reports, scorecard metrics, and Bull vs Bear analysis.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" /> Create Research Report
        </button>
      </div>

      {/* REPORTS LIST */}
      <div className="space-y-4">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase">
                    ANALYST VERDICT: {rep.verdict}
                  </span>
                  <span className="text-[10px] text-slate-400">By {rep.analystName} • {rep.publishDate}</span>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight mt-1">{rep.ipoName}</h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold">Target Price Range</span>
                  <span className="text-sm font-black text-amber-400">{rep.targetPriceRange || "N/A"}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex flex-col items-center justify-center font-black">
                  <span className="text-base leading-none">{rep.overallRating}</span>
                  <span className="text-[9px] text-slate-400 font-bold">/ 5.0</span>
                </div>
              </div>
            </div>

            {/* Scorecard Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Financial Health</span>
                <span className="font-black text-emerald-400 text-sm">{rep.financialScore} / 10</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Management Track</span>
                <span className="font-black text-cyan-400 text-sm">{rep.managementScore} / 10</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Valuation Rating</span>
                <span className="font-black text-amber-400 text-sm">{rep.valuationScore} / 10</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Industry Prospect</span>
                <span className="font-black text-purple-400 text-sm">{rep.industryScore} / 10</span>
              </div>
            </div>

            {/* Bull vs Bear Case */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Bull Case */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Bull Case Highlights</span>
                </div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                  {rep.bullPoints.map((bp, i) => (
                    <li key={i}>{bp}</li>
                  ))}
                </ul>
              </div>

              {/* Bear Case */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-400 font-extrabold">
                  <ThumbsDown className="w-4 h-4" />
                  <span>Key Risk Factors</span>
                </div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                  {rep.bearPoints.map((bp, i) => (
                    <li key={i}>{bp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE RESEARCH REPORT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-xl w-full p-6 space-y-5 shadow-2xl relative my-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">Create 360° IPO Research Report</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReport} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">IPO Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bajaj Housing Finance IPO"
                  value={ipoName}
                  onChange={(e) => setIpoName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Analyst Verdict</label>
                  <select
                    value={verdict}
                    onChange={(e) => setVerdict(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Apply for Long Term">Apply for Long Term</option>
                    <option value="Apply for Listing Gain">Apply for Listing Gain</option>
                    <option value="May Apply">May Apply</option>
                    <option value="Avoid">Avoid</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Price Range</label>
                  <input
                    type="text"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Scorecard Sliders */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Financial Score ({financialScore})</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={financialScore}
                    onChange={(e) => setFinancialScore(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Management Score ({managementScore})</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={managementScore}
                    onChange={(e) => setManagementScore(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Valuation Score ({valuationScore})</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={valuationScore}
                    onChange={(e) => setValuationScore(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Industry Score ({industryScore})</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={industryScore}
                    onChange={(e) => setIndustryScore(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>

              {/* Bull vs Bear Inputs */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Bull Points (One per line)</label>
                <textarea
                  rows={2}
                  value={bullPointsInput}
                  onChange={(e) => setBullPointsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Bear / Risk Points (One per line)</label>
                <textarea
                  rows={2}
                  value={bearPointsInput}
                  onChange={(e) => setBearPointsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 font-bold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
                >
                  Publish Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
