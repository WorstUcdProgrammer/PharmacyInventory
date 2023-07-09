const express = require('express');
const router = express.Router();

const {
    getDrugs,
    getDrug,
    addDrug,
    updateDrug,
    deleteDrug
} = require('../controllers/drugController');

router.route('/').get(getDrugs).post(addDrug);
router.route('/:id').get(getDrug).put(updateDrug).delete(deleteDrug);

module.exports = router;