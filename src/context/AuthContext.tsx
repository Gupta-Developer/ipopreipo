"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../data/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial mock users directory persisted in localStorage if empty
const DEFAULT_USERS: Record<string, User & { pass: string }> = {
  "mayank@ipopreipo.com": {
    id: "1",
    email: "mayank@ipopreipo.com",
    name: "Mayank Patel",
    role: "PRO",
    createdAt: "2026-06-01T00:00:00Z",
    pass: "password123"
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize session and directories on load
  useEffect(() => {
    // Sync default users if none exist in localStorage
    if (!localStorage.getItem("registered_users")) {
      localStorage.setItem("registered_users", JSON.stringify(DEFAULT_USERS));
    }

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
    // Simulate API query latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    const usersStr = localStorage.getItem("registered_users") || JSON.stringify(DEFAULT_USERS);
    const users = JSON.parse(usersStr);

    const foundUser = users[email.toLowerCase().trim()];
    if (!foundUser) {
      return { success: false, error: "User profile not found. Please register." };
    }

    if (password && foundUser.pass !== password) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    // Strip password before establishing session
    const sessionUser: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      createdAt: foundUser.createdAt
    };

    localStorage.setItem("active_session", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const signup = async (name: string, email: string, password?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const usersStr = localStorage.getItem("registered_users") || JSON.stringify(DEFAULT_USERS);
    const users = JSON.parse(usersStr);
    const normalizedEmail = email.toLowerCase().trim();

    if (users[normalizedEmail]) {
      return { success: false, error: "Email is already registered. Please login." };
    }

    const newUser = {
      id: String(Object.keys(users).length + 1),
      email: normalizedEmail,
      name: name.trim(),
      role: "USER" as const,
      createdAt: new Date().toISOString(),
      pass: password || "password123"
    };

    // Update directories
    users[normalizedEmail] = newUser;
    localStorage.setItem("registered_users", JSON.stringify(users));

    // Sign in automatically
    const sessionUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      createdAt: newUser.createdAt
    };

    localStorage.setItem("active_session", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("active_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
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
