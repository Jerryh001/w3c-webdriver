## Custom Reporters

You can provide multiple reporters (formatters) for Cucumber. To generate an HTML view of your test reports, you can use
[cucumber-html-reporter](https://github.com/gkushang/cucumber-html-reporter).

### Step 1 - Installing dependencies

```terminal
npm install --save-dev cucumber-html-reporter mkdirp
```

### Step 2 - Create a cucumber config file

```js
// cucumber.conf.js
const fs = require('fs');
const path = require('path');
const { setDefaultTimeout, After, AfterAll, BeforeAll } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('w3c-webdriver');
const reporter = require('cucumber-html-reporter');

const attachedScreenshots = getScreenshots();

function getScreenshots() {
  try {
    const folder = path.resolve(__dirname, 'screenshots');

    const screenshots = fs.readdirSync(folder).map(file => path.resolve(folder, file));
    return screenshots;
  } catch (err) {
    return [];
  }
}

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'chromeHeadless' });
  await createSession();
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
  setTimeout(() => {
    reporter.generate({
      theme: 'bootstrap',
      jsonFile: 'report/cucumber_report.json',
      output: 'report/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
      metadata: {
        'App Version': '0.3.2',
        'Test Environment': 'POC'
      }
    });
  }, 0);
});

After(function() {
  return Promise.all(
    getScreenshots()
      .filter(file => !attachedScreenshots.includes(file))
      .map(file => {
        attachedScreenshots.push(file);
        return this.attach(fs.readFileSync(file), 'image/png');
      })
  );
});
```

For details on available options for report generation, see the
[Cucumber HTML Reporter documentation](https://github.com/gkushang/cucumber-html-reporter#usage).

### Step 3 - Update your npm scripts

```js
// package.json
{
   ...
   "scripts": {
       "e2e-test": "mkdirp report && cucumber-js --require cucumber-setup.js --require step-definitions --format node_modules/cucumber-pretty --format json:report/cucumber_report.json",
       ...
   }
   ...
}
```

Notice we have added the `json` formatter. This generates a JSON
report which is used by `cucumber-html-reporter` to generate the HTML report.
We use `mkdirp` to make sure `report` folder exists before running the test.

### Step 4 - Run the tests

```terminal
npm run e2e-test
```

When the test run completes, the HTML report is displayed in a new browser tab.

Example reports are available in the
[Cucumber HTML Reporter documentation](https://github.com/gkushang/cucumber-html-reporter#preview-of-html-reports).

For working example check out the [cucumber-example](https://github.com/mucsi96/w3c-webdriver/tree/master/packages/cucumber-example) in the repository.
