import { HiMenuAlt2 } from "react-icons/hi";

type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6 shadow-sm shrink-0">

      <div className="flex items-center gap-3">
        {/* hamburger — sirf mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <HiMenuAlt2 size={22} className="text-slate-500" />
        </button>

        <div>
          <h1 className="text-base font-semibold text-slate-800 leading-tight">Dashboard</h1>
          <p className="text-xs text-slate-400 leading-tight">Welcome back 👋</p>
        </div>
      </div>

      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-semibold cursor-pointer shadow-sm shadow-blue-300">
        A
      </div>

    </header>
  );
};

export default Header;
