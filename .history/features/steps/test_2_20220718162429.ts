import { Given } from "@cucumber/cucumber";

Given('I am test 2', async function() {
    console.log(this.world.testData)
})