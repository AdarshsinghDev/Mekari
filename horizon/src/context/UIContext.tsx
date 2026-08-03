import { createContext, useContext, useEffect, useReducer } from "react";
import { logger } from "../utils/logger";
import { openSidebarAction, closeSidebarAction } from "../store/actions";

// ─── State ────────────────────────────────────────────────────
type UIState = {
  isSidebarOpen: boolean;
};

const initialUIState: UIState = {
  isSidebarOpen: false,
};

// ─── Action types ─────────────────────────────────────────────
// ReturnType<typeof fn> = us function ka return type TypeScript se nikalta hai
// Har action creator se type leke union banate hain
type UIAction =
  | ReturnType<typeof openSidebarAction>
  | ReturnType<typeof closeSidebarAction>;

// ─── Reducer ──────────────────────────────────────────────────
// Pure function — state mutate nahi karta, nayi copy banata hai
function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return { ...state, isSidebarOpen: true };
    case "CLOSE_SIDEBAR":
      return { ...state, isSidebarOpen: false };
    default:
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

  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  // Mount pe initial state log
  useEffect(() => {
    logger.group("UIContext — Initial State");
    logger.log("isSidebarOpen", state.isSidebarOpen);
    logger.groupEnd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // State subscription — state badlne pe log karo
  // [state] dependency — jab bhi state badle, yeh chalega
  useEffect(() => {
    logger.group("UIContext — State Changed");
    logger.log("isSidebarOpen", state.isSidebarOpen);
    logger.groupEnd();
  }, [state]);

  // Action creators use karo — seedha object likhne ki jagah
  const openSidebar  = () => dispatch(openSidebarAction());
  const closeSidebar = () => dispatch(closeSidebarAction());

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
