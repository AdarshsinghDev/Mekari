import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UIProvider }        from "./context/UIContext.tsx";
import { WorkspaceProvider } from "./context/WorkspaceContext.tsx";
import { logger }            from "./utils/logger.ts";

// Mock token localStorage mein save karo (agar pehle se nahi hai)
if (!localStorage.getItem("auth_token")) {
  localStorage.setItem("auth_token", import.meta.env.VITE_MOCK_TOKEN || "mock-token");
}

// Root level log
logger.group("App Mounting");
logger.log("Environment",  import.meta.env.MODE);
logger.log("API Base URL", import.meta.env.VITE_API_BASE_URL);
logger.log("Auth Token",   localStorage.getItem("auth_token") ? "✅ Set" : "❌ Missing");
logger.log("Providers",    ["WorkspaceProvider", "UIProvider"]);
logger.groupEnd();

// ─── MSW Worker Start ─────────────────────────────────────────
// Sirf development mode mein MSW start karo
// Production mein real API use hogi — mock nahi chahiye
async function startApp() {

  if (import.meta.env.DEV) {
    // Dynamic import — production build mein yeh code bundle nahi hoga
    const { worker } = await import("./mocks/browser.ts");

    // Worker start karo
    // onUnhandledRequest: "bypass" → agar koi route handlers mein nahi mila
    // toh real network pe jaane do (error mat do)
    await worker.start({
      onUnhandledRequest: "bypass",
    });

    logger.group("MSW Mock Server");
    logger.log("Status",   "✅ Started");
    logger.log("Handlers", "GET /api/profile, PUT /api/profile, GET /api/preferences, PUT /api/preferences, POST /api/login, POST /api/logout");
    logger.groupEnd();
  }

  // Worker ready hone ke baad app render karo
  // Kyun? Agar app pehle render ho aur worker baad mein start ho
  // toh pehli API calls intercept nahi hogi
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <WorkspaceProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </WorkspaceProvider>
    </StrictMode>
  );
}

// App start karo
startApp();
