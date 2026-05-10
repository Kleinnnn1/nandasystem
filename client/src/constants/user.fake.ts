import type { User } from "../types/user.types";

export const FAKE_USERS: User[] = [
  {
    id: 1,
    name: "Admin",
    username: "admin",
    role: "admin",
    isActive: true,
    lastLogin: "Today",
  },
  {
    id: 2,
    name: "Maria Santos",
    username: "maria",
    role: "cashier",
    isActive: true,
    lastLogin: "Today",
  },
  {
    id: 3,
    name: "Juan dela Cruz",
    username: "juan",
    role: "cashier",
    isActive: false,
    lastLogin: "May 7, 2026",
  },
];
