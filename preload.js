// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getPythonVersion: () => ipcRenderer.invoke('get-python-version'),
  createVenv: (venvName, pythonPath) => ipcRenderer.invoke('create-venv', venvName, pythonPath),
  listPackages: (venvPath) => ipcRenderer.invoke('list-packages', venvPath),
  installPackage: (venvPath, packageName) => ipcRenderer.invoke('install-package', venvPath, packageName),
});