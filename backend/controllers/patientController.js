const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");

// @desc    Get patients
// @route   Get /patient
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find().sort({ name: 1 });
  res.status(200).json(patients);
});

// @desc    Get patient
// @route   Get /patient/:id
const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    throw new Error(`Patient not found`);
  }

  res.status(200).json({
    _id: patient.id,
    name: patient.name,
    number: patient.number,
  });
});

// @desc    Add patient
// @route   POST /patient
const addPatient = asyncHandler(async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    throw new Error(`Please add all fields`);
  }

  const patient = await Patient.create({
    name: name,
    number: number,
  });

  if (patient) {
    res.status(201).json({
      _id: patient.id,
      name: patient.name,
      number: patient.number,
    });
  } else {
    res.status(400).json({ message: `Invalid data` });
  }
});

// @desc    Update patient
// @route   PUT /patient/:id
const updatePatient = asyncHandler(async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    throw new Error(`Please add all fields`);
  }

  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: name,
        number: number,
      },
    },
    {
      new: true,
    }
  );

  if (updatedPatient) {
    res.status(201).json({
      _id: updatedPatient.id,
      name: updatedPatient.name,
      number: updatedPatient.number,
    });
  } else {
    res.status(400).json({ message: `Update Failed` });
  }
});

// @desc    Delete patient
// @route   DELETE /patient/:id
const deletePatient = asyncHandler(async (req, res) => {
  const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

  if (!deletedPatient) {
    throw new Error(`Patient doesn not exist`);
  }

  res.status(200).json(deletedPatient);
});

module.exports = {
  getPatients,
  getPatient,
  addPatient,
  updatePatient,
  deletePatient,
};
