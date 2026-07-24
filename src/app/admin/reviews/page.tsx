"use client";

import React, { useState } from "react";
import { MessageSquare, Check, X, ShieldAlert, Star, CheckCircle2 } from "lucide-react";

interface AdminReviewItem {
  id: string;
  userName: string;
  targetEntity: string;
  category: "Credit Cards" | "Stock Brokers" | "Payment Apps" | "Banks" | "IPOs";
  rating: number;
  date: string;
  headline: string;
  comment: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReviewItem[]>([
    {
      id: "rev-101",
      userName: "Vikram Malhotra",
      targetEntity: "SBI Cashback Credit Card",
      category: "Credit Cards",
      rating: 5,
      date: "2026-07-24",
      headline: "5% cashback on online shopping is real!",
      comment: "Switched from Axis Ace to SBI Cashback last month. Received ₹1,250 cashback directly credited on statement.",
      status: "Pending"
    },
    {
      id: "rev-102",
      userName: "Rohan Patel",
      targetEntity: "Groww Stock Broker",
      category: "Stock Brokers",
      rating: 4,
      date: "2026-07-23",
      headline: "Smooth IPO application via UPI",
      comment: "Applied for Lohia Corp IPO in 3 clicks. UPI mandate request was received on PhonePe within 2 minutes.",
      status: "Pending"
    },
    {
      id: "rev-103",
      userName: "Siddharth Rao",
      targetEntity: "PhonePe UPI App",
      category: "Payment Apps",
      rating: 5,
      date: "2026-07-22",
      headline: "Fastest UPI Lite payments",
      comment: "UPI Lite works even during peak server load without needing PIN every time.",
      status: "Approved"
    }
  ]);

  const [filter, setFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("Pending");
  const [toast, setToast] = useState("");

  const handleAction = (id: string, newStatus: "Approved" | "Rejected") => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setToast(`Review ${newStatus.toLowerCase()} successfully.`);
    setTimeout(() => setToast(""), 3000);
  };

  const filteredReviews = reviews.filter((r) => filter === "All" || r.status === filter);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-[11px] font-extrabold text-purple-700 uppercase tracking-wider block">
            COMMUNITY MODERATION MODULE
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">User Reviews Moderation</h1>
          <p className="text-xs text-slate-500">Approve or reject community reviews before publishing to entity pages.</p>
        </div>

        <div className="flex gap-1.5 text-xs font-bold">
          {(["Pending", "Approved", "Rejected", "All"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                filter === f
                  ? "bg-purple-900 text-white border-purple-900 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Queue */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs font-medium">
            No reviews found in this moderation queue.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-xs">{rev.userName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {rev.category} → {rev.targetEntity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    rev.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                    rev.status === "Rejected" ? "bg-rose-100 text-rose-800" :
                    "bg-amber-100 text-amber-900"
                  }`}>
                    {rev.status}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? "fill-amber-400" : "text-slate-300"}`} />
                  ))}
                  <strong className="text-slate-900 text-xs font-bold ml-1">{rev.headline}</strong>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              </div>

              {rev.status === "Pending" && (
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handleAction(rev.id, "Rejected")}
                    className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 font-bold hover:bg-rose-50 flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button
                    onClick={() => handleAction(rev.id, "Approved")}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve &amp; Publish
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
