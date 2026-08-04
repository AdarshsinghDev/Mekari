// ─── Toast Notification Utility ──────────────────────────────
// Yeh ek lightweight toast system hai — koi library nahi.
// Ek custom DOM element banata hai aur screen pe dikhata hai.
//
// Real app mein "react-hot-toast" ya "sonner" use kar sakte ho,
// lekin yahan hum khud banate hain taaki dependency na badhe.

// Toast kitni der tak dikhega (milliseconds)
const TOAST_DURATION = 4000;

// Toast ke colors — type ke hisaab se
const COLORS: Record<string, string> = {
  error:   "#ef4444", // red
  warning: "#f97316", // orange
  success: "#22c55e", // green
  info:    "#3b82f6", // blue
};

// showToast — screen pe ek message dikhata hai
// message = jo text dikhana hai
// type    = "error" | "warning" | "success" | "info"
export const showToast = (message: string, type: "error" | "warning" | "success" | "info" = "info"): void => {

  // Ek div banao
  const toast = document.createElement("div");

  // Style set karo
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: ${COLORS[type]};
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    max-width: 320px;
    line-height: 1.4;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  `;

  toast.textContent = message;
  document.body.appendChild(toast);

  // Fade in — thoda baad taaki transition dikh sake
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  // TOAST_DURATION ke baad fade out aur remove karo
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    // Transition complete hone ke baad DOM se hata do
    setTimeout(() => toast.remove(), 300);
  }, TOAST_DURATION);
};
