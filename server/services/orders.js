const db = require('./db');


function createOrdersTable() {
    const CREATE_ORDERS_TABLE = `CREATE TABLE IF NOT EXISTS orders(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL
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

function createOrderItemsTable() {
  const CREATE_ORDER_ITEMS_TABLE = `CREATE TABLE IF NOT EXISTS orders_items(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      order_name TEXT NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      amount INTEGER NOT NULL
    )`;

  db.run(CREATE_ORDER_ITEMS_TABLE, [], function (err) {
      if (err) {
        console.error('Error creating order_items table:', err.message);
      } else {
        console.log('Order_items table created successfully.');
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
    const INSERT_ORDER = `INSERT INTO orders(order_id) VALUES (?)`;
    const { order_desc, order_items, order_id } = orderObj;
    order_items.forEach(function(item) {
      console.log(item)
    })
    //console.log(order_id)
    const result = db.run(INSERT_ORDER, [order_id]);
    return result;
}

function insertOrderItem(itemObj){
  createOrderItemsTable();
  const INSERT_ORDER_ITEM = 'INSERT INTO order_items(order_id, order_name, price, quantity, amount) VALUES (?, ?, ?, ?, ?)';
  const { name, price, quantity } = itemObj;
  
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

