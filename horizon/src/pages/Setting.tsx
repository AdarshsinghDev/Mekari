import { useState } from "react";


// #A  Name: kam se kam 3 characters hone chahiye
const isValidName = (val: string) => val.length === 0 || val.length >= 3;

// #B  Email: @ aur . dono hone chahiye — regex se check
const isValidEmail = (val: string) => val.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

// #C  Password: 8+ characters, 1 number, 1 uppercase
const isValidPassword = (val: string) =>
  val.length === 0 || (val.length >= 8 && /[0-9]/.test(val) && /[A-Z]/.test(val));

const Setting = () => {

  // ── Profile state ──
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [role, setRole]         = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  // ── Dropdown state ──
  const [theme, setTheme]       = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC+5:30");

  // ── Preferences state ──
  const [darkMode, setDarkMode]     = useState(false);
  const [emailNotif, setEmailNotif] = useState(false);

  // ── Validation results — true = valid, false = error ──
  const nameOk     = isValidName(name);
  const emailOk    = isValidEmail(email);
  const passwordOk = isValidPassword(password);

  // #5 — Save button dabaya
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!nameOk || !emailOk || !passwordOk) return; // koi error hai toh rok do
    // #6 — sab valid hai, console mein print
    console.log({ name, email, role, password, theme, language, timezone, darkMode, emailNotif });
  };

  // sab valid + non-empty toh true — button enable hoga
  const isFormValid =
    name.length > 0 && nameOk &&
    email.length > 0 && emailOk &&
    password.length > 0 && passwordOk;

  // ── Reusable class logic ──
  // transition-all duration-200 — border color smoothly change
  const inputClass = (isOk: boolean, isTouched: boolean) =>
    `w-full px-3 py-2 text-sm rounded-lg outline-none transition-all duration-200 placeholder:text-slate-300 border ${
      !isOk && isTouched
        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
        : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
    }`;

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

          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Name</label>
          
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="Enter your name"
              className={inputClass(nameOk, touched.name)}
            />
            {/* error — opacity transition se fade in/out */}
            <p className={`text-xs text-red-500 mt-0.5 transition-opacity duration-300 ${!nameOk && touched.name ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              Name must be at least 3 characters.
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Email</label>
         
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="Enter your email"
              className={inputClass(emailOk, touched.email)}
            />
            {/* error — fade in/out */}
            <p className={`text-xs text-red-500 mt-0.5 transition-opacity duration-300 ${!emailOk && touched.email ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              Please enter a valid email address.
            </p>
          </div>

          {/* Role — no validation needed */}
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

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Password</label>
           
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="Min 8 chars, 1 number, 1 uppercase"
              className={inputClass(passwordOk, touched.password)}
            />
            {/* error — fade in/out */}
            <p className={`text-xs text-red-500 mt-0.5 transition-opacity duration-300 ${!passwordOk && touched.password ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              Min 8 characters, at least 1 uppercase letter and 1 number.
            </p>
          </div>
        </div>

        {/* ─── Appearance & Locale ─── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Appearance & Locale</h3>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Theme</label>
           
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 bg-white text-slate-700 cursor-pointer"
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
          disabled={!isFormValid}
          className={`text-white text-sm px-6 py-2.5 rounded-xl font-medium shadow-sm transition-all duration-300 ${
            isFormValid
              ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-200 opacity-100 cursor-pointer"
              : "bg-slate-300 opacity-60 cursor-not-allowed"
          }`}
        >
          Save Changes
        </button>

      </form>
    </div>
  );
};

export default Setting;
