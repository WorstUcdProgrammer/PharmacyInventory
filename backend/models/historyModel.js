const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    drug: {
        type: String,
        require: [true, `Please enter the id of drug`]
    },
    type: {
        type: String,
        required: [true, `Please enter the drug's type`]
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
    },
    quantity: {
        type: Number,
        required: [true, `Please enter the quantity of the drug sold`]
    },
    time: {
        type: Date,
        required: [true, `Please enter the date of the sale`]
    }
});