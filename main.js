const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Important for security!
      contextIsolation: true,  // Important for security!
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

  // Open the DevTools (optional, for development).
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// --- IPC Handling (Example) ---
ipcMain.handle('get-python-version', async () => {
    // Placeholder for getting the Python version.  We'll implement this later.
    return "3.9.7 (Example)"; // Replace with actual logic
});
