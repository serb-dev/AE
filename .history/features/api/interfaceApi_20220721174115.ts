import fetch from 'node-fetch';

export class restcountriesApiClient{
    countryApi: string = 'https://restcountries.com/v3.1/alpha/US?json';

    public async getCityNameFromAPI(): Promise<string> {
        const request = await fetch(this.countryApi, {
            method: 'GET'
        })
        const responseData = await request.json();
        const city: string =  responseData[0].capital[0];
        return city.slice(0, 10);
    };
};