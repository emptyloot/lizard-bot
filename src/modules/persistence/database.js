// db/database.js (single file)
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const fs = require('fs').promises;
const path = require('path');

class Database {
  constructor() {
    this.db = null;
  }

  async connect() {
    this.db = await open({
      filename: './data/database.sqlite',
      driver: sqlite3.Database
    });
    
    await this.db.exec('PRAGMA foreign_keys = ON');
    await this.initSchema();
    return this.db;
  }

  async initSchema() {
    const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8');
    await this.db.exec(schema);
  }

  async close() {
    if (this.db) await this.db.close();
  }
}

module.exports = new Database();