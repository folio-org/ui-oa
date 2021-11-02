const config = require('@folio/stripes-erm-components/jest.config');

const esModules = ['@folio', '@k-int', 'ky'].join('|');
config.transformIgnorePatterns = [`/node_modules/(?!${esModules})`];

module.exports = config;

