import { WebDriver, By, until } from 'selenium-webdriver'
import {delay, getCurrentDay} from '../utils/utils'
import logger from '../logger/logger'

export class MinusrusPage {
    public driver: WebDriver

    private url = 'https://www.minusrus.com/'
    private engBtn: By = By.xpath('//a[@href="/en"]')
    private logoText: By = By.className('logo-text')
    private dateLabel: By = By.className('date__label')
    private dateArrow: By = By.className('control-btn')

    private lostOfPersonel: By = By.xpath('//div[@class="card card_large"]/div/div[2]/span')
    private percentOfLosses: By = By.className('percent__int large')
    // private percentOfLosses: By = By.xpath('//div[@class="card card_large"]/div[2]/div[2]/div/div/div/div/div/span')

    private lostOfAircrafts: By = By.xpath('//div[@class="card__container"]/div[4]/div[2]/span')
    private percentOfLossesAircrafts: By = By.xpath('//div[@class="card__container"]/div[4]/div[3]/div[2]/div/div/div/div/div/span')

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
        const date = new Date()

        await delay(3000)
        logger.info(expectedDate)
        const leftArrow = await this.driver.wait(until.elementLocated(this.dateArrow), 1000)
        let currentDate = await getCurrentDay(this.driver, this.dateLabel)

        const dateExpected = new Date(expectedDate)
        if(date > dateExpected){
            logger.info('succes DATA')
            logger.info(date)
            logger.info(dateExpected)
        }else{
            logger.info(date)
            logger.info(dateExpected)
            throw new Error(expectedDate + ' > than ' + currentDate)
        }

        while(expectedDate !== currentDate){
            leftArrow.click()
            delay(3000)
            currentDate = await getCurrentDay(this.driver, this.dateLabel)
        }
    }

    public async testTaskSwitcher(expectedDate: string) {
        await delay(3000)
        switch(expectedDate){
        case '09.08.2022':
            const percentOfLossesElement = await this.driver.wait(until.elementLocated(this.percentOfLosses), 10000)
            const percentOfLosses = await percentOfLossesElement.getText()
            logger.info('get percent of losses from site: ' + percentOfLosses)

            const calculationOfPersonalLosses = await this.calculationOfPersonalLosses()
            logger.info(calculationOfPersonalLosses)
            if(+percentOfLosses === calculationOfPersonalLosses){
                logger.info('succes test with personal losses')
            }else{
                logger.error('error: not equal')
                throw new Error('error: not equal')
            }
            break

        case '06.08.2022':
            const percentLossesAircraftElement = await this.driver.wait(until.elementLocated(this.percentOfLossesAircrafts), 10000)
            const totaPercentAircraftLosses = await percentLossesAircraftElement.getText()
            logger.info('get daily percent of aircraft losses:' + totaPercentAircraftLosses)

            const calculationOfAircraftlLosses = await this.calculationOfAircraftLosses()
            logger.info(calculationOfAircraftlLosses)
            if(+totaPercentAircraftLosses === calculationOfAircraftlLosses){
                logger.info('succes test with aircraft losses')
            }else{
                logger.error('error: not equal')
                throw new Error('error: not equal')
            }
            break

        default:
            logger.error('thre are no cases')
            throw new Error('thre are no cases')
        }
    }

    // private methods for calculating russian losses

    private async calculationOfPersonalLosses(): Promise<number> {
        const roundedLossesElement = await this.driver.wait(until.elementLocated(this.lostOfPersonel), 10000)
        const roundedLosses = await roundedLossesElement.getText()
        const totalLosses =  roundedLosses.slice(1, 7)
        logger.info('get number of losses from site: ' + totalLosses)

        const personalLosses = await this.calculatorOfPercent(totalLosses, this.intendetForInvasion)
        logger.info(personalLosses)
        return personalLosses
    }

    private async calculationOfAircraftLosses(): Promise<number> {
        const dailyLossesAircraftsElement = await this.driver.wait(until.elementLocated(this.lostOfAircrafts), 10000)
        const dailyLossesAircraft = await dailyLossesAircraftsElement.getText()
        logger.info('get daily number of aircraf losses:' + dailyLossesAircraft)

        const aircraftLosses = await this.calculatorOfPercent(dailyLossesAircraft, this.intendetAircraftsForInv)
        return aircraftLosses
    }

    private async calculatorOfPercent(daily: string, intendet: string): Promise<number>{
        const totalNumber =  +daily / +intendet
        const percent = totalNumber * 100
        const rounded = percent.toFixed(1)
        return +rounded
    }
}


// три сценарії з різними датами
// кожен перевіряє дату і кліками змінює на потрібну
// перший сценарій рахує відсоток з суми і звіряє - видає помилку чи підтвердження
// другий шукає відсоток техніки і робить аналогічні обрахунки
