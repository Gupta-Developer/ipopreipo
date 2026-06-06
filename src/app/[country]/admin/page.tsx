"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/data/user";

interface PendingSubmission {
  id: string;
  authorEmail: string;
  name: string;
  ticker: string;
  segment: "Mainboard" | "SME";
  priceBand: string;
  size: string;
  lotSize: number;
  gmp: number;
  gmpAmount: string;
  openDate: string;
  closeDate: string;
  countrySlug: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

export default function AdminConsolePage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const country = (params?.country as string) || "india";

  // Navigation tabs
  const [activeTab, setActiveTab] = useState("dashboard");

  // Databases state
  const [submissions, setSubmissions] = useState<PendingSubmission[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, User>>({});
  const [ipoCount, setIpoCount] = useState(0);

  // Form State (Author)
  const [companyName, setCompanyName] = useState("");
  const [ticker, setTicker] = useState("");
  const [segment, setSegment] = useState<"Mainboard" | "SME">("Mainboard");
  const [priceBand, setPriceBand] = useState("");
  const [issueSize, setIssueSize] = useState("");
  const [lotSize, setLotSize] = useState(1);
  const [gmpPercent, setGmpPercent] = useState(0);
  const [gmpAmount, setGmpAmount] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [targetCountry, setTargetCountry] = useState("india");
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  // Collaborator editing states (Admin)
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<"USER" | "PRO" | "ADMIN" | "AUTHOR">("USER");
  const [editingCountries, setEditingCountries] = useState("");

  // Sync databases on mount
  useEffect(() => {
    syncLocalData();
  }, []);

  const syncLocalData = () => {
    // 1. Fetch submissions
    const subs = localStorage.getItem("pending_submissions");
    if (subs) {
      setSubmissions(JSON.parse(subs));
    } else {
      localStorage.setItem("pending_submissions", JSON.stringify([]));
    }

    // 2. Fetch users
    const users = localStorage.getItem("registered_users");
    if (users) {
      setRegisteredUsers(JSON.parse(users));
    }

    // 3. Fetch IPO count
    const ipos = localStorage.getItem("ipo_database");
    if (ipos) {
      setIpoCount(JSON.parse(ipos).length);
    }
  };

  if (loading) {
    return (
      <div className="app-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
          <h2>Loading Session Integrity...</h2>
        </div>
      </div>
    );
  }

  // Guard: Not logged in
  if (!user) {
    return (
      <div className="app-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="card" style={{ padding: "3rem", textAlign: "center", maxWidth: "450px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Admin Access Restricted</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.88rem", lineHeight: 1.45 }}>
            Please sign in with a verified regional editor or administrator account to view the command console.
          </p>
          <Link href={`/${country}/login`} className="btn btn-primary" style={{ marginTop: "1.5rem", width: "100%" }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Guard: Unauthorized role (regular user)
  if (user.role !== "ADMIN" && user.role !== "AUTHOR") {
    return (
      <div className="app-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="card" style={{ padding: "3rem", textAlign: "center", maxWidth: "450px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚫</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Access Denied</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.88rem", lineHeight: 1.45 }}>
            Your account role (<strong>{user.role}</strong>) does not have permission to view this panel.
          </p>
          <Link href="/" className="btn btn-secondary" style={{ marginTop: "1.5rem", width: "100%" }}>
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Author target countries filtering
  const allowedCountries = user.assignedCountries || ["india", "united-states", "united-kingdom"];

  // Handle Draft Submission (Author)
  const handleDraftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess("");
    setFormError("");

    if (!companyName.trim() || !ticker.trim() || !priceBand.trim() || !issueSize.trim() || !openDate || !closeDate) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const newDraft: PendingSubmission = {
      id: "sub_" + Date.now(),
      authorEmail: user.email,
      name: companyName.trim(),
      ticker: ticker.trim().toUpperCase(),
      segment,
      priceBand,
      size: issueSize,
      lotSize,
      gmp: gmpPercent,
      gmpAmount: gmpAmount || "₹0",
      openDate,
      closeDate,
      countrySlug: targetCountry,
      status: "Pending",
      submittedAt: new Date().toISOString()
    };

    const updatedSubs = [newDraft, ...submissions];
    localStorage.setItem("pending_submissions", JSON.stringify(updatedSubs));
    setSubmissions(updatedSubs);

    // Reset Form
    setCompanyName("");
    setTicker("");
    setPriceBand("");
    setIssueSize("");
    setLotSize(1);
    setGmpPercent(0);
    setGmpAmount("");
    setOpenDate("");
    setCloseDate("");

    setFormSuccess("Draft submitted successfully! Waiting for Admin approval.");
  };

  // Handle Editorial Review (Admin)
  const handleReviewDecision = (id: string, decision: "Approved" | "Rejected") => {
    const updatedSubs = submissions.map((sub) => {
      if (sub.id === id) {
        return { ...sub, status: decision };
      }
      return sub;
    });

    localStorage.setItem("pending_submissions", JSON.stringify(updatedSubs));
    setSubmissions(updatedSubs);

    // If approved, commit to live IPO database
    if (decision === "Approved") {
      const selectedSub = submissions.find((sub) => sub.id === id);
      if (selectedSub) {
        const ipoDb = localStorage.getItem("ipo_database");
        const iposList = ipoDb ? JSON.parse(ipoDb) : [];

        const newIpo = {
          id: "ipo_" + Date.now(),
          name: selectedSub.name,
          ticker: selectedSub.ticker,
          status: "active" as const,
          priceBand: selectedSub.priceBand,
          gmp: selectedSub.gmp,
          gmpAmount: selectedSub.gmpAmount,
          openDate: selectedSub.openDate,
          closeDate: selectedSub.closeDate,
          size: selectedSub.size,
          lotSize: selectedSub.lotSize,
          subscription: { qib: 0, nii: 0, retail: 0, total: 0 },
          segment: selectedSub.segment,
          logoLetter: selectedSub.name.charAt(0).toUpperCase(),
          logoColor: "#" + Math.floor(Math.random()*16777215).toString(16),
          description: `Newly approved IPO listing managed by ${selectedSub.authorEmail}. Registered details are currently active for trading bidding.`,
          offerPriceNum: parseFloat(selectedSub.priceBand.replace(/[^0-9.]/g, "")) || 100,
          countrySlug: selectedSub.countrySlug
        };

        const updatedIpos = [newIpo, ...iposList];
        localStorage.setItem("ipo_database", JSON.stringify(updatedIpos));
        setIpoCount(updatedIpos.length);
      }
    }
  };

  // Handle Collaborator Role Change (Admin)
  const handleSaveUserEdit = (email: string) => {
    const usersCopy = { ...registeredUsers };
    if (usersCopy[email]) {
      usersCopy[email].role = editingRole;
      usersCopy[email].assignedCountries = editingCountries
        ? editingCountries.split(",").map(c => c.trim().toLowerCase())
        : undefined;

      localStorage.setItem("registered_users", JSON.stringify(usersCopy));
      setRegisteredUsers(usersCopy);
      setEditingUserId(null);
    }
  };

  // Reset databases helper
  const handleRestoreSeeds = () => {
    if (confirm("Restore all systems to fresh default mock data?")) {
      localStorage.removeItem("ipo_database");
      localStorage.removeItem("pending_submissions");
      syncLocalData();
      alert("System restored successfully!");
    }
  };

  return (
    <div className="app-container" style={{ paddingTop: "2.5rem" }}>
      
      {/* Header Info */}
      <section style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <span style={{ fontSize: "0.72rem", background: "rgba(var(--primary-rgb), 0.08)", color: "var(--primary)", border: "1px solid rgba(var(--primary-rgb), 0.2)", padding: "0.3rem 0.8rem", borderRadius: "99px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            🛡️ platform control console
          </span>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 900, marginTop: "0.5rem" }}>
            {user.role === "ADMIN" ? "Global Administrator Console" : "Regional Editor Dashboard"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Active Session: <strong>{user.name}</strong> ({user.email} • <span style={{ color: "var(--primary)" }}>{user.role}</span>)
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", background: "var(--card-bg)", padding: "0.25rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
          <button onClick={() => setActiveTab("dashboard")} className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`} style={{ fontSize: "0.82rem", padding: "0.45rem 1rem", borderRadius: "8px" }}>
            📊 Stats & Insights
          </button>
          
          {user.role === "AUTHOR" ? (
            <>
              <button onClick={() => setActiveTab("draft")} className={`tab-btn ${activeTab === "draft" ? "active" : ""}`} style={{ fontSize: "0.82rem", padding: "0.45rem 1rem", borderRadius: "8px" }}>
                ✍️ Submit Listing
              </button>
              <button onClick={() => setActiveTab("my-drafts")} className={`tab-btn ${activeTab === "my-drafts" ? "active" : ""}`} style={{ fontSize: "0.82rem", padding: "0.45rem 1rem", borderRadius: "8px" }}>
                📜 My Drafts
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab("queue")} className={`tab-btn ${activeTab === "queue" ? "active" : ""}`} style={{ fontSize: "0.82rem", padding: "0.45rem 1rem", borderRadius: "8px" }}>
                📥 Review Queue ({submissions.filter(s => s.status === "Pending").length})
              </button>
              <button onClick={() => setActiveTab("collaborators")} className={`tab-btn ${activeTab === "collaborators" ? "active" : ""}`} style={{ fontSize: "0.82rem", padding: "0.45rem 1rem", borderRadius: "8px" }}>
                👥 Collaborators
              </button>
            </>
          )}
        </div>
      </section>

      {/* Main content grid */}
      <main style={{ minHeight: "50vh" }}>

        {/* ── TAB: STATS & INSIGHTS (COMMON) ── */}
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* KPI Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Live IPO Database</span>
                <div style={{ fontSize: "2rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--primary)" }}>{ipoCount} Active</div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Persisted in browser cache</span>
              </div>
              <div className="card" style={{ padding: "1.5rem" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Review Queue Size</span>
                <div style={{ fontSize: "2rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--warning)" }}>
                  {submissions.filter(s => s.status === "Pending").length} Pending
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Requires Admin authorization</span>
              </div>
              <div className="card" style={{ padding: "1.5rem" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Registered Collaborators</span>
                <div style={{ fontSize: "2rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--success)" }}>
                  {Object.keys(registeredUsers).length} Users
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Admins, Editors, and Users</span>
              </div>
            </div>

            {/* Main Info Blocks */}
            <div className="grid-dashboard">
              
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 style={{ fontSize: "1.2rem" }}>🚀 Quick Operations Guide</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                  This dashboard replicates a multi-country editorial publishing tool. Because we use localized routing, any approved IPO automatically filters into its respective target region's IPO dashboard.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <div style={{ background: "var(--spec-bg)", border: "1px solid var(--spec-border)", padding: "0.8rem", borderRadius: "8px", fontSize: "0.82rem" }}>
                    <strong>Authors:</strong> Select country-specific terms (Mainboard/SME for India, Major Exchange/OTC for US, Main Market/AIM for UK) automatically apply based on your target country selection.
                  </div>
                  <div style={{ background: "var(--spec-bg)", border: "1px solid var(--spec-border)", padding: "0.8rem", borderRadius: "8px", fontSize: "0.82rem" }}>
                    <strong>Admins:</strong> Check the "Review Queue" to authorize drafts. Approved listings immediately push live. You can seed clean mock data using the Restoration tool.
                  </div>
                </div>
              </div>

              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", height: "fit-content" }}>
                <h3 style={{ fontSize: "1.2rem" }}>⚙️ Dev Control Desk</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.45 }}>
                  For testing purposes, you can reset the entire database cache back to seed conditions.
                </p>
                <button onClick={handleRestoreSeeds} className="btn btn-secondary" style={{ width: "100%", color: "var(--danger)", border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.05)" }}>
                  ♻️ Restore Default Seed Data
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ── TAB: SUBMIT DRAFT LISTING (AUTHOR) ── */}
        {activeTab === "draft" && (
          <div className="card" style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              ✍️ Draft New Syndicate Listing
            </h2>

            {formSuccess && (
              <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "var(--success)", marginBottom: "1.5rem" }}>
                ✓ {formSuccess}
              </div>
            )}
            {formError && (
              <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "var(--danger)", marginBottom: "1.5rem" }}>
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleDraftSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>Target Country</label>
                  <select className="input-field" value={targetCountry} onChange={(e) => setTargetCountry(e.target.value)} style={{ background: "var(--spec-bg)", cursor: "pointer" }}>
                    {allowedCountries.map((c) => (
                      <option key={c} value={c}>{c.toUpperCase().replace("-", " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>IPO Segment</label>
                  <select className="input-field" value={segment} onChange={(e) => setSegment(e.target.value as any)} style={{ background: "var(--spec-bg)", cursor: "pointer" }}>
                    <option value="Mainboard">Mainboard / Major Exchange</option>
                    <option value="SME">SME / OTC Market</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>Company Name</label>
                  <input type="text" placeholder="e.g. DeepMind Corporation" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="input-field" required />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>Ticker symbol</label>
                  <input type="text" placeholder="e.g. MIND" value={ticker} onChange={(e) => setTicker(e.target.value)} className="input-field" required />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>Price Band</label>
                  <input type="text" placeholder="e.g. $42 - $45" value={priceBand} onChange={(e) => setPriceBand(e.target.value)} className="input-field" required />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>Issue Size</label>
                  <input type="text" placeholder="e.g. $850M" value={issueSize} onChange={(e) => setIssueSize(e.target.value)} className="input-field" required />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>Lot Size (Shares)</label>
                  <input type="number" value={lotSize} onChange={(e) => setLotSize(parseInt(e.target.value) || 1)} className="input-field" required min={1} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>GMP Premium %</label>
                  <input type="number" placeholder="e.g. 30" value={gmpPercent || ""} onChange={(e) => setGmpPercent(parseFloat(e.target.value) || 0)} className="input-field" />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>GMP Amount Suffix</label>
                  <input type="text" placeholder="e.g. +$12" value={gmpAmount} onChange={(e) => setGmpAmount(e.target.value)} className="input-field" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>Bidding Open Date</label>
                  <input type="date" value={openDate} onChange={(e) => setOpenDate(e.target.value)} className="input-field" required />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem", textTransform: "uppercase" }}>Bidding Close Date</label>
                  <input type="date" value={closeDate} onChange={(e) => setCloseDate(e.target.value)} className="input-field" required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
                📥 Submit Draft to Approval Queue
              </button>
            </form>
          </div>
        )}

        {/* ── TAB: MY DRAFTS HISTORY (AUTHOR) ── */}
        {activeTab === "my-drafts" && (
          <div className="card" style={{ padding: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "1.5rem" }}>📜 Editorial Submissions Log</h2>
            
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", opacity: 0.8 }}>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Company</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Country</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Submitted Date</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Price Band</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", textAlign: "right" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.filter(s => s.authorEmail === user.email).length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>
                        You have not submitted any drafts yet.
                      </td>
                    </tr>
                  ) : (
                    submissions.filter(s => s.authorEmail === user.email).map((sub) => (
                      <tr key={sub.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "1.25rem 0.5rem" }}>
                          <strong style={{ fontSize: "0.9rem" }}>{sub.name}</strong>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{sub.ticker} • {sub.segment}</div>
                        </td>
                        <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.82rem", textTransform: "capitalize" }}>
                          {sub.countrySlug.replace("-", " ")}
                        </td>
                        <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.85rem", fontWeight: 700 }}>
                          {sub.priceBand}
                        </td>
                        <td style={{ padding: "1.25rem 0.5rem", textAlign: "right" }}>
                          <span className={`badge ${sub.status === "Approved" ? "badge-success" : sub.status === "Pending" ? "badge-warning" : "badge-danger"}`} style={{ fontSize: "0.62rem" }}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: EDITORIAL APPROVAL QUEUE (ADMIN) ── */}
        {activeTab === "queue" && (
          <div className="card" style={{ padding: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "1.5rem" }}>📥 Pending Submissions Queue</h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {submissions.filter(s => s.status === "Pending").length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--text-secondary)", padding: "3rem" }}>
                  🎉 The review queue is clear! No pending submissions.
                </div>
              ) : (
                submissions.filter(s => s.status === "Pending").map((sub) => (
                  <div key={sub.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "12px", background: "var(--spec-bg)" }}>
                    
                    <div className="flex-between">
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Submitted by: {sub.authorEmail}</span>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem" }}>{sub.name} ({sub.ticker})</h3>
                      </div>
                      <span className="badge badge-primary" style={{ textTransform: "uppercase" }}>{sub.countrySlug}</span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", fontSize: "0.82rem" }}>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>Segment:</span>
                        <strong style={{ display: "block", color: "var(--text-primary)", marginTop: "2px" }}>{sub.segment}</strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>Price Band:</span>
                        <strong style={{ display: "block", color: "var(--text-primary)", marginTop: "2px" }}>{sub.priceBand}</strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>Issue Size:</span>
                        <strong style={{ display: "block", color: "var(--text-primary)", marginTop: "2px" }}>{sub.size}</strong>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-secondary)" }}>GMP Forecast:</span>
                        <strong style={{ display: "block", color: "var(--success)", marginTop: "2px" }}>{sub.gmpAmount} ({sub.gmp}%)</strong>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                      <button onClick={() => handleReviewDecision(sub.id, "Approved")} className="btn btn-primary" style={{ padding: "0.5rem 1.5rem", fontSize: "0.8rem", borderRadius: "6px" }}>
                        ✓ Approve & Publish Live
                      </button>
                      <button onClick={() => handleReviewDecision(sub.id, "Rejected")} className="btn btn-secondary" style={{ padding: "0.5rem 1.5rem", fontSize: "0.8rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                        ✕ Reject Draft
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── TAB: COLLABORATOR MANAGEMENT (ADMIN) ── */}
        {activeTab === "collaborators" && (
          <div className="card" style={{ padding: "2rem" }}>
            <h2 style={{ fontSize: "1.35rem", marginBottom: "1.5rem" }}>👥 Collaborator Permissions Directory</h2>
            
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", opacity: 0.8 }}>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Name / Contact</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Role</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Scope Permission</th>
                    <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(registeredUsers).map(([email, colUser]) => (
                    <tr key={email} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "1.25rem 0.5rem" }}>
                        <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{colUser.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{email}</div>
                      </td>
                      <td style={{ padding: "1.25rem 0.5rem" }}>
                        <span className={`badge ${colUser.role === "ADMIN" ? "badge-danger" : colUser.role === "AUTHOR" ? "badge-primary" : "badge-secondary"}`} style={{ fontSize: "0.62rem" }}>
                          {colUser.role}
                        </span>
                      </td>
                      <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                        {colUser.role === "ADMIN" ? "All Countries (*)" : colUser.assignedCountries ? colUser.assignedCountries.join(", ").toUpperCase() : "None"}
                      </td>
                      <td style={{ padding: "1.25rem 0.5rem", textAlign: "right" }}>
                        {editingUserId === colUser.id ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                            <div style={{ display: "flex", gap: "0.35rem" }}>
                              <select value={editingRole} onChange={(e) => setEditingRole(e.target.value as any)} className="input-field" style={{ padding: "0.25rem", fontSize: "0.78rem", width: "90px", background: "var(--card-bg)" }}>
                                <option value="USER">USER</option>
                                <option value="PRO">PRO</option>
                                <option value="AUTHOR">AUTHOR</option>
                                <option value="ADMIN">ADMIN</option>
                              </select>
                              <input type="text" placeholder="india, united-states" value={editingCountries} onChange={(e) => setEditingCountries(e.target.value)} className="input-field" style={{ padding: "0.25rem", fontSize: "0.78rem", width: "120px", background: "var(--card-bg)" }} />
                            </div>
                            <div style={{ display: "flex", gap: "0.35rem" }}>
                              <button onClick={() => handleSaveUserEdit(email)} style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700, padding: "0.2rem 0.5rem", border: "1px solid #10b981", borderRadius: "4px" }}>Save</button>
                              <button onClick={() => setEditingUserId(null)} style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, padding: "0.2rem 0.5rem", border: "1px solid var(--border-color)", borderRadius: "4px" }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingUserId(colUser.id);
                              setEditingRole(colUser.role);
                              setEditingCountries(colUser.assignedCountries ? colUser.assignedCountries.join(", ") : "");
                            }}
                            className="btn btn-secondary"
                            style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", borderRadius: "6px" }}
                          >
                            ⚙️ Edit Scope
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
