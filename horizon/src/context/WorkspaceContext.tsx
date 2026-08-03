import { createContext, useContext, useState } from "react";
import type { SettingFormData, UserPreferences } from "../types";
import { initialProfile, initialPreferences } from "../data/settingsMock";

// ─── Types ────────────────────────────────────────────────────

// Is context mein kya permanent data rahega
type WorkspaceState = {
  profile:     SettingFormData;   // user ka naam, email, role, password
  preferences: UserPreferences;   // theme, language, darkMode, etc.
};

// Is context mein kya functions honge
type WorkspaceActions = {
  // Profile update karo — sirf jo fields diye, wahi badle
  updateProfile:     (data: Partial<SettingFormData>) => void;
  // Preferences update karo — sirf jo fields diye, wahi badle
  updatePreferences: (data: Partial<UserPreferences>) => void;
  // Sab kuch original data pe reset karo
  resetProfile:      () => void;
};

type WorkspaceContextType = WorkspaceState & WorkspaceActions;

// ─── Context banana ───────────────────────────────────────────
const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────

type WorkspaceProviderProps = {
  children: React.ReactNode;
};

export const WorkspaceProvider = ({ children }: WorkspaceProviderProps) => {

  // Permanent data — mock data se initialize (real app mein API se aata)
  const [profile,     setProfile]     = useState<SettingFormData>(initialProfile);
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);

  // Profile ke kuch fields update karo
  // Partial<SettingFormData> = sirf kuch fields dene ka option — sab mandatory nahi
  const updateProfile = (data: Partial<SettingFormData>) => {
    setProfile(prev => ({ ...prev, ...data }));
    //                    ↑ purana data raho  ↑ naye fields se overwrite karo
  };

  // Preferences ke kuch fields update karo
  const updatePreferences = (data: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...data }));
  };

  // Sab kuch original mock data pe wapas
  const resetProfile = () => {
    setProfile(initialProfile);
  };

  return (
    <WorkspaceContext.Provider value={{
      profile,
      preferences,
      updateProfile,
      updatePreferences,
      resetProfile,
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

// ─── Custom Hook ──────────────────────────────────────────────

export const useWorkspace = (): WorkspaceContextType => {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside <WorkspaceProvider>");
  return ctx;
};
