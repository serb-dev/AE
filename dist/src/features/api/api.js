"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCity = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 *
 * @returns
 */
async function getCity() {
    const request = await (0, node_fetch_1.default)('https://restcountries.com/v3.1/alpha/US?json');
    const responseData = await request.json();
    const city = responseData[0].capital[0];
    return city.slice(0, 10);
}
exports.getCity = getCity;
//# sourceMappingURL=api.js.map