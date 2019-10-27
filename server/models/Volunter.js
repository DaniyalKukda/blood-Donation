const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VolunterSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    postID: {
        type: String,
        required: true
    }
});

const Volunter = mongoose.model('Volunter', VolunterSchema);

module.exports = Volunter;