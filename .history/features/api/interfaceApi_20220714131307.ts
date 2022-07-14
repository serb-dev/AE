import fetch from 'node-fetch';
import logger from '../../logger/logger';
import { setWorldConstructor, World } from '@cucumber/cucumber';

class CityApiClient extends World {
    city: string

    getApi() {
        
    }
}