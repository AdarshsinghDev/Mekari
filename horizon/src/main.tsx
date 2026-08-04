import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UIProvider }        from "./context/UIContext.tsx";
import { WorkspaceProvider } from "./context/WorkspaceContext.tsx";
import { logger }            from "./utils/logger.ts";

// Mock token localStorage mein save karo
// Real app mein yeh login ke baad milta hai aur tab save hota hai
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

// Provider wrapping order:
// WorkspaceProvider (bahar) → UIProvider (andar) → App
// Bahar wala pehle mount hoga — permanent data pehle ready hoga
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WorkspaceProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </WorkspaceProvider>
  </StrictMode>
);
