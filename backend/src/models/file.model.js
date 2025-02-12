const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const fileSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4
    },
    filename: {
        type: String,
        required: true,
        // unique: true
    },
    mimetype: {
        type: String,
        required: true,
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' } // to use with populate method

});

module.exports = mongoose.model('File', fileSchema);
