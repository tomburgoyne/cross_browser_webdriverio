"use strict";

const Page = require("./page.js");

class LoginPage extends Page {
    // define your elements
    get loginLogo() {
        return $(".login_logo");
    }
    get usernameInput() {
        return $("input#user-name");
    }
    get passwordInput() {
        return $("input#password");
    }
    get loginButton() {
        return $("input#login-button");
    }
    get loginBotImage() {
        return $("img.bot_column");
    }
    get loginCredentialsWrapper() {
        return $(".login_credentials_wrap");
    }
    // define your page functions
    /** Navigate to saucedemo.com website
     */
    open() {
        super.open("https://www.saucedemo.com/");
    }
    /** Enter username into username input
     * @param {string} username username
     */
    async enterUsername(username) {
        const usernameInput = await this.usernameInput;
        await usernameInput.setValue(username);
    }
    /** Enter password into password input
     * @param {string} password password
     */
    async enterPassword(password) {
        const passwordInput = await this.passwordInput;
        await passwordInput.setValue(password);
    }
    /** Click login button
     */
    async clickLoginButton() {
        const loginButton = await this.loginButton;
        await loginButton.click();
    }
    /** Enter user credentials and click login button
     * @param {string} username username
     * @param {string} password password
     */
    async loginUser(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
    /**
     * Takes screenshot of element with formatted filename for page
     * @param {object} element the located element object
     * @param {string} elementName the element name to use in filename
     */
    async saveScreenshot(element, elementName) {
        const filename = `./results/sauce_login_${elementName}.png`;
        await element.saveScreenshot(filename);
    }
}
module.exports = new LoginPage();
