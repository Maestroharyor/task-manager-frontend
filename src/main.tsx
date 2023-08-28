import React from "react";
import ReactDOM from "react-dom/client";
import { TaskProvider } from "./context/taskContext.tsx";
import { TagProvider } from "./context/tagContext.tsx";
import { SidebarMenuProvider } from "./context/sidebarMenuContext.tsx";
import App from "./App.tsx";
import "@fontsource/koho/200.css";
import "@fontsource/koho/300.css";
import "@fontsource/koho/400.css";
import "@fontsource/koho/500.css";
import "@fontsource/koho/600.css";
import "@fontsource/koho/700.css";
import "rodal/lib/rodal.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskProvider>
      <TagProvider>
        <SidebarMenuProvider>
          <App />
        </SidebarMenuProvider>
      </TagProvider>
    </TaskProvider>
  </React.StrictMode>
);
