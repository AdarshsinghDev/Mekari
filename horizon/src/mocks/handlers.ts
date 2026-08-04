import { http, HttpResponse } from "msw";
import { initialProfile, initialPreferences } from "../data/settingsMock";
import type { SettingFormData, UserPreferences } from "../types";

// ─────────────────────────────────────────────────────────────
//  src/mocks/handlers.ts
//
//  MSW Handlers = fake API routes.
//  Real server nahi hai → MSW browser mein hi intercept karke
//  fake response deta hai. Network tab mein real request dikhti hai.
// ─────────────────────────────────────────────────────────────

// In-memory "database" — server ki jagah yeh object use hoga
// App reload hone pe reset ho jaata hai (real DB nahi hai)
let profileDB: SettingFormData   = { ...initialProfile     };
let prefsDB:   UserPreferences   = { ...initialPreferences };

export const handlers = [

  // ── GET /api/profile ──────────────────────────────────────
  // User ka profile fetch karo
  http.get("/api/profile", () => {
    return HttpResponse.json({
      success: true,
      data:    profileDB,
    });
  }),

  // ── PUT /api/profile ──────────────────────────────────────
  // Profile update karo
  http.put("/api/profile", async ({ request }) => {

    // Request body padho — jo frontend ne bheja
    const body = await request.json() as Partial<SettingFormData>;

    // In-memory DB update karo
    profileDB = { ...profileDB, ...body };

    return HttpResponse.json({
      success: true,
      data:    profileDB,
      message: "Profile updated successfully",
    });
  }),

  // ── GET /api/preferences ──────────────────────────────────
  // User ki preferences fetch karo
  http.get("/api/preferences", () => {
    return HttpResponse.json({
      success: true,
      data:    prefsDB,
    });
  }),

  // ── PUT /api/preferences ──────────────────────────────────
  // Preferences update karo
  http.put("/api/preferences", async ({ request }) => {
    const body = await request.json() as Partial<UserPreferences>;
    prefsDB = { ...prefsDB, ...body };

    return HttpResponse.json({
      success: true,
      data:    prefsDB,
      message: "Preferences updated successfully",
    });
  }),

  // ── POST /api/login ───────────────────────────────────────
  // Mock login — token wapas karo
  http.post("/api/login", async ({ request }) => {
    const body = await request.json() as { email: string; password: string };

    // Simple mock check — real app mein server validate karta hai
    if (body.email && body.password) {
      return HttpResponse.json({
        success: true,
        token:   "mock-auth-token-horizon-dev-123",
        user:    profileDB,
      });
    }

    // Galat credentials — 401 return karo
    return HttpResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // ── POST /api/logout ──────────────────────────────────────
  http.post("/api/logout", () => {
    return HttpResponse.json({ success: true, message: "Logged out" });
  }),
];
