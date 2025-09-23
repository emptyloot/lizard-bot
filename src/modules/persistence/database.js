// db/database.js (single file)
const BetterSQLite3 = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

class Database {
  constructor() {
    this.db = null;
    this.filename = './data/database.sqlite'
  }

  connect() {
    this.db = BetterSQLite3(this.filename);
    this.initSchema();
    return this.db;
  }

 

  initSchema() {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    this.db.exec(schema);
  }

  close() {
    if (this.db) this.db.close();
  }
}

module.exports = new Database();