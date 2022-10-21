const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');
const feedValidation = require('../validations/feedValidation');

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/create-post
router.post('/create-post', feedValidation.createPost, feedController.createPost);

// GET /feed/post/:postId
router.get('/post/:postId', feedController.singlePost);

module.exports = router;

