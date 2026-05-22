import { FileDown, TrendingUp, ShoppingBag, Package } from "lucide-react";
import { useReporting } from "../../hooks/useReporting";
import { formatCurrency } from "../../utils/currency";
import { APP_NAME } from "../../constants";
import type { SalesPeriod } from "../../services/report.service";

const PERIODS: { label: string; value: SalesPeriod }[] = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

const STAT_CARDS = (
  report: NonNullable<ReturnType<typeof useReporting>["report"]>,
) => [
  {
    label: "Total Revenue",
    value: formatCurrency(report.totalRevenue),
    icon: TrendingUp,
    accent: "#ef4444",
  },
  {
    label: "Total Orders",
    value: report.totalOrders.toString(),
    icon: ShoppingBag,
    accent: "#3b82f6",
  },
  {
    label: "Items Sold",
    value: report.totalItemsSold.toString(),
    icon: Package,
    accent: "#22c55e",
  },
];

export default function ReportingPage() {
  const { period, setPeriod, report, loading } = useReporting();

  const handleExportPDF = () => {
    if (!report) return;

    const periodLabel =
      PERIODS.find((p) => p.value === period)?.label ?? period;
    const now = new Date().toLocaleString();

    const rows = report.items
      .map(
        (item, i) => `
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 14px; color: #a1a1aa; font-size: 13px;">${i + 1}</td>
          <td style="padding: 10px 14px; color: #ffffff; font-size: 13px; font-weight: 500;">${item.productName}</td>
          <td style="padding: 10px 14px; color: #ffffff; font-size: 13px; text-align: center;">${item.qtySold}</td>
          <td style="padding: 10px 14px; color: #ef4444; font-size: 13px; text-align: right; font-weight: 600;">${formatCurrency(item.revenue)}</td>
        </tr>`,
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Sales Report - ${periodLabel}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #09090b; color: #ffffff; font-family: 'Segoe UI', sans-serif; padding: 40px; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 1px solid #27272a; padding-bottom: 24px; }
          .app-name { font-size: 22px; font-weight: 700; color: #ef4444; }
          .report-title { font-size: 14px; color: #71717a; margin-top: 4px; }
          .meta { text-align: right; font-size: 12px; color: #52525b; }
          .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
          .stat { background: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 16px 20px; }
          .stat-label { font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
          .stat-value { font-size: 22px; font-weight: 700; color: #ffffff; }
          .stat-value.red { color: #ef4444; }
          table { width: 100%; border-collapse: collapse; background: #18181b; border-radius: 10px; overflow: hidden; border: 1px solid #27272a; }
          thead tr { background: #09090b; border-bottom: 1px solid #27272a; }
          th { padding: 10px 14px; text-align: left; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; }
          th:last-child { text-align: right; }
          th:nth-child(3) { text-align: center; }
          .footer { margin-top: 28px; text-align: center; font-size: 11px; color: #3f3f46; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="app-name">${APP_NAME}</div>
            <div class="report-title">Sales Report — ${periodLabel}</div>
          </div>
          <div class="meta">
            Generated: ${now}<br/>
            Period: ${periodLabel}
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-label">Total Revenue</div>
            <div class="stat-value red">${formatCurrency(report.totalRevenue)}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Total Orders</div>
            <div class="stat-value">${report.totalOrders}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Items Sold</div>
            <div class="stat-value">${report.totalItemsSold}</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th style="text-align:center;">Qty Sold</th>
              <th style="text-align:right;">Revenue</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div class="footer">${APP_NAME} · Sales Report · ${periodLabel}</div>
      </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-white text-lg font-semibold">Sales Report</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            View and export sales data
          </p>
        </div>
        <button
          onClick={handleExportPDF}
          disabled={!report || loading}
          className="flex items-center justify-center gap-2 h-10 px-4 w-full sm:w-auto rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
        >
          <FileDown size={15} />
          Export PDF
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`h-9 px-4 rounded-xl text-sm font-medium border transition-all ${
              period === p.value
                ? "bg-red-600 border-red-600 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : report ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STAT_CARDS(report).map((card) => (
            <div
              key={card.label}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${card.accent}18`,
                  border: `1px solid ${card.accent}30`,
                }}
              >
                <card.icon size={18} style={{ color: card.accent }} />
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest">
                  {card.label}
                </p>
                <p className="text-white text-xl font-semibold mt-0.5">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              {["#", "Product", "Qty Sold", "Revenue"].map((h) => (
                <th
                  key={h}
                  className={`text-xs text-zinc-500 uppercase tracking-widest px-4 py-3 font-medium ${
                    h === "Revenue"
                      ? "text-right"
                      : h === "Qty Sold"
                        ? "text-center"
                        : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-zinc-800">
                  {[1, 2, 3, 4].map((j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-zinc-800 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : !report || report.items.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-zinc-600 text-sm py-12"
                >
                  No sales data found
                </td>
              </tr>
            ) : (
              report.items.map((item, i) => (
                <tr
                  key={item.productId}
                  className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-zinc-500">{i + 1}</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">
                    {item.productName}
                  </td>
                  <td className="px-4 py-3 text-sm text-white text-center">
                    {item.qtySold}
                  </td>
                  <td className="px-4 py-3 text-sm text-red-400 font-semibold text-right">
                    {formatCurrency(item.revenue)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
