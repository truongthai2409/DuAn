import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "../assets/tailwind.css";
import Popup from "./popup";
import { AuthProvider } from "./hooks/useAuth";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  //   console.log(appContainer);
  root.render(
    <AuthProvider>
      <Router>
        <Popup />
      </Router>
    </AuthProvider>
  );
}

init();
