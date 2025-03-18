import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/700.css"; // Specify weight

// DOM Element References (cache these for efficiency)
const pythonVersionSpan = document.getElementById('python-version');
const venvNameInput = document.getElementById('venv-name');
const pythonPathInput = document.getElementById('python-path');
const createVenvBtn = document.getElementById('create-venv-btn');
const createVenvMessage = document.getElementById('create-venv-message');
const venvPathInput = document.getElementById('venv-path');
const listPackagesBtn = document.getElementById('list-packages-btn');
const packageList = document.getElementById('package-list');

// Function to set the Python version
async function setPythonVersion() {
    const version = await window.electronAPI.getPythonVersion();
    pythonVersionSpan.innerText = version;
}

// Function to handle creating a virtual environment
async function handleCreateVenv() {
    const venvName = venvNameInput.value;
    const pythonPath = pythonPathInput.value;
    const result = await window.electronAPI.createVenv(venvName, pythonPath);
    createVenvMessage.innerText = result.message;
}

// Function to handle listing packages
async function handleListPackages() {
    const venvPath = venvPathInput.value;
    const packages = await window.electronAPI.listPackages(venvPath);
    packageList.innerHTML = ''; // Clear previous list

    packages.forEach(pkg => {
        const listItem = document.createElement('li');
        listItem.textContent = `${pkg.name} (${pkg.version})`;
        packageList.appendChild(listItem);
    });
}

// Event Listeners
createVenvBtn.addEventListener('click', handleCreateVenv);
listPackagesBtn.addEventListener('click', handleListPackages);

// Initial Setup
setPythonVersion();