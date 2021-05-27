const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const User = require('../models/user');


export const addUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({message: 'User created!'})
        })
        .catch(err => {
           if(!err.statusCode) {
               err.statusCode = 500;
           }
           next(err);
        });

    // let newUser = new User(req.body);
    // newUser.save((err, user) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     res.json(user);
    // });
};

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

// export const getUser = (req, res) => {
//     User.find({}, (err, contact) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(contact);
//     });
// };
//
// export const getContactWithID = (req, res) => {
//     Contact.findById(req.params.contactID, (err, contact) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(contact);
//     });
// };

// export const updateContact = (req, res) => {
//     Contact.findOneAndUpdate({ _id: req.params.contactID }, req.body, { new: true, useFindAndModify: false }, (err, contact) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(contact);
//     });
// };
//
// export const deleteContact = (req, res) => {
//     Contact.remove({ _id: req.params.contactID }, (err, contact) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json({ message: 'Successfully deleted contact' });
//     });
// };