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
    const { need } = req.body;

    if (!need) {
        res.status(400).json({ message: `quantity not specified` });
    }

    try {
        const updatedDrug = await Drug.findByIdAndUpdate(req.params.id, { $inc: { quantity: req.body.need }}, {
            new: true
        })
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
                price: updatedDrug.price
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
        res.status(400).json({ message: `Drug does not exist` });
    }

    res.status(200).json(deletedDrug);
});

module.exports = {
    getDrugs,
    addDrug,
    updateDrug,
    deleteDrug
}