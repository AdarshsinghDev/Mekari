import { createContext, useContext, useEffect, useReducer } from "react";
import type { SettingFormData, UserPreferences } from "../types";
import { initialProfile, initialPreferences } from "../data/settingsMock";
import { logger } from "../utils/logger";
import {
  updateProfileAction,
  updatePreferencesAction,
  resetProfileAction,
} from "../store/actions";

// ─── State ────────────────────────────────────────────────────
type WorkspaceState = {
  profile:     SettingFormData;
  preferences: UserPreferences;
};

// Fresh copies — direct reference nahi (safe)
const initialWorkspaceState: WorkspaceState = {
  profile:     { ...initialProfile     },
  preferences: { ...initialPreferences },
};

// ─── Action types ─────────────────────────────────────────────
// Action creators se types nikaal rahe hain — ek jagah defined
type WorkspaceAction =
  | ReturnType<typeof updateProfileAction>
  | ReturnType<typeof updatePreferencesAction>
  | ReturnType<typeof resetProfileAction>;

// ─── Reducer ──────────────────────────────────────────────────
function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {

    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };

    case "UPDATE_PREFERENCES":
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };

    case "RESET_PROFILE":
      return {
        ...state,
        profile: { ...initialProfile }, // fresh copy — safe
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

  // Mount pe initial state log
  useEffect(() => {
    logger.group("WorkspaceContext — Initial State");
    logger.log("profile",     state.profile);
    logger.log("preferences", state.preferences);
    logger.groupEnd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // State subscription — profile ya preferences badlne pe log karo
  // [state.profile] → sirf profile badlne pe chalega
  useEffect(() => {
    logger.group("WorkspaceContext — Profile Changed");
    logger.log("profile", state.profile);
    logger.groupEnd();
  }, [state.profile]);

  // [state.preferences] → sirf preferences badlne pe chalega
  useEffect(() => {
    logger.group("WorkspaceContext — Preferences Changed");
    logger.log("preferences", state.preferences);
    logger.groupEnd();
  }, [state.preferences]);

  // Action creators use karo — uniform dispatch pattern
  const updateProfile     = (data: Partial<SettingFormData>) =>
    dispatch(updateProfileAction(data));

  const updatePreferences = (data: Partial<UserPreferences>) =>
    dispatch(updatePreferencesAction(data));

  const resetProfile = () =>
    dispatch(resetProfileAction());

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
