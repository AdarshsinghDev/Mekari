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
    
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          bg-blue-200 flex flex-col shrink-0

          /* mobile: screen ke upar float karta hai, left se slide karta hai */
          fixed top-0 left-0 h-full w-[260px] z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          /* 768px se bada screen: normal layout mein aa jao, hamesha visible */
          md:static md:z-auto md:h-auto md:translate-x-0 md:min-h-screen
        `}
      >
        <div className="flex items-center justify-between border-b border-slate-700/50 pr-3">
          <Logo />

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
                onClose();
              }}
            />
          ))}
        </nav>

      </aside>
    </>
  );
};

export default Sidebar;
