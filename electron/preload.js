// GLOBALEP Electron Preload Script
// Securely exposes limited APIs to the renderer process
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  version: process.env.npm_package_version || '2.0.0',
  isElectron: true,

  // File system operations for backup/restore (secure)
  saveBackup: (data) => ipcRenderer.invoke('save-backup', data),
  loadBackup: () => ipcRenderer.invoke('load-backup'),
  selectBackupFile: () => ipcRenderer.invoke('select-backup-file'),

  // App info
  getAppVersion: () => process.env.npm_package_version || '2.0.0',
});

// Notify the renderer when Electron is ready
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('electron-app');
});
