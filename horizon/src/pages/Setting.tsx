import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import WorkspaceCard from "../components/WorkspaceCard";
import type { ThemeType, LanguageType, SelectOption } from "../types";

// Mock data import — initial values aur dropdown options
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

  // ── Profile state — mock data se initialize ho raha hai ─────
  // useState("") ki jagah useState(initialProfile.name) —
  // matlab form khulan pe "Adarsh Singh" pehle se bharaa dikhega
  const [name,     setName]     = useState(initialProfile.name);
  const [email,    setEmail]    = useState(initialProfile.email);
  const [role,     setRole]     = useState(initialProfile.role);
  const [password, setPassword] = useState(initialProfile.password);

  // Touched state — validation ke liye, fresh start mein sab false
  const [nameTouched,     setNameTouched]     = useState(false);
  const [emailTouched,    setEmailTouched]    = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // ── Preferences state — mock data se initialize ─────────────
  const [theme,      setTheme]      = useState<ThemeType>(initialPreferences.theme);
  const [language,   setLanguage]   = useState<LanguageType>(initialPreferences.language);
  const [timezone,   setTimezone]   = useState(initialPreferences.timezone);
  const [darkMode,   setDarkMode]   = useState(initialPreferences.darkMode);
  const [emailNotif, setEmailNotif] = useState(initialPreferences.emailNotif);

  // ── Validation ───────────────────────────────────────────────
  const nameOk     = isValidName(name);
  const emailOk    = isValidEmail(email);
  const passwordOk = isValidPassword(password);

  const isFormValid =
    name.length > 0     && nameOk &&
    email.length > 0    && emailOk &&
    password.length > 0 && passwordOk;

  // ── Handlers ─────────────────────────────────────────────────

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    if (!nameOk || !emailOk || !passwordOk) return;
    console.log({ name, email, role, password, theme, language, timezone, darkMode, emailNotif });
  };

  // Reset — mock data pe wapas le jaao (blank nahi, original data)
  const handleReset = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    setName(initialProfile.name);
    setEmail(initialProfile.email);
    setRole(initialProfile.role);
    setPassword(initialProfile.password);
    setNameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTheme(e.target.value as ThemeType);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value as LanguageType);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTimezone(e.target.value);
  };

  const handleDarkModeToggle = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    setDarkMode(!darkMode);
  };

  const handleEmailNotifChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailNotif(e.target.checked);
  };

  // ── JSX ──────────────────────────────────────────────────────

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ─── Profile Details — <Input/> components use ho rahe hain ─── */}
        <WorkspaceCard title="Profile Details">

          <Input
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            placeholder="Enter your name"
            error={!nameOk && nameTouched ? "Name must be at least 3 characters." : undefined}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            placeholder="Enter your email"
            error={!emailOk && emailTouched ? "Please enter a valid email address." : undefined}
          />

          <Input
            id="role"
            label="Role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Developer, Designer"
          />

          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            placeholder="Min 8 chars, 1 number, 1 uppercase"
            error={!passwordOk && passwordTouched ? "Min 8 characters, at least 1 uppercase and 1 number." : undefined}
          />

        </WorkspaceCard>

        {/* ─── Appearance & Locale — dropdowns mock data se render ho rahe hain ─── */}
        <WorkspaceCard title="Appearance & Locale">

          {/* Theme dropdown — themeOptions array se options bana rahe hain */}
          <div className="space-y-1">
            <label htmlFor="theme" className="text-xs font-medium text-slate-500">Theme</label>
            <select
              id="theme"
              value={theme}
              onChange={handleThemeChange}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              {/* themeOptions array ka har item ek <option> ban raha hai */}
              {themeOptions.map((option: SelectOption) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language dropdown — languageOptions array se */}
          <div className="space-y-1">
            <label htmlFor="language" className="text-xs font-medium text-slate-500">Language</label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              {languageOptions.map((option: SelectOption) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timezone dropdown — timezoneOptions array se */}
          <div className="space-y-1">
            <label htmlFor="timezone" className="text-xs font-medium text-slate-500">Timezone</label>
            <select
              id="timezone"
              value={timezone}
              onChange={handleTimezoneChange}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              {timezoneOptions.map((option: SelectOption) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

        </WorkspaceCard>

        {/* ─── Preferences ─── */}
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

        {/* ─── Action Buttons — <Button/> component use ho raha hai ─── */}
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
