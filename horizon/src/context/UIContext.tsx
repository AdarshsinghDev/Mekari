import { createContext, useContext, useReducer } from "react";

// ─── State shape ──────────────────────────────────────────────
type UIState = {
  isSidebarOpen: boolean;
};

// Starting state — sidebar band
const initialUIState: UIState = {
  isSidebarOpen: false,
};

// ─── Actions ──────────────────────────────────────────────────
// Action = ek object jo batata hai "kya karna hai"
// type field batata hai kaunsa kaam — sirf yahi allowed hain
type UIAction =
  | { type: "OPEN_SIDEBAR"  }
  | { type: "CLOSE_SIDEBAR" };

// ─── Reducer ──────────────────────────────────────────────────
// Reducer = pure function
// Pure function ka matlab:
//   - same input → hamesha same output
//   - state directly mutate NAHI karta — nayi copy banata hai
//   - koi side effect nahi (API call, console.log etc.)
//
// Arguments:
//   state  = current state (read only)
//   action = kya karna hai
// Returns: naya state object (copy)

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {

    case "OPEN_SIDEBAR":
      // state.isSidebarOpen = true  ← GALAT — direct mutation
      return { ...state, isSidebarOpen: true };
      //        ↑ purana state copy   ↑ sirf yeh field badlo

    case "CLOSE_SIDEBAR":
      return { ...state, isSidebarOpen: false };

    default:
      // Koi unknown action aaye — state as-is wapas karo
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────
type UIContextType = UIState & {
  openSidebar:  () => void;
  closeSidebar: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────
export const UIProvider = ({ children }: { children: React.ReactNode }) => {

  // useReducer — useState ki jagah
  // state   = current UI state
  // dispatch = action bhejne ka function
  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  // dispatch ko seedha expose nahi karte — clean functions banate hain
  const openSidebar  = () => dispatch({ type: "OPEN_SIDEBAR"  });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });

  return (
    <UIContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </UIContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────
export const useUI = (): UIContextType => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
};
