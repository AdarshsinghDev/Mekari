import { useState, useCallback, useMemo } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import WorkspaceCard from "../components/WorkspaceCard";
import type { ThemeType, LanguageType, SelectOption } from "../types";
import {
  initialProfile,
  initialPreferences,
  themeOptions,
  languageOptions,
  timezoneOptions,
} from "../data/settingsMock";

// ─── Validators ───────────────────────────────────────────────

const isValidName = (val: string): boolean => {
  return val.length === 0 || val.length >= 3;
};

const isValidEmail = (val: string): boolean => {
  return val.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
};

const isValidPassword = (val: string): boolean => {
  return val.length === 0 || (val.length >= 8 && /[0-9]/.test(val) && /[A-Z]/.test(val));
};

// ─── Component ────────────────────────────────────────────────

const Setting = () => {

  // ── Profile state ────────────────────────────────────────────
  const [name,     setName]     = useState(initialProfile.name);
  const [email,    setEmail]    = useState(initialProfile.email);
  const [role,     setRole]     = useState(initialProfile.role);
  const [password, setPassword] = useState(initialProfile.password);

  const [nameTouched,     setNameTouched]     = useState(false);
  const [emailTouched,    setEmailTouched]    = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // ── Preferences state ────────────────────────────────────────
  const [theme,      setTheme]      = useState<ThemeType>(initialPreferences.theme);
  const [language,   setLanguage]   = useState<LanguageType>(initialPreferences.language);
  const [timezone,   setTimezone]   = useState(initialPreferences.timezone);
  const [darkMode,   setDarkMode]   = useState(initialPreferences.darkMode);
  const [emailNotif, setEmailNotif] = useState(initialPreferences.emailNotif);

  // ── Validation ───────────────────────────────────────────────
  const nameOk     = isValidName(name);
  const emailOk    = isValidEmail(email);
  const passwordOk = isValidPassword(password);

  // ── useMemo — isFormValid ────────────────────────────────────
  // useMemo kya karta hai?
  // Yeh calculation tab dobara calculate hogi jab
  // name/email/password actually change honge.
  // Agar koi aur state (jaise darkMode) change ho toh
  // yeh calculation dobara NAHI chalegi — result cached rehta hai.
  const isFormValid = useMemo(() => {
    return (
      name.length > 0     && nameOk &&
      email.length > 0    && emailOk &&
      password.length > 0 && passwordOk
    );
  }, [name, email, password, nameOk, emailOk, passwordOk]);
  // ↑ dependency array — sirf yeh 6 cheezein badlengi toh recalculate hoga

  // ── useCallback — handlers ────────────────────────────────────
  // useCallback kya karta hai?
  // Normally har re-render pe React ek naya function banata hai.
  // useCallback purana function "yaad" rakhta hai —
  // jab tak dependency nahi badalti, naya function nahi banega.
  // Fayda: memo wrapped Input/Button ko naya function reference
  // nahi milta → wo unnecessarily re-render nahi karte.

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    if (!nameOk || !emailOk || !passwordOk) return;
    console.log({ name, email, role, password, theme, language, timezone, darkMode, emailNotif });
  }, [name, email, role, password, theme, language, timezone, darkMode, emailNotif, nameOk, emailOk, passwordOk]);

  // Reset — [] dependency = yeh function kabhi nahi badlega
  // Kyunki iske andar sirf setters hain jo React guarantee karta hai stable rehenge
  const handleReset = useCallback((_e: React.MouseEvent<HTMLButtonElement>): void => {
    setName(initialProfile.name);
    setEmail(initialProfile.email);
    setRole(initialProfile.role);
    setPassword(initialProfile.password);
    setNameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);
  }, []); // empty array = ek baar banta hai, hamesha same rehta hai

  // Name/Email/Role/Password handlers — sirf setter call, dependency nahi
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }, []);

  const handleRoleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setRole(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }, []);

  // Blur handlers
  const handleNameBlur = useCallback((): void => {
    setNameTouched(true);
  }, []);

  const handleEmailBlur = useCallback((): void => {
    setEmailTouched(true);
  }, []);

  const handlePasswordBlur = useCallback((): void => {
    setPasswordTouched(true);
  }, []);

  // Dropdown handlers
  const handleThemeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTheme(e.target.value as ThemeType);
  }, []);

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value as LanguageType);
  }, []);

  const handleTimezoneChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTimezone(e.target.value);
  }, []);

  const handleDarkModeToggle = useCallback((_e: React.MouseEvent<HTMLButtonElement>): void => {
    setDarkMode((prev) => !prev);
  }, []);

  const handleEmailNotifChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailNotif(e.target.checked);
  }, []);

  // ── useMemo — dropdown JSX ───────────────────────────────────
  // Dropdown options kabhi nahi badlte (static data hai).
  // useMemo se yeh JSX ek baar banta hai aur cache mein rehta hai.
  // Har re-render pe dobara map() nahi chalega.
  const themeOptionElements = useMemo(() => (
    themeOptions.map((option: SelectOption) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))
  ), []); // empty array = ek baar hi banao, kabhi mat badlo

  const languageOptionElements = useMemo(() => (
    languageOptions.map((option: SelectOption) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))
  ), []);

  const timezoneOptionElements = useMemo(() => (
    timezoneOptions.map((option: SelectOption) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))
  ), []);

  // ── JSX ──────────────────────────────────────────────────────

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Profile Details */}
        <WorkspaceCard title="Profile Details">

          <Input
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder="Enter your name"
            error={!nameOk && nameTouched ? "Name must be at least 3 characters." : undefined}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="Enter your email"
            error={!emailOk && emailTouched ? "Please enter a valid email address." : undefined}
          />

          <Input
            id="role"
            label="Role"
            type="text"
            value={role}
            onChange={handleRoleChange}
            placeholder="e.g. Developer, Designer"
          />

          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            placeholder="Min 8 chars, 1 number, 1 uppercase"
            error={!passwordOk && passwordTouched ? "Min 8 characters, at least 1 uppercase and 1 number." : undefined}
          />

        </WorkspaceCard>

        {/* Appearance & Locale */}
        <WorkspaceCard title="Appearance & Locale">

          <div className="space-y-1">
            <label htmlFor="theme" className="text-xs font-medium text-slate-500">Theme</label>
            <select
              id="theme"
              value={theme}
              onChange={handleThemeChange}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              {themeOptionElements}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="language" className="text-xs font-medium text-slate-500">Language</label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              {languageOptionElements}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="timezone" className="text-xs font-medium text-slate-500">Timezone</label>
            <select
              id="timezone"
              value={timezone}
              onChange={handleTimezoneChange}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              {timezoneOptionElements}
            </select>
          </div>

        </WorkspaceCard>

        {/* Preferences */}
        <WorkspaceCard title="Preferences">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Dark Mode</p>
              <p className="text-xs text-slate-400">Switch to dark theme</p>
            </div>
            <button
              type="button"
              onClick={handleDarkModeToggle}
              aria-pressed={darkMode}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                darkMode ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="emailNotif"
              type="checkbox"
              checked={emailNotif}
              onChange={handleEmailNotifChange}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="emailNotif" className="text-sm text-slate-700 cursor-pointer">
              Email Notifications
            </label>
          </div>

        </WorkspaceCard>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary" size="medium" disabled={!isFormValid}>
            Save Changes
          </Button>

          <Button type="button" variant="secondary" size="medium" onClick={handleReset}>
            Reset
          </Button>
        </div>

      </form>
    </div>
  );
};

export default Setting;
