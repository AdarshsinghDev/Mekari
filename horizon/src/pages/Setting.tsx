import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import WorkspaceCard from "../components/WorkspaceCard";
import { useWorkspace } from "../context/WorkspaceContext";
import type { ThemeType, LanguageType, SelectOption } from "../types";
import { themeOptions, languageOptions, timezoneOptions } from "../data/settingsMock";

// ─── Tab config ───────────────────────────────────────────────
const TABS         = [
  { id: "profile",     label: "Profile"     },
  { id: "appearance",  label: "Appearance"  },
  { id: "preferences", label: "Preferences" },
];
const VALID_TAB_IDS = TABS.map(t => t.id);
const DEFAULT_TAB   = "profile";

// ─── Validators ───────────────────────────────────────────────
const isValidName     = (v: string) => v.length === 0 || v.length >= 3;
const isValidEmail    = (v: string) => v.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPassword = (v: string) => v.length === 0 || (v.length >= 8 && /[0-9]/.test(v) && /[A-Z]/.test(v));

// ─── Component ────────────────────────────────────────────────
const Setting = () => {

  // WorkspaceContext se permanent data lo
  const { profile, preferences, updateProfile, updatePreferences, resetProfile } = useWorkspace();

  // ── URL tab ──────────────────────────────────────────────────
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromURL = searchParams.get("tab");

  // Invalid/missing tab → default pe redirect
  useEffect(() => {
    if (!tabFromURL || !VALID_TAB_IDS.includes(tabFromURL)) {
      setSearchParams({ tab: DEFAULT_TAB }, { replace: true });
    }
  }, [tabFromURL, setSearchParams]);

  const activeTab = VALID_TAB_IDS.includes(tabFromURL || "") ? tabFromURL! : DEFAULT_TAB;

  const handleTabClick = useCallback((tabId: string) => {
    setSearchParams({ tab: tabId });
  }, [setSearchParams]);

  // ── Local form state ─────────────────────────────────────────
  // Yeh temporary hai — sirf form ke liye (touched state)
  // Permanent data context mein hai
  const [nameTouched,     setNameTouched]     = useState(false);
  const [emailTouched,    setEmailTouched]    = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // ── Validation ───────────────────────────────────────────────
  const nameOk     = isValidName(profile.name);
  const emailOk    = isValidEmail(profile.email);
  const passwordOk = isValidPassword(profile.password);

  const isFormValid = useMemo(() => (
    profile.name.length > 0     && nameOk &&
    profile.email.length > 0    && emailOk &&
    profile.password.length > 0 && passwordOk
  ), [profile.name, profile.email, profile.password, nameOk, emailOk, passwordOk]);

  // ── Handlers ─────────────────────────────────────────────────

  // Form submit — context mein data save hoga
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    if (!nameOk || !emailOk || !passwordOk) return;
    console.log("Saved:", { ...profile, ...preferences });
  }, [profile, preferences, nameOk, emailOk, passwordOk]);

  // Reset — context ka resetProfile call karo
  const handleReset = useCallback((_e: React.MouseEvent<HTMLButtonElement>) => {
    resetProfile();
    setNameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);
  }, [resetProfile]);

  // Profile field change — context update
  const handleNameChange     = useCallback((e: React.ChangeEvent<HTMLInputElement>) => updateProfile({ name:     e.target.value }), [updateProfile]);
  const handleEmailChange    = useCallback((e: React.ChangeEvent<HTMLInputElement>) => updateProfile({ email:    e.target.value }), [updateProfile]);
  const handleRoleChange     = useCallback((e: React.ChangeEvent<HTMLInputElement>) => updateProfile({ role:     e.target.value }), [updateProfile]);
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => updateProfile({ password: e.target.value }), [updateProfile]);

  const handleNameBlur     = useCallback(() => setNameTouched(true),     []);
  const handleEmailBlur    = useCallback(() => setEmailTouched(true),    []);
  const handlePasswordBlur = useCallback(() => setPasswordTouched(true), []);

  // Preferences change — context update
  const handleThemeChange    = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => updatePreferences({ theme:    e.target.value as ThemeType    }), [updatePreferences]);
  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => updatePreferences({ language: e.target.value as LanguageType }), [updatePreferences]);
  const handleTimezoneChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => updatePreferences({ timezone: e.target.value                  }), [updatePreferences]);
  const handleDarkModeToggle   = useCallback((_e: React.MouseEvent<HTMLButtonElement>) => updatePreferences({ darkMode:   !preferences.darkMode      }), [updatePreferences, preferences.darkMode]);
  const handleEmailNotifChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)  => updatePreferences({ emailNotif: e.target.checked           }), [updatePreferences]);

  // ── Dropdown JSX (memoized) ───────────────────────────────────
  const themeOptionElements    = useMemo(() => themeOptions.map((o: SelectOption)    => <option key={o.value} value={o.value}>{o.label}</option>), []);
  const languageOptionElements = useMemo(() => languageOptions.map((o: SelectOption) => <option key={o.value} value={o.value}>{o.label}</option>), []);
  const timezoneOptionElements = useMemo(() => timezoneOptions.map((o: SelectOption) => <option key={o.value} value={o.value}>{o.label}</option>), []);

  // ── JSX ──────────────────────────────────────────────────────
  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your preferences.</p>
      </div>

      {/* Tab buttons */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Profile tab — data from WorkspaceContext */}
        {activeTab === "profile" && (
          <WorkspaceCard title="Profile Details">
            <Input id="name"     label="Name"     type="text"     value={profile.name}     onChange={handleNameChange}     onBlur={handleNameBlur}     placeholder="Enter your name"    error={!nameOk     && nameTouched     ? "Name must be at least 3 characters."                       : undefined} />
            <Input id="email"    label="Email"    type="email"    value={profile.email}    onChange={handleEmailChange}    onBlur={handleEmailBlur}    placeholder="Enter your email"   error={!emailOk    && emailTouched    ? "Please enter a valid email address."                       : undefined} />
            <Input id="role"     label="Role"     type="text"     value={profile.role}     onChange={handleRoleChange}                                 placeholder="e.g. Developer, Designer" />
            <Input id="password" label="Password" type="password" value={profile.password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} placeholder="Min 8 chars, 1 number, 1 uppercase" error={!passwordOk && passwordTouched ? "Min 8 characters, at least 1 uppercase and 1 number." : undefined} />
          </WorkspaceCard>
        )}

        {/* Appearance tab — data from WorkspaceContext */}
        {activeTab === "appearance" && (
          <WorkspaceCard title="Appearance & Locale">
            <div className="space-y-1">
              <label htmlFor="theme" className="text-xs font-medium text-slate-500">Theme</label>
              <select id="theme" value={preferences.theme} onChange={handleThemeChange} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer">{themeOptionElements}</select>
            </div>
            <div className="space-y-1">
              <label htmlFor="language" className="text-xs font-medium text-slate-500">Language</label>
              <select id="language" value={preferences.language} onChange={handleLanguageChange} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer">{languageOptionElements}</select>
            </div>
            <div className="space-y-1">
              <label htmlFor="timezone" className="text-xs font-medium text-slate-500">Timezone</label>
              <select id="timezone" value={preferences.timezone} onChange={handleTimezoneChange} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer">{timezoneOptionElements}</select>
            </div>
          </WorkspaceCard>
        )}

        {/* Preferences tab — data from WorkspaceContext */}
        {activeTab === "preferences" && (
          <WorkspaceCard title="Preferences">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Dark Mode</p>
                <p className="text-xs text-slate-400">Switch to dark theme</p>
              </div>
              <button type="button" onClick={handleDarkModeToggle} aria-pressed={preferences.darkMode} className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${preferences.darkMode ? "bg-blue-600" : "bg-slate-200"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${preferences.darkMode ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input id="emailNotif" type="checkbox" checked={preferences.emailNotif} onChange={handleEmailNotifChange} className="w-4 h-4 accent-blue-600 cursor-pointer" />
              <label htmlFor="emailNotif" className="text-sm text-slate-700 cursor-pointer">Email Notifications</label>
            </div>
          </WorkspaceCard>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary"   size="medium" disabled={!isFormValid}>Save Changes</Button>
          <Button type="button" variant="secondary" size="medium" onClick={handleReset}>Reset</Button>
        </div>

      </form>
    </div>
  );
};

export default Setting;
