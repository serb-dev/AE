import fetch from 'node-fetch';
import logger from '../../logger/logger';
import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CityApiClient extends World {
    cityApi: string = 'https://restcountries.com/v3.1/alpha/US?json';

    public async getApi() {
        const request = await fetch(this.cityApi, {
            method: 'GET'
        })
        return await request.json();
    }
}
setWorldConstructor(CityApiClient);