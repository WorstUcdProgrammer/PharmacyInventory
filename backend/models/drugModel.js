const mongoose = require("mongoose");

const drugSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please enter the drug's name`],
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
  unitPerDose: {
    type: Number,
    required: [true, `Please enter the unit to take for one dose`],
    min: [0, `Unit per dose has to be positive`],
  },
  dosePerDay: {
    type: Number,
    required: [true, `Please enter the dose to take for one day`],
    min: [0, `Dose per day has to be positive`],
  },
  maxiDosePerDay: {
    type: Number,
    required: [true, `Please enter the maximum dose to take for one day`],
    min: [0, `Maximum dose per day has to be positive`],
  },
  productionDate: {
    type: Date,
    required: [true, `Please enter the production date of the drug`],
  },
  expirationDate: {
    type: Date,
    required: [true, `Please enter the expiration date of the drug`],
  },
  quantity: {
    type: Number,
    required: [true, `Please enter the quantity of the drug`],
    min: [0, `The quantity has to be positive`],
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
});

module.exports = mongoose.model("Drug", drugSchema);
