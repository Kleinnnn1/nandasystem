import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants";

const PAGE_TITLES: Record<string, string> = {
  [ROUTES.DASHBOARD]: "Dashboard",
  [ROUTES.POS]: "Point of Sale",
  [ROUTES.PRODUCTS]: "Products",
  [ROUTES.CATEGORIES]: "Categories",
  [ROUTES.INVENTORY]: "Inventory",
  [ROUTES.ANALYTICS]: "Analytics",
  [ROUTES.SALES_HISTORY]: "Sales History",
  [ROUTES.USERS]: "Users",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? "N&A POS";

  const now = new Date();
  const dateTime =
    now.toLocaleDateString("en-PH", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) +
    " · " +
    now.toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <header className="h-13 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-white text-base font-medium">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-zinc-500 text-xs">{dateTime}</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-zinc-500 text-xs">Online</span>
        </div>
      </div>
    </header>
  );
}
