const path = require('path')
const { app, BrowserWindow, ipcMain, screen } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        width: 1200,
        height: 750,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

    //mainWindow.loadURL(`http://localhost:8080`);
    //mainWindow.webContents.openDevTools();
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

try {
    require('electron-reloader')(module);
}catch(e){

}


ipcMain.on('full-screen', () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    mainWindow.setSize(width, height);
    mainWindow.setFullScreen(true);
    mainWindow.webContents.send('screen-size', { width, height });
});

ipcMain.on('default-screen', () => {
    mainWindow.setFullScreen(false);
    mainWindow.setSize(1200,750);
});
