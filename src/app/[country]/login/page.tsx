"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Google OAuth states
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [googleName, setGoogleName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleError, setGoogleError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [customGoogleOpen, setCustomGoogleOpen] = useState(false);

  const mockGoogleAccounts = [
    { name: "Mayank Patel", email: "mayank@ipopreipo.com", avatar: "M" },
    { name: "John Doe", email: "john.doe@gmail.com", avatar: "J" },
    { name: "Alice Smith", email: "alice.smith@gmail.com", avatar: "A" }
  ];

  const handleGoogleSelect = async (name: string, email: string) => {
    setGoogleLoading(true);
    setGoogleError("");
    try {
      const res = await loginWithGoogle(name, email);
      if (res.success) {
        setSuccess(true);
        setShowGoogleChooser(false);
        setTimeout(() => {
          router.push("/");
        }, 800);
      } else {
        setGoogleError(res.error || "Google Sign-In failed.");
      }
    } catch (err) {
      setGoogleError("OAuth connection interrupted.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // If already logged in, redirect home
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 800);
      } else {
        setError(res.error || "Login failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", position: "relative" }}>
      
      {/* Background glow mesh */}
      <div style={{
        position: "absolute",
        width: "min(400px, 100vw)",
        height: "min(400px, 100vh)",
        background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.12) 0%, transparent 70%)",
        filter: "blur(50px)",
        pointerEvents: "none"
      }} />

      <div className="card" style={{ width: "100%", maxWidth: "450px", padding: "2.5rem 2rem", zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", width: "40px", height: "40px", borderRadius: "10px", background: "rgba(var(--primary-rgb), 0.08)", border: "1px solid rgba(var(--primary-rgb), 0.15)", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "1rem" }}>
            🔑
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>Welcome Back</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.4rem" }}>
            Sign in to track listings and access unlisted markets.
          </p>
        </div>

        {/* Message banners */}
        {error && (
          <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.8rem", color: "var(--danger)", marginBottom: "1.5rem" }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.8rem", color: "var(--success)", marginBottom: "1.5rem" }}>
            ✓ Successfully authenticated! Redirecting...
          </div>
        )}

        {/* Google Sign-in Button */}
        <button
          type="button"
          onClick={() => setShowGoogleChooser(true)}
          className="btn btn-secondary"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
            fontWeight: 600,
            borderRadius: "8px",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
          }}
          disabled={submitting || success}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* OR Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0", opacity: 0.6 }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border-color)" }}></div>
          <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase" }}>or sign in with email</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-color)" }}></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>Email Address</label>
            <input
              type="email"
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              disabled={submitting || success}
              required
            />
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              disabled={submitting || success}
              required
            />
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginTop: "0.4rem" }}>
              *Default account: <strong>mayank@ipopreipo.com</strong> with password <strong>password123</strong>
            </span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }} disabled={submitting || success}>
            {submitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Signup redirection footer */}
        <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", textAlign: "center", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "var(--primary)", fontWeight: "700" }}>
            Sign Up
          </Link>
        </div>

      </div>

      {/* Simulated Google Account Chooser Overlay Modal */}
      {showGoogleChooser && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          padding: "1rem"
        }}>
          <div style={{
            background: "#ffffff",
            color: "#1f2937",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            border: "1px solid #e5e7eb",
            padding: "2rem",
            position: "relative"
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowGoogleChooser(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                color: "#9ca3af",
                background: "none",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer"
              }}
              aria-label="Close Account Chooser"
            >
              ✕
            </button>

            {/* Google Logo */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>

            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", textAlign: "center", marginBottom: "0.5rem", letterSpacing: "-0.025em" }}>
              Choose an account
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", textAlign: "center", marginBottom: "1.5rem" }}>
              to continue to <strong>ipopreipo.com</strong>
            </p>

            {googleError && (
              <div style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fca5a5", fontSize: "0.78rem", borderRadius: "8px", padding: "0.6rem 0.8rem", marginBottom: "1rem" }}>
                ⚠️ {googleError}
              </div>
            )}

            {/* Profiles List */}
            <div style={{ display: "flex", flexDirection: "column", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", marginBottom: "1rem" }}>
              {mockGoogleAccounts.map((acc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGoogleSelect(acc.name, acc.email)}
                  disabled={googleLoading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "none",
                    border: "none",
                    borderBottom: idx < mockGoogleAccounts.length - 1 ? "1px solid #e5e7eb" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "background 0.15s",
                    fontFamily: "inherit"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "none")}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#e5e7eb",
                    color: "#4b5563",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {acc.avatar}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827" }}>{acc.name}</span>
                    <span style={{ fontSize: "0.75rem", color: "#4b5563" }}>{acc.email}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Account Form Toggle */}
            {!customGoogleOpen ? (
              <button
                onClick={() => setCustomGoogleOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.6rem 1rem",
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  borderRadius: "6px"
                }}
              >
                👤 Use another account
              </button>
            ) : (
              <div style={{ borderTop: "1px dashed #e5e7eb", paddingTop: "1rem", marginTop: "0.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "0.25rem", textTransform: "uppercase" }}>Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Mayank Patel"
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        fontSize: "0.82rem",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        background: "#ffffff",
                        color: "#1e293b",
                        outline: "none"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.7rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "0.25rem", textTransform: "uppercase" }}>Google Email</label>
                    <input
                      type="email"
                      placeholder="e.g. name@gmail.com"
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        fontSize: "0.82rem",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        background: "#ffffff",
                        color: "#1e293b",
                        outline: "none"
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (!googleName.trim() || !googleEmail.trim()) {
                          setGoogleError("Please enter both Name and Email.");
                          return;
                        }
                        handleGoogleSelect(googleName, googleEmail);
                      }}
                      className="btn btn-primary"
                      disabled={googleLoading}
                      style={{
                        flex: 2,
                        padding: "0.5rem",
                        fontSize: "0.8rem",
                        borderRadius: "6px",
                        boxShadow: "none"
                      }}
                    >
                      {googleLoading ? "Signing in..." : "Link Profile"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomGoogleOpen(false)}
                      className="btn btn-secondary"
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        fontSize: "0.8rem",
                        borderRadius: "6px",
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        color: "#475569"
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
