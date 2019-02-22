module.exports = {
  testEnvironment: '<rootDir>/__tests__/env/expressEnvironment.index.js',
  setupFilesAfterEnv: ['<rootDir>jest.setup.js'],
  testPathIgnorePatterns: ['/__tests__/env/'],
};
