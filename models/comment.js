const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    body: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;