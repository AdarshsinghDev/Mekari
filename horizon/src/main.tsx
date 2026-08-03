import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UIProvider }        from "./context/UIContext.tsx";
import { WorkspaceProvider } from "./context/WorkspaceContext.tsx";
import { logger }            from "./utils/logger.ts";

// Root level log — app mount hone se pehle
// Yeh sirf dev mode mein dikhega (production mein silent)
logger.group("App Mounting");
logger.log("Environment", import.meta.env.MODE);   // "development" ya "production"
logger.log("React StrictMode", true);
logger.log("Providers", ["WorkspaceProvider", "UIProvider"]);
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
