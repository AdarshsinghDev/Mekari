import { useState } from "react";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

const navItem = ["Dashboard", "Projects", "Analytics", "Setting"];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [active, setActive] = useState(navItem[0]);

  return (
    <>
      {/*
        ye dark background hai jo drawer ke peeche aata hai
        sirf mobile par dikhta hai (md:hidden)
        agar isOpen false hai toh ye render hi nahi hoga
        click karo toh onClose chalega aur drawer band
      */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          bg-slate-900 flex flex-col shrink-0

          /* mobile: screen ke upar float karta hai, left se slide karta hai */
          fixed top-0 left-0 h-full w-[260px] z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          /* 768px se bada screen: normal layout mein aa jao, hamesha visible */
          md:static md:z-auto md:h-auto md:translate-x-0 md:min-h-screen
        `}
      >
        {/* logo aur close button ek row mein */}
        <div className="flex items-center justify-between border-b border-slate-700/50 pr-3">
          <Logo />

          {/* ye X button sirf mobile par dikhta hai — md:hidden se desktop par chupta hai */}
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* nav links */}
        <nav className="flex-1 p-4 space-y-1 mt-2">
          {navItem.map((item) => (
            <SidebarItem
              key={item}
              title={item}
              active={active === item}
              onClick={() => {
                setActive(item);
                // mobile par item select hone ke baad drawer khud band ho jaye
                onClose();
              }}
            />
          ))}
        </nav>

        {/* neeche user info */}
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
    </>
  );
};

export default Sidebar;
