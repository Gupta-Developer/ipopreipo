"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  TrendingUp, 
  Percent, 
  MessageSquare, 
  Users, 
  Plus, 
  Save, 
  Edit, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  RefreshCw,
  Search,
  ShieldCheck
} from "lucide-react";
import { MOCK_IPOS } from "@/data/mockIpos";
import { Badge } from "@/components/common/Badge";

export default function AdminDashboardPage() {
  const [iposData, setIposData] = useState(MOCK_IPOS);
  const [editingGmpId, setEditingGmpId] = useState<string | null>(null);
  const [tempGmp, setTempGmp] = useState<number>(0);
  const [successToast, setSuccessToast] = useState<string>("");

  const handleEditGmp = (id: string, currentGmp: number) => {
    setEditingGmpId(id);
    setTempGmp(currentGmp);
  };

  const handleSaveGmp = (id: string) => {
    setIposData((prev) =>
      prev.map((ipo) => {
        if (ipo.id === id) {
          const newGmpPercent = (tempGmp / ipo.priceBandMax) * 100;
          return { ...ipo, gmp: tempGmp, gmpPercent: newGmpPercent };
        }
        return ipo;
      })
    );
    setEditingGmpId(null);
    setSuccessToast("GMP updated successfully and published live!");
    setTimeout(() => setSuccessToast(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block">
            ADMINISTRATION CONTROL CENTER
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Operations Dashboard</h1>
          <p className="text-xs text-slate-500">Real-time control panel for IPO GMP updates, unlisted shares, reviews, and user analytics.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/ipos"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add New IPO
          </Link>
          <Link
            href="/admin/pre-ipo"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Pre-IPO Stock
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="font-bold">Active &amp; Live IPOs</span>
            <Sparkles className="w-4 h-4 text-blue-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-2xl font-black text-slate-900">{iposData.length}</strong>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">+2 Mainboard today</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="font-bold">Pre-IPO Equities</span>
            <Percent className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-2xl font-black text-slate-900">4 Active</strong>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded">₹1,850 Peak Lot</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="font-bold">Monthly Platform Traffic</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-2xl font-black text-slate-900">2,45,800</strong>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">↑ 18.4% YoY</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="font-bold">User Reviews Moderation</span>
            <MessageSquare className="w-4 h-4 text-rose-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-2xl font-black text-slate-900">12 Pending</strong>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded">Needs Action</span>
          </div>
        </div>
      </div>

      {/* Real-time Quick GMP Update Panel */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Quick Live GMP Update Engine
            </h2>
            <p className="text-xs text-slate-500">Edit and publish grey market premium (GMP ₹) updates instantly across the entire platform.</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Real-time Sync Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">IPO Name &amp; Category</th>
                <th className="py-2.5 px-3">Price Band</th>
                <th className="py-2.5 px-3">Current GMP (₹)</th>
                <th className="py-2.5 px-3">GMP Return (%)</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {iposData.map((ipo) => (
                <tr key={ipo.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{ipo.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 uppercase">
                        {ipo.category}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-semibold">
                    ₹{ipo.priceBandMin} - ₹{ipo.priceBandMax}
                  </td>
                  <td className="py-3 px-3">
                    {editingGmpId === ipo.id ? (
                      <input
                        type="number"
                        value={tempGmp}
                        onChange={(e) => setTempGmp(parseFloat(e.target.value) || 0)}
                        className="w-24 px-2 py-1 rounded border border-blue-600 font-bold text-slate-900 bg-white"
                        autoFocus
                      />
                    ) : (
                      <span className="font-black text-emerald-700">+₹{ipo.gmp}</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-emerald-700">+{ipo.gmpPercent.toFixed(1)}%</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {editingGmpId === ipo.id ? (
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleSaveGmp(ipo.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" /> Save
                        </button>
                        <button
                          onClick={() => setEditingGmpId(null)}
                          className="px-2 py-1 rounded-lg border border-slate-300 font-bold text-slate-600 hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditGmp(ipo.id, ipo.gmp)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 font-bold hover:bg-blue-100 flex items-center gap-1 ml-auto"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit GMP
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Activity Log */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">Recent Admin Activity &amp; System Log</h3>
        <div className="space-y-3 text-xs">
          {[
            { time: "10 mins ago", event: "Updated GMP for Lohia Corp IPO to +₹65 (15.3%)", user: "Admin (Mayank)" },
            { time: "45 mins ago", event: "Approved 3 new user reviews on Groww Stock Broker page", user: "Moderator" },
            { time: "2 hours ago", event: "Published SME IPO Allotment portal links for Nexus Energy", user: "System Auto" },
            { time: "5 hours ago", event: "Updated STCG & LTCG Tax rates for 20 financial calculators", user: "Admin (Mayank)" }
          ].map((log, i) => (
            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span className="font-semibold text-slate-800">{log.event}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">{log.time}</span>
                <span className="font-bold text-slate-600 text-[11px]">{log.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
