"use strict";

const Page = require("./page.js");

class InventoryPage extends Page {
    // define your elements
    get appLogo() {
        return $(".app_logo");
    }
    get menuHamburger() {
        return $(".bm-burger-button");
    }
    get cartLogo() {
        return $("#shopping_cart_container");
    }
    get productsHeader() {
        return $(".product_label");
    }
    get productSortFilter() {
        return $("select.product_sort_container");
    }
    get footer() {
        return $("footer");
    }
    get footerCopy() {
        return $("footer .footer_copy");
    }
    get socialMediaIconList() {
        return $("footer ul.social");
    }
    get footerRobotImage() {
        return $("footer img.footer_robot");
    }
    // define your page functions
    /**
     * Takes screenshot of element with formatted filename for page
     * @param {object} element the located element object
     * @param {string} elementName the element name to use in filename
     */
    async saveScreenshot(element, elementName) {
        const filename = `./results/sauce_inventory_${elementName}.png`;
        await element.saveScreenshot(filename);
    }
}

module.exports = new InventoryPage();
