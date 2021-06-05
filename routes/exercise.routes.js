const express = require('express');
const { addExercise, updateExercise, getExercises, deleteExercise } = require('../controllers/exercise');
const router = express.Router();

router.post('/exercise',
    addExercise
);

router.post('/exercise/:id',
    updateExercise
);

router.get('/exercises/',
    getExercises
);

router.delete('/exercise/:id',
    deleteExercise
);

module.exports = router;