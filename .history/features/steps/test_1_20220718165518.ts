import { Given } from "@cucumber/cucumber";

Given('I am test 1', async function() {
    console.log('I am test 1')
    
    this.world.testData = 'Hello World'
})