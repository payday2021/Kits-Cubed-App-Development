const express = require('express');
const router = express.Router();
const kits = require('../services/kits');

// TODO: success/error status codes + messages

router.get('/', function (req, res) {
  try {
    res.json({
      text: 'kits router'
    });
  } catch (error) {
    console.error(':( ERROR ACCESSING KITS', error.message);
  }
});

router.get('/all', function (req, res) {
  try {
    res.send(kits.getAllKits());
  } catch (error) {
    console.error(':( ERROR GETTING ALL KITS', error.message);
  }
});

//route to delete kits table (ONLY FOR TESTING PURPOSES)
router.delete('/all/delete', (req, res) => {
  try {
    res.json(kits.deleteKitsTable());
    console.log("DELETED KITS TABLE")
  } catch (error) {
    console.error(':( ERROR DELETING ALL KITS', error.message);
  } 
})

router.post('/add', function (req, res) {
  try {
    res.json(kits.insertKit(req.body));
  } catch (error) {
    console.error(':( ERROR ADDING KIT', error.message);
  }
});

router.delete('/remove/:id', function (req, res) {
  try {
    res.json(kits.deleteKitById(req.params.id));
  } catch (error) {
    console.error(
      ':( ERROR REMOVING KIT (ID: ' + `${req.params.id})`,
      error.message
    );
  }
});

router.put('/update/:id', function (req, res) {
  try {
    res.json(kits.updateKitById(req.params.id, req.body));
  } catch (error) {
    console.error(
      ':( ERROR UPDATING KIT (ID: ' + `${req.params.id})`,
      error.message
    );
  }
});

module.exports = router;
