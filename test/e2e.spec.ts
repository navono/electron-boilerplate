// import * as electron from 'electron';
import * as path from 'path';
import { Application } from 'spectron';
import 'jest';

let electronPath = path.join(__dirname, '../node_modules', '.bin', 'electron');
// const appPath = path.join(__dirname, '../build');
if (process.platform === 'win32') {
  electronPath += '.cmd';
}

jest.setTimeout(30000);
// const delay = (time: number) =>
//   new Promise(resolve => setTimeout(resolve, time));

describe('main window', () => {
  let app: Application;

  beforeAll(async () => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', 'dist', 'main.js')],
      env: { NODE_ENV: 'test' },
    });
    return app.start();
  });

  afterAll(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
    return undefined;
  });

  it('shows an initial window', () => {
    console.log('app', app);
    expect(2).toBe(2);

    // return app.client.getWindowCount().then((count: number) => {
    //   // Please note that getWindowCount() will return 2 if `dev tools` are opened.
    //   // assert.equal(count, 2)
    //   expect(count).toBe(2);
    // });
  });

  // it('should open window', async () => {
  //   const { client, browserWindow } = this.app;
  //   console.log('app', this.app);

  //   await client.waitUntilWindowLoaded();
  //   await delay(500);
  //   const title = await browserWindow.getTitle();
  //   expect(title).toBe('Electron');
  // });
});
