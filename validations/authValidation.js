const { body } = require('express-validator');
const User = require('../models/user');

exports.signUp = [
    body('email', 'Please enter a valid email')
        .isEmail()
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(user => {
                    if (user) {
                        return Promise.reject('E-mail is already taken');
                    }
                });
        }),
    body('password', 'Password must be 5 characters long')
        .isLength({ min: 5 })
        .trim(),
    body('name', 'Name must be 3 characters long')
        .isLength({ min: 3 })
        .trim()
];

exports.changeStatus = [
    body('status', 'Status can not be empty').trim().notEmpty()
]