"use strict";

const assert = require("assert");
const ExamplePage = require("../pages/example.page.js");

// run before tests -see https://mochajs.org/#hooks for further guidance on this
before(() => {
    // open page under test - this runs once before the tests
    ExamplePage.open();
});

describe("Example page - WebdriverIO Getting Started page", () => {
    it("Check the page title is correct", async () => {
        const title = await browser.getTitle();
        assert.strictEqual(title, "Getting Started · WebdriverIO");
    });
    it("Check that the page header title element exists", async () => {
        const pageHeaderTitle = await ExamplePage.pageHeaderTitle;
        await pageHeaderTitle.waitForExist();
    });
});

describe("Example page - using a JSON data file to generate tests", () => {
    // create a new object of just the elements object returned from the .json file using require to get the file
    const elements = require("../data/example.data.json").elements;
    // use array.map to iterate/loop through elements object and create a test per element object found
    elements.forEach((element) => {
        it(`Checks that ${element.description} exists on page`, async () => {
            const el = await $(element.locator);
            await el.waitForExist();
        });
        // you would not normally have taking a screenshot as a 'test' - this is just an example of doing it
        it(`Takes a screenshot of ${element.description}`, async () => {
            const el = await $(element.locator);
            await el.saveScreenshot(`./results/${element.description}.png`);
        });
    });
});
