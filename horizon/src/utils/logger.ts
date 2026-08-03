// ─── Dev Logger ──────────────────────────────────────────────
//
// Yeh logger sirf development mode mein kaam karta hai.
// Production build mein automatically silent ho jaata hai.
//
// import.meta.env.DEV = Vite ka built-in variable
//   true  → npm run dev   (development)
//   false → npm run build (production)

const isDev = import.meta.env.DEV;

// Group kholta hai — saare logs ek box mein
const group = (label: string): void => {
  if (isDev) console.group(`🧩 [Horizon] ${label}`);
};

// Group band karta hai
const groupEnd = (): void => {
  if (isDev) console.groupEnd();
};

// Normal log
const log = (label: string, data: unknown): void => {
  if (isDev) console.log(`  ▸ ${label}:`, data);
};

// Warning — yellow color
const warn = (label: string, data: unknown): void => {
  if (isDev) console.warn(`  ⚠ ${label}:`, data);
};

// Sab ek saath export karo
export const logger = { group, groupEnd, log, warn };
