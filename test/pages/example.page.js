"use strict";

const Page = require("./page.js");

class ExamplePage extends Page {
    // define your elements
    get pageHeaderTitle() {
        return $(".postHeaderTitle");
    }
    // define your page functions
    /**
     * Open WebdriverIO getting started page
     */
    open() {
        super.open("docs/gettingstarted.html");
    }
}
module.exports = new ExamplePage();
