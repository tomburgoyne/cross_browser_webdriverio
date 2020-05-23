"use strict";

const merge = require("deepmerge");
const baseConfig = require("../wdio.conf.js");
const browserCapabilities = require("./browser.capabilities.js")
    .browserCapabilities;

exports.config = merge(baseConfig.config, {
    capabilities: [browserCapabilities.firefox],
});
