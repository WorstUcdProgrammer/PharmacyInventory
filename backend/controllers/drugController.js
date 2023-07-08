const asyncHandler = require('express-async-handler');
const Drug = require('../models/drugModel');

// @desc    Get drugs
// @route   Get /drug
const getDrugs = asyncHandler(async (req, res) => {
    const drugs = await Drug.find();
    res.status(200).json(drugs);
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
        price
    } = req.body;

    // make sure all fields are entered
    if (!name ||
        !type ||
        !mgPerUnit ||
        !unitPerDose ||
        !dosePerDay ||
        !maxiDosePerDay||
        !productionDate ||
        !expirationDate ||
        !quantity ||
        !cost ||
        !price) {
            res.status(400).json({ message: `Please add all fields` })
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
        price: price
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
            price: drug.price
        });
    } else {
        res.status(400).json({ message: `Invalid data` });
    }
    
});

// @desc    Update drug
// @route   PUT /drug/:id
const updateDrug = asyncHandler(async (req, res) => {
    
    
});

module.exports = {
    getDrugs,
    addDrug
}