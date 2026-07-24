"use client";

import React, { useState } from "react";
import { Percent, Plus, Edit, Trash2, CheckCircle2, Search, X } from "lucide-react";
import { MOCK_PRE_IPOS, PreIPOData } from "@/data/mockPreIpos";

export default function AdminPreIpoPage() {
  const [preIpos, setPreIpos] = useState<PreIPOData[]>(MOCK_PRE_IPOS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PreIPOData | null>(null);
  const [successToast, setSuccessToast] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [pricePerShare, setPricePerShare] = useState(250);
  const [minLotShares, setMinLotShares] = useState(100);

  const filteredItems = preIpos.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingItem(null);
    setName("");
    setSector("Fintech");
    setPricePerShare(200);
    setMinLotShares(100);
    setShowModal(true);
  };

  const handleOpenEdit = (item: PreIPOData) => {
    setEditingItem(item);
    setName(item.name);
    setSector(item.sector);
    setPricePerShare(item.pricePerShare);
    setMinLotShares(item.minLotShares);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this unlisted Pre-IPO stock from portal?")) {
      setPreIpos((prev) => prev.filter((item) => item.id !== id));
      setSuccessToast("Pre-IPO stock removed.");
      setTimeout(() => setSuccessToast(""), 3000);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingItem) {
      setPreIpos((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name,
                sector,
                pricePerShare,
                minLotShares,
                minInvestmentAmount: pricePerShare * minLotShares
              }
            : item
        )
      );
      setSuccessToast("Pre-IPO stock updated successfully!");
    } else {
      const newItem: PreIPOData = {
        id: "preipo-" + Date.now(),
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name,
        sector,
        pricePerShare,
        minLotShares,
        minInvestmentAmount: pricePerShare * minLotShares,
        valuationCr: 12500,
        revenueGrowthPercent: 32.5,
        ebitdaMarginPercent: 18.2,
        expectedIpoTimeline: "Q4 2026",
        highlights: ["Strong profitability", "Market leader"],
        status: "Active"
      };
      setPreIpos([newItem, ...preIpos]);
      setSuccessToast("New Pre-IPO share listed live!");
    }

    setShowModal(false);
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
          <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider block">
            PRE-IPO &amp; UNLISTED SHARES MODULE
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Unlisted Equities ({preIpos.length})</h1>
          <p className="text-xs text-slate-500">Manage unlisted share prices, minimum lot quantities, and valuation metrics.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add Pre-IPO Stock
        </button>
      </div>

      {/* Table Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
        <div className="relative max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search unlisted stock..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-amber-600 bg-slate-50"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Company Name</th>
                <th className="py-2.5 px-3">Sector</th>
                <th className="py-2.5 px-3">Price / Share</th>
                <th className="py-2.5 px-3">Min Lot Size</th>
                <th className="py-2.5 px-3">Min Investment</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 font-extrabold block">{item.name}</strong>
                    <span className="text-[10px] text-slate-400">{item.slug}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700">{item.sector}</td>
                  <td className="py-3 px-3 font-extrabold text-slate-900">₹{item.pricePerShare}</td>
                  <td className="py-3 px-3 font-bold text-slate-700">{item.minLotShares} Shares</td>
                  <td className="py-3 px-3 font-black text-amber-700">₹{item.minInvestmentAmount.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingItem ? `Edit ${editingItem.name}` : "Add Pre-IPO Stock"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swiggy Unlisted Shares"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Sector Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Food Tech / E-commerce"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Price per Share (₹)</label>
                  <input
                    type="number"
                    value={pricePerShare}
                    onChange={(e) => setPricePerShare(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Min Lot (Shares)</label>
                  <input
                    type="number"
                    value={minLotShares}
                    onChange={(e) => setMinLotShares(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-xs"
                >
                  Save Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
