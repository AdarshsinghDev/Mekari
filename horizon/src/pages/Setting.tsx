import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import WorkspaceCard from "../components/WorkspaceCard";
import type { ThemeType, LanguageType } from "../types";

// ─── Validators ───────────────────────────────────────────────

// Name: kam se kam 3 characters hone chahiye
const isValidName = (val: string): boolean => {
  return val.length === 0 || val.length >= 3;
};

// Email: @ aur . dono hone chahiye
const isValidEmail = (val: string): boolean => {
  return val.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
};

// Password: 8+ chars, 1 number, 1 uppercase
const isValidPassword = (val: string): boolean => {
  return val.length === 0 || (val.length >= 8 && /[0-9]/.test(val) && /[A-Z]/.test(val));
};

// ─── Component ────────────────────────────────────────────────

const Setting = () => {

  // ── Profile fields ──────────────────────────────────────────
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [role, setRole]         = useState("");
  const [password, setPassword] = useState("");

  // Kaunsa field user ne touch kiya — validation sirf touched fields pe dikhegi
  const [nameTouched,     setNameTouched]     = useState(false);
  const [emailTouched,    setEmailTouched]    = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // ── Appearance & Locale ─────────────────────────────────────
  const [theme,    setTheme]    = useState<ThemeType>("light");
  const [language, setLanguage] = useState<LanguageType>("en");
  const [timezone, setTimezone] = useState("UTC+5:30");

  // ── Preferences ─────────────────────────────────────────────
  const [darkMode,   setDarkMode]   = useState(false);
  const [emailNotif, setEmailNotif] = useState(false);

  // ── Validation results ──────────────────────────────────────
  const nameOk     = isValidName(name);
  const emailOk    = isValidEmail(email);
  const passwordOk = isValidPassword(password);

  // Save button tab hi enable hoga jab sab fields bhari hों aur valid hون
  const isFormValid =
    name.length > 0     && nameOk &&
    email.length > 0    && emailOk &&
    password.length > 0 && passwordOk;

  // ── Handlers ────────────────────────────────────────────────

  // Form submit hone pe
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // page reload rokta hai
    // Sab fields ko touched mark karo taaki errors dikhen
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    // Koi error ho toh rukk jao
    if (!nameOk || !emailOk || !passwordOk) return;
    // Sab theek hai — console mein print karo
    console.log({ name, email, role, password, theme, language, timezone, darkMode, emailNotif });
  };

  // Reset button — saare fields khali karo
  const handleReset = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    setName("");
    setEmail("");
    setRole("");
    setPassword("");
    setNameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);
  };

  // Theme dropdown change
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTheme(e.target.value as ThemeType);
  };

  // Language dropdown change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value as LanguageType);
  };

  // Timezone dropdown change
  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTimezone(e.target.value);
  };

  // Dark mode toggle button
  const handleDarkModeToggle = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    setDarkMode(!darkMode);
  };

  // Email notification checkbox
  const handleEmailNotifChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailNotif(e.target.checked);
  };

  // ── JSX ─────────────────────────────────────────────────────

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ─── Profile Details ─── */}
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

        {/* ─── Appearance & Locale ─── */}
        <WorkspaceCard title="Appearance & Locale">

          <div className="space-y-1">
            <label htmlFor="theme" className="text-xs font-medium text-slate-500">Theme</label>
            <select
              id="theme"
              value={theme}
              onChange={handleThemeChange}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
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
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">French</option>
              <option value="de">German</option>
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
              <option value="UTC+0">UTC+0 (London)</option>
              <option value="UTC+5:30">UTC+5:30 (India)</option>
              <option value="UTC-5">UTC-5 (New York)</option>
              <option value="UTC-8">UTC-8 (Los Angeles)</option>
              <option value="UTC+8">UTC+8 (Singapore)</option>
            </select>
          </div>

        </WorkspaceCard>

        {/* ─── Preferences ─── */}
        <WorkspaceCard title="Preferences">

          {/* Dark Mode toggle */}
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

          {/* Email Notifications checkbox */}
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

        {/* ─── Action Buttons ─── */}
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
