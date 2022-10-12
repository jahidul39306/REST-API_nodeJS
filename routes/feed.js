const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/create-post
router.post('/create-post', feedController.createPost);

module.exports = router;

