const Post = require('../models/post');
const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            const creator = { name: 'Jahid' }
            posts = posts.map(p => {
                return {
                    _id : p._id,
                    title: p.title,
                    content: p.content,
                    imageUrl: p.imageUrl,
                    createdAt: p.date, 
                    creator: creator
                };
            });
            res.status(200).json({posts});
        })
        .catch(err => next(err));
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        err = errors.array();
        return res.status(400).json({
            'message': err[0].msg
        });
    }

    if (!req.file) {
        return res.status(400).json({
            'message': 'Image is not selected'
        });
    }

    const title = req.body.title;
    const content = req.body.content;
    const date = Date.now();
    const imageUrl = '/' + req.file.path;

    const post = new Post({
        title: title,
        content: content,
        date: date,
        imageUrl: imageUrl
    });

    post.save()
        .then(result => {
            return res.status(201).json({
                'message': 'post created',
            })
        })
        .catch(err => next(err));
}

exports.singlePost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findById(postId)
    .then(post => {
        // if(!post){
        //     return res.status(404).json({message: 'Could not find post'});
        // }
        return res.status(200).json({post});
    })
    .catch(err => next(err));
}