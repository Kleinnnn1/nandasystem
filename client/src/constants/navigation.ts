import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tag,
  BarChart2,
  TrendingUp,
  Receipt,
  Users,
} from "lucide-react";
import { ROUTES } from "./index";
import type { NavSection } from "../types/navigation.types";

export const NAV_SECTIONS: NavSection[] = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", path: ROUTES.DASHBOARD, icon: LayoutDashboard },
      { label: "POS", path: ROUTES.POS, icon: ShoppingCart },
    ],
  },
  {
    section: "Management",
    items: [
      { label: "Products", path: ROUTES.PRODUCTS, icon: Package },
      { label: "Categories", path: ROUTES.CATEGORIES, icon: Tag },
      { label: "Inventory", path: ROUTES.INVENTORY, icon: BarChart2 },
    ],
  },
  {
    section: "Admin",
    items: [
      { label: "Users", path: ROUTES.USERS, icon: Users, adminOnly: true },
    ],
  },
];
