"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  investorCategory: "Retail" | "S-HNI" | "B-HNI" | "QIB" | "Pre-IPO Investor";
  panNumber?: string;
  dematDpId?: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, pass: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  googleLogin: () => Promise<{ success: boolean; message?: string }>;
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
    
    // Create or retrieve session
    const mockUser: UserProfile = {
      id: "usr-" + Math.floor(Math.random() * 100000),
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
      email: email,
      phone: "+91 98765 43210",
      investorCategory: "Retail",
      createdAt: new Date().toISOString().split("T")[0]
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
      phone: phone || "+91 98765 43210",
      investorCategory: "Retail",
      createdAt: new Date().toISOString().split("T")[0]
    };
    saveSession(newUser);
    return { success: true };
  };

  const googleLogin = async () => {
    const googleUser: UserProfile = {
      id: "usr-google-" + Math.floor(Math.random() * 100000),
      name: "Gupta Investor",
      email: "investor.gupta@gmail.com",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
      investorCategory: "S-HNI",
      createdAt: new Date().toISOString().split("T")[0]
    };
    saveSession(googleUser);
    return { success: true };
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
