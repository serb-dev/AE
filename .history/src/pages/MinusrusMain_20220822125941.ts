import { WebDriver, By, until, WebElement } from 'selenium-webdriver'
import { delay, dateChecking } from '../utils/utils'
import logger from '../logger/logger'

export class MinusrusPage {
    public driver: WebDriver

    private url = 'https://www.minusrus.com/'

    // language buttons
    private engBtn: By = By.css('a[href="/en"]')
    private uaBtn: By = By.className('languages__item current languages__item')
    private ruBtn: By = By.css('a[@href="/ru"]')

    private logoText: By = By.className('logo-text')
    private dateLabel: By = By.className('date__label')
    private dateArrow: By = By.className('control-btn')

    private cards: By = By.css('div[class="card"]')
    private dailyAmount: By = By.css('span[class="card__amount-total"]')
    private cardTitle: By = By.css('div[class="card__title"]')
    private totalPercentAmount: By = By.css('span[class="percent__int medium"]')
    private statisticsTitle: By = By.css('div[class="statistics__title"]')

    private lostOfPersonel: By = By.xpath('//div[@class="card card_large"]/div/div[2]/span')
    private percentOfLosses: By = By.className('percent__int large')

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

    public async choosingLanguage(language: string) {
        const languageToSelector = {
            UA: this.uaBtn,
            ENG: this.engBtn,
            RU: this.ruBtn
        }

        const button = await this.driver.wait(until.elementLocated(languageToSelector[language]), 10000)
        await button.click()
    }

    public async verifyingSelectedLanguage(language: string): Promise<void> {
        const logoElement = await this.driver.wait(until.elementLocated(this.logoText), 10000)
        const logoText = await logoElement.getText()
        const replacedLogoStr = logoText.replace('\n', ' ')
        logger.info(replacedLogoStr)
        await delay(3000)

        switch(language) {

        case 'ENG':
            if(replacedLogoStr !== 'With the support of the Special Operations Forces'){
                throw new Error(`Not any matches with ${replacedLogoStr}`)
            }
            break

        case 'RU':
            if(replacedLogoStr === 'При поддержке Сил Специальных Операций'){
                throw new Error(`Not any matches with ${replacedLogoStr}`)
            }
            break

        case 'UA':
            if(replacedLogoStr === 'За підтримки Сил Спеціальних Операцій'){
                throw new Error(`Not any matches with ${replacedLogoStr}`)
            }
            break

        default: throw new Error(`Not any matches with ${language}`)
        }

    }

    public async chooseDate(expectedDate: string): Promise<void> {
        await delay(3000)
        logger.info(expectedDate)
        const arrows = await this.driver.wait(until.elementsLocated(this.dateArrow), 1000)
        let currentDate = await this.getCurrentDay(this.driver, this.dateLabel)

        dateChecking(expectedDate, currentDate)

        const formatedCurrentDate = await this.changeStringToDATE(currentDate)
        const formatedExpectedDate = await this.changeStringToDATE(expectedDate)

        while(expectedDate !== currentDate){
            if(formatedExpectedDate < formatedCurrentDate){
                arrows[0].click()
                currentDate = await this.getCurrentDay(this.driver, this.dateLabel)
            }else{
                arrows[1].click()
                currentDate = await this.getCurrentDay(this.driver, this.dateLabel)
            }
        }
    }

    public async testTaskSwitcher(entity: string) {
        const cardsElements = await this.driver.wait(until.elementsLocated(this.cards))
        let baseElement: WebElement

        for(const cardElement of cardsElements){
            const text = await cardElement.getText()
            if(text.includes(entity)){
                baseElement = cardElement
                break
            }
        }

        if(baseElement === undefined || baseElement === null){
            throw new Error(`Entity with name ${entity} not found`)
        }

        const cardTitleElement = await baseElement.findElement(this.cardTitle)
        const cardTitleText = await cardTitleElement.getText()

        const dailyAmountElement = await baseElement.findElement(this.dailyAmount)
        const textAmount = await dailyAmountElement.getText()

        logger.info(`${cardTitleText}: ${textAmount}`)

        const statisticsTitle = await baseElement.findElement(this.statisticsTitle)
        const percentTitle = await statisticsTitle.getText()
        logger.info(percentTitle)
        const percents = await baseElement.findElements(this.totalPercentAmount)
        const percent = await percents[1].getText()
        logger.info(percent)


        logger.info(`${percentTitle}: ${percent}`)


        // switch(entity){
        // case '09.08.2022':
        //     const percentOfLossesElement = await this.driver.wait(until.elementLocated(this.percentOfLosses), 10000)
        //     const percentOfLosses = await percentOfLossesElement.getText()
        //     logger.info('get percent of losses from site: ' + percentOfLosses)

        //     const calculationOfPersonalLosses = await this.calculationOfPersonalLosses()
        //     logger.info(calculationOfPersonalLosses)
        //     if(+percentOfLosses === calculationOfPersonalLosses){
        //         logger.info('succes test with personal losses')
        //     }else{
        //         logger.error('error: not equal')
        //         throw new Error('error: not equal')
        //     }
        //     break

        // case '06.08.2022':
        //     const percentLossesAircraftElement = await this.driver.wait(until.elementLocated(this.percentOfLossesAircrafts), 10000)
        //     const totaPercentAircraftLosses = await percentLossesAircraftElement.getText()
        //     logger.info('get daily percent of aircraft losses:' + totaPercentAircraftLosses)

        //     const calculationOfAircraftlLosses = await this.calculationOfAircraftLosses()
        //     logger.info(calculationOfAircraftlLosses)
        //     if(+totaPercentAircraftLosses === calculationOfAircraftlLosses){
        //         logger.info('succes test with aircraft losses')
        //     }else{
        //         logger.error('error: not equal')
        //         throw new Error('error: not equal')
        //     }
        //     break

        // default:
        //     logger.error('thre are no cases')
        //     throw new Error('thre are no cases')
        // }
    }

    // private methods for calculating russian losses

    private async calculationOfPersonalLosses(): Promise<number> {
        const roundedLossesElement = await this.driver.wait(until.elementLocated(this.lostOfPersonel), 10000)
        const roundedLosses = await roundedLossesElement.getText()
        const totalLosses =  roundedLosses.slice(1, 7)
        logger.info('get number of losses from site: ' + totalLosses)

        const personalLosses = await this.calculatorOfPercent(totalLosses, this.intendetForInvasion)
        return personalLosses
    }

    private async calculationOfAircraftLosses(): Promise<number> {
        const dailyLossesAircraftsElement = await this.driver.wait(until.elementLocated(this.lostOfAircrafts), 10000)
        const dailyLossesAircraft = await dailyLossesAircraftsElement.getText()
        logger.info('get daily number of aircraf losses:' + dailyLossesAircraft)

        const aircraftLosses = await this.calculatorOfPercent(dailyLossesAircraft, this.intendetAircraftsForInv)
        return aircraftLosses
    }

    private async getCurrentDay(driver: WebDriver, dateLabel: By): Promise<string> {
        const dateElement = driver.wait(until.elementLocated(dateLabel), 10000)
        const date = dateElement.getText()
        return date
    }

    private async changeStringToDATE(date: string) {
        const splitedDate =  date.split('.')
        const reverrsedDate = splitedDate.reverse()
        const formatedString = reverrsedDate.join('.')
        const newDate = new Date(formatedString)
        return newDate
    }

    /**
     * method for calculating percent of losses
     *
     * @param daily string with day losses
     * @param intended string with total amount
     * @returns number of percent
     */
    private async calculatorOfPercent(daily: string, intended: string): Promise<number>{
        const totalNumber =  +daily / +intended
        const percent = totalNumber * 100
        const rounded = percent.toFixed(1)
        return +rounded
    }
}
