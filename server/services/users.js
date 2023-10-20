const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// TODO: move non-SQL functions to routes folder
//       or move SQL functions to seperate DB "controller"

// registers user and creates their JWT auth token
function userSignUp(user) {
  // TODO: add try/catch for possible db errors

  // create users/tokens tables in db
  createUsersTokensTables();

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
  createUsersTokensTables();
  const userInfo = getUserFromDatabase(user.email);
  if (!userInfo) {
    const invalidEmailException = new Error(
      'Invalid email: user does not exist.'
    );
    invalidEmailException.code = 404;

    throw invalidEmailException;
  } else {
    if (verifyUserPassword(user.password, userInfo.pass_hash)) {
      return {
        token: userInfo.token,
        user: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email
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

function createUsersTokensTables() {
  const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
                              id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                              name TEXT NOT NULL,
                              email TEXT NOT NULL,
                              pass_hash TEXT NOT NULL,
                              salt TEXT NOT NULL
                            )`;

  const CREATE_TOKENS_TABLE = `CREATE TABLE IF NOT EXISTS tokens(
                               user_id INTEGER NOT NULL PRIMARY KEY,
                               token TEXT,
                               FOREIGN KEY (user_id) REFERENCES users(id)
                            )`;

  db.run(CREATE_USERS_TABLE, []);
  db.run(CREATE_TOKENS_TABLE, []);
}

function getUserFromDatabase(email) {
  createUsersTokensTables();
  const GET_USER = `SELECT 
                    users.id,
                    users.name,
                    users.email,
                    users.pass_hash,
                    tokens.token
                    FROM users 
                    INNER JOIN tokens
                    ON users.id = tokens.user_id
                    WHERE email = ?`;

  const result = db.query(GET_USER, [email]);

  return result && result.length > 0 ? result[0] : null;
}

function addTokenToDatabase(id, token) {
  createUsersTokensTables();
  const ADD_TOKEN = `INSERT INTO tokens(
                    user_id, 
                    token)
                    VALUES (?,?)`;

  const result = db.run(ADD_TOKEN, [id, token]);

  return result;
}

function addUserToDatabase(user) {
  createUsersTokensTables();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  const ADD_USER = `INSERT INTO users(
                    name, 
                    email, 
                    pass_hash, 
                    salt)
                    VALUES (?,?,?,?)`;

  const result = db.run(ADD_USER, [user.name, user.email, hash, salt]);

  return result;
}

module.exports = {
  userSignUp,
  userSignIn,
  addUserToDatabase
};
