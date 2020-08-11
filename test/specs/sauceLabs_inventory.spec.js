"use strict";

const LoginPage = require("../pages/sauceLabs_login.page.js");
const InventoryPage = require("../pages/sauceLabs_inventory.page.js");

// run before tests -see https://mochajs.org/#hooks for further guidance on this
before(() => {
    // before tests, open login page and login with user credentials
    LoginPage.open();
    LoginPage.loginUser("standard_user", "secret_sauce");
});

describe("Sauce Labs demo site 'Swag Labs' inventory page", () => {
    it("Check the page title is correct", async () => {
        await expect(browser).toHaveTitle("Swag Labs");
    });
    it("Check that the app logo exists", async () => {
        const appLogo = await InventoryPage.appLogo;
        await expect(appLogo).toExist();
        await InventoryPage.saveScreenshot(appLogo, "appLogo");
    });
    it("Checks that the products header exists and has correct text", async () => {
        const productsHeader = await InventoryPage.productsHeader;
        await expect(productsHeader).toExist();
        await expect(productsHeader).toHaveText("Products");
        await InventoryPage.saveScreenshot(productsHeader, "productsHeader");
    });
    it("Checks that the page footer exists", async () => {
        const pageFooter = await InventoryPage.footer;
        await expect(pageFooter).toExist();
        await InventoryPage.saveScreenshot(pageFooter, "pageFooter");
    });
    it("Checks that 3 social media icons appear within page footer with correct properties", async () => {
        const socialMediaIconList = await InventoryPage.socialMediaIconList;
        await expect(socialMediaIconList).toExist();
        await expect(socialMediaIconList).toHaveChildren({ eq: 3 });
        const icons = await socialMediaIconList.$$("li");
        // Twitter iconc
        await expect(icons[0]).toHaveText("Twitter");
        await expect(icons[0]).toHaveClass("social_twitter");
        // Facebook icon
        await expect(icons[1]).toHaveText("Facebook");
        await expect(icons[1]).toHaveClass("social_facebook");
        // LinkedIn icon
        await expect(icons[2]).toHaveText("LinkedIn");
        await expect(icons[2]).toHaveClass("social_linkedin");
        await InventoryPage.saveScreenshot(
            socialMediaIconList,
            "socialMediaIconList",
        );
    });
    it("Checks that the page footer has expected copy text", async () => {
        const pageFooterCopy = await InventoryPage.footerCopy;
        await expect(pageFooterCopy).toHaveTextContaining(
            "© 2020 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy",
        );
        await InventoryPage.saveScreenshot(pageFooterCopy, "pageFooterCopy");
    });
    it("Checks that the footer robot image exists and is displayed", async () => {
        const footerRobotImage = await InventoryPage.footerRobotImage;
        await expect(footerRobotImage).toExist();
        await expect(footerRobotImage).toBeDisplayed();
        await expect(footerRobotImage).toHaveAttributeContaining(
            "src",
            "img/SwagBot_Footer_graphic.png",
        );
        await LoginPage.saveScreenshot(footerRobotImage, "footerRobotImage");
    });
});
