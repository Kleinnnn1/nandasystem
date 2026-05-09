import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { NAV_SECTIONS } from "../../constants/navigation";
import { useAuthContext } from "../../context/AuthContext";
import { APP_NAME } from "../../constants";

export default function Sidebar() {
  const { user, logout } = useAuthContext();

  return (
    <aside className="w-52 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0 h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-zinc-800">
        <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-medium shrink-0">
          N&A
        </div>
        <div>
          <p className="text-white text-xs font-medium leading-tight">
            {APP_NAME}
          </p>
          <p className="text-zinc-500 text-xs">POS System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto flex flex-col gap-1">
        {NAV_SECTIONS.map((section) => {
          const visibleItems = section.items.filter(
            (item) => !item.adminOnly || user?.role === "admin",
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={section.section}>
              <p className="text-zinc-600 text-xs uppercase tracking-widest px-2 py-2 mt-2">
                {section.section}
              </p>
              {visibleItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`
                  }
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-zinc-800 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-400 text-xs shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">
              {user?.name}
            </p>
            <p className="text-zinc-500 text-xs capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="text-zinc-500 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
