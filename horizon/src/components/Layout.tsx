import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

// Layout — poore app ka skeleton
//
// Structure:
// ┌─────────────┬──────────────────────────┐
// │             │  Header (freeze)          │
// │  Sidebar    ├──────────────────────────┤
// │  (freeze)   │  <Outlet />               │
// │             │  (sirf yeh hissa badlta)  │
// └─────────────┴──────────────────────────┘
//
// Sidebar aur Header memo wrapped hain —
// route change hone pe sirf Outlet ka content badlta hai,
// Sidebar aur Header dobara render NAHI hote.

const Layout = () => {

  // Mobile sidebar open/close state
  const [isOpen, setIsOpen] = useState(false);

  // useCallback — stable function references
  // memo wrapped Sidebar/Header ko naya function nahi milega har render pe
  const handleOpen  = useCallback(() => setIsOpen(true),  []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <div className="flex min-h-screen min-w-[320px]">

      {/* Sidebar — left panel, routes change hone pe freeze */}
      <Sidebar isOpen={isOpen} onClose={handleClose} />

      {/* Right side — Header + main content */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Header — top bar, freeze */}
        <Header onMenuClick={handleOpen} />

        {/* Main content area — sirf yeh hissa badlta hai */}
        {/* Outlet = React Router yahan active page render karta hai */}
        {/* Dashboard page → Dashboard component */}
        {/* Setting page  → Setting component  */}
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
