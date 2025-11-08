// server/src/routes/bugRoutes.js (Revised)
const express = require('express');
const router = express.Router();
// Import the controller functions
const bugController = require('../controllers/bugController');

// GET all bugs - Maps '/' to the getBugs function from the controller
router.get('/', bugController.getBugs);

// POST new bug
router.post('/', bugController.createBug);

// PUT update bug
router.put('/:id', bugController.updateBug);

// DELETE bug
router.delete('/:id', bugController.deleteBug);

module.exports = router;