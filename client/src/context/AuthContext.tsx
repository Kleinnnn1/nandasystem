import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { User, AuthState } from "../types/auth.types";

interface AuthContextType extends AuthState {
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const FAKE_USERS: Record<string, User> = {
  admin123: { id: 1, name: "Admin", role: "admin" },
  cashier123: { id: 2, name: "Cashier", role: "cashier" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = FAKE_USERS[password];

    if (user) {
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Invalid password. Try admin123 or cashier123",
      }));
    }
  }, []);

  const logout = useCallback(() => {
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
