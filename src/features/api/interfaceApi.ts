import fetch from 'node-fetch'

/**
 * class wich get capital data from restcountries.com
 */

export class restcountriesApiClient{
    countryApi = 'https://restcountries.com/v3.1/alpha/US?json'

    /**
     * Function that get JSON about US
     *
     * @returns capital data
     */

    public async getCityNameFromAPI(): Promise<string> {
        const request = await fetch(this.countryApi, {
            method: 'GET'
        })
        const responseData = await request.json()
        const city: string =  responseData[0].capital[0]
        return city.slice(0, 10)
    }
}
