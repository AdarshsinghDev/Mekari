const MainContent = () => {
  return (
    <main className="flex-1 bg-slate-50 p-4 sm:p-6 overflow-y-auto">

  
      <div className="max-w-[1400px] mx-auto min-w-0">

        {/* recent activity card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-800">Recent Activity</h2>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
              View all
            </button>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab aliquam veniam
            cumque totam ad possimus animi est reprehenderit eum? Provident odit officiis animi!
          </p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors cursor-pointer shadow-sm shadow-blue-500/20">
            Get Started
          </button>
        </div>

      </div>
    </main>
  );
};

export default MainContent;
