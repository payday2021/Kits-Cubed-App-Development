const db = require('./db');


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
    const { order_desc, order_items, order_id } = orderObj;
    console.log(order_id)
    const result = db.run(INSERT_ORDER, [order_desc]);
    return result;
}

function deleteOrderByID() {

}

function deleteOrdersTable() {
  const DROP_ORDERS_TABLE = `DROP TABLE IF EXISTS orders`;

  db.run(DROP_ORDERS_TABLE, [], function (err) {
    if (err) {
      console.error('Error dropping orders table:', err.message);
    } else {
      console.log('Orders table dropped successfully (if it existed).');
    }

    // Call the callback function when done
    if (typeof callback === 'function') {
      callback(err);
    }
  });
}

function getAllOrders() {
  createOrdersTable();
  const GET_ALL_ORDERS = 'SELECT * FROM orders';

  const orders = db.query(GET_ALL_ORDERS, []);
  return { orders }
}

module.exports = {
    createOrdersTable,
    insertOrder,
    getAllOrders,
    deleteOrdersTable
}

