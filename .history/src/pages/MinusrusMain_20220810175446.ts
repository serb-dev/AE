import { WebDriver, By, until } from 'selenium-webdriver'
import {delay} from '../utils/utils'
import logger from '../logger/logger'

export class MinusrusPage {
    public driver: WebDriver

    private url = 'https://www.minusrus.com/'
    private engBtn: By = By.xpath('//a[@href="/en"]')
    private logoText: By = By.className('logo-text')
    private dateLabel: By = By.className('main__part')
    private dateArrow: By = By.className('control-btn')
    private expectedTitleStr = 'За підтримки Сил Спеціальних Операцій'

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async goToMinusrusPage(): Promise<void> {
        logger.info('Open minusrus page')
        await this.driver.manage().window().maximize()
        await this.driver.get(this.url)
    }

    public async checkingLanguage(): Promise<void> {
        const element = await this.driver.wait(until.elementLocated(this.logoText), 10000)
        const languageENG = await this.driver.wait(until.elementLocated(this.engBtn), 10000)
        const text = await element.getText()
        const replacedStr = text.replace('\n', ' ')
        await delay(3000)
        if(replacedStr.includes(this.expectedTitleStr)){
            logger.info(replacedStr)
            languageENG.click()
        }else{
            logger.error('no matches')
        }
    }

    public async changeDate(expectedDate: string): Promise<void> {
        await delay(3000)
        logger.info('delay')
        const dateTitleElement = await this.driver.wait(until.elementLocated(this.dateLabel), 10000)
        logger.info('date')
        const dateArrowElement = await this.driver.wait(until.elementLocated(this.dateArrow), 10000)
        logger.info('arrow')
        const date = await dateTitleElement.getText()

        if(date.includes(expectedDate)){
            logger.info(date)
        }else{
            dateArrowElement.click()
        }
    }
}
