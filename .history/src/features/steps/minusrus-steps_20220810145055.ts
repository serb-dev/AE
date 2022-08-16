import { When, Given, Then, After} from '@cucumber/cucumber'
import { MinusrusPage } from '../../pages/MinusrusMain'

Given('Open minusrus.com', async function() {
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver, '')
    await homepage.goToMinusrusPage()
    await homepage.checkingLanguage()
})

When('Choose a {date}', async function(date: string) {
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver, date)
    await homepage.changeDate(date)
})
