const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please enter the patient's name`]
    },
    number: {
        type: String,
        required: [true, `Please enter the patient's phone number`]
    }
});

module.exports = mongoose.model('Patient', patientSchema);