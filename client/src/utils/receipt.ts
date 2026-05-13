export const generateReceiptNo = (id: number): string => {
  return `TXN-${String(id).padStart(4, "0")}`;
};

export const formatReceiptDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
