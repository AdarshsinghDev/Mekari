import { useState, useEffect } from "react";
import WorkspaceCard from "../components/WorkspaceCard";
import axiosClient   from "../api/axiosClient";
import type { Activity } from "../types";

// ─── Skeleton Loader ──────────────────────────────────────────
// Loading hone pe yeh dikhega — real data ki jagah placeholder
const ActivitySkeleton = () => (
  <div className="space-y-3 animate-pulse">
    {/* animate-pulse = Tailwind class — fade in/out effect */}
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-start gap-3">
        {/* Avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-1.5">
          {/* Text placeholder lines */}
          <div className="h-3 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

// ─── Component ────────────────────────────────────────────────
const Dashboard = () => {

  // API se aane wala data
  const [activities, setActivities] = useState<Activity[]>([]);
  // Loading state — true = data aa raha hai
  const [loading,    setLoading]    = useState(true);
  // Error state — kuch galat hua
  const [error,      setError]      = useState<string | null>(null);

  useEffect(() => {
    // Component mount hone pe API call karo
    axiosClient.get<Activity[]>("/api/activities")
      .then((data) => {
        setActivities(data as unknown as Activity[]);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load activities.");
        setLoading(false);
      });
  }, []); // [] = sirf ek baar, mount pe

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">Overview</h2>
        <p className="text-sm text-slate-400 mt-0.5">Here's what's happening today.</p>
      </div>

      <WorkspaceCard title="Recent Activity">

        {/* Loading state — skeleton dikhao */}
        {loading && <ActivitySkeleton />}

        {/* Error state */}
        {!loading && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Data loaded — activities dikhao */}
        {!loading && !error && (
          <ul className="space-y-3">
            {activities.map((item) => (
              <li key={item.id} className="flex items-start gap-3">

                {/* User avatar — naam ka pehla letter */}
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold shrink-0">
                  {item.user.charAt(0)}
                </div>

                <div>
                  {/* Action text */}
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">{item.user}</span>
                    {" "}{item.action}{" "}
                    <span className="text-slate-500">{item.target}</span>
                  </p>
                  {/* Timestamp */}
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>

              </li>
            ))}
          </ul>
        )}

      </WorkspaceCard>
    </div>
  );
};

export default Dashboard;
