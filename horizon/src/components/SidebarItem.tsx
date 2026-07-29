import type { ReactNode } from "react";

type SidebarItemProps = {
  title: string;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
};

const SidebarItem = ({ title, icon, active, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
      }`}
    >
      <span className={`shrink-0 ${active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
        {icon}
      </span>
      {title}
    </button>
  );
};

export default SidebarItem;
