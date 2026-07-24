"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "investor" | "hni" | "editor" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle?: string;
  phone?: string;
  avatarUrl?: string;
  investorCategory: "Retail" | "S-HNI" | "B-HNI" | "QIB" | "Pre-IPO Investor" | "Lead Analyst" | "Super Admin";
  panNumber?: string;
  dematDpId?: string;
  createdAt: string;
}

export const DEMO_PERSONAS: Record<UserRole, UserProfile> = {
  investor: {
    id: "usr-retail-101",
    name: "Rahul Sharma",
    email: "rahul.investor@gmail.com",
    role: "investor",
    roleTitle: "Retail Investor (RII)",
    phone: "+91 98765 43210",
    investorCategory: "Retail",
    panNumber: "ABCPS1234F",
    dematDpId: "1208160012345678",
    createdAt: "2026-01-15"
  },
  hni: {
    id: "usr-hni-202",
    name: "Vikramaditya Singhania",
    email: "vikram.hni@singhaniacapital.com",
    role: "hni",
    roleTitle: "High Net-Worth Investor (B-HNI)",
    phone: "+91 99887 76655",
    investorCategory: "B-HNI",
    panNumber: "ASVPS9876K",
    dematDpId: "1208160099887766",
    createdAt: "2025-11-20"
  },
  editor: {
    id: "usr-editor-303",
    name: "Priya Malhotra",
    email: "editor@ipopreipo.com",
    role: "editor",
    roleTitle: "Lead Research Analyst & Editor",
    phone: "+91 91234 56789",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    investorCategory: "Lead Analyst",
    createdAt: "2025-08-10"
  },
  admin: {
    id: "usr-admin-404",
    name: "Super Admin",
    email: "admin@ipopreipo.com",
    role: "admin",
    roleTitle: "Platform Administrator",
    phone: "+91 90000 00000",
    investorCategory: "Super Admin",
    createdAt: "2025-01-01"
  }
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, pass: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  googleLogin: () => Promise<{ success: boolean; message?: string }>;
  switchRole: (role: UserRole) => UserProfile;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  savedWatchlist: string[];
  toggleWatchlist: (ipoSlug: string) => void;
  isSavedInWatchlist: (ipoSlug: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedWatchlist, setSavedWatchlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("ipopreipo_user_session");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedWatchlist = localStorage.getItem("ipopreipo_user_watchlist");
      if (storedWatchlist) {
        setSavedWatchlist(JSON.parse(storedWatchlist));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSession = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("ipopreipo_user_session", JSON.stringify(u));
    } else {
      localStorage.removeItem("ipopreipo_user_session");
    }
  };

  const login = async (email: string, pass: string) => {
    // Simulated auth check
    if (!email || !pass) {
      return { success: false, message: "Please fill in all required fields." };
    }
    
    // Check if email matches editor or admin
    let role: UserRole = "investor";
    if (email.includes("admin")) role = "admin";
    else if (email.includes("editor")) role = "editor";
    else if (email.includes("hni")) role = "hni";

    const persona = DEMO_PERSONAS[role];
    const mockUser: UserProfile = {
      ...persona,
      email: email,
      name: persona.name || email.split("@")[0].replace(".", " ").toUpperCase()
    };
    saveSession(mockUser);
    return { success: true };
  };

  const signup = async (name: string, email: string, pass: string, phone?: string) => {
    if (!name || !email || !pass) {
      return { success: false, message: "Please fill in all required fields." };
    }

    const newUser: UserProfile = {
      id: "usr-" + Math.floor(Math.random() * 100000),
      name: name,
      email: email,
      role: "investor",
      roleTitle: "Retail Investor (RII)",
      phone: phone || "+91 98765 43210",
      investorCategory: "Retail",
      createdAt: new Date().toISOString().split("T")[0]
    };
    saveSession(newUser);
    return { success: true };
  };

  const googleLogin = async () => {
    const googleUser: UserProfile = DEMO_PERSONAS.investor;
    saveSession(googleUser);
    return { success: true };
  };

  const switchRole = (roleKey: UserRole) => {
    const targetPersona = DEMO_PERSONAS[roleKey] || DEMO_PERSONAS.investor;
    saveSession(targetPersona);
    return targetPersona;
  };

  const logout = () => {
    saveSession(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const newProfile = { ...user, ...updated };
    saveSession(newProfile);
  };

  const toggleWatchlist = (ipoSlug: string) => {
    let updated: string[];
    if (savedWatchlist.includes(ipoSlug)) {
      updated = savedWatchlist.filter((slug) => slug !== ipoSlug);
    } else {
      updated = [...savedWatchlist, ipoSlug];
    }
    setSavedWatchlist(updated);
    localStorage.setItem("ipopreipo_user_watchlist", JSON.stringify(updated));
  };

  const isSavedInWatchlist = (ipoSlug: string) => savedWatchlist.includes(ipoSlug);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        googleLogin,
        switchRole,
        logout,
        updateProfile,
        savedWatchlist,
        toggleWatchlist,
        isSavedInWatchlist
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
