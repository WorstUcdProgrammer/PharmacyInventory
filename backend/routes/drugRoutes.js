const express = require('express');
const router = express.Router();

const {
    getDrugs,
    addDrug,
    updateDrug,
    deleteDrug
} = require('../controllers/drugController');

router.route('/').get(getDrugs).post(addDrug);
router.route('/:id').put(updateDrug).delete(deleteDrug);

module.exports = router;