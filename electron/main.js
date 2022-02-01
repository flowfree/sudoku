const { app, BrowserWindow } = require('electron')

function createWindow() {
  const window = new BrowserWindow({
    width: 625,
    height: 725,
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
