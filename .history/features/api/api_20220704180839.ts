import fetch from 'node-fetch'
import logger from '../../logger/logger';;


    export async function getApiData() {
        const response = await fetch('https://restcountries.com/v3.1/alpha/US?json')
    
        const responseData = await response.json();

        const loadedData: string[] = []

        for (const key in responseData) {
            loadedData.push(responseData[key].capital[0])
        }

        let result = loadedData.toLocaleString()

        console.log(loadedData)

        return loadedData
    }
