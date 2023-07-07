const mongoose = require('mongoose');

const drugSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, `Please enter the drug's name`]
    },
    
})