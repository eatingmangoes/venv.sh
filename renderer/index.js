async function setPythonVersion() {
  const version = await window.electronAPI.getPythonVersion();
  document.getElementById('python-version').innerText = version;
}

setPythonVersion();
