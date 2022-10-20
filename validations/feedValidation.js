const { body } = require('express-validator');

exports.createPost = [
    body('title', 'Title must be 5 characters long').isLength({ min: 5 }),
    body('content', 'Content must be 5 characters long').isLength({ min: 5 }),
];