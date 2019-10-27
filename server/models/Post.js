const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    bloodgroup: {
        type: String,
        required: true
    },
    noOfUnit: {
        type: String,
        required: true
    },
    urgency: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    additional: {
        type: String,
    },
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;