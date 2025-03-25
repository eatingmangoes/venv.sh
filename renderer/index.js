// renderer/index.js
async function setPythonVersion() {
    const version = await window.electronAPI.getPythonVersion();
    document.getElementById('python-version').innerText = version;
  }
  
  setPythonVersion();
  
  document.getElementById('create-venv-btn').addEventListener('click', async () => {
      const venvName = document.getElementById('venv-name').value;
      const pythonPath = document.getElementById('python-path').value;
      const result = await window.electronAPI.createVenv(venvName, pythonPath);
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