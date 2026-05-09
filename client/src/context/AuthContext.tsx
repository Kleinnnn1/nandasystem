import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { User, AuthState } from "../types/auth.types";
import { authService } from "../services/auth.service";

interface AuthContextType extends AuthState {
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const user: User = await authService.login({ password });
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Login failed",
      }));
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
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
