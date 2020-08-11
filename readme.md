# Test Automation - Cross Browser

> Asynchronous cross browser testing with `WebdriverIO` **version 6**, a WebDriver test framework for Node.js

## Requirements

* [Node.js](https://nodejs.org/en/) - v12 upwards (use latest LTS version)
* [npm/cli](https://github.com/npm/cli) - v6 upwards (bundled with Node.js) - to update to latest stable release, run `npm install -g npm@latest`
* [Java](https://java.com/en/download/) - v8 (required to use `selenium-standalone-service`)
* The browsers you wish to test with (Chrome, Firefox etc.) must be installed on the machine running the tests

## Main packages used

* [webdriverio](https://github.com/webdriverio/webdriverio) **v6**
  * [@wdio/cli](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-cli) (v6.x.x)
  * [@wdio/local-runner](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-local-runner) (v6.x.x)
  * [@wdio/mocha-framework](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-mocha-framework) (v6.x.x)
  * [@wdio/selenium-standalone-service](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-selenium-standalone-service) (v6.x.x)
  * [@wdio/spec-reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-spec-reporter) (v6.x.x)

## Example tests

This project has examples of tests written for a number of public websites (to give you a flavour of what you could).

The websites tested include:
* [WebdriverIO 'Getting Started' page](https://webdriver.io/docs/gettingstarted.html) - the getting started page from the official WebdriverIO documentation
* [SauceLabs 'Sauce Demo' site](https://www.saucedemo.com/) - a demo site created by SauceLabs

## Usage for WebdriverIO v6

### Initial setup

This project uses `npm` as its package manager. The first task is to run `npm install` from the base of the project (where the `package.json` lives). This will install all the packages needed.

The majority of configuration is managed through the `wdio.conf.js` file found in the root of the repository.

You will need to edit the following in that file before use:

1. Edit `baseUrl` property to be the root URL of your test environment
2. Edit `loglevel` property to set the logging level you require (the default is 'info' level)
3. Edit `reporters` property if you want to set to use a specific reporter (the default is the 'spec' reporter)
4. Browser capabilities (`capabilities`) can be edited in the `./browserConfig` folder (rather than directly in the `wdio.conf.js` file). This allows you to define the browsers you wish your tests to run on. The default is Chrome (headless), Firefox (headless) and Internet Explorer 11 (32 bit) and MS Edge (legacy)

Note - browser drivers are downloaded automatically at the point of first running your tests and not during the `npm install` step (in case you were wondering).

### Internet Explorer 11 setup/support (32 bit)

The test examples included in this project will not work with IE11 due to its lack of support for modern flavours of JavaScript. However, all the configuration is included should you want to write IE11 compatible tests (this took a fair amount of research so I felt it worth including). See below for further information on how this could be remedied.

Note - the 32 bit version of this driver is preferred and used in this project (as recommended [here](https://www.selenium.dev/downloads/)).

Should you wish to write IE11 supported tests, there are a number of things needing to be configured to run tests successfully in IE11. Firstly, in 'Internet Options' > 'Security' tab set all your levels for each zone to the same security level (e.g. 'Medium'). You also need to **disable** 'Enhanced Mode' on **all zones** or have it set to the same level across **all zones**. The test runner will not run tests if it detects any zone is not disabled.

There are a number of other suggested setting tweaks and registry edits for the host machine running the tests. See [here](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver#required-configuration) for offical guidance.

As noted above, when creating tests you also need to be mindful that IE11 does not support more modern flavours of JavaScript (e.g. template literals, arrow functions, asynchronous code/promises etc.). Given your test code is being executed directly in the browser, always double check that your code will support **all** browsers under test by default. You can check whether something is supported by going to [here](https://caniuse.com/). Eventually I will look to use something like [Babel](https://babeljs.io/) to compile code down which would help mitigate this. Guidance for adding Babel to the project can be found [here](https://webdriver.io/docs/babel.html).

### Microsoft Edge (legacy) setup/support

Due to changes made by Microsoft in 2018, there are a number of things needing doing to execute tests successfully using Edge (see [here](https://blogs.windows.com/msedgedev/2018/06/14/webdriver-w3c-recommendation-feature-on-demand/#0q5AAJXB76iei8zE.97)). For Windows 10, you will need to enable 'Developer' mode which by default will install/enable the optional feature 'WebDriver'. By doing this and providing the following to `javaArgs` in the wdio.conf file things should work (see `wdio.browsers.setup.js` which has this done by default/is a handy wrapper for wdio configuration).

```javascript
javaArgs: [
        "-Dwebdriver.edge.driver=C:\\Windows\\System32\\MicrosoftWebDriver.exe",
]
```

Note: by doing this it will not use the `edgedriver` currently managed by the `selenium-standalone-service` package (which as of 26/11/2019 is still using v17134) which doesn't seem to play well with WebdriverIO v5 onwards. Also, from testing it appears MS Edge doesn't handle multiple instances well (it loses the unique session ID when multiple instances opened), so by default this project is configured to only ever spawn 1 instance and run MS Edge tests synchronously (unless you change this).

MS Edge Chromium support coming soon. See official Microsoft guidance for this [here](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium?tabs=javascript).

### Chrome setup/support

Currently there is no additional configuration required to use Chrome. Please ensure it is installed on the machine you are running the tests on.

### Firefox setup/support

Currently there is no additional configuration required to use Firefox. Please ensure it is installed on the machine you are running the tests on.

### Safari setup/support

Currently support for Safari is not yet implemented (although WedriverIO does support it). See [here](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari) for guidance in future.

### IDE setup

This project was initially set up with [Visual Studio Code](https://code.visualstudio.com/). You will want to install the following extensions if using VS Code:

* Prettier - Code formatter (esbenp.prettier-vscode)
* Eslint (dbaeumer.vscode-eslint)
* npm (eg2.vscode-npm-script)
* npm Intellisense (christian-kohler.npm-intellisense)

### Test location and file format

Tests should be added to the `test/specs` folder a need to be in the file format of `<name>.spec.js`. Any file that meets that file naming convention will be evaluated and run if possible. You can configure what tests to be run by editing the `specs: ["./test/specs/**/*.spec.js"]` property in the wdio.conf files.

### Page objects

This project uses a `Page Object Pattern` to abstract any page information away from the actual tests. This means that all selectors or specific instructions that are unique for a certain page are stored in a `page object`. This means that you can still run your test if you've completely redesigned your page by only having to update the page object file. Page object files should be added to the `test/pages` folder a need to be in the file format of `<name>.pages.js` and then required as necessary into your test files.

### Test data

Any test data should be added to the `test/data` folder a need to be in the file format of `<name>.data.json`.

### Running tests

To run tests from a local environment, simply run `npm test:[option]` (All, Chrome, Firefox, IE11 and Edge) from the root of the project. This initiates `WebdriverIO` to run all tests it finds. Test run configuration (including browser configuration) can be found in the `./browserConfig/` folder.

These default scripts can be are configured in `package.json` file under the `scripts` property.

If using Visual Code, you can simply initiate a test run by clicking play on the relevant npm script in the explorer window pane.

Test files can be excluded by using the `exclude: ["filename.spec.js"]` property in the `wdio.conf.js` file.

## Code formatting and linting

* [eslint](https://github.com/eslint/eslint) - find documentation [here](https://eslint.org/docs/user-guide/)
* [prettier](https://github.com/prettier/prettier) - find documentation [here](https://prettier.io/docs/en/)

This project uses `eslint` for code linting. Configuration can be found in the `.eslintrc.json` file.

It also uses `prettier` as an opinionated code formatter. Configuration can be found in the `.prettierrc.json` file.

If using [Visual Studio Code](https://code.visualstudio.com/) as your IDE, by default this repository will automatically format `.js` and `.json` on save. To change settings, edit `.vscode/settings.json`.
