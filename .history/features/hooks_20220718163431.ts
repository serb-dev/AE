import { Before } from "@cucumber/cucumber"

const firefoxOptions = new firefox.Options();
firefoxOptions.useGeckoDriver

const chromeOptions = new chrome.Options();
chromeOptions.excludeSwitches('enable-logging')

const brovser = process.env.BOWSER_ENW
console.log(brovser)

const driver = new Builder()
    .forBrowser(brovser)
    
    .build()

Before(async function(scenario) {
    console.log('I am before')
    this.world = {}
})