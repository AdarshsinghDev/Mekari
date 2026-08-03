import { createContext, useContext, useEffect, useReducer } from "react";
import type { SettingFormData, UserPreferences } from "../types";
import { initialProfile, initialPreferences } from "../data/settingsMock";
import { logger } from "../utils/logger";

// ─── State shape ──────────────────────────────────────────────
type WorkspaceState = {
  profile:     SettingFormData;
  preferences: UserPreferences;
};

// Starting state — fresh copy banao, direct reference nahi
// Kyun copy? Agar direct initialProfile use karein, toh ek jagah badalne se
// doosri jagah bhi badal jaata — unsafe reference sharing
const initialWorkspaceState: WorkspaceState = {
  profile:     { ...initialProfile     }, // shallow copy — safe
  preferences: { ...initialPreferences }, // shallow copy — safe
};

// ─── Actions ──────────────────────────────────────────────────
// Har action ek named operation hai — random state mutation nahi
// Partial<T> = us type ke kuch hi fields dene ka option

type WorkspaceAction =
  | { type: "UPDATE_PROFILE";     payload: Partial<SettingFormData> }
  | { type: "UPDATE_PREFERENCES"; payload: Partial<UserPreferences> }
  | { type: "RESET_PROFILE" };

// ─── Reducer ──────────────────────────────────────────────────
// Pure function — state mutate nahi karta, nayi copy banata hai

function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {

    case "UPDATE_PROFILE":
      return {
        ...state,                          // baaki state safe
        profile: {
          ...state.profile,                // purana profile copy
          ...action.payload,               // sirf jo fields aaye wahi overwrite
        },
      };
      // Example: payload = { name: "Ravi" }
      // result.profile = { name: "Ravi", email: "old", role: "old", password: "old" }

    case "UPDATE_PREFERENCES":
      return {
        ...state,
        preferences: {
          ...state.preferences,            // purani preferences copy
          ...action.payload,               // sirf jo fields aaye wahi overwrite
        },
      };

    case "RESET_PROFILE":
      return {
        ...state,
        // Fresh copy banao — initialProfile ka direct reference nahi
        // Agar direct dete: state.profile === initialProfile (same object)
        // Reset ke baad profile change karte toh initialProfile bhi change ho jaata
        profile: { ...initialProfile },
      };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────
type WorkspaceContextType = WorkspaceState & {
  updateProfile:     (data: Partial<SettingFormData>) => void;
  updatePreferences: (data: Partial<UserPreferences>) => void;
  resetProfile:      () => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────
export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {

  const [state, dispatch] = useReducer(workspaceReducer, initialWorkspaceState);

  // App mount hone pe ek baar initial state log karo
  useEffect(() => {
    logger.group("WorkspaceContext — Initial State");
    logger.log("profile",     state.profile);
    logger.log("preferences", state.preferences);
    logger.groupEnd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← intentionally empty — sirf mount pe log karo

  // Clean action dispatch functions — components ko reducer pata nahi hoga
  const updateProfile     = (data: Partial<SettingFormData>) =>
    dispatch({ type: "UPDATE_PROFILE",     payload: data });

  const updatePreferences = (data: Partial<UserPreferences>) =>
    dispatch({ type: "UPDATE_PREFERENCES", payload: data });

  const resetProfile = () =>
    dispatch({ type: "RESET_PROFILE" });

  return (
    <WorkspaceContext.Provider value={{
      ...state,
      updateProfile,
      updatePreferences,
      resetProfile,
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────
export const useWorkspace = (): WorkspaceContextType => {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside <WorkspaceProvider>");
  return ctx;
};
