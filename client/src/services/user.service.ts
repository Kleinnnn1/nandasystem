import { api } from "./api";
import type { User, UserFormData, PasswordFormData } from "../types/user.types";

export const userService = {
  getAll: async (): Promise<User[]> => {
    return api.get("/api/users");
  },

  create: async (data: UserFormData & { password: string }): Promise<User> => {
    return api.post("/api/users", data);
  },

  update: async (id: number, data: UserFormData): Promise<User> => {
    return api.put(`/api/users/${id}`, data);
  },

  changePassword: async (id: number, data: PasswordFormData): Promise<void> => {
    return api.patch(`/api/users/${id}/password`, {
      newPassword: data.newPassword,
    });
  },

  toggleActive: async (id: number): Promise<void> => {
    return api.patch(`/api/users/${id}/toggle`);
  },
};
