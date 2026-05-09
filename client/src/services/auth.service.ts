import { API_BASE_URL } from "../constants";
import type { User, LoginCredentials } from "../types/auth.types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Invalid password");
    }

    return response.json();
  },

  logout: async (): Promise<void> => {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
    });
  },
};
