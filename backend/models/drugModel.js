const mongoose = require('mongoose');

const drugSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please enter the drug's name`]
    },
    type: {
        type: String,
        required: [true, `Please enter the drug's type`]
    },
    mgPerUnit: {
        type: Number,
        required: [true, `Please enter the amount in mg contained in one unit`]
    },
    unitPerDose: {
        type: Number,
        required: [true, `Please enter the unit to take for one dose`]
    },
    dosePerDay: {
        type: Number,
        required: [true, `Please enter the dose to take for one day`]
    },
    maxiDosePerDay: {
        type: Number,
        required: [true, `Please enter the maximum dose to take for one day`]
    },
    productionDate: {
        type: Date,
        required: [true, `Please enter the production date of the drug`]
    },
    expirationDate: {
        type: Date,
        required: [true, `Please enter the expiration date of the drug`]
    },
    quantity: {
        type: Number,
        required: [true, `Please enter the quantity of the drug`]
    },
    cost: {
        type: Number,
        required: [true, `Please enter the cost of the drug`]
    },
    price: {
        type: Number,
        required: [true, `Please enter the price of the drug`]
    }
})