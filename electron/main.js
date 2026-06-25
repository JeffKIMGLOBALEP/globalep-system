// GLOBALEP Electron Main Process
const { app, BrowserWindow, shell, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow = null;
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'GLOBALEP - Global E-Commerce Management',
    icon: path.join(__dirname, '..', 'icon.png'),
    backgroundColor: '#0a0e17',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    // Hide the default menu bar for cleaner look
    autoHideMenuBar: true,
  });

  // Load the HTML file
  const htmlPath = path.join(__dirname, '..', 'index.html');
  mainWindow.loadFile(htmlPath);

  // Open external links in the default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Build custom application menu
  const template = [
    {
      label: 'GLOBALEP',
      submenu: [
        { label: 'About GLOBALEP', role: 'about' },
        { type: 'separator' },
        { role: 'quit', label: 'Exit / 退出' }
      ]
    },
    {
      label: 'Edit / 编辑',
      submenu: [
        { role: 'undo', label: 'Undo / 撤销' },
        { role: 'redo', label: 'Redo / 恢复' },
        { type: 'separator' },
        { role: 'cut', label: 'Cut / 剪切' },
        { role: 'copy', label: 'Copy / 复制' },
        { role: 'paste', label: 'Paste / 粘贴' },
        { role: 'selectAll', label: 'Select All / 全选' }
      ]
    },
    {
      label: 'View / 视图',
      submenu: [
        { role: 'reload', label: 'Reload / 刷新' },
        { role: 'toggleDevTools', label: 'DevTools / 开发者工具' },
        { type: 'separator' },
        { role: 'zoomIn', label: 'Zoom In / 放大' },
        { role: 'zoomOut', label: 'Zoom Out / 缩小' },
        { role: 'resetZoom', label: 'Reset Zoom / 重置缩放' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Fullscreen / 全屏' }
      ]
    },
    {
      label: 'Data / 数据',
      submenu: [
        {
          label: 'Backup Data / 备份数据',
          accelerator: 'CmdOrCtrl+Shift+B',
          click: () => { mainWindow.webContents.executeJavaScript('if(typeof exportBackup==="function")exportBackup()'); }
        },
        {
          label: 'Restore Data / 恢复数据',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => { mainWindow.webContents.executeJavaScript('if(typeof triggerImportBackup==="function")triggerImportBackup()'); }
        }
      ]
    },
    {
      label: 'Help / 帮助',
      submenu: [
        {
          label: 'Documentation / 文档',
          click: () => { shell.openExternal('https://www.google.com/search?q=GLOBALEP'); }
        }
      ]
    }
  ];

  // Add Mac-specific menu
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
