import fetch from 'node-fetch'
import { WebDriver, By } from "selenium-webdriver";
import logger from '../../logger/logger';;


    const fetchPosts = async () => {
        const response = await fetch('https://restcountries.com/v3.1/alpha/US?json')
    
        const responseData = await response.json();

        const loadedData = [];

        for (const key in responseData) {
            loadedData.push({
                capital: responseData[key].capital[0]
            })
        }

        console.log(loadedData)
    }
