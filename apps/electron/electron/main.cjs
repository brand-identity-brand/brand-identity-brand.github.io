const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");

const isMac = process.platform === "darwin";

function createWindow() {
  const window = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 980,
    minHeight: 680,
    backgroundColor: "#11110f",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 18, y: 18 },
    ...(isMac ? {} : { titleBarOverlay: { color: "#11110f", symbolColor: "#f4f1e8" } }),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) {
    window.loadURL(devUrl);
  } else {
    window.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://") || url.startsWith("mailto:")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });
}

ipcMain.handle("portfolio:open-external", (_event, url) => {
  if (typeof url !== "string" || !/^(https?:|mailto:)/.test(url)) return false;
  shell.openExternal(url);
  return true;
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});
