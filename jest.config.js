// jest.config.js - Basic configuration for Discord bot testing
module.exports = {
  // Use Node.js environment (not browser)
  testEnvironment: 'node',
  
  // Where to look for tests
  roots: [
    '<rootDir>/src',      // Source code
    '<rootDir>/tests'     // Test files
  ],
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.js',      // Files in __tests__ folders
    '**/?(*.)+(spec|test).js'    // Files ending with .test.js or .spec.js
  ],
  
  // Setup file to run before each test
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/jest.setup.js'
  ],
  
  // Coverage settings (optional but recommended)
  collectCoverageFrom: [
    'src/**/*.js',               // Include all JS files in src
    '!src/index.js',             // Exclude main file for now (hard to test)
    '!**/node_modules/**'        // Exclude dependencies
  ],
  
  // Coverage output
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  
  // Test timeout (Discord operations can be slow)
  testTimeout: 10000,  // 10 seconds
  
  // Clear mocks between tests for clean state
  clearMocks: true,
  
  // Show detailed test results
  verbose: true
};