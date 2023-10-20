const db = require('./db');

function dropKitsTable() {
  // const DROP_KITS_TABLE = 'DROP TABLE IF EXISTS kits';
}

function createKitsTable() {
  const CREATE_KITS_TABLE = `CREATE TABLE IF NOT EXISTS kits(
                              id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                              name TEXT NOT NULL,
                              desc TEXT NOT NULL,
                              typeK TEXT CHECK (typeK in ('electricity', 'mechanics'))
                            )`;

  db.run(CREATE_KITS_TABLE, []);
}

function insertKit(kitObj) {
  createKitsTable();
  const INSERT_KIT = `INSERT INTO kits(name, desc, typeK) VALUES (?, ?, ?)`;
  const { name, desc, typeK } = kitObj;

  const result = db.run(INSERT_KIT, [name, desc, typeK]);
  return result;
}

function deleteKitById(id) {
  createKitsTable();
  const DELETE_KIT_BY_ID = `DELETE FROM kits WHERE id = ?`;

  const result = db.run(DELETE_KIT_BY_ID, [id]);
  return { result };
}

function updateKitById(id, kitObj) {
  createKitsTable();
  const UPDATE_KIT_NAME_BY_ID = `UPDATE kits SET name = ?, desc = ? WHERE id = ?`;
  const { name, desc } = kitObj;

  const result = db.run(UPDATE_KIT_NAME_BY_ID, [name, desc, id]);
  return { result };
}

function getAllKits() {
  createKitsTable();
  const GET_ALL_KITS = `SELECT * FROM kits`;

  const kits = db.query(GET_ALL_KITS, []);
  return { kits };
}

module.exports = {
  createKitsTable,
  insertKit,
  deleteKitById,
  updateKitById,
  getAllKits
};
