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

router.post('/signup', function (req, res) {
    try {
        res.json(events.insertUserSignup(req.body));
        console.log("successfully signed up for event");
        console.log(req.body)
    } catch (error) {
        console.error(':( ERROR SIGNING UP FOR EVENT', error.message);
    }
  });

  router.get('/signup/all', function (req, res) {
    try {
      res.send(events.getAllRegistrations());
    } catch (error) {
      console.error(':( ERROR GETTING ALL EVENTS SIGNUPS', error.message);
    }
  });

  router.get('/signup/all/:id', function (req, res) {
    try {
      const event_id = req.params.id;
      res.send(events.getRegistrationsByEventId(event_id));
    } catch (error) {
      console.error(':( ERROR GETTING ALL EVENTS SIGNUPS BY ID', error.message);
    }
  });

  // router.get('/signup/confirmation', function (req, res) {
  //   try {
  //     res.send(events.isParticipantRegistered(req.body));
  //   } catch (error) {
  //     console.error(':( ERROR GETTING ALL EVENTS SIGNUPS', error.message);
  //   }
  // });

  router.get('/signup/confirmation', function (req, res) {
    try {
      const { event_id, participant } = req.query;
      const isRegistered = events.isParticipantRegistered(event_id, participant);
      console.log(isRegistered)
      res.send({ isRegistered });
    } catch (error) {
      console.error(':( ERROR CHECKING REGISTRATION STATUS', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  router.delete('/signup/all/delete', (req, res) => {
    try {
      res.json(events.deleteEventsSignupTable());
      console.log("DELETED EVENTS_SIGNUP TABLE")
    } catch (error) {
      console.error(':( ERROR DELETING ALL SIGNUPS', error.message);
    } 
  })




module.exports = router;