import { WebDriver, until, By } from 'selenium-webdriver';
import {delay} from '../utils/utils'

export class HomePage {
    private url = 'https://www.ae.com/us/en';
    private banner: By = By.className('_content_3s1n4b _overlay-wrapper_c5lqad');
    private cookiesBtn: By = By.name('accept-cookie');
    private menuBtn: By = By.css('a[data-text="Men"]');
    private dropdownItem: By = By.xpath('//a[@href="/us/en/c/men/bottoms/jeans/cat6430041?pagetype=plp"]')

    driver:WebDriver

    constructor(driver: WebDriver){
        this.driver = driver
    }

    public async goToHomePage(): Promise<void> {
        await this.driver.manage().window().maximize();
        await this.driver.get(this.url)
    }
    public async waitForLoadPage(){
        await this.driver.wait(until.elementLocated(this.banner), 10000)
        await delay(3000);
    }
    public async acceptCookies(): Promise<void> {
        const cookies = await this.driver.wait(until.elementLocated(this.cookiesBtn), 10000)
        await delay(3000);
        await cookies.click();

    }
    public async hoverOnMenu(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.menuBtn), 10000);
        await delay(3000);
        const dropButton = this.driver.findElement(this.menuBtn);
        const actions = this.driver.actions();
        const mouse = actions.mouse();
        await actions.pause(mouse).move({origin: dropButton}).press().perform()
    }
    public async clickOnDropdownItem(): Promise<void> {
        const dropdown = await this.driver.wait(until.elementLocated(this.dropdownItem), 10000);
        await delay(3000);
        await dropdown.click();
    }
}