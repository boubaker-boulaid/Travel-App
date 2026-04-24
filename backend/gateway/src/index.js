require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// define middlwares
app.use(cors()); //enable cors middleware to give the frontend url access to api
app.use(morgan('dev')); //log every request
app.use(express.json({limit: '10kb'})); //parses json bodies

// rate limit middlware max 100 request per IP every 15min
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'too many requests !'
})
app.use(limiter);


// health check endpoint
app.get('/health', (req,res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date()
    });
});

// global error middlware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`api gateway is running on http://localhost:${PORT}`);
});

