import { Before } from "@cucumber/cucumber"
import { Builder} from 'selenium-webdriver'
import chrome from "selenium-webdriver/chrome";
import firefox from 'selenium-webdriver/firefox';
require('chromedriver');
require('geckodriver');

const firefoxOptions = new firefox.Options();
firefoxOptions.useGeckoDriver

const chromeOptions = new chrome.Options();
chromeOptions.excludeSwitches('enable-logging')

const brovser = process.env.BOWSER_ENW
console.log(brovser)

const driver = new Builder()
    .forBrowser(brovser)
    
    .build()

Before(async function(scenario) {
    console.log('I am before')
    this.world = {
        driver
    }
})