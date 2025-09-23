// __tests__/integration/database.integration.test.js

// Override the global fs mock for this test file only
jest.doMock('fs', () => jest.requireActual('fs'));

// Clear the module cache to ensure fresh import
beforeAll(() => {
  jest.resetModules();
});
const Database = require('../../src/modules/persistence/database.js');

test('should execute real SQL queries', async () => {
  const db = Database;
  db.filename = ':memory:'; // Override to use memory
  db.connect();
  

  // Real SQL execution
  const insert = db.db.prepare("INSERT INTO trigger_words (word) VALUES (?)");
  insert.run('test');
  const result = db.db.prepare("SELECT * FROM trigger_words WHERE word = ?").get('test');
  expect(result).toBeTruthy();
  expect(result.word).toBe('test');
  expect(result.response).toBe('lizard')
  db.close();
});