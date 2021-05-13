import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EventSchema = new Schema({
    eventName: {
        type: String
    },
    eventType: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});