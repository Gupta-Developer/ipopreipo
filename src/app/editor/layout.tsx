"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Microscope,
  BellRing,
  Search,
  ExternalLink,
  Sparkles,
  User,
  LogOut,
  ChevronRight,
  Menu,
  X,
  TrendingUp,
  Feather
} from "lucide-react";

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Overview & Quick Compose", href: "/editor", icon: LayoutDashboard },
    { label: "Articles & News Desk", href: "/editor/articles", icon: FileText, badge: "4 Active" },
    { label: "IPO Research Desk", href: "/editor/research", icon: Microscope, badge: "2 Reports" },
    { label: "News & Allotment Alerts", href: "/editor/alerts", icon: BellRing, badge: "Live" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/editor" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Feather className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-tight text-white text-base">IPO</span>
                <span className="font-black tracking-tight text-emerald-400 text-base">PREIPO</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase text-emerald-500/80 tracking-widest block -mt-1">
                EDITORIAL SUITE
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            PUBLISHING WORKSPACE
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Link to Public Site */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all border border-slate-700/60 group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Public Live Site</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </Link>

          {/* User Profile Info */}
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
                ED
              </div>
              <div className="truncate">
                <p className="font-extrabold text-white text-xs leading-none truncate">Editorial Desk</p>
                <p className="text-[10px] text-slate-400 leading-tight">Lead Research Desk</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER TOGGLE */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs lg:hidden flex">
          <div className="w-64 bg-slate-900 border-r border-slate-800 h-full p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <span className="font-black text-white text-base">EDITORIAL DESK</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="mt-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800"
                  >
                    <item.icon className="w-4 h-4 text-emerald-400" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <Link href="/" className="p-3 bg-emerald-600 text-slate-950 rounded-xl text-xs font-bold text-center">
              View Public Website
            </Link>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER BAR */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative max-w-sm hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles, research drafts & news..."
                className="w-72 pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Publishing Engine Active</span>
            </div>

            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors border border-slate-700/50 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
