const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: String,
    image: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const posts = mongoose.model('Post', postSchema);

module.exports = posts;