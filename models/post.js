const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    imageUrl: String,
    date: {
        required: true,
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
