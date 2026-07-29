const Dashboard = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Overview</h2>
        <p className="text-sm text-slate-400 mt-0.5">Here's what's happening today.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700">Recent Activity</h3>
          <button className="text-xs text-blue-500 hover:text-blue-600 font-medium cursor-pointer transition-colors">
            View all
          </button>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab aliquam veniam
          cumque totam ad possimus animi est reprehenderit eum? Provident odit officiis animi!
        </p>
        <button className="mt-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm px-5 py-2.5 rounded-xl font-medium transition-colors cursor-pointer shadow-sm shadow-blue-200">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
