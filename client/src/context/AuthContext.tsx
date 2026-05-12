import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { User, AuthState } from "../types/auth.types";

interface AuthContextType extends AuthState {
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const BASE_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    // Check if token exists in localStorage on app load
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      return {
        user: JSON.parse(user),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    }
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  });

  const login = useCallback(async (password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: data.error || "Invalid password",
        }));
        return;
      }

      // Save token and user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Could not connect to server.",
      }));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
}
