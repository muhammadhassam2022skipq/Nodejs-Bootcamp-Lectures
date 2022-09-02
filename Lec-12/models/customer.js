const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: false
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Customer', customerSchema);