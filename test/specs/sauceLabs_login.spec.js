"use strict";

const LoginPage = require("../pages/sauceLabs_login.page.js");

// run before tests -see https://mochajs.org/#hooks for further guidance on this
before(() => {
    // open page under test - this runs once before the tests
    LoginPage.open();
});

describe("Sauce Labs demo site 'Swag Labs'", () => {
    it("Check the page title is correct", async () => {
        await expect(browser).toHaveTitle("Swag Labs");
    });
    it("Check that the login logo exists", async () => {
        const loginLogo = await LoginPage.loginLogo;
        await expect(loginLogo).toExist();
        await LoginPage.saveScreenshot(loginLogo, "loginLogo");
    });
    it("Checks that the username input exists and enters a value", async () => {
        const usernameInput = await LoginPage.usernameInput;
        await expect(usernameInput).toExist();
        await LoginPage.enterUsername("standard_user");
        await LoginPage.saveScreenshot(usernameInput, "usernameInput");
    });
    it("Checks that the password input exists and enters a value", async () => {
        const passwordInput = await LoginPage.passwordInput;
        await expect(passwordInput).toExist();
        await LoginPage.enterPassword("secret_sauce");
        await LoginPage.saveScreenshot(passwordInput, "passwordInput");
    });
    it("Checks that the login button exists and correct type and value attributes", async () => {
        const loginButton = await LoginPage.loginButton;
        await expect(loginButton).toExist();
        await expect(loginButton).toHaveAttribute("type", "submit");
        await expect(loginButton).toHaveAttribute("value", "LOGIN");
        await LoginPage.saveScreenshot(loginButton, "loginButton");
    });
    it("Checks that the login bot image exists and is displayed", async () => {
        const loginBotImage = await LoginPage.loginBotImage;
        await expect(loginBotImage).toExist();
        await expect(loginBotImage).toBeDisplayed();
        await expect(loginBotImage).toHaveAttributeContaining(
            "src",
            "img/Login_Bot_graphic.png",
        );
        await LoginPage.saveScreenshot(loginBotImage, "loginBotImage");
    });
    it("Checks that the login credentials wrapper exists", async () => {
        const credentialsWrapper = await LoginPage.loginCredentialsWrapper;
        await expect(credentialsWrapper).toExist();
    });
});
