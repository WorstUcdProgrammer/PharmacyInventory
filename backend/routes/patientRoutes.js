const express = require('express');
const router = express.Router();

const {
    getPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');

router.route('/').get(getPatients).post(addPatient);
router.route('/:id').get(getPatient).put(updatePatient).delete(deletePatient);

module.exports = router;