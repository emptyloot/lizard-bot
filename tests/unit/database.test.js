// __tests__/unit/database.test.js

// Mock better sqlite
jest.mock('better-sqlite3', () => {
  return jest.fn().mockImplementation(() => ({
    exec: jest.fn(),
    prepare: jest.fn(() => ({
      get: jest.fn(),
      run: jest.fn(),
      all: jest.fn()
    })),
    close: jest.fn()
  }));
});

const Database = require('../../src/modules/persistence/database');
const BetterSQLite3 = require('better-sqlite3');

describe('Database Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should connect and initialize schema', () => {
    const mockDb = {
      exec: jest.fn(),
      close: jest.fn()
    };
    
    BetterSQLite3.mockReturnValue(mockDb);

    const db = Database;
    db.connect();

    expect(BetterSQLite3).toHaveBeenCalledWith('./data/database.sqlite');
    expect(mockDb.exec).toHaveBeenCalled();
  });
});