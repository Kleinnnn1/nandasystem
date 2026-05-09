import type { Product } from "../types/pos.types";

export const FAKE_PRODUCTS: Product[] = [
  { id: 1, name: "Ballpen Black", price: 8, stock: 120, category: "Writing" },
  { id: 2, name: "Ballpen Blue", price: 8, stock: 98, category: "Writing" },
  { id: 3, name: "Ballpen Red", price: 8, stock: 2, category: "Writing" },
  { id: 4, name: "Pencil #2", price: 5, stock: 200, category: "Writing" },
  { id: 5, name: "Notebook A4", price: 45, stock: 55, category: "Notebooks" },
  { id: 6, name: "Notebook A5", price: 35, stock: 40, category: "Notebooks" },
  { id: 7, name: "Folder Long", price: 12, stock: 80, category: "Folders" },
  { id: 8, name: "Folder Short", price: 10, stock: 60, category: "Folders" },
  { id: 9, name: "Eraser Big", price: 10, stock: 3, category: "Others" },
  { id: 10, name: "Ruler 30cm", price: 15, stock: 45, category: "Others" },
  { id: 11, name: "Scotch Tape", price: 18, stock: 4, category: "Others" },
  { id: 12, name: "Crayon Set", price: 55, stock: 1, category: "Art" },
  { id: 13, name: "Watercolor", price: 75, stock: 20, category: "Art" },
  { id: 14, name: "Bond Paper", price: 5, stock: 500, category: "Paper" },
  { id: 15, name: "Pad Paper", price: 25, stock: 80, category: "Paper" },
  { id: 16, name: "Scissor", price: 35, stock: 30, category: "Others" },
];

export const FAKE_CATEGORIES = [
  "All",
  "Writing",
  "Notebooks",
  "Folders",
  "Art",
  "Paper",
  "Others",
];
