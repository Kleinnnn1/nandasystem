import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Titlebar from "./Titlebar";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-zinc-950 overflow-hidden">
      <Titlebar />
      <div className="flex flex-1 overflow-hidden min-h-0">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden min-h-0">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 bg-zinc-950">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
