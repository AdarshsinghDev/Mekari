import { useState, useEffect } from "react";
import WorkspaceCard from "../components/WorkspaceCard";
import axiosClient   from "../api/axiosClient";
import type { Project } from "../types";

// Status badge ka color
const STATUS_COLORS: Record<Project["status"], string> = {
  "active":    "bg-green-100  text-green-700",
  "completed": "bg-blue-100   text-blue-700",
  "on-hold":   "bg-amber-100  text-amber-700",
};

// ─── Skeleton Loader ──────────────────────────────────────────
const ProjectSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="p-4 rounded-xl border border-slate-100 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="h-2 bg-slate-200 rounded-full w-full mt-2" />
      </div>
    ))}
  </div>
);

// ─── Component ────────────────────────────────────────────────
const Projects = () => {

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    axiosClient.get<Project[]>("/api/projects")
      .then((data) => {
        setProjects(data as unknown as Project[]);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load projects.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">Projects</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your ongoing work.</p>
      </div>

      <WorkspaceCard title="All Projects">

        {loading && <ProjectSkeleton />}

        {!loading && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
              >
                {/* Top row — name + status badge */}
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800">{project.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 mb-3">{project.description}</p>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                {/* Bottom row — progress % + due date + team */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-400">{project.progress}% complete</span>
                  <span className="text-xs text-slate-400">Due: {project.dueDate}</span>
                </div>

                {/* Team avatars */}
                <div className="flex items-center gap-1 mt-2">
                  {project.team.map((member) => (
                    <div
                      key={member}
                      title={member}
                      className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-medium"
                    >
                      {member.charAt(0)}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

      </WorkspaceCard>
    </div>
  );
};

export default Projects;
