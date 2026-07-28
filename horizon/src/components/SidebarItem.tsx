type SidebarItemProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const SidebarItem = ({ title, active, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg transition ${
        active ? "bg-red-600 text-white" : "bg-blue-500 hover:bg-gray-500"
      }`}
    >
      {title}
    </button>
  );
};

export default SidebarItem;
