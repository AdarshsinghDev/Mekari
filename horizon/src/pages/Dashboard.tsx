import WorkspaceCard from "../components/WorkspaceCard";
import Button from "../components/Button";

const Dashboard = () => {
  return (
    <div className="space-y-4">

      {/* Page heading */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Overview</h2>
        <p className="text-sm text-slate-400 mt-0.5">Here's what's happening today.</p>
      </div>

      {/* Card — title aur footer props use kar rahe hain */}
      <WorkspaceCard
        title="Recent Activity"
        footer={<Button variant="primary" size="medium">Get Started</Button>}
      >
        {/* Yeh children hai — card ke andar dikhega */}
        <p className="text-sm text-slate-500 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab aliquam veniam
          cumque totam ad possimus animi est reprehenderit eum? Provident odit officiis animi!
        </p>
      </WorkspaceCard>

    </div>
  );
};

export default Dashboard;
