import { memo } from "react";
import { useLocation } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";

type HeaderProps = {
  onMenuClick: () => void;
};

// Har route ka title aur subtitle — URL se match karke dikhayenge
const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard",  subtitle: "Here's what's happening today." },
  "/projects":  { title: "Projects",   subtitle: "Manage your ongoing work."       },
  "/analytics": { title: "Analytics",  subtitle: "Insights and performance data."  },
  "/setting":   { title: "Settings",   subtitle: "Manage your preferences."        },
};

// Default — agar koi route match na kare
const DEFAULT_PAGE = { title: "Horizon", subtitle: "Welcome back 👋" };

// memo — jab tak onMenuClick prop na badle, Header re-render nahi karega
// Matlab: Name field mein type karo, Header freeze rahega
const Header = memo(({ onMenuClick }: HeaderProps) => {

  // useLocation — current URL ka pathname milta hai
  // e.g. /setting → pathname = "/setting"
  const location = useLocation();

  // URL ke hisaab se title dhundho, nahi mila toh default use karo
  const currentPage = PAGE_TITLES[location.pathname] ?? DEFAULT_PAGE;

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-100 bg-white px-4 sm:px-6 shadow-sm shrink-0">

      <div className="flex items-center gap-3">

        {/* Hamburger button — sirf mobile pe dikhta hai */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <HiMenuAlt2 size={22} className="text-slate-500" />
        </button>

        {/* Dynamic title — URL ke hisaab se badlta hai */}
        <div>
          <h1 className="text-base font-semibold text-slate-800 leading-tight">
            {currentPage.title}
          </h1>
          <p className="text-xs text-slate-400 leading-tight">
            {currentPage.subtitle}
          </p>
        </div>

      </div>

      {/* User avatar */}
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-semibold cursor-pointer shadow-sm shadow-blue-300">
        A
      </div>

    </header>
  );
});

Header.displayName = "Header";

export default Header;
