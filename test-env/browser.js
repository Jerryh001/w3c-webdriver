import assert from 'assert';
import { path as chromedriverPath } from 'chromedriver';
import { path as geckodriverPath } from 'geckodriver';
import { path as iedriverPath } from 'iedriver';

const browsers = [
  {
    id: 'chrome',
    capability: {
      browserName: 'chrome',
      javascriptEnabled: true,
      chrome_binary: process.env.CHROME_BIN
    },
    driver: {
      name: 'Chromedriver',
      path: chromedriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'chrome-headless',
    capability: {
      browserName: 'chrome',
      javascriptEnabled: true,
      chromeOptions: {
        args: ['incognito', 'headless', 'no-sandbox', 'disable-gpu']
      },
      chrome_binary: process.env.CHROME_BIN
    },
    driver: {
      name: 'Chromedriver',
      path: chromedriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'firefox',
    capability: {
      browserName: 'firefox',
      marionette: true,
      javascriptEnabled: true
    },
    driver: {
      name: 'Geckodriver',
      path: geckodriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'firefox-headless',
    capability: {
      browserName: 'firefox',
      marionette: true,
      javascriptEnabled: true,
      'moz:firefoxOptions': {
        args: ['-headless']
      }
    },
    driver: {
      name: 'Geckodriver',
      path: geckodriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'safari',
    capability: {
      browserName: 'safari',
      javascriptEnabled: true
    },
    driver: {
      name: 'SafariDriver',
      path: 'safaridriver',
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'internet-explorer',
    capability: {
      browserName: 'internet explorer',
      ignoreProtectedModeSettings: true,
      ignoreZoomSetting: true,
      'ie.ensureCleanSession': true,
      logLevel: 'INFO'
    },
    driver: {
      name: 'InternetExplorerDriver',
      path: iedriverPath,
      args: ({ port }) => [`--port=${port}`, '--log-level=INFO']
    }
  }
];

const selectedBrowser = browsers.find(browser => browser.id === process.env.BROWSER);

assert(
  selectedBrowser,
  'Environment variable BROWSER is not set or is not matching the supported browsers.'
);

export default selectedBrowser;

export const name = selectedBrowser.capability.browserName;
