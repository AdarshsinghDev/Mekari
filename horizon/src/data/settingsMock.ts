
import type { SettingFormData, UserPreferences, SelectOption } from "../types";

export const initialProfile: SettingFormData = {
  name:     "Adarsh Singh",
  email:    "adarshsingh10803@gmail.com",
  role:     "Frontend Developer",
  password: "",        
};

export const initialPreferences: UserPreferences = {
  theme:      "light",
  language:   "en",
  timezone:   "UTC+5:30",
  darkMode:   false,
  emailNotif: true,       // notifications by default on
};

export const themeOptions: SelectOption[] = [
  { label: "Light",          value: "light"  },
  { label: "Dark",           value: "dark"   },
  { label: "System Default", value: "system" },
];

// Language dropdown ke options
export const languageOptions: SelectOption[] = [
  { label: "English", value: "en" },
  { label: "Hindi",   value: "hi" },
  { label: "French",  value: "fr" },
  { label: "German",  value: "de" },
];

// Timezone dropdown ke options
export const timezoneOptions: SelectOption[] = [
  { label: "UTC+0 (London)",      value: "UTC+0"    },
  { label: "UTC+5:30 (India)",    value: "UTC+5:30" },
  { label: "UTC-5 (New York)",    value: "UTC-5"    },
  { label: "UTC-8 (Los Angeles)", value: "UTC-8"    },
  { label: "UTC+8 (Singapore)",   value: "UTC+8"    },
];
