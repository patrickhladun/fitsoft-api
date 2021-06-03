const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new Schema({
    name: {
        type: String
    },
    version: {
        type: Number // 
    },
    description: {
        type: String
    },
    clients: {
        type: Array
    },
    weeks: [{
        week: {
            type: String
        },
        days: [{
            day: {
                type: String
            },
            rest_day: {
                type: Boolean,
                default: false
            },
            workouts: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Workout'
                }
            ]
        }]
    }]
});

module.exports = mongoose.model( 'Program', programSchema );