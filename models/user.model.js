const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: 'Enter a last name'
    },
    password: {
        type: String,
        required: 'Enter a last name'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userType: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    role: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});

module.exports = mongoose.model( 'User', userSchema );