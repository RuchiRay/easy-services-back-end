const path = require('path');
const express = require('express');
const cors = require("cors");

const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors({
    origin: 'https://easy-services.netlify.app'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/slots', require('./routes/slotRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend

app.get('/', (req, res) => res.send('server running'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
