import { When, Given, Then, After} from '@cucumber/cucumber'
import { MinusrusPage } from '../../pages/MinusrusMain'

Given('Open minusrus.com', async function() {
    const homepage: MinusrusPage = new MinusrusPage(this.world.driver, '')
    await homepage.goToMinusrusPage()
    await homepage.checkingLanguage()
})

When()