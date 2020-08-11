"use strict";

/** Note(s):
 * @property {integer} maxInstances can get overwritten per capability. So if you have an in-house Selenium
 * grid with only 5 chrome instances available you can make sure that not more than
 * 5 instances get started at a time.
 * If outputDir is provided WebdriverIO can capture driver session logs
 * it is possible to configure which logTypes to include/exclude.
 * @property {string} excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
 * @property {string} excludeDriverLogs: ['bugreport', 'server'],
 */

exports.browserCapabilities = {
    chrome: {
        maxInstances: 5,
        browserName: "chrome",
        "goog:chromeOptions": {
            args: ["--headless", "--disable-gpu"],
        },
    },
    firefox: {
        maxInstances: 5,
        browserName: "firefox",
        "moz:firefoxOptions": {
            args: ["-headless"],
        },
    },
    ie11: {
        maxInstances: 5,
        browserName: "internet explorer",
        platformName: "Windows",
    },
    edge: {
        // for MS Edge (legacy), we ignore the version WebdriverIO supplies and use Windows optional feature version
        // this is handled in wdio.browsers.setup.js file in root of project
        // it seems far more reliable restricting MS Edge (legacy) to only 1 instance
        // MS Edge Chromium support to be added in future
        maxInstances: 1,
        browserName: "MicrosoftEdge",
    },
};
