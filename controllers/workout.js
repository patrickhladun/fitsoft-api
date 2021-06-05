const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

const db = require('../models/models');
const User = db.user;
const Exercise = db.exercise;
const Workout = db.workout;

/**
 * addWorkout create a workout only with Name and the Description
 */
exports.addWorkout = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const name = req.body.name;
    const description = req.body.description;

    const workout = new Workout({
        name,
        description
    });

    workout.save(workout)
        .then(() => res.send({message: 'Workout was created!'}))
        .catch(err => {
            res.status(500).send({ message: err });
            return;
        }
    );
};

/**
 * updateWorkout updates name, description, exercises
 */
exports.updateWorkout = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;
    const exercises = req.body.exercises;

    //TODO: Check if exercises are passed and update workout with exercises

    const workout = {
        name,
        description
    };

    Workout.findByIdAndUpdate({_id:req.params.id}, workout)
        .then(response => res.send(response))
        .catch(error => {
            res.status(500).send({ message: err });
            return;
        }
    );
};

exports.getWorkouts = (req, res, next) => {
    Workout.find({})
        .then(workouts => res.send(workouts))
        .catch(error => console.log(error));
}

exports.deleteWorkout = (req, res, next) => {
    Workout.findByIdAndRemove({_id:req.params.id})
        .then(workout => res.send(workout))
        .catch(error => console.log(error));
}