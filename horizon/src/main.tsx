import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UIProvider }        from "./context/UIContext.tsx";
import { WorkspaceProvider } from "./context/WorkspaceContext.tsx";

// Providers ka order — bahar wala pehle wrap hota hai
// WorkspaceProvider — permanent data, poore app ke liye
// UIProvider        — temporary UI state, poore app ke liye

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WorkspaceProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </WorkspaceProvider>
  </StrictMode>
);
