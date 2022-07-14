var common = [
  '--require ./dist/cucumber.js',
  '--require ./dist/features/steps/*.js',
  '--publish-quiet',
  `--format-options '{"snippetInterface": "synchronous"}'`
]

module.exports = {
  default: common.join(' '),
  
}

require('module-alias/register')