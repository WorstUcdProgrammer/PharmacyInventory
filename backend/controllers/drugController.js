const asyncHandler = require("express-async-handler");
const Drug = require("../models/drugModel");

// @desc    Get drugs
// @route   Get /drug
const getDrugs = asyncHandler(async (req, res) => {
  const drugs = await Drug.find().sort({ name: 1 });
  res.status(200).json(drugs);
});

// @desc    Get drug
// @route   Get /drug/:id
const getDrug = asyncHandler(async (req, res) => {
  const drug = await Drug.findById(req.params.id);

  if (!drug) {
    throw new Error(`Drug not found`);
  }

  res.status(200).json({
    _id: drug.id,
    name: drug.name,
    type: drug.type,
    mgPerUnit: drug.mgPerUnit,
    unitPerDose: drug.unitPerDose,
    dosePerDay: drug.dosePerDay,
    maxiDosePerDay: drug.maxiDosePerDay,
    productionDate: drug.productionDate,
    expirationDate: drug.expirationDate,
    quantity: drug.quantity,
    cost: drug.cost,
    price: drug.price,
  });
});

// @desc    Add drug
// @route   POST /drug
const addDrug = asyncHandler(async (req, res) => {
  // get data from request body
  const {
    name,
    type,
    mgPerUnit,
    unitPerDose,
    dosePerDay,
    maxiDosePerDay,
    productionDate,
    expirationDate,
    quantity,
    cost,
    price,
  } = req.body;

  // make sure all fields are entered
  if (
    !name ||
    !type ||
    !mgPerUnit ||
    !unitPerDose ||
    !dosePerDay ||
    !maxiDosePerDay ||
    !productionDate ||
    !expirationDate ||
    !quantity ||
    !cost ||
    !price
  ) {
    throw new Error(`Please add all fields`);
  }

  // create a new entry in database
  const drug = await Drug.create({
    name: name,
    type: type,
    mgPerUnit: mgPerUnit,
    unitPerDose: unitPerDose,
    dosePerDay: dosePerDay,
    maxiDosePerDay: maxiDosePerDay,
    productionDate: productionDate,
    expirationDate: expirationDate,
    quantity: quantity,
    cost: cost,
    price: price,
  });

  // check if successfully created
  if (drug) {
    res.status(201).json({
      _id: drug.id,
      name: drug.name,
      type: drug.type,
      mgPerUnit: drug.mgPerUnit,
      unitPerDose: drug.unitPerDose,
      dosePerDay: drug.dosePerDay,
      maxiDosePerDay: drug.maxiDosePerDay,
      productionDate: drug.productionDate,
      expirationDate: drug.expirationDate,
      quantity: drug.quantity,
      cost: drug.cost,
      price: drug.price,
    });
  } else {
    res.status(400).json({ message: `Invalid data` });
  }
});

// @desc    Update drug
// @route   PUT /drug/:id
const updateDrug = asyncHandler(async (req, res) => {
  const { need } = req.body;

  if (!need) {
    throw new Error(`Quantity not specified`);
  }

  try {
    const updatedDrug = await Drug.findOneAndUpdate(
      {
        _id: req.params.id,
        quantity: { $gte: Math.abs(need) },
      },
      { $inc: { quantity: req.body.need } },
      {
        new: true,
      }
    );
    if (updatedDrug) {
      res.status(201).json({
        _id: updatedDrug.id,
        name: updatedDrug.name,
        type: updatedDrug.type,
        mgPerUnit: updatedDrug.mgPerUnit,
        unitPerDose: updatedDrug.unitPerDose,
        dosePerDay: updatedDrug.dosePerDay,
        maxiDosePerDay: updatedDrug.maxiDosePerDay,
        productionDate: updatedDrug.productionDate,
        expirationDate: updatedDrug.expirationDate,
        quantity: updatedDrug.quantity,
        cost: updatedDrug.cost,
        price: updatedDrug.price,
      });
    } else {
      res.status(400).json({ message: `Update Failed` });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// @desc    Delete drug
// @route   DELETE /drug/:id
const deleteDrug = asyncHandler(async (req, res) => {
  const deletedDrug = await Drug.findByIdAndDelete(req.params.id);

  if (!deletedDrug) {
    throw new Error(`Drug does not exist`);
  }

  res.status(200).json(deletedDrug);
});

module.exports = {
  getDrugs,
  getDrug,
  addDrug,
  updateDrug,
  deleteDrug,
};
