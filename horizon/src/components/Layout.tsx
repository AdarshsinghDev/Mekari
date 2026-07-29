import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen min-w-[320px]">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header onMenuClick={() => setIsOpen(true)} />

        {/* Outlet = active route ka page yahan render hoga */}
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
