var common = [
    '--require ./dist/cucumber.js',
    '--require ./dist/features/steps/*.js',
    '--publish-quiet',
];
module.exports = {
    default: common.join(' '),
};
require('module-alias/register');
//# sourceMappingURL=cucumber.js.map