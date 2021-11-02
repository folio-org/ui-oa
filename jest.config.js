// This file is copied from stripes-erm-components with the addition of @k-int in the esModules
// This allows testing of components that utilise @k-int/stripes-kint-components

// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const esModules = ['@folio', '@k-int', 'ky'].join('|');

module.exports = {
  collectCoverageFrom: [
    '**/(lib|src)/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/test/**',
  ],
  coverageDirectory: './artifacts/coverage-jest/',
  coverageReporters: ['lcov'],
  reporters: ['jest-junit', 'default'],
  transform: { '^.+\\.(js|jsx)$': path.join(__dirname, './test/jest/jest-transformer.js') },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '^.+\\.(css)$': path.join(__dirname, './test/jest/__mock__/styleMock.js'),
    '^.+\\.(svg)$': 'identity-obj-proxy',
  },
  testMatch: ['**/(lib|src)/**/?(*.)test.{js,jsx}'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: [path.join(__dirname, './test/jest/jest.setup.js')],
};
