const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

const db = require('../models/models');
const Program = db.program;

exports.addProgram = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const name = req.body.name;
    const description = req.body.description;
    const weeks = req.body.weeks;

    const program = new Program({
        name,
        description,
        weeks
    });

    program.save((err, program) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        console.log(program);
        res.send({ message: "Program was created successfully!" });
    });
};