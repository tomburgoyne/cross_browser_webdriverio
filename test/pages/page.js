"use strict";

/** Main page class called 'Page'
 * It contains general selectors or methods which all page objects will inherit from
 * do not remove, only add to it. All other pages extend this class.
 */
module.exports = class Page {
    // universal functions
    /**
     * Open browser and navigate to the URL
     * @param {string} path URL path
     */
    open(path) {
        browser.url(path);
    }
};
