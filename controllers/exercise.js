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

    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;
    const video = req.body.video;
    const image = req.body.image;

    const exercise = new Exercise({
        name,
        description,
        type,
        video,
        image
    });

    exercise.save((err, exercise) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        console.log(exercise);
        res.send({ message: "Exercise was created successfully!" });
    });
};