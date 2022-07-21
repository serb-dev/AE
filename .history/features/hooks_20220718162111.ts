import { Before } from "@cucumber/cucumber"

Before(async function(scenario) {
    this.world = {}
})