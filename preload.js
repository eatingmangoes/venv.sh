const { contextBridge, ipcRenderer } = require('electron');

// ... (previous code in preload.js) ...

contextBridge.exposeInMainWorld('electronAPI', {
  getPythonVersion: () => ipcRenderer.invoke('get-python-version'),
  createVenv: (venvName, pythonPath) => ipcRenderer.invoke('create-venv', venvName, pythonPath),
  listPackages: (venvPath) => ipcRenderer.invoke('list-packages', venvPath),
  // Add more API functions as needed
});