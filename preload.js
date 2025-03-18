const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getPythonVersion: () => ipcRenderer.invoke('get-python-version'),
  // Add more functions here to expose to the renderer process.
});
