import fetch from 'node-fetch';
import logger from '../../logger/logger';
import { setWorldConstructor, World } from '@cucumber/cucumber';

class CityApiClient extends World {
    cityApi: string = 'https://restcountries.com/v3.1/alpha/US?json';

    getApi() {
        
    }
}