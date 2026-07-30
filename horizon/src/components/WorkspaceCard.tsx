import { memo } from "react";

type WorkspaceCardProps = {
  title?:       string;
  description?: string;
  children:     React.ReactNode;
  footer?:      React.ReactNode;
};

// ─── memo kya karta hai yahan? ────────────────────────────────
// Setting page mein 3 WorkspaceCard hain.
// Jab "Name" field mein type karo:
//   - "Profile Details" card ke children badle → re-render ✅ (zaroori)
//   - "Appearance" card ke title/description/footer nahi badle
//     → memo usse skip karta hai ✅ (unnecessary render bachaya)
const WorkspaceCard = memo(({ title, description, children, footer }: WorkspaceCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

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

      <div className="space-y-4">
        {children}
      </div>

      {footer && (
        <div className="mt-5 pt-5 border-t border-slate-100">
          {footer}
        </div>
      )}

    </div>
  );
});

WorkspaceCard.displayName = "WorkspaceCard";

export default WorkspaceCard;
