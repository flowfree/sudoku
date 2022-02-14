const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

function createWindow() {
  const window = new BrowserWindow({
    width: 600,
    height: 585,
    fullscreenable: false,
    resizable: false
  })

  if (isDev) {
    window.loadURL('http://localhost:3000')
  } else {
    const filename = path.join(__dirname, '../build/index.html')
    window.loadURL(`file://${filename}`)
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
