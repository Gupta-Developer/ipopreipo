"use client";

import React, { useState } from "react";
import {
  BellRing,
  Send,
  CheckCircle2,
  Users,
  Flame,
  Globe,
  Sparkles,
  Search,
  X,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { MOCK_NEWS_ALERTS } from "@/data/mockArticles";
import { NewsAlert } from "@/types/editor";

export default function PushAlertsPage() {
  const [alerts, setAlerts] = useState<NewsAlert[]>(MOCK_NEWS_ALERTS);
  const [showModal, setShowModal] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Form State
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertCategory, setAlertCategory] = useState<NewsAlert["category"]>("Allotment Alert");
  const [linkUrl, setLinkUrl] = useState("/allotment");

  const handleSendAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim()) return;

    const newAlert: NewsAlert = {
      id: "alt-" + Date.now(),
      title: alertTitle,
      message: alertMessage,
      category: alertCategory,
      targetAudience: "All Platform Subscribers (185,000+ users)",
      sentTime: "Just now",
      deliveredCount: 182400,
      openRatePercent: 72.5,
      linkUrl
    };

    setAlerts([newAlert, ...alerts]);
    setShowModal(false);
    setSuccessToast("Push alert broadcast successfully to 182,400+ subscribers!");
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const fillTemplate = (type: "allotment" | "gmp" | "drhp") => {
    if (type === "allotment") {
      setAlertCategory("Allotment Alert");
      setAlertTitle("Swiggy IPO Allotment Status Declared!");
      setAlertMessage("Link Intime & BSE portal allotment servers are now live. Click here to check your allotment status instantly.");
      setLinkUrl("/allotment");
    } else if (type === "gmp") {
      setAlertCategory("GMP Surge");
      setAlertTitle("Hyundai Motor India GMP Surges +35%!");
      setAlertMessage("Grey market premium jumps sharply following institutional anchor placement. View live GMP updates.");
      setLinkUrl("/ipo/hyundai-motor-india-ipo");
    } else {
      setAlertCategory("DRHP Filed");
      setAlertTitle("NSE India Files DRHP for ₹35,000 Cr IPO!");
      setAlertMessage("National Stock Exchange submits prospectus with SEBI. Read full financial breakdown.");
      setLinkUrl("/pre-ipo");
    }
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
            SUBSCRIBER BROADCAST CONSOLE
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">News &amp; Allotment Push Alerts</h1>
          <p className="text-xs text-slate-400">Broadcast immediate allotment status links &amp; breaking GMP alerts to 185k+ users.</p>
        </div>

        <button
          onClick={() => {
            setAlertTitle("");
            setAlertMessage("");
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black transition-all shadow-lg shadow-emerald-500/20"
        >
          <Send className="w-4 h-4" /> Broadcast Push Alert
        </button>
      </div>

      {/* TEMPLATE QUICK LAUNCHERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => {
            fillTemplate("allotment");
            setShowModal(true);
          }}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-black uppercase">
              TEMPLATE 1
            </span>
            <Send className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Allotment Out Alert</h3>
          <p className="text-xs text-slate-400">Notify users immediately when registrar updates allotment link.</p>
        </button>

        <button
          onClick={() => {
            fillTemplate("gmp");
            setShowModal(true);
          }}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 text-left transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-black uppercase">
              TEMPLATE 2
            </span>
            <Flame className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </div>
          <h3 className="font-extrabold text-white text-sm">GMP Surge Warning</h3>
          <p className="text-xs text-slate-400">Alert subscribers about grey market premium spikes &amp; listing gain potential.</p>
        </button>

        <button
          onClick={() => {
            fillTemplate("drhp");
            setShowModal(true);
          }}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[10px] font-black uppercase">
              TEMPLATE 3
            </span>
            <Globe className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </div>
          <h3 className="font-extrabold text-white text-sm">DRHP Filing Alert</h3>
          <p className="text-xs text-slate-400">Send breaking news when SEBI receives new mega IPO prospectus.</p>
        </button>
      </div>

      {/* BROADCAST HISTORY TABLE */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-lg font-black text-white tracking-tight">Recent Broadcast Logs</h2>

        <div className="space-y-3">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30">
                    {alt.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{alt.sentTime}</span>
                </div>
                <h3 className="font-extrabold text-white text-sm">{alt.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-1">{alt.message}</p>
              </div>

              <div className="flex items-center gap-6 text-right shrink-0">
                <div>
                  <span className="text-[10px] text-slate-500 block">Recipients</span>
                  <span className="font-extrabold text-slate-200">{alt.deliveredCount.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Open Rate</span>
                  <span className="font-black text-emerald-400 text-sm">{alt.openRatePercent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEND ALERT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-md w-full p-6 space-y-5 shadow-2xl relative my-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">Broadcast Subscriber Push Alert</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendAlert} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Alert Category</label>
                <select
                  value={alertCategory}
                  onChange={(e) => setAlertCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
                >
                  <option value="Allotment Alert">Allotment Alert</option>
                  <option value="GMP Surge">GMP Surge</option>
                  <option value="DRHP Filed">DRHP Filed</option>
                  <option value="Listing Day">Listing Day</option>
                  <option value="Breaking">Breaking</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Push Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swiggy IPO Allotment Live!"
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Push Body Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Short notification text visible on mobile lockscreen..."
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Action Link URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
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
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Dispatch Push Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
