import { log } from '../src/Logger';
import { stop as stopTestApp } from '../test-app';
import { selectedBrowser } from './browser';
import { getInstance } from './driver';
import { waitForFreePort } from './ports';

log.enabled = true;

async function stopDriver(port: number) {
  const instance = getInstance();
  const { driver: { name } } = selectedBrowser;

  log(`Shutting down ${name}`);

  if (instance) {
    instance.kill();
    await waitForFreePort(port);
    log(`${name} stopped on port ${port}`);
  }
}

async function globalTeardown() {
  if (process.env.WEB_DRIVER_PORT) {
    await stopDriver(parseInt(process.env.WEB_DRIVER_PORT));
  }
  await stopTestApp();
}

// tslint:disable-next-line:no-default-export
export default globalTeardown;
