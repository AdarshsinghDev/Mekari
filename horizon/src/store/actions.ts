// ─────────────────────────────────────────────────────────────
//  src/store/actions.ts  —  Action Creators
//
//  Action Creator = ek function jo action object banata hai.
//
//  Kyun chahiye?
//  Bina action creator ke component aise likhta tha:
//    dispatch({ type: "UPDATE_PROFILE", payload: { name: "Ravi" } })
//
//  Problem:
//  - "UPDATE_PROFILE" string 10 jagah likhni padti
//  - ek jagah typo → silently kaam nahi karega
//  - payload ka shape har jagah manually yaad rakhna padta
//
//  Action creator se:
//    dispatch(updateProfile({ name: "Ravi" }))
//  - ek jagah defined, har jagah same
//  - TypeScript payload check karta hai
// ─────────────────────────────────────────────────────────────

import type { SettingFormData, UserPreferences } from "../types";

// ─── UI Actions ───────────────────────────────────────────────

// Sidebar kholne ka action object banao
export const openSidebarAction = () => ({
  type: "OPEN_SIDEBAR" as const,
  // "as const" — TypeScript ko batata hai yeh string literal type hai
  // warna type "string" ho jaata, "OPEN_SIDEBAR" nahi
});

// Sidebar band karne ka action object banao
export const closeSidebarAction = () => ({
  type: "CLOSE_SIDEBAR" as const,
});

// ─── Workspace Actions ────────────────────────────────────────

// Profile fields update karne ka action banao
// Partial<SettingFormData> = kuch hi fields dene ka option
export const updateProfileAction = (payload: Partial<SettingFormData>) => ({
  type:    "UPDATE_PROFILE" as const,
  payload,
});

// Preferences update karne ka action banao
export const updatePreferencesAction = (payload: Partial<UserPreferences>) => ({
  type:    "UPDATE_PREFERENCES" as const,
  payload,
});

// Profile reset karne ka action banao
export const resetProfileAction = () => ({
  type: "RESET_PROFILE" as const,
});
