const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    type: { 
        type: String
    },
    video: {
        type: String    
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model( 'Exercise', exerciseSchema );