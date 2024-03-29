"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateChecking = exports.delay = void 0;
const logger_1 = __importDefault(require("../logger/logger"));
/**
 * Function for delay and pauses between steps
 *
 * @param ms accept number of ms
 * @returns Promise with timeout
 */
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.delay = delay;
function dateChecking(expectedDate, currentDate) {
    const date = new Date();
    const splitedDate = expectedDate.split('.');
    const reverrsedDate = splitedDate.reverse();
    const newDate = reverrsedDate.join('.');
    const dateExpected = new Date(newDate);
    if (date > dateExpected) {
        logger_1.default.info('succes DATA');
        logger_1.default.info(date);
        logger_1.default.info(dateExpected);
    }
    else {
        logger_1.default.info(date);
        logger_1.default.info(dateExpected);
        throw new Error(expectedDate + ' > than ' + currentDate);
    }
}
exports.dateChecking = dateChecking;
//# sourceMappingURL=utils.js.map