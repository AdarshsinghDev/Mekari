const Logo = () => {
  return (
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-700/50">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-500/30">
        <span className="text-white font-bold text-sm">H</span>
      </div>
      <span className="text-blue-500 font-semibold text-lg tracking-wide underline">Horizon</span>
    </div>
  );
};

export default Logo;