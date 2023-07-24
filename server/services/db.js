const sqlite = require('better-sqlite3');
const db = new sqlite('./data/db/data.db', { fileMustExist: true });

// query = all
function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  query,
  run
};
