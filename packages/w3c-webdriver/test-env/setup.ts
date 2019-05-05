import { newSession } from '../src';
import { log, setLogger } from '../src/logger';
import { browser } from './browser';
import { session, setSession } from './session';

setLogger((message: string) => {
  // tslint:disable-next-line:no-console
  console.log(message);
});

const webDriverUrl = browser.hub || `http://localhost:${process.env.WEB_DRIVER_PORT}`;
const testAppPort = process.env.TEST_APP_PORT;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async () => {
  log(`Creating session on ${webDriverUrl}.`);
  try {
    setSession(
      await newSession({
        url: webDriverUrl,
        capabilities: browser.capabilities,
        desiredCapabilities: browser.desiredCapabilities,
        headers: browser.headers
      })
    );
    log(`Session created.`);
  } catch (error) {
    if (error instanceof Error && error.stack) {
      log(error.stack);
    }
    throw error;
  }
});

beforeEach(async () => {
  await session.go(`http://localhost:${testAppPort}`);
});

afterAll(async () => {
  log(`Deleting session on ${webDriverUrl}.`);
  await session.close();
  log(`Session deleted.`);
  if (browser.id === 'safari') {
    log(`Wait for 2 seconds...`);
    await new Promise(resolve => setTimeout(() => { resolve() }, 2000));
  }
});
