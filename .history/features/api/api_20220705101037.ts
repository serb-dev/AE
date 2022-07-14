import fetch from 'node-fetch'
import logger from '../../logger/logger';;


    export async function getCity() {
        const response = await fetch('https://restcountries.com/v3.1/alpha/US?json')
    
        const responseData = await response.json();

        return responseData[0].capital[0]
    }
