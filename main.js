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

const { exec } = require('child_process');

ipcMain.handle('get-python-version', async () => {
  return new Promise((resolve, reject) => {
    exec('python3 --version', (error, stdout, stderr) => { // Or 'python' if that's your default
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error); // Or handle the error more gracefully
        return;
      }
      // Extract the version string (you might need to adjust the regex)
      const version = stdout.trim().match(/Python (\d+\.\d+\.\d+)/)[1];
      resolve(version);
    });
  });
});

// --- Example: Create a Virtual Environment ---
ipcMain.handle('create-venv', async (event, venvName, pythonPath) => {
    return new Promise((resolve, reject) => {
        const command = pythonPath ? 
            `${pythonPath} -m venv ${venvName}` : 
            `python3 -m venv ${venvName}`; // Use python3 or python as appropriate
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
            return;
          }
          resolve({ success: true, message: `Virtual environment "${venvName}" created.` });
        });
    });
});

// --- Example: List installed packages in a venv ---
ipcMain.handle('list-packages', async (event, venvPath) => {
  return new Promise((resolve, reject) => {
    // Construct the path to the pip executable within the venv
    const pipPath = path.join(venvPath, 'bin', 'pip'); // For Unix-like systems
    // const pipPath = path.join(venvPath, 'Scripts', 'pip.exe'); // For Windows

    const command = `${pipPath} list --format=json`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      try {
        const packages = JSON.parse(stdout);
        resolve(packages);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
});