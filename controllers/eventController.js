import mongoose from 'mongoose';
import { EventSchema } from '../models/eventModel';

const Event = mongoose.model( 'Event', EventSchema );

export const addNewEvent = (req, res) => {
    let newEvent = new Event(req.body);

    newEvent.save((err, event) => {
        if (err) {
            res.send(err);
        }
        res.json(event);
    });
};

export const getEvent = (req, res) => {
    Event.find({}, (err, event) => {
        if (err) {
            res.send(err);
        }
        res.json(event);
    });
};