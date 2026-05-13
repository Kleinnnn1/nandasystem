import { useRef } from "react";
import { Printer, X } from "lucide-react";
import type { ReceiptData } from "../../types/receipt.types";
import { formatCurrency } from "../../utils/currency";
import { formatReceiptDate } from "../../utils/receipt";
import { APP_NAME } from "../../constants";

interface Props {
  receipt: ReceiptData;
  onClose: () => void;
}

export default function ReceiptModal({ receipt, onClose }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt ${receipt.receiptNo}</title>
          <style>
            body { font-family: monospace; font-size: 12px; width: 280px; margin: 0 auto; padding: 10px; }
            .header { text-align: center; margin-bottom: 10px; }
            .store-name { font-size: 14px; font-weight: bold; }
            .divider { border-top: 1px dashed #000; margin: 8px 0; }
            .row { display: flex; justify-content: space-between; margin: 3px 0; }
            .item-name { font-weight: bold; }
            .item-sub { color: #555; font-size: 11px; }
            .total-section { margin: 8px 0; }
            .grand-total { font-size: 14px; font-weight: bold; }
            .change { font-size: 14px; font-weight: bold; }
            .footer { text-align: center; margin-top: 10px; font-size: 11px; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

        <div className="flex justify-end px-4 pt-3">
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div ref={printRef} className="px-5 pb-2">

          <div className="text-center mb-4">
            <div
              className="inline-block w-full py-4 rounded-xl mb-3"
              style={{ background: "#dc2626" }}
            >
              <p className="text-white font-medium text-sm">{APP_NAME}</p>
              <p className="text-red-200 text-xs mt-0.5">
                Point of Sale System
              </p>
              <p className="text-red-200 text-xs mt-1">
                {formatReceiptDate(receipt.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <div className="flex justify-between">
              <span className="text-xs text-zinc-500">Receipt No.</span>
              <span className="text-xs text-white font-medium">
                #{receipt.receiptNo}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-zinc-500">Cashier</span>
              <span className="text-xs text-white">{receipt.cashier}</span>
            </div>
          </div>

          <hr className="border-dashed border-zinc-700 my-3" />

          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Items Purchased
          </p>
          <div className="flex flex-col gap-2 mb-3">
            {receipt.items.map((item, i) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-white font-medium">{item.name}</p>
                  <p className="text-xs text-zinc-500">
                    x{item.quantity} @ {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="text-xs text-white">
                  {formatCurrency(item.total)}
                </p>
              </div>
            ))}
          </div>

          <hr className="border-dashed border-zinc-700 my-3" />

          <div
            className="rounded-xl p-3 flex flex-col gap-1.5 mb-3"
            style={{ background: "#111" }}
          >
            <div className="flex justify-between">
              <span className="text-xs text-zinc-500">Subtotal</span>
              <span className="text-xs text-white">
                {formatCurrency(receipt.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-zinc-500">Discount</span>
              <span className="text-xs text-white">
                {formatCurrency(receipt.discount)}
              </span>
            </div>
            <hr className="border-zinc-800 my-1" />
            <div className="flex justify-between">
              <span className="text-sm text-white font-medium">Total</span>
              <span
                className="text-sm font-medium"
                style={{ color: "#dc2626" }}
              >
                {formatCurrency(receipt.total)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-zinc-500">Cash</span>
              <span className="text-xs text-white">
                {formatCurrency(receipt.cash)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-zinc-500">Change</span>
              <span className="text-sm font-medium text-green-500">
                {formatCurrency(receipt.change)}
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500 mb-1">
            Thank you for your purchase!
          </p>
          <p className="text-center text-xs text-zinc-600 mb-3">
            Please come again 😊
          </p>
        </div>

        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={handlePrint}
            className="flex-1 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center gap-2 text-xs text-white font-medium hover:bg-zinc-700 transition-colors"
          >
            <Printer size={14} /> Print
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl flex items-center justify-center gap-2 text-xs text-white font-medium transition-colors"
            style={{ background: "#dc2626" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
          >
            New Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
