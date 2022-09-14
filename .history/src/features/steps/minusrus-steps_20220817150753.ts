import { When, Given, Then} from '@cucumber/cucumber'
import { MinusrusPage } from '../../pages/MinusrusMain'

Given('Open minusrus.com', {timeout: 100 * 1000}, async function() {
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.goToMinusrusPage()
})

When(' Choosing {language} language', {timeout: 100 * 1000}, async function(language){
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.changeDate(language)
})

When('Changing language', {timeout: 100 * 1000}, async function(){
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.checkingLanguage()
})

When('Choose a {string}', {timeout: 100 * 1000}, async function(date) {
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    this.world.testDate = date
    await homepage.changeDate(date)
})

Then('Getting results', {timeout: 100 * 1000}, async function(){
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.testTaskSwitcher(this.world.testDate)
})
