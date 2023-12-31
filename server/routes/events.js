const express = require('express');
const router = express.Router();
const events = require('../services/tables');

/**
 * EVENTS
 */

router.get('/', function (req, res) {
  try {
    res.json({
      text: 'events router'
    });
  } catch (error) {
    console.error(':( ERROR ACCESSING EVENTS', error.message);
  }
});

router.get('/all', function (req, res) {
  try {
    res.send(events.getAllEvents());
  } catch (error) {
    console.error(':( ERROR GETTING ALL EVENTS', error.message);
  }
});

router.post('/event/:eventId/user/:userId', function (req, res) {
  try {
    res.json(events.addUserToEvent(req.params.userId, req.params.eventId));
  } catch (error) {
    console.error(':( ERROR ADDING USER TO EVENT', error.message);
  }
});

router.get('/user/:id', function (req, res) {
  try {
    res.send(events.getUserEvents(req.params.id));
  } catch (error) {
    console.error(
      ':( ERROR GETTING USER EVENTS (ID: ' + `${req.params.id})`,
      error.message
    );
  }
});

module.exports = router;
