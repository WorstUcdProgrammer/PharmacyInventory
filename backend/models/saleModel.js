const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    drug: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Drug",
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
    }
});

module.exports = mongoose.model('Sale', saleSchema);