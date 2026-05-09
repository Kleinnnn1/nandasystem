import type {
  WeeklySale,
  TopProduct,
  LowStockItem,
  RecentTransaction,
} from "../types/dashboard.types";

export const FAKE_WEEKLY_SALES: WeeklySale[] = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 1900 },
  { day: "Wed", sales: 1500 },
  { day: "Thu", sales: 2300 },
  { day: "Fri", sales: 1700 },
  { day: "Sat", sales: 2450 },
  { day: "Sun", sales: 900 },
];

export const FAKE_TOP_PRODUCTS: TopProduct[] = [
  {
    rank: 1,
    name: "Ballpen Black",
    category: "Writing",
    sales: 320,
    percentage: 90,
  },
  {
    rank: 2,
    name: "Notebook A4",
    category: "Notebooks",
    sales: 250,
    percentage: 70,
  },
  {
    rank: 3,
    name: "Folder Long",
    category: "Folders",
    sales: 180,
    percentage: 50,
  },
  {
    rank: 4,
    name: "Pencil #2",
    category: "Writing",
    sales: 120,
    percentage: 35,
  },
];

export const FAKE_LOW_STOCK: LowStockItem[] = [
  { name: "Ballpen Red", stock: 2, threshold: 5 },
  { name: "Eraser Big", stock: 3, threshold: 5 },
  { name: "Ruler 30cm", stock: 5, threshold: 10 },
  { name: "Scotch Tape", stock: 4, threshold: 10 },
  { name: "Crayon Set", stock: 1, threshold: 5 },
];

export const FAKE_RECENT_TRANSACTIONS: RecentTransaction[] = [
  { id: "TXN-0034", time: "08:45 AM", amount: 145 },
  { id: "TXN-0033", time: "08:30 AM", amount: 320 },
  { id: "TXN-0032", time: "08:12 AM", amount: 75 },
  { id: "TXN-0031", time: "07:58 AM", amount: 210 },
  { id: "TXN-0030", time: "07:45 AM", amount: 89 },
];
