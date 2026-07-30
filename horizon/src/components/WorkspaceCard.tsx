// WorkspaceCard — reusable card container with title, description, content

type WorkspaceCardProps = {
  title?: string;

  description?: string;

  children: React.ReactNode;

  footer?: React.ReactNode;
};

const WorkspaceCard = ({ title, description, children, footer }: WorkspaceCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

      {/* Title aur Description*/}
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
          )}
          {description && (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-5 pt-5 border-t border-slate-100">
          {footer}
        </div>
      )}

    </div>
  );
};

export default WorkspaceCard;
