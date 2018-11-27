// import * as electron from 'electron';
import * as path from 'path';
import { Application } from 'spectron';
import 'jest';

let electronPath = path.join(__dirname, '../node_modules', '.bin', 'electron');
if (process.platform === 'win32') {
  electronPath += '.cmd';
}

jest.setTimeout(30000);

const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

describe('main window', () => {
  let app: Application;

  beforeAll(async () => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', 'build', 'main.js')],
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

  it('should open window', async () => {
    const { client, browserWindow } = app;

    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).toBe('Electron');
  });
});
