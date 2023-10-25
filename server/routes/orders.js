const express = require('express');
const router = express.Router()
const orders = require('../services/orders');



router.get('/', (req,res) => {
    res.send('hello from orders');
    console.log('orderRouterRoot');
})

router.post('/add', function(req, res) {
    console.log('made it to /add')
    try {
        res.json(orders.insertOrder(req.body));
      } catch (error) {
        console.error(':( ERROR ADDING ORDER', error.message);
      } 
     //res.send('post order route')
})

router.get('/all', (req,res) => {
  try {
    res.json(orders.getAllOrders());
  } catch (error) {
    console.error(':( ERROR GETTING ALL ORDERS', error.message);
  } 
})

module.exports = router;