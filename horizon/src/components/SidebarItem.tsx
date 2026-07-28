type SidebarItemProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const SidebarItem = ({ title, active, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
        active
          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
          : "text-slate-800 hover:bg-gray-400  hover:text-white"
      }`}
    >
      {title}
    </button>
  );
};

export default SidebarItem;
