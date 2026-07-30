// ─────────────────────────────────────────────────────────────
//  src/types/index.ts
//
//  Poore app ke common types yahan ek jagah rakhte hain.
//  Koi bhi file yahan se import kar sakti hai.
// ─────────────────────────────────────────────────────────────

// Button ka color style — sirf yahi teen allowed hain
export type ButtonVariant = "primary" | "secondary" | "danger";

// Button ki size — sirf yahi teen allowed hain
export type ButtonSize = "small" | "medium" | "large";

// Input ka type — sirf valid HTML input types allowed hain
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date";

// Setting form ke fields
export type SettingFormData = {
  name:     string;
  email:    string;
  role:     string;
  password: string;
};

// Kaunsa field user ne touch kiya — true/false
export type SettingTouchedFields = {
  name:     boolean;
  email:    boolean;
  password: boolean;
};

// Theme dropdown ki valid values
export type ThemeType = "light" | "dark" | "system";

// Language dropdown ki valid values
export type LanguageType = "en" | "hi" | "fr" | "de";

// Toggle aur checkbox wali preferences
export type UserPreferences = {
  darkMode:   boolean;
  emailNotif: boolean;
  theme:      ThemeType;
  language:   LanguageType;
  timezone:   string;
};

// Sidebar ke ek nav link ka structure
export type NavItem = {
  label: string;        
  path:  string;         // URL — "/dashboard"
  icon:  React.ReactNode; // React icon component
};
