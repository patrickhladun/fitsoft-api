const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    category: {

    },
    video: {
        type: String    
    },
    image: {
        type: String
    },
    type: { //Strength, 

    }
});

module.exports = mongoose.model( 'Exercise', exerciseSchema );