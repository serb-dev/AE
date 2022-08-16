import { WebDriver, until, By } from 'selenium-webdriver'
import {delay} from '../utils/utils'
import logger from '../logger/logger'

export class MinusrusPage {
    public driver: WebDriver

    private url = 'https://www.minusrus.com/'
    private languageENG: By = By.xpath('//div[@class="languages"]')


    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async goToMinusrusPage() {
        logger.info('I open minusrus page')
        await this.driver.manage().window().maximize()
        await this.driver.get(this.url)
    }
}
