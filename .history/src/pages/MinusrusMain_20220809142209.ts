import { WebDriver, until, By } from 'selenium-webdriver'
// import {delay} from '../utils/utils'
import logger from '../logger/logger'

export class MinusrusPage {
    public driver: WebDriver

    private url = 'https://www.minusrus.com/'
    private languageENG: By = By.xpath('//a[@href="/en"]')
    private logoText: By = By.className('logo-text')
    private dateLabel: By = By.className('date__label')
    private date arrow: By = By

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async goToMinusrusPage() {
        logger.info('I open minusrus page')
        await this.driver.manage().window().maximize()
        await this.driver.get(this.url)
    }
}
