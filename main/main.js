const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev') === true;
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const nextApp = next({ dev: isDev, dir: path.join(__dirname, '../') });
const handle = nextApp.getRequestHandler();

let mainWindow;

async function createWindow() {
  console.log('Starting Next.js preparation...');
  try {
    await nextApp.prepare();
    console.log('Next.js prepared.');
    
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });

    mainWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
      title: "InvAnalytics ERP Suite",
      backgroundColor: '#ffffff'
    });

    if (isDev) {
      mainWindow.loadURL('http://localhost:3000');
      // mainWindow.webContents.openDevTools();
    } else {
      mainWindow.loadURL('http://localhost:3000');
      mainWindow.setMenu(null);
    }

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  } catch (error) {
    console.error('Failed to start Next.js server:', error);
    app.quit();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});