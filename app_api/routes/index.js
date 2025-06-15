const express = require('express'); // Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we will routeAdd commentMore actions
const tripsController = require('../controllers/trips');

// Define routes for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) //Get Method routes tripListAdd commentMore actions
    .post(tripsController.tripsAddTrip); //Post Method Adds a Trip

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;