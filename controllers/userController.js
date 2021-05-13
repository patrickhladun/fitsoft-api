import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';

const User = mongoose.model( 'User', UserSchema );

export const addUser = (req, res) => {
    let newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
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