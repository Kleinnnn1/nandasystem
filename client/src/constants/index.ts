export const APP_NAME = "N&A School Supplies";
export const APP_VERSION = "v1.0.0";
export const APP_SUBTITLE = "Point of Sale System";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  POS: "/pos",
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  INVENTORY: "/inventory",
  USERS: "/users",
  REPORTING: "/reporting",
} as const;
