import { app, shell, BrowserWindow, ipcMain } from 'electron' // Core electron modules
import { join } from 'path' // A Node.js path module for handling file and directory paths
import { electronApp, optimizer, is } from '@electron-toolkit/utils' // Utilities which help with Electron app configuration window optimization, and enviornment detection
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900, // sets dimenstions of the window
    height: 670, // sets dimensions of the window
    show: false, // The window is created hidden and is only shown when it's ready (Prevents shoing a blank or loading screen)
    autoHideMenuBar: true, // Hides the menu bar unless 'Alt' is pressed
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Specifies a preload script, which is useful for safely exposing APIs to your renderer process
      sandbox: true, // Disables sandboxing for the renderer, allowing access to Node.js APIs directly
      contextIsolation: true
    }
  })
  // Ensusres the window is only shown when it's fully ready, improving user experience by avoiding a white flash.
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  // Prevents new windows from being opened within the app; instead, it opens links in teh user's default web browser.
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('Mike'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
