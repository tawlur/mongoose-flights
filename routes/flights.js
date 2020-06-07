const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');


router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create);
router.post('/:flightId/destinations', flightsCtrl.createDestination);


module.exports = router;
