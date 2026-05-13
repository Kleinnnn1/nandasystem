import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1a1a1a",
          color: "#fff",
          border: "1px solid #2a2a2a",
          fontSize: "13px",
        },
        success: {
          iconTheme: { primary: "#22c55e", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#dc2626", secondary: "#fff" },
        },
      }}
    />
  </StrictMode>,
);
