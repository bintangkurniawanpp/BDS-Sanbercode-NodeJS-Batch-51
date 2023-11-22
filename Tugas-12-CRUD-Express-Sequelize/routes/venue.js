const express = require('express');
const router = express.Router();
const VenueController = require('../controllers/venueController')

router.post('/', VenueController.createVenue);
router.get('/', VenueController.getVenues);
router.get('/:id', VenueController.getVenue);
router.put('/:id', VenueController.updateVenue);
router.delete('/:id', VenueController.deleteVenue);

module.exports = router;