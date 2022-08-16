import { When, Given, Then, After} from '@cucumber/cucumber'
import { MinusrusPage } from '../../pages/MinusrusMain'

Given('Open minusrus.com',{timeout: 100 * 1000}, async function() {
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver)
    await homepage.goToMinusrusPage()
    await homepage.checkingLanguage()
})

When('Choose a {string}', async function(data) {
    const homepage: MinusrusPage = new MinusrusPage(this.world.deiver)
    await homepage.changeDate(data)
})
