"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { user, signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect home
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await signup(name, email, password);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 800);
      } else {
        setError(res.error || "Registration failed.");
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
            ✨
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>Create an Account</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.4rem" }}>
            Sign up to track listings and access unlisted markets.
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
            ✓ Account created successfully! Redirecting...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              disabled={submitting || success}
              required
            />
          </div>

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
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              disabled={submitting || success}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }} disabled={submitting || success}>
            {submitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login redirection footer */}
        <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", textAlign: "center", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--primary)", fontWeight: "700" }}>
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
