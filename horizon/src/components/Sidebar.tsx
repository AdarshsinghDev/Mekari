import { useState } from "react";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

const navItem = ["Dashboard", "Projects", "Analytics", "Setting"];

const Sidebar = () => {
  const [active, setActive] = useState(navItem[0]);

  return (
    <aside className="bg-slate-900 flex flex-col min-h-screen border-r border-slate-700/50">
      <Logo />

      <nav className="flex-1 p-4 space-y-1 mt-2">
        {navItem.map((item) => (
          <SidebarItem
            key={item}
            title={item}
            active={active === item}
            onClick={() => setActive(item)}
          />
        ))}
      </nav>

      {/* Bottom user section */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/60 cursor-pointer transition-all">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Adarsh</p>
            <p className="text-xs text-slate-400 truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
