// __tests__/unit/database.test.js
jest.mock('sqlite3', () => ({
  verbose: jest.fn(() => ({
    Database: jest.fn()
  }))
}));

jest.mock('sqlite');
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

jest.mock('sqlite', () => ({
  open: jest.fn()
}));

const fs = require('fs');
const Database = require('../../src/modules/persistence/database.js');

test('should read schema file with correct path', async () => {
  const mockSchema = 'CREATE TABLE trigger_words...';
  fs.promises.readFile.mockResolvedValue(mockSchema);
  
  const mockDb = { exec: jest.fn() };
  require('sqlite').open.mockResolvedValue(mockDb);
  
  const db = Database;
  await db.connect();
  
  // Verify file was read from correct location
  expect(fs.promises.readFile).toHaveBeenCalledWith(
    expect.stringContaining('schema.sql'), 
    'utf8'
  );
  
  // Verify the schema content was passed to exec
  expect(mockDb.exec).toHaveBeenCalledWith(mockSchema);
});

test('should handle schema file read errors', async () => {
  fs.promises.readFile.mockRejectedValue(new Error('File not found'));
  
  const db = Database;
  
  await expect(db.connect()).rejects.toThrow('File not found');
});