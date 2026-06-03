const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID);

// Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

const checkBody = (req, res, next) => {
  if (req.body?.name || req.body?.price)
    return res.status(400).json({
      status: 'fail',
      message: 'The name and price property',
    });
  next();
};

router
  .route('/')
  .get(tourController.getAllTours)
  .post(checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
