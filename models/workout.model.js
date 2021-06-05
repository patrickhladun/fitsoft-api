const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        }
    ]
});

module.exports = mongoose.model( 'Workout', workoutSchema );