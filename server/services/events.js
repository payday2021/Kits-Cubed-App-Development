const db = require('./db');

function createEventsTable() {
    const CREATE_EVENTS_TABLE = `CREATE TABLE IF NOT EXISTS events(
                                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                event_id TEXT NOT NULL,
                                name TEXT NOT NULL,
                                desc TEXT NOT NULL
                              )`;
  
    db.run(CREATE_EVENTS_TABLE, []);
  }

  function insertEvent(eventObj) {
    createEventsTable();
    const INSERT_EVENT = `INSERT INTO events(event_id, name, desc) VALUES (?, ?, ?)`;
    const { event_id, name, desc } = eventObj;
  
    const result = db.run(INSERT_EVENT, [event_id, name, desc]);
    return result;
  }

  function getAllEvents() {
    createEventsTable();
    const GET_ALL_EVENTS = `SELECT * FROM events`;
  
    const events = db.query(GET_ALL_EVENTS, []);
    return { events };
  }

  module.exports = {
    createEventsTable,
    insertEvent,
    getAllEvents
  }