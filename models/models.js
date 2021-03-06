const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require('./user.model');
db.role = require('./role.model');
db.program = require('./program.model');
db.workout = require('./workout.model');
db.exercise = require('./exercise.model');

db.ROLES = ['user', 'admin', 'customer'];

module.exports = db;