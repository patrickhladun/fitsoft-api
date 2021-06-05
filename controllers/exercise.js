const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

const db = require('../models/models');
const Exercise = db.exercise;

exports.addExercise = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const exercise = new Exercise(req.body);

    exercise.save((err, exercise) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        console.log(exercise);
        res.send({ message: "Exercise was created successfully!" });
    });
};

exports.updateExercise = (req, res, next) => {

    const exercise = req.body;

    Exercise.findByIdAndUpdate({_id:req.params.id}, exercise)
        .then(response => res.send(response))
        .catch(error => {
            res.status(500).send({ message: err });
            return;
        }
    );
};

exports.getExercises = (req, res, next) => {
    Exercise.find({})
        .then(exercises => res.send(exercises))
        .catch(error => console.log(error));
}

exports.deleteExercise = (req, res, next) => {
    Exercise.findByIdAndRemove({_id:req.params.id})
        .then(exercise => res.send(exercise))
        .catch(error => console.log(error));
}