"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const MinusrusMain_1 = require("../../pages/MinusrusMain");
(0, cucumber_1.Given)('Open minusrus.com', { timeout: 100 * 1000 }, async function () {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.goToMinusrusPage();
});
(0, cucumber_1.When)('Choose {string} language', { timeout: 100 * 1000 }, async function (language) {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.choosingLanguage(language);
});
(0, cucumber_1.When)('Verify that selected language is {string}', { timeout: 100 * 1000 }, async function (language) {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.verifyingSelectedLanguage(language);
});
(0, cucumber_1.When)('Choose a {string}', { timeout: 100 * 1000 }, async function (date) {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.chooseDate(date);
});
(0, cucumber_1.When)('Chose a {string} day', { timeout: 100 * 1000 }, async function (another) {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.chooseDate(another);
});
(0, cucumber_1.Then)('Verify that intendent loss for {string} entity calculated correctly', { timeout: 100 * 1000 }, async function (entity) {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.testTaskSwitcher(entity);
});
//# sourceMappingURL=minusrus-steps.js.map