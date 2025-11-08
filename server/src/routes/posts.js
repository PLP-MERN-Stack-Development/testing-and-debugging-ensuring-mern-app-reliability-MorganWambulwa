// server/src/routes/posts.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');

// GET all bugs
router.get('/', controller.getPosts);
router.get('/:id', controller.getPostById);

// For testing, remove authMiddleware
router.post('/', controller.createPost);
router.put('/:id', controller.updatePost);
router.delete('/:id', controller.deletePost);

module.exports = router;
