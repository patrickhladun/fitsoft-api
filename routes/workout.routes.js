const express = require('express');
const { addWorkout, updateWorkout, getWorkouts, deleteWorkout } = require('../controllers/workout');
const router = express.Router();

router.post('/workout',
    addWorkout
);

router.post('/workout/:id',
    updateWorkout
);

router.get('/workouts/',
    getWorkouts
);

router.delete('/workout/:id',
    deleteWorkout
);

module.exports = router;