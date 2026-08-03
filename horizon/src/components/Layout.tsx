import { useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useUI } from "../context/UIContext";

// Layout — app ka main skeleton
// Sidebar (left) + Header (top) + Outlet (center content)
// Sidebar/Header freeze — sirf Outlet badlta hai page change pe

const Layout = () => {

  // UIContext se sidebar state lo — local useState nahi chahiye ab
  const { isSidebarOpen, openSidebar, closeSidebar } = useUI();

  const handleOpen  = useCallback(() => openSidebar(),  [openSidebar]);
  const handleClose = useCallback(() => closeSidebar(), [closeSidebar]);

  return (
    <div className="flex min-h-screen min-w-[320px]">

      <Sidebar isOpen={isSidebarOpen} onClose={handleClose} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header onMenuClick={handleOpen} />

        {/* Sirf yeh hissa badlta hai route change pe */}
        <main className="flex-1 bg-slate-50 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto min-w-0">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};

export default Layout;
