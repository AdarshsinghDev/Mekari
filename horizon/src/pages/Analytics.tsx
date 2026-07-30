import WorkspaceCard from "../components/WorkspaceCard";

const Analytics = () => {
  return (
    <div className="space-y-4">

      {/* Page heading */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Analytics</h2>
        <p className="text-sm text-slate-400 mt-0.5">Insights and performance data.</p>
      </div>

      {/* Card — sirf children */}
      <WorkspaceCard>
        <p className="text-sm text-slate-500 leading-relaxed">
          View detailed insights and reports about your application usage, performance
          metrics, and trends over time.
        </p>
      </WorkspaceCard>

    </div>
  );
};

export default Analytics;
