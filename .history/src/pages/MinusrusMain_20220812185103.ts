import { WebDriver, By, until } from 'selenium-webdriver'
import {delay} from '../utils/utils'
import logger from '../logger/logger'

export class MinusrusPage {
    public driver: WebDriver

    private url = 'https://www.minusrus.com/'
    private engBtn: By = By.xpath('//a[@href="/en"]')
    private logoText: By = By.className('logo-text')
    private dateLabel: By = By.className('date__label')
    private dateArrow: By = By.className('control-btn')

    private lostOfPersonel: By = By.xpath('//div[@class="card_large"]/div/div[2]/span')
    private percentOfLosses: By = By.className('percent__int large')

    private lostOfAircrafts: By = By.xpath('//div[@class=card__container]/div[4]/div[2]/span')
    private percentOfLossesAircrafts: By = By.xpath('//div[@class=card__container]/div[4]/div[3]/div[2]/div/div/div/div/div/span')

    private expectedTitleStr = 'За підтримки Сил Спеціальних Операцій'
    private intendetForInvasion = '190.000'
    private intendetAircraftsForInv = '330'

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
            throw new Error('no matches with title')
        }
    }

    public async changeDate(expectedDate: string): Promise<void> {
        await delay(3000)
        logger.info(expectedDate)

        // new Date(’11.08.2022’) > new Date(’12.08.2022’)
        // Date.now()

        await delay(3000)
        const result = await this.dateSwitcher(expectedDate)
        logger.info(result)

        // await this.testTaskSwitcher(expectedDate)
    }

    // private methods for calculating russian losses

    private async calculationOfPersonalLosses(): Promise<void> {
        const roundedLossesElement = await this.driver.wait(until.elementLocated(this.lostOfPersonel), 10000)
        const roundedLosses = await roundedLossesElement.getText()
        const totalLosses =  roundedLosses.slice(1, 7)
        logger.info('get number of losses from site:' + totalLosses)

        const personalLosses = await this.calculatorOfPercent(totalLosses, this.intendetForInvasion)
        logger.info(personalLosses)
        return personalLosses
    }

    private async calculationOfAircraftLosses(): Promise<void> {
        const dailyLossesAircraftsElement = await this.driver.wait(until.elementLocated(this.lostOfAircrafts), 10000)
        const dailyLossesAircraft = await dailyLossesAircraftsElement.getText()
        logger.info('get daily number of aircraf losses:' + dailyLossesAircraft)

        const aircraftLosses = await this.calculatorOfPercent(dailyLossesAircraft, this.intendetAircraftsForInv)
        return aircraftLosses
    }

    private async calculatorOfPercent(daily: string, intendet: string): Promise<void> {
        const totalNumber =  +intendet / +daily
        const percent = totalNumber * 100
        logger.info(percent)
    }

    private async dateSwitcher(expectedDate: string): Promise<void> {
        const dateElement = await this.driver.wait(until.elementLocated(this.dateLabel), 10000)
        const leftArrow = await this.driver.wait(until.elementLocated(this.dateArrow), 1000)
        const currentDate = await dateElement.getText()
        logger.info(currentDate)
        logger.info(expectedDate)
        await delay(3000)
        logger.info('work2')
        await leftArrow.click()
        let i
        while(i < 3){
            leftArrow.click()
            delay(2000)
            i++
        }
    }

    private async testTaskSwitcher(expectedDate: string) {
        switch(expectedDate){
        case '09.08.2022':
            const percentOfLossesElement = await this.driver.wait(until.elementLocated(this.percentOfLosses), 10000)
            const percentOfLosses = await percentOfLossesElement.getText()
            logger.info('get percent of losses from site:' + percentOfLosses)

            const calculationOfPersonalLosses = this.calculationOfPersonalLosses()
            logger.info(calculationOfPersonalLosses)
            if(+percentOfLosses === +calculationOfPersonalLosses){
                logger.info('succes')
            }else{
                logger.error('error')
            }

        case '06.08.2022':
            const percentLossesAircraftElement = await this.driver.wait(until.elementLocated(this.percentOfLossesAircrafts), 10000)
            const totaPercentAircraftLosses = await percentLossesAircraftElement.getText()
            logger.info('get daily percent of aircraft losses:' + totaPercentAircraftLosses)

            const calculationOfAircraftlLosses = this.calculationOfAircraftLosses()
            logger.info(calculationOfAircraftlLosses)
            if(+totaPercentAircraftLosses === +calculationOfAircraftlLosses){
                logger.info('succes')
            }else{
                logger.error('error')
            }
        default:
            logger.error('switch error')
        }
    }
}


// три сценарії з різними датами
// кожен перевіряє дату і кліками змінює на потрібну
// перший сценарій рахує відсоток з суми і звіряє - видає помилку чи підтвердження
// другий шукає відсоток техніки і робить аналогічні обрахунки
