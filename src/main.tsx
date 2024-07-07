import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ProjectProvider } from "./context/ProjectContext.tsx";
import App from "./App.tsx";

import theme from "./theme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);
