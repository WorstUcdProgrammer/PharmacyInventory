const asyncHandler = require('express-async-handler');
const History = require('../models/historyModel');
const Patient = require('../models/patientModel');
const Drug = require('../models/drugModel');

// @desc    Get history
// @route   Get /history
const getHistories = asyncHandler(async (req, res) => {
    const histories = await History.find();
    res.status(200).json(histories);
});

// @desc    Get history of a patient
// @route   Get /history/patient/:id
const getHistoriesPatient = asyncHandler(async (req, res) => {
    const histories = await History.find({
        patient: req.params.id
    });
    res.status(200).json(histories);
});

// @desc    Get history
// @route   Get /history/:id
const getHistory = asyncHandler(async (req, res) => {
    const history = await History.findById(req.params.id);

    if (!history) {
        throw new Error(`History not found`);
    }

    res.status(200).json({
        _id: history.id,
        patient: history.patient,
        drug: history.drug,
        type: history.type,
        mgPerUnit: history.mgPerUnit,
        cost: history.costy,
        price: history.price,
        quantity: history.quantity,
        time: history.time
    });
});

// @desc    Add history
// @route   POST /history
const addHistory = asyncHandler(async (req, res) => {
    const {
        patient,
        drug,
        type,
        mgPerUnit,
        cost,
        price,
        quantity,
    } = req.body;

    if (!patient ||
        !drug ||
        !type ||
        !mgPerUnit ||
        !cost ||
        !price ||
        !quantity) {
        throw new Error(`Please add all fields`);
    }

    const patientExist = await Patient.findById(patient);

    if (!patientExist) {
        throw new Error(`Patient does not exist`);
    }

    const drugExist = await Drug.findById(drug);

    if(!drugExist) {
        throw new Error(`Drug does not exist`);
    }

    const history = await History.create({
        patient: patient,
        drug: drug,
        type: type,
        mgPerUnit: mgPerUnit,
        cost: cost,
        price: price,
        quantity: quantity
    });

    if (history) {
        res.status(201).json({
            _id: history.id,
            patient: history.patient,
            drug: history.drug,
            type: history.type,
            mgPerUnit: history.mgPerUnit,
            cost: history.costy,
            price: history.price,
            quantity: history.quantity,
            time: history.time
        });
    } else {
        res.status(400).json({ message: `Invalid data` });
    }
});

// @desc    Update history
// @route   PUT /history/:id
const updateHistory = asyncHandler(async (req, res) => {
    const {
        patient,
        drug,
        type,
        mgPerUnit,
        cost,
        price,
        quantity
    } = req.body;

    if (!patient ||
        !drug ||
        !type ||
        !mgPerUnit ||
        !cost ||
        !price ||
        !quantity) {
        throw new Error(`Please add all fields`);
    }

    const updatedHistory = await History.findByIdAndUpdate(req.params.id, {
        $set: {
            patient: patient,
            drug: drug,
            type: type,
            mgPerUnit, mgPerUnit,
            cost: cost,
            price: price,
            quantity: quantity
        }
    }, {
        new: true
    });

    if (updatedHistory) {
        res.status(201).json({
            _id: updatedHistory.id,
            patient: updatedHistory.patient,
            drug: updatedHistory.drug,
            type: updatedHistory.type,
            mgPerUnit: updatedHistory.mgPerUnit,
            cost: updatedHistory.costy,
            price: updatedHistory.price,
            quantity: updatedHistory.quantity,
            time: updatedHistory.time
        })
    } else {
        res.status(400).json({ message: `Update Failed` });
    }
});

// @desc    Delete history
// @route   DELETE /history/:id
const deleteHistory = asyncHandler(async (req, res) => {
    const deletedHistory = await History.findByIdAndDelete(req.params.id);

    if (!deletedHistory) {
        throw new Error(`History does not exist`);
    }

    res.status(200).json(deletedHistory);
});

module.exports = {
    getHistories,
    getHistoriesPatient,
    getHistory,
    addHistory,
    updateHistory,
    deleteHistory
}