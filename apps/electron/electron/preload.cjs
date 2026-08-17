const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("portfolio", {
  platform: process.platform,
  openExternal: (url) => ipcRenderer.invoke("portfolio:open-external", url),
});
