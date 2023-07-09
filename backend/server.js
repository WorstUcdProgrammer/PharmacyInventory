const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// routes
app.use('/drug', require('./routes/drugRoutes'));
app.use('/history', require('./routes/historyRoutes'));
app.use('/sale', require('./routes/saleRoutes'));
app.use('/patient', require('./routes/patientRoutes'));

// middleware
app.use(errorHandler);

// connect to port
app.listen(port, () => console.log(`Server started on port ${port}`));