import fetch from 'node-fetch';
import logger from '../../logger/logger';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';

export class restcountriesApiClient {
    countryApi: string = 'https://restcountries.com/v3.1/alpha/US?json';
    result: string

    public async getApi(): Promise<string> {
        const request = await fetch(this.countryApi, {
            method: 'GET'
        })
        const responseData = await request.json();
        const city: string =  responseData[0].capital[0];
        return city.slice(0, 10)
    }
}

export class restcountriesCityData {
    cityResponseData: restcountriesApiClient
    result: 
    constructor(){
        this.cityResponseData = new restcountriesApiClient();
        this.result
    }
}


setWorldConstructor(restcountriesCityData);