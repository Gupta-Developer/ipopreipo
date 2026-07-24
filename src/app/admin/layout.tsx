"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sparkles, 
  Percent, 
  CreditCard, 
  Briefcase, 
  Smartphone, 
  Building2, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X,
  ChevronRight,
  TrendingUp,
  Sliders,
  Bell
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/ipos", label: "Manage IPOs", icon: Sparkles, badge: "Live" },
    { href: "/admin/pre-ipo", label: "Pre-IPO Shares", icon: Percent },
    { href: "/admin/credit-cards", label: "Credit Cards", icon: CreditCard },
    { href: "/admin/brokers", label: "Stock Brokers", icon: Briefcase },
    { href: "/admin/payment-apps", label: "Payment Apps", icon: Smartphone },
    { href: "/admin/banks", label: "Banks & Accounts", icon: Building2 },
    { href: "/admin/reviews", label: "User Reviews", icon: MessageSquare, badge: "Pending" },
    { href: "/admin/users", label: "User Analytics", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-xs">
            A
          </div>
          <span className="font-extrabold text-sm tracking-tight">IPOPreIPO Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out border-r border-slate-800
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="flex items-center gap-3 px-2 py-1 border-b border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md">
              A
            </div>
            <div>
              <span className="font-extrabold text-white text-sm block leading-tight">IPOPreIPO</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">Admin Control Center</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isActive ? "bg-white text-blue-900" : "bg-slate-800 text-slate-300"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="font-medium">← Back to Main Site</span>
          </Link>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div>
              <span className="text-white font-bold block text-xs">Super Admin</span>
              <span className="text-[10px] text-slate-500 block">admin@ipopreipo.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
