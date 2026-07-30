import WorkspaceCard from "../components/WorkspaceCard";

const Projects = () => {
  return (
    <div className="space-y-4">

      {/* Page heading */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Projects</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your ongoing work.</p>
      </div>

      {/* Card — sirf children, koi title ya footer nahi */}
      <WorkspaceCard>
        <p className="text-sm text-slate-500 leading-relaxed">
          Manage your ongoing and upcoming projects here. Track progress, assign tasks,
          and collaborate with your team.
        </p>
      </WorkspaceCard>

    </div>
  );
};

export default Projects;
