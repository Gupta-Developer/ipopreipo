"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../data/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (credential: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize session on load
  useEffect(() => {
    const session = localStorage.getItem("active_session");
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        localStorage.removeItem("active_session");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password || "password123" }),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, error: data.error };
      }

      localStorage.setItem("active_session", JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: "Network error occurred. Please try again." };
    }
  };

  const signup = async (name: string, email: string, password?: string) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: password || "password123" }),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, error: data.error };
      }

      localStorage.setItem("active_session", JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: "Network error occurred. Please try again." };
    }
  };

  const loginWithGoogle = async (credential: string) => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, error: data.error };
      }

      localStorage.setItem("active_session", JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: "Network error occurred. Please try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem("active_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be called inside an AuthProvider");
  }
  return context;
}
