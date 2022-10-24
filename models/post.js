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
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);
