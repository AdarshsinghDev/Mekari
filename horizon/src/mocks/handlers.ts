import { http, HttpResponse, delay } from "msw";
import { initialProfile, initialPreferences } from "../data/settingsMock";
import { mockProjects, mockActivities, mockAnalyticsStats } from "../data/workspaceMock";
import type { SettingFormData, UserPreferences } from "../types";

// ─────────────────────────────────────────────────────────────
//  src/mocks/handlers.ts
//
//  Har handler mein delay() add kiya hai.
//  Kyun? Real server thoda time leta hai respond karne mein.
//  Delay se hum test kar sakte hain ki loading states
//  (spinners, skeletons) sahi se kaam kar rahe hain.
// ─────────────────────────────────────────────────────────────

// Delay values (milliseconds) — ek jagah manage karo
const DELAY = {
  fast:   400,   // simple GET requests
  medium: 800,   // updates / mutations
  slow:   1200,  // heavy data requests
};

// In-memory "database"
let profileDB: SettingFormData = { ...initialProfile     };
let prefsDB:   UserPreferences = { ...initialPreferences };

export const handlers = [

  // ── GET /api/profile ──────────────────────────────────────
  http.get("/api/profile", async () => {
    await delay(DELAY.fast); // 400ms wait — fast response simulate
    return HttpResponse.json({ success: true, data: profileDB });
  }),

  // ── PUT /api/profile ──────────────────────────────────────
  http.put("/api/profile", async ({ request }) => {
    await delay(DELAY.medium); // 800ms — save operation thoda slow hoti hai
    const body = await request.json() as Partial<SettingFormData>;
    profileDB  = { ...profileDB, ...body };
    return HttpResponse.json({
      success: true,
      data:    profileDB,
      message: "Profile updated successfully",
    });
  }),

  // ── GET /api/preferences ──────────────────────────────────
  http.get("/api/preferences", async () => {
    await delay(DELAY.fast);
    return HttpResponse.json({ success: true, data: prefsDB });
  }),

  // ── PUT /api/preferences ──────────────────────────────────
  http.put("/api/preferences", async ({ request }) => {
    await delay(DELAY.medium);
    const body = await request.json() as Partial<UserPreferences>;
    prefsDB    = { ...prefsDB, ...body };
    return HttpResponse.json({
      success: true,
      data:    prefsDB,
      message: "Preferences updated successfully",
    });
  }),

  // ── GET /api/projects ─────────────────────────────────────
  // Saare projects ki list
  http.get("/api/projects", async () => {
    await delay(DELAY.slow); // 1200ms — bada data, thoda zyada time
    return HttpResponse.json({
      success: true,
      data:    mockProjects,
      total:   mockProjects.length,
    });
  }),

  // ── GET /api/projects/:id ─────────────────────────────────
  // Ek specific project — URL se id nikalta hai
  http.get("/api/projects/:id", async ({ params }) => {
    await delay(DELAY.fast);
    const id      = Number(params.id);
    const project = mockProjects.find(p => p.id === id);

    // Project nahi mila — 404 return karo
    if (!project) {
      return HttpResponse.json(
        { success: false, message: `Project #${id} not found` },
        { status: 404 }
      );
    }

    return HttpResponse.json({ success: true, data: project });
  }),

  // ── GET /api/activities ───────────────────────────────────
  // Dashboard activity feed
  http.get("/api/activities", async () => {
    await delay(DELAY.medium);
    return HttpResponse.json({
      success: true,
      data:    mockActivities,
    });
  }),

  // ── GET /api/analytics ────────────────────────────────────
  // Analytics page ke stats
  http.get("/api/analytics", async () => {
    await delay(DELAY.slow); // heavy data — 1200ms
    return HttpResponse.json({
      success: true,
      data:    mockAnalyticsStats,
    });
  }),

  // ── POST /api/login ───────────────────────────────────────
  http.post("/api/login", async ({ request }) => {
    await delay(DELAY.medium); // login thoda slow hoti hai
    const body = await request.json() as { email: string; password: string };

    if (body.email && body.password) {
      return HttpResponse.json({
        success: true,
        token:   "mock-auth-token-horizon-dev-123",
        user:    profileDB,
      });
    }

    return HttpResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // ── POST /api/logout ──────────────────────────────────────
  http.post("/api/logout", async () => {
    await delay(DELAY.fast);
    return HttpResponse.json({ success: true, message: "Logged out" });
  }),
];
