export type UserRole = "admin" | "cashier";

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

export interface LoginCredentials {
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
