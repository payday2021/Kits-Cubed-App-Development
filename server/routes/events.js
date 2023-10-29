const express = require('express');
const router = express.Router();
const events = require('../services/events');

router.get('/', function (req, res) {
    try {
      res.json({
        text: 'events router'
      });
    } catch (error) {
      console.error(':( ERROR ACCESSING EVENTS', error.message);
    }
  });

router.post('/add', function (req, res) {
    try {
        res.json(events.insertEvent(req.body));
        console.log("successfully added event");
    } catch (error) {
        console.error(':( ERROR ADDING EVENT', error.message);
    }
});

router.get('/all', function (req, res) {
    try {
      res.send(events.getAllEvents());
    } catch (error) {
      console.error(':( ERROR GETTING ALL EVENTS', error.message);
    }
  });
  

module.exports = router;