module.exports = {
  testEnvironment: '<rootDir>/__tests__/env/expressEnvironment.index.js',
  setupFilesAfterEnv: ['<rootDir>jest.setup.js'],
  globalSetup: '<rootDir>/__tests__/setup/globalSetup.js',
  globalTeardown: '<rootDir>/__tests__/setup/globalTeardown.js',
  testPathIgnorePatterns: ['/__tests__/env/', '/__tests__/setup/'],
};
