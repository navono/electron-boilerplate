import { app, BrowserWindow } from 'electron';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

const dev = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3080;

const installExtensions = async () => {
  if (dev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    return Promise.all(
      extensions.map(name => installExtension(name, forceDownload)),
    );
  }

  return Promise.resolve([]);
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1300, height: 800 });

  // and load the index.html of the app.
  const html = dev
    ? `http:\\\localhost:${PORT}`
    : `file://${__dirname}/index.html`;

  mainWindow.loadURL(html);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // mainWindow.webContents.on('crashed', (event, kiiled) => {
  //   log.error(`App crashed, ${event}, ${kiiled}`);
  // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  await installExtensions();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
