const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  patient: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Patient",
    require: [true, `Please enter the patient's id`],
  },
  drug: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Drug",
    require: [true, `Please enter the id of drug`],
  },
  type: {
    type: String,
    required: [true, `Please enter the drug's type`],
  },
  mgPerUnit: {
    type: Number,
    required: [true, `Please enter the amount in mg contained in one unit`],
    min: [0, `Milligram per unit has to be positive`],
  },
  cost: {
    type: Number,
    required: [true, `Please enter the cost of the drug`],
    min: [0, `The cost has to be positive`],
  },
  price: {
    type: Number,
    required: [true, `Please enter the price of the drug`],
    min: [0, `The price has to be positive`],
  },
  quantity: {
    type: Number,
    required: [true, `Please enter the quantity of the drug sold`],
    min: [0, `The quantity has to be positive`],
  },
  time: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("History", historySchema);
