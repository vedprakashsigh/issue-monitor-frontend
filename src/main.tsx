import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Analytics } from "@vercel/analytics/react";

import App from "./App.tsx";
import "./index.css";
import { ModalProvider } from "./context/ModalContext.tsx";
import { ProjectProvider } from "./context/ProjectContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <ProjectProvider>
            <ChakraProvider>
              <App />
              <Analytics />
            </ChakraProvider>
          </ProjectProvider>
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
