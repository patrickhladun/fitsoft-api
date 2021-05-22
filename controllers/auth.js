const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.SECRET;

const db = require('../models/models');
const User = db.user;
const Role = db.role;

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = bcrypt.hashSync(req.body.password, 8);

    const user = new User({
        email: email,
        password: password,
        name: name
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.role) {
            Role.find(
                {
                    name: { $in: req.body.role }
                },
                (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.role = role.map(item => item._id);
                    user.save(err => {
                        console.log(user);
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });

    // return user
    //     .save()
    //     .then(result => {
    //         res.status(201).json({ message: 'User created!', userId: result._id });
    //     })
    //     .catch(err => {
    //         if (!err.statusCode) {
    //             err.statusCode = 500;
    //         }
    //         next(err);
    //     });

    // bcrypt
    //     .hash(password, 12)
    //     .then(hashedPw => {
    //         const user = new User({
    //             email: email,
    //             password: hashedPw,
    //             name: name
    //         });
    //         return user.save();
    //     })
    //     .then(result => {
    //         res.status(201).json({ message: 'User created!', userId: result._id });
    //     })
    //     .catch(err => {
    //         if (!err.statusCode) {
    //             err.statusCode = 500;
    //         }
    //         next(err);
    //     });


};

// exports.loginBACKUP = (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     let loadedUser;
//     console.log(req);
//     User.findOne({ email: email })
//         .then(user => {
//             if (!user) {
//                 const error = new Error('A user with this email could not be found.');
//                 error.statusCode = 401;
//                 throw error;
//             }
//             loadedUser = user;
//             return bcrypt.compare(password, user.password);
//         })
//         .then(isEqual => {
//             if (!isEqual) {
//                 const error = new Error('Wrong password!');
//                 error.statusCode = 401;
//                 throw error;
//             }
//             const token = jwt.sign(
//                 {
//                     email: loadedUser.email,
//                     userId: loadedUser._id.toString()
//                 },
//                 secret,
//                 { expiresIn: '1h' }
//             );
//             res.status(200).json({ token: token, userId: loadedUser._id.toString() });
//         })
//         .catch(err => {
//             if (!err.statusCode) {
//                 err.statusCode = 500;
//             }
//             next(err);
//         });
// };

exports.login = (req, res) => {

    console.log(req.body);

    User.findOne({
        email: req.body.email // I do not have username in user collection saved
    })
        .populate("role", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: 86400 // 24 hours
            });

            const authorities = [];

            for (let i = 0; i < user.role.length; i++) {
                authorities.push("ROLE_" + user.role[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                role: authorities,
                accessToken: token
            });
        });
};