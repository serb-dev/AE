import fetch from 'node-fetch';
import logger from '../../logger/logger';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';

export class CityApiClient {
    cityApi: string = 'https://restcountries.com/v3.1/alpha/US?json';
    cityName = this.getApi()

    // constructor(){
    //     super()
    // }

    public async getApi(): Promise<string> {
        const request = await fetch(this.cityApi, {
            method: 'GET'
        })
        const responseData = await request.json();
        const city: string =  responseData[0].capital[0];
        return city.slice(0, 10)
    }
}

setWorldConstructor(CityApiClient);