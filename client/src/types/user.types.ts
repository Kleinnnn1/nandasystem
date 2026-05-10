export type UserRole = "admin" | "cashier";

export interface User {
  id: number;
  name: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  lastLogin: string;
}

export interface UserFormData {
  name: string;
  username: string;
  role: UserRole;
}

export interface PasswordFormData {
  newPassword: string;
  confirmPassword: string;
}
