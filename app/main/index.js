const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const dev = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3080;

const installExtensions = async () => {
  if (dev) {
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    return Promise
      .all(extensions.map(name => installExtension(name, forceDownload)))
      .catch(console.log);
  }

  return Promise.resolve([]);
};

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1300, height: 800})

  // and load the index.html of the app.
  const html = dev ? 
   `http:\\\localhost:${PORT}`
   : url.format({
    pathname: path.join("../dist/", "./index.html"),
    protocol: "file:",
    slashes: true,
  });

  console.log(`electron load from: ${html}`);
  mainWindow.loadURL(html);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  await installExtensions();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.