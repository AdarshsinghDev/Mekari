import { useState } from "react";

const Setting = () => {

  // ── Profile state ──
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole]   = useState("");

  // ── Dropdown state default values set hain ──
  const [theme, setTheme]       = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC+5:30");

  // ── Preferences state ──
  const [darkMode, setDarkMode]     = useState(false);
  const [emailNotif, setEmailNotif] = useState(false);

  // Save button 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // page reload rokta hai
    console.log({ name, email, role, theme, language, timezone, darkMode, emailNotif });
  };

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ─── Profile Details ─── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Profile Details</h3>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Name</label>
           
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Email</label>
          
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Role</label>
         
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Developer, Designer"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* ─── Appearance & Locale Dropdowns ─── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Appearance & Locale</h3>

          {/* Theme Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Theme</label>
        
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all bg-white text-slate-700 cursor-pointer"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Language</label>
      
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all bg-white text-slate-700 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          {/* Timezone Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Timezone</label>
        
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all bg-white text-slate-700 cursor-pointer"
            >
              <option value="UTC+0">UTC+0 (London)</option>
              <option value="UTC+5:30">UTC+5:30 (India)</option>
              <option value="UTC-5">UTC-5 (New York)</option>
              <option value="UTC-8">UTC-8 (Los Angeles)</option>
              <option value="UTC+8">UTC+8 (Singapore)</option>
            </select>
          </div>
        </div>

        {/* ─── Preferences ─── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Preferences</h3>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Dark Mode</p>
              <p className="text-xs text-slate-400">Switch to dark theme</p>
            </div>
          
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                darkMode ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                darkMode ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>

          {/* Email Notifications Checkbox */}
          <div className="flex items-center gap-3">
            <input
              id="emailNotif"
              type="checkbox"
              checked={emailNotif}
              onChange={(e) => setEmailNotif(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="emailNotif" className="text-sm text-slate-700 cursor-pointer">
              Email Notifications
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm px-6 py-2.5 rounded-xl font-medium transition-colors cursor-pointer shadow-sm shadow-blue-200"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
};

export default Setting;
