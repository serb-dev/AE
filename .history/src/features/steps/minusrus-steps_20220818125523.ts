import { When, Given, Then} from '@cucumber/cucumber'
import { MinusrusPage } from '../../pages/MinusrusMain'

Given('Open minusrus.com', {timeout: 100 * 1000}, async function() {
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.goToMinusrusPage()
})

When('Choose {string} language', {timeout: 100 * 1000}, async function(language: string){
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.choosingLanguage(language)
})

When('Verify that selected language is {string}', {timeout: 100 * 1000}, async function(language){
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.verifyingSelectedLanguage(language)
})

When('Choose a {string}', {timeout: 100 * 1000}, async function(date) {
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    this.world.testDate = date
    await homepage.chooseDate(date)
})

When('')

Then('Getting results', {timeout: 100 * 1000}, async function(){
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.testTaskSwitcher(this.world.testDate)
})
