"use strict";

/* Main page object called 'Page'
It contains general selectors or methods which all page objects will inherit from
do not remove, only add to it */
module.exports = class Page {
    open(path) {
        browser.url(path);
    }
};
