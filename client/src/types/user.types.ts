export type UserRole = "admin" | "cashier";

export interface User {
  id: number;
  name: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  lastLogin: string | null;
}

export interface UserFormData {
  name: string;
  username: string;
  role: UserRole;
  password?: string;
}

export interface PasswordFormData {
  newPassword: string;
  confirmPassword: string;
}
