import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const workspaceFile = (path) =>
  fileURLToPath(new URL(`../../${path}`, import.meta.url));

const desktopEnvironmentSource = (entry) =>
  workspaceFile(
    `projects/react-desktop-environment/packages/react-desktop-environment/src/${entry}`,
  );

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: [
      {
        find: "@unaware/gui",
        replacement: workspaceFile("projects/unaware.house/packages/gui/Applet.jsx"),
      },
      {
        find: "react-desktop-environment/compositor",
        replacement: desktopEnvironmentSource("compositor/index.js"),
      },
      {
        find: "react-desktop-environment/window-manager",
        replacement: desktopEnvironmentSource("window-manager/index.js"),
      },
      {
        find: "react-desktop-environment/ui",
        replacement: desktopEnvironmentSource("ui/index.js"),
      },
    ],
  },
});
