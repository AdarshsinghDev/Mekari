// ─────────────────────────────────────────────────────────────
//  src/store/selectors.ts  —  State Selectors
//
//  Selector = ek function jo state se specific data nikalta hai.
//
//  Kyun chahiye?
//  Bina selector ke component seedha state access karta:
//    const { profile } = useWorkspace();
//    const name = profile.name;   // component ko poora profile milta
//
//  Problem:
//  - Component profile ka subscriber ban jaata — profile ka koi bhi
//    field badlne pe component re-render hoga, chahe name na badla ho
//  - Agar state ka shape badle, har jagah update karna padega
//
//  Selector se:
//    const name = selectProfileName(profile);
//  - Ek jagah defined — ek jagah change karo, sab jagah theek
//  - Clear subscription — component sirf jo chahiye woh le raha hai
// ─────────────────────────────────────────────────────────────

import type { SettingFormData, UserPreferences } from "../types";

// ─── Profile Selectors ────────────────────────────────────────

// Sirf naam nikalo
export const selectProfileName     = (p: SettingFormData): string => p.name;

// Sirf email nikalo
export const selectProfileEmail    = (p: SettingFormData): string => p.email;

// Sirf role nikalo
export const selectProfileRole     = (p: SettingFormData): string => p.role;

// Display ke liye — naam + role ek saath
export const selectProfileSummary  = (p: SettingFormData): string =>
  p.role ? `${p.name} (${p.role})` : p.name;

// ─── Preferences Selectors ────────────────────────────────────

// Sirf theme nikalo
export const selectTheme           = (prefs: UserPreferences): string  => prefs.theme;

// Sirf language nikalo
export const selectLanguage        = (prefs: UserPreferences): string  => prefs.language;

// Dark mode on hai ya off
export const selectIsDarkMode      = (prefs: UserPreferences): boolean => prefs.darkMode;

// Email notification on hai ya off
export const selectIsEmailNotif    = (prefs: UserPreferences): boolean => prefs.emailNotif;

// Timezone nikalo
export const selectTimezone        = (prefs: UserPreferences): string  => prefs.timezone;
