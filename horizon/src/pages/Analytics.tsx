import { useState, useEffect } from "react";
import WorkspaceCard from "../components/WorkspaceCard";
import axiosClient   from "../api/axiosClient";
import type { AnalyticsStat } from "../types";

// ─── Skeleton Loader ──────────────────────────────────────────
const StatsSkeleton = () => (
  <div className="grid grid-cols-2 gap-3 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="p-4 rounded-xl border border-slate-100 space-y-2">
        <div className="h-3 bg-slate-200 rounded w-1/2" />
        <div className="h-6 bg-slate-200 rounded w-1/3" />
        <div className="h-3 bg-slate-200 rounded w-1/4" />
      </div>
    ))}
  </div>
);

// ─── Component ────────────────────────────────────────────────
const Analytics = () => {

  const [stats,   setStats]   = useState<AnalyticsStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    axiosClient.get<AnalyticsStat[]>("/api/analytics")
      .then((data) => {
        setStats(data as unknown as AnalyticsStat[]);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load analytics.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">Analytics</h2>
        <p className="text-sm text-slate-400 mt-0.5">Insights and performance data.</p>
      </div>

      <WorkspaceCard title="Key Metrics">

        {loading && <StatsSkeleton />}

        {!loading && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
              >
                {/* Label */}
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>

                {/* Value — big number */}
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>

                {/* Change indicator */}
                <p className={`text-xs font-medium mt-1 ${
                  stat.trend === "up"   ? "text-green-600" :
                  stat.trend === "down" ? "text-red-500"   :
                  "text-slate-400"
                }`}>
                  {/* Arrow + change value */}
                  {stat.trend === "up" ? "▲" : stat.trend === "down" ? "▼" : "—"} {stat.change}
                </p>
              </div>
            ))}
          </div>
        )}

      </WorkspaceCard>
    </div>
  );
};

export default Analytics;
