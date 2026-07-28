
type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm shrink-0">

      {/* Left Side — hamburger + title */}
      <div className="flex items-center gap-3 ">

      
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div > 
          <h1 className="text-lg font-semibold text-slate-800 md:pt-0 pt-2 ">Dashboard</h1>
          <p className="text-xs text-slate-400 ">Welcome back, Adarsh 👋</p>
        </div>
      </div>

      {/* Right Side — search + avatar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="md:w-40 w-30 sm:w-56 pl-9 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
          />
          <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-blue-500/30 cursor-pointer">
          🔍
        </button>

        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
          A
        </div>
      </div>

    </header>
  );
};

export default Header;
