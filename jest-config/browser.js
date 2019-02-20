import assert from 'assert';
import { path as chromedriverPath } from 'chromedriver';
import { path as geckodriverPath } from 'geckodriver';
import { path as iedriverPath } from 'iedriver';

const browsers = [
  {
    id: 'chrome',
    desiredCapabilities: {
      browserName: 'chrome',
      javascriptEnabled: true,
      chrome_binary: process.env.CHROME_BIN
    },
    driver: {
      name: 'Chromedriver',
      path: process.env.CI ? 'chromedriver' : chromedriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'chrome-headless',
    desiredCapabilities: {
      browserName: 'chrome',
      javascriptEnabled: true,
      chromeOptions: {
        args: ['incognito', 'headless', 'no-sandbox', 'disable-gpu']
      },
      chrome_binary: process.env.CHROME_BIN
    },
    driver: {
      name: 'Chromedriver',
      path: process.env.CI ? 'chromedriver' : chromedriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'firefox',
    desiredCapabilities: {
      browserName: 'firefox',
      marionette: true,
      javascriptEnabled: true
    },
    driver: {
      name: 'Geckodriver',
      path: process.env.CI ? 'geckodriver' : geckodriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'internet-explorer',
    desiredCapabilities: {
      browserName: 'internet explorer',
      ignoreProtectedModeSettings: true,
      ignoreZoomSetting: true,
      'ie.ensureCleanSession': true,
      logLevel: 'INFO'
    },
    driver: {
      name: 'InternetExplorerDriver',
      path: process.env.CI ? 'IEDriverServer' : iedriverPath,
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
