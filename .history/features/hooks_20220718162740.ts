import { Before } from "@cucumber/cucumber"

Before(async function(scenario) {
    console.log('I am before')
    this.world = {}
})