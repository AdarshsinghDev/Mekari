import { createContext, useContext, useState } from "react";

// ─── Types ────────────────────────────────────────────────────

// Is context mein kya-kya data rahega
type UIState = {
  isSidebarOpen: boolean;       // mobile sidebar khula hai ya band
};

// Is context mein kya-kya functions honge
type UIActions = {
  openSidebar:  () => void;
  closeSidebar: () => void;
};

// Dono ek saath — yahi context ka shape hai
type UIContextType = UIState & UIActions;

// ─── Context banana ───────────────────────────────────────────
// createContext = ek "global box" banata hai
// undefined default — agar Provider ke bahar use karo toh error
const UIContext = createContext<UIContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────
// Provider = woh component jo "box" ko poore app mein available karata hai
// Jahan bhi yeh wrap hoga, wahan ke sab components context use kar sakte hain

type UIProviderProps = {
  children: React.ReactNode; // Provider ke andar jo bhi ho
};

export const UIProvider = ({ children }: UIProviderProps) => {

  // Sidebar ka state yahan hai — sirf UI ke liye, permanent data se alag
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar  = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <UIContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
      {children}
    </UIContext.Provider>
  );
};

// ─── Custom Hook ──────────────────────────────────────────────
// Yeh hook har component use karega context lene ke liye
// seedha useContext likhne ki jagah — cleaner aur error-safe

export const useUI = (): UIContextType => {
  const ctx = useContext(UIContext);
  // Agar Provider ke bahar use kiya toh clearly batao
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
};
