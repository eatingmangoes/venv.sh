// renderer/index.js
const CREATE_VENV_BUTTON = document.getElementById('create-venv-btn')
const DEFAULT_PYTHON_PATH = "PATH"
const DEFAULT_VENV_NAME = "venv"

async function setPythonVersion() {
    const version = await window.electronAPI.getPythonVersion();
    document.getElementById('python-version').innerText = version;
  }
  
  setPythonVersion();
  
  CREATE_VENV_BUTTON.addEventListener('click', async () => {
        CREATE_VENV_BUTTON.innerText = "Creating..."
        const venvName = document.getElementById('venv-name').value || DEFAULT_VENV_NAME ;
        const pythonPath = document.getElementById('python-path').value || DEFAULT_PYTHON_PATH;
        const result = await window.electronAPI.createVenv(venvName, pythonPath);
        if (result) CREATE_VENV_BUTTON.innerText = "Create"
        document.getElementById('create-venv-message').innerText = result.message;
  });
  
  document.getElementById('list-packages-btn').addEventListener('click', async () => {
      const venvPath = document.getElementById('venv-path').value;
      const packages = await window.electronAPI.listPackages(venvPath);
      const packageList = document.getElementById('package-list');
      packageList.innerHTML = ''; // Clear previous list
  
      packages.forEach(pkg => {
        const listItem = document.createElement('li');
        listItem.textContent = `${pkg.name} (${pkg.version})`;
        packageList.appendChild(listItem);
      });
  });