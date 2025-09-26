// tests/setup/jest.setup.js - Global test environment setup

// Set test environment variables
process.env.NODE_ENV = 'test';

jest.setTimeout(10000);

// Prevent the bot from trying to create real directories during tests
jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  mkdirSync: jest.fn(),
  readFileSync: jest.fn()
}));


// Mock dotenv to prevent it from overriding our test environment
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

// Global test utilities (optional)
global.createMockMessage = (content, options = {}) => ({
  content,
  author: options.author || { bot: false, id: 'test-user' },
  channel: {
    send: jest.fn().mockResolvedValue({ content: 'response' }),
    ...options.channel
  },
  guild: { id: 'test-guild' },
  id: `test-msg-${Date.now()}`
});

console.log('Jest setup complete - ready for Discord bot testing!');