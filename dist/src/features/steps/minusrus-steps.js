"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const MinusrusMain_1 = require("../../pages/MinusrusMain");
(0, cucumber_1.Given)('Open minusrus.com', { timeout: 100 * 1000 }, async function () {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.goToMinusrusPage();
});
(0, cucumber_1.When)('Changing language', { timeout: 100 * 1000 }, async function () {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.checkingLanguage();
});
(0, cucumber_1.When)('Choose a {string}', { timeout: 100 * 1000 }, async function (date) {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    this.world.testDate = date;
    await homepage.changeDate(date);
});
(0, cucumber_1.Then)('Getting results', { timeout: 100 * 1000 }, async function () {
    const homepage = new MinusrusMain_1.MinusrusPage(this.world.driver);
    await homepage.testTaskSwitcher(this.world.testDate);
});
//# sourceMappingURL=minusrus-steps.js.map