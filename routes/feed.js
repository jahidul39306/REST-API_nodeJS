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

// PUT /feed/edit-post/:postId
router.put('/edit-post/:postId', feedValidation.editPost, feedController.editPost);

// DELETE /feed/delete-post/:postId
router.delete('/delete-post/:postId', feedController.deletePost);

module.exports = router;

