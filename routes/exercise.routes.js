const express = require('express');
const { addExercise } = require('../controllers/exercise');
const router = express.Router();

router.post('/exercise',
    addExercise
);

module.exports = router;