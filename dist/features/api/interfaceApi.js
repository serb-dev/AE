"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityApiClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cucumber_1 = require("@cucumber/cucumber");
class CityApiClient extends cucumber_1.World {
    constructor() {
        super(...arguments);
        this.cityApi = 'https://restcountries.com/v3.1/alpha/US?json';
    }
    async getApi() {
        const request = await node_fetch_1.default(this.cityApi, {
            method: 'GET'
        });
        const responseData = await request.json();
        const city = responseData[0].capital[0];
        return city.slice(0, 10);
    }
}
exports.CityApiClient = CityApiClient;
cucumber_1.setWorldConstructor(CityApiClient);
//# sourceMappingURL=interfaceApi.js.map