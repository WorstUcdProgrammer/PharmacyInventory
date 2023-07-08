const express = require('express');
const router = express.Router();

const {
    getDrugs,
    addDrug
} = require('../controllers/drugController');

router.route('/').get(getDrugs).post(addDrug);

module.exports = router;