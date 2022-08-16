"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restcountriesApiClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * class wich get capital data from restcountries.com
 */
class restcountriesApiClient {
    constructor() {
        this.countryApi = 'https://restcountries.com/v3.1/alpha/US?json';
    }
    /**
     * Function that get JSON about US
     *
     * @returns capital data
     */
    async getCityNameFromAPI() {
        const request = await (0, node_fetch_1.default)(this.countryApi, {
            method: 'GET'
        });
        const responseData = await request.json();
        const city = responseData[0].capital[0];
        return city.slice(0, 10);
    }
}
exports.restcountriesApiClient = restcountriesApiClient;
//# sourceMappingURL=interfaceApi.js.map