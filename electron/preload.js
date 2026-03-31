const { contextBridge } = require('electron')

// Expose safe APIs to renderer process here as needed
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
})
