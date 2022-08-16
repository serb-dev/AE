import { When, Given, Then, After} from '@cucumber/cucumber'
import { MinusrusPage } from '../../pages/MinusrusMain'

Given('Open minusrus.com', async function() {
    const homepage = new MinusrusPage(this.)
})