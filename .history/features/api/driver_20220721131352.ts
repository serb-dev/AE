import { WebDriver } from 'selenium-webdriver';
import { Builder, ThenableWebDriver} from 'selenium-webdriver'

export class Driver {
    driver = new Builder()

    constructor(brovser){
        this.driver = new Builder()
    }
}

const driver = new Builder()
.forBrowser()
.withCapabilities()
.build()
