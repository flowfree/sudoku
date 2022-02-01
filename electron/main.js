const { app, BrowserWindow } = require('electron')

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 700,
    fullscreenable: false,
    resizable: false
  })

  window.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
