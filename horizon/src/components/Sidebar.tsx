import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard, MdFolder, MdBarChart, MdSettings } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import type { NavItem } from "../types";

// NavItem type se — label, path, icon properly typed hain
const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: <MdDashboard size={18} /> },
  { label: "Projects",  path: "/projects",  icon: <MdFolder size={18} /> },
  { label: "Analytics", path: "/analytics", icon: <MdBarChart size={18} /> },
  { label: "Setting",   path: "/setting",   icon: <MdSettings size={18} /> },
];

type SidebarProps = {
  isOpen:  boolean;
  // React.MouseEvent nahi — yeh ek simple void function hai (click event pass nahi karte)
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside className={`
        flex flex-col shrink-0
        fixed top-0 left-0 h-full w-[240px] z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:z-auto md:h-auto md:translate-x-0 md:min-h-screen
        bg-[#0f172a] border-r border-slate-800
      `}>

        {/* logo + close button */}
        <div className="flex items-center justify-between border-b border-slate-800 pr-3">
          <Logo />
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <IoMdClose size={20} className="text-slate-500" />
          </button>
        </div>

        {/* nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item: NavItem) => (
            <SidebarItem
              key={item.path}
              title={item.label}
              icon={item.icon}
              active={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            />
          ))}
        </nav>

        <div className="border-t border-slate-800 mx-3 mb-4" />

      </aside>
    </>
  );
};

export default Sidebar;
