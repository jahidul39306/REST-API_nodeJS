const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');
const feedValidation = require('../validations/feedValidation');
const isAuth = require('../middleware/is-auth');

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/create-post
router.post('/create-post', isAuth, feedValidation.createPost, feedController.createPost);

// GET /feed/post/:postId
router.get('/post/:postId', isAuth, feedController.singlePost);

// PUT /feed/edit-post/:postId
router.put('/edit-post/:postId', isAuth, feedValidation.editPost, feedController.editPost);

// DELETE /feed/delete-post/:postId
router.delete('/delete-post/:postId', isAuth, feedController.deletePost);

module.exports = router;

