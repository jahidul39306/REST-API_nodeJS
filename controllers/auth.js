const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        console.log(err[0].msg);
        return res.status(422).json({
            'message': err[0].msg
        });
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                name: name
            });
            return user.save();
        })
        .then(result => {
            return res.status(201).json({
                'message': 'User created'
            })
        })
        .catch(err => next(err));
}

exports.logIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    'message': 'Wrong credentials'
                });
            }
            bcrypt.compare(password, user.password)
                .then(result => {
                    if (!result) {
                        return res.status(401).json({
                            'message': 'Wrong credentials'
                        });
                    }
                    return user;
                })
                .then(user => {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id.toString()
                        },
                        process.env.TOKEN_KEY,
                        { expiresIn: '1h' });
                    return res.status(200).json({
                        'token': token,
                        userId: user._id.toString()
                    });
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
}

exports.getStatus = (req, res, next) => {
    User.findById(req.user.userId)
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'No user status found' })
            }
            res.status(200).json({ status: user.status })
        })
        .catch(err => next(err));
}

exports.changeUserStatus = (req, res, next) => {
    const newStatus = req.body.status;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({ message: errors.array()[0] })
    }
    User.findById(req.user.userId)
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'No user found' })
            }
            user.status = newStatus;
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Status updated successfully' });
        })
        .catch(err => next(err));
}