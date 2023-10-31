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

function createEventsSignupTable() {
  const CREATE_EVENTS__SIGNUP_TABLE = `CREATE TABLE IF NOT EXISTS events_signup(
                              id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                              event_id TEXT NOT NULL,
                              event_name TEXT NOT NULL,
                              participant TEXT NOT NULL
                            )`;

  db.run(CREATE_EVENTS__SIGNUP_TABLE, []);
}

function insertEvent(eventObj) {
  createEventsTable();
  const INSERT_EVENT = `INSERT INTO events(event_id, name, desc) VALUES (?, ?, ?)`;
  const { event_id, name, desc } = eventObj;

  const result = db.run(INSERT_EVENT, [event_id, name, desc]);
  return result;
}

function insertUserSignup(signupObj) {
  createEventsSignupTable();
  const INSERT_USER_SIGNUP = `INSERT INTO events_signup(event_id, event_name, participant) VALUES (?, ?, ?)`;
  const { event_id, event_name, participant } = signupObj;

  const result = db.run(INSERT_USER_SIGNUP, [event_id, event_name, participant]);
  return result;
}

function getAllEvents() {
  createEventsTable();
  const GET_ALL_EVENTS = `SELECT * FROM events`;

  const events = db.query(GET_ALL_EVENTS, []);
  return { events };
}

function getAllRegistrations() {
  createEventsSignupTable();
  const GET_ALL_SIGNUPS = 'SELECT * FROM events_signup'


  const events = db.query(GET_ALL_SIGNUPS, []);
  return { events };
}

function getRegistrationsByEventId(event_id) {
  createEventsSignupTable();
  const GET_SIGNUPS_BY_EVENT_ID = 'SELECT * FROM events_signup WHERE event_id = ?';
  return db.query(GET_SIGNUPS_BY_EVENT_ID, [event_id]);
}



module.exports = {
  createEventsTable,
  insertEvent,
  getAllEvents,
  insertUserSignup,
  getAllRegistrations,
  getRegistrationsByEventId
}