var common = [
  '--require ./dist/cucumber.js',
  '--require ./dist/cucumber-reporter.js',
  '--require ./dist/src/features/hooks.js',
  '--require ./dist/src/features/steps/*.js',
  '--publish-quiet'
]

module.exports = {
  default: common.join(' ')
}

require('module-alias/register')
