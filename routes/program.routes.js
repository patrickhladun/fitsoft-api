const express = require('express');
const { addProgram } = require('../controllers/program');
const router = express.Router();

router.post('/program',
    addProgram
);

module.exports = router;
