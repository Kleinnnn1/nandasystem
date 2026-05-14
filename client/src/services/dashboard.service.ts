import { api } from "./api";

export const dashboardService = {
  getStats: async () => {
    return api.get("/api/dashboard");
  },
};
