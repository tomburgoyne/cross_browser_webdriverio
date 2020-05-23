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
