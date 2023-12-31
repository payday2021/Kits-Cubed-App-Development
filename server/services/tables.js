const db = require('./db');
// auth
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * USER AUTHENTICATION
 * TODO: move non-SQL functions to routes folder
 *       or move SQL functions to seperate DB "controller"
 */

function createUsersAndTokensTables() {
  const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS Users(
                              UserID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                              UserName TEXT NOT NULL,
                              UserEmail TEXT NOT NULL,
                              PassHash TEXT NOT NULL,
                              Salt TEXT NOT NULL
                              )`;

  const CREATE_TOKENS_TABLE = `CREATE TABLE IF NOT EXISTS UserTokens(
                               UserID INTEGER NOT NULL PRIMARY KEY,
                               UserToken TEXT,
                               FOREIGN KEY (UserID) REFERENCES Users(UserID)
                              )`;

  db.run(CREATE_USERS_TABLE, []);
  db.run(CREATE_TOKENS_TABLE, []);
}

function getUserFromDatabase(email) {
  createUsersAndTokensTables();
  const GET_USER = `SELECT 
                    Users.UserID,
                    Users.UserName,
                    Users.UserEmail,
                    Users.PassHash,
                    UserTokens.UserToken
                    FROM Users 
                    INNER JOIN UserTokens
                    ON Users.UserID = UserTokens.UserID
                    WHERE UserEmail = ?`;

  const result = db.query(GET_USER, [email]);

  return result && result.length > 0 ? result[0] : null;
}

function addTokenToDatabase(id, token) {
  createUsersAndTokensTables();
  const ADD_TOKEN = `INSERT INTO UserTokens(
                    UserID, 
                    UserToken)
                    VALUES (?,?)`;

  const result = db.run(ADD_TOKEN, [id, token]);

  return result;
}

function addUserToDatabase(user) {
  createUsersAndTokensTables();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  const ADD_USER = `INSERT INTO Users(
                    UserName, 
                    UserEmail, 
                    PassHash, 
                    Salt)
                    VALUES (?,?,?,?)`;

  const result = db.run(ADD_USER, [user.name, user.email, hash, salt]);

  return result;
}

// registers user and creates their JWT auth token
function userSignUp(user) {
  // TODO: add try/catch for possible db errors

  // create users/tokens tables in db
  createUsersAndTokensTables();

  if (!getUserFromDatabase(user.email)) {
    // add user to db
    const id = addUserToDatabase(user).lastInsertRowid;

    // create jwt token
    const token = jwt.sign(
      {
        id: id,
        email: user.email
      },
      process.env.JWT_SECRET_KEY
    );

    // add token to db
    addTokenToDatabase(id, token);

    return {
      token: token,
      user: {
        id: id,
        name: user.name,
        email: user.email
      }
    };
  } else {
    const emailInUseException = new Error(
      'Email already in use: user already exists.'
    );
    emailInUseException.code = 409;

    throw emailInUseException;
  }
}

// validates user credentials and returns their JWT auth token
function userSignIn(user) {
  createUsersAndTokensTables();
  const userInfo = getUserFromDatabase(user.email);
  if (!userInfo) {
    const invalidEmailException = new Error(
      'Invalid email: user does not exist.'
    );
    invalidEmailException.code = 404;

    throw invalidEmailException;
  } else {
    if (verifyUserPassword(user.password, userInfo.PassHash)) {
      return {
        token: userInfo.UserToken,
        user: {
          id: userInfo.UserID,
          name: userInfo.UserName,
          email: userInfo.UserEmail
        }
      };
    } else {
      const invalidPasswordException = new Error(
        'Invalid password: could not validate credentials.'
      );
      invalidPasswordException.code = 401;

      throw invalidPasswordException;
    }
  }
}

function verifyUserPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

/**
 * KIT TYPES
 */

function createKitTypesTable() {
  const CREATE_KIT_TYPES_TABLE = `CREATE TABLE IF NOT EXISTS KitTypes(
                                  KitTypeID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                  KitTypeName TEXT NOT NULL UNIQUE
                                )`;
  db.run(CREATE_KIT_TYPES_TABLE, []);
}

function populateKitTypesTable() {
  createKitTypesTable();
  const INSERT_KIT_TYPE = `INSERT INTO KitTypes(KitTypeName) VALUES (?)`;
  const types = ['electricity', 'mechanics'];

  for (const type of types) {
    db.run(INSERT_KIT_TYPE, [type]);
  }
}

function getAllKitTypes() {
  createKitsTable();
  const GET_ALL_KIT_TYPES = `SELECT * FROM KitTypes`;

  const types = db.query(GET_ALL_KIT_TYPES, []);
  return { types };
}

/**
 * KITS
 */

// function dropKitsTable() {
// const DROP_KITS_TABLE = 'DROP TABLE IF EXISTS kits';
// }

function createKitsTable() {
  // populateKitTypesTable();
  const CREATE_KITS_TABLE = `CREATE TABLE IF NOT EXISTS Kits(
                              KitID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                              KitName TEXT NOT NULL,
                              KitDesc TEXT NOT NULL,
                              KitTypeName TEXT NOT NULL,
                              FOREIGN KEY (KitTypeName) REFERENCES KitTypes(KitTypeName)
                            )`;

  db.run(CREATE_KITS_TABLE, []);
}

function insertKit(kitObj) {
  createKitsTable();
  const INSERT_KIT = `INSERT INTO Kits(KitName, KitDesc, KitTypeName) VALUES (?, ?, ?)`;
  const { name, desc, type } = kitObj;

  const result = db.run(INSERT_KIT, [name, desc, type]);
  return result;
}

function deleteKitById(id) {
  createKitsTable();
  const DELETE_KIT_BY_ID = `DELETE FROM Kits WHERE KitID = ?`;

  const result = db.run(DELETE_KIT_BY_ID, [id]);
  return { result };
}

function updateKitById(id, kitObj) {
  createKitsTable();
  const UPDATE_KIT_NAME_BY_ID = `UPDATE Kits SET KitName = ?, KitDesc = ? WHERE KitID = ?`;
  const { name, desc } = kitObj;

  const result = db.run(UPDATE_KIT_NAME_BY_ID, [name, desc, id]);
  return { result };
}

function getAllKits() {
  createKitsTable();
  const GET_ALL_KITS = `SELECT * FROM Kits`;

  const kits = db.query(GET_ALL_KITS, []);
  return { kits };
}

function getAllKitsByType(type) {
  createKitsTable();
  const GET_ALL_KITS_BY_TYPE = `SELECT * FROM Kits WHERE KitTypeName = ?`;
  const kits = db.query(GET_ALL_KITS_BY_TYPE, [type]);
  return { kits };
}

/**
 * CART
 */

// function createCartTable() {
//   const CREATE_CART_TABLE = `CREATE TABLE IF NOT EXISTS cart(
//                               UserID INTEGER NOT NULL,

//                               FOREIGN KEY (UserID) REFERENCES Users(UserID),
//                             )`;
// }

/**
 * EVENTS
 */

function createEventsTable() {
  const CREATE_EVENTS_TABLE = `CREATE TABLE IF NOT EXISTS Events(
                                EventID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                EventName TEXT NOT NULL,
                                EventDate DATE NOT NULL,
                                EventDesc TEXT NOT NULL,
                                EventLocation TEXT NOT NULL
                              )`;

  db.run(CREATE_EVENTS_TABLE, []);
}
function populateEventsTable() {
  createUserEventTable();
  const INSERT_EVENT = `INSERT INTO Events(
                            EventName, 
                            EventDate, 
                            EventDesc, 
                            EventLocation) 
                            VALUES (?, ?, ?, ?)`;
  const events = [
    {
      name: 'First Event!',
      date: '2024-01-01',
      desc: 'This is the first KitsCubed event!',
      location: '123 Main St, Anytown USA'
    },
    {
      name: 'Second Event!',
      date: '2024-01-01',
      desc: 'This is the second KitsCubed event!',
      location: '123 Main St, Anytown USA'
    }
  ];

  for (const event of events) {
    db.run(INSERT_EVENT, [
      event.name,
      event.date,
      event.desc,
      event.location
    ]);
  }
}

function getAllEvents() {
  createEventsTable();
  const GET_ALL_EVENTS = `SELECT * FROM Events`;

  const events = db.query(GET_ALL_EVENTS, []);
  return { events };
}

// User-Event Table (for users who have signed up for events)

function createUserEventTable() {
  const CREATE_USER_EVENT_TABLE = `CREATE TABLE IF NOT EXISTS UserEvents(
                                  UserID INTEGER NOT NULL,
                                  EventID INTEGER NOT NULL,
                                  FOREIGN KEY (UserID) REFERENCES Users(UserID),
                                  FOREIGN KEY (EventID) REFERENCES Events(EventID)
                                )`;

  db.run(CREATE_USER_EVENT_TABLE, []);
}

function addUserToEvent(id, eventID) {
  createUserEventTable();
  const INSERT_USER_TO_EVENT = `INSERT INTO UserEvents(UserID, EventID) VALUES (?, ?)`;
  
  const result = db.run(INSERT_USER_TO_EVENT, [id, eventID]);
  return { result };
}

function getUserEvents(id) {
  createUserEventTable();
  const GET_USER_EVENTS = `SELECT Events.EventID, 
                                  Events.EventName, 
                                  Events.EventDate, 
                                  Events.EventDesc, 
                                  Events.EventLocation
                          FROM Events
                          JOIN UserEvents ON Events.EventID = UserEvents.EventID
                          WHERE UserEvents.UserID = ?`;
  
  const events = db.query(GET_USER_EVENTS, [id]);
  return { events };
}

/**
 * ORDERS
 */

function createOrdersTable() {
  const CREATE_ORDERS_TABLE = `CREATE TABLE IF NOT EXISTS orders(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      order_desc TEXT NOT NULL
    )`;

  db.run(CREATE_ORDERS_TABLE, [], function (err) {
    if (err) {
      console.error('Error creating orders table:', err.message);
    } else {
      console.log('Orders table created successfully.');
    }

    // Call the callback function when done
    if (typeof callback === 'function') {
      callback(err);
    }
  });
  //console.log("made it here ")
}

function insertOrder(orderObj) {
  createOrdersTable();
  const INSERT_ORDER = `INSERT INTO orders(order_desc) VALUES (?)`;
  const { order_desc } = orderObj;
  const result = db.run(INSERT_ORDER, [order_desc]);
  return result;
}

function deleteOrderByID() {}

function getAllOrders() {
  createOrdersTable();
  const GET_ALL_ORDERS = 'SELECT * FROM orders';

  const orders = db.query(GET_ALL_ORDERS, []);
  return { orders };
}

module.exports = {
  userSignUp,
  userSignIn,
  addUserToDatabase,

  getAllKitTypes,

  createKitsTable,
  insertKit,
  deleteKitById,
  updateKitById,
  getAllKits,
  getAllKitsByType,

  createEventsTable,
  getAllEvents,
  addUserToEvent,
  getUserEvents,

  createOrdersTable,
  insertOrder,
  getAllOrders
};
