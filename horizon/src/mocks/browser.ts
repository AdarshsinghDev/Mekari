import { setupWorker } from "msw/browser";
import { handlers }    from "./handlers";

// ─────────────────────────────────────────────────────────────
//  src/mocks/browser.ts
//
//  Worker setup — browser mein Service Worker start karta hai.
//
//  Service Worker kya hai?
//  Browser ka ek background process jo network requests
//  intercept kar sakta hai. MSW isi ka use karta hai.
//
//  Flow:
//  App → fetch("/api/profile")
//           ↓
//    Service Worker intercept karta hai
//           ↓
//    handlers mein match dhundta hai
//           ↓
//    Fake response wapas karta hai
//    (real server tak request jaati hi nahi)
// ─────────────────────────────────────────────────────────────

// Worker banao — saare handlers register karo
export const worker = setupWorker(...handlers);
