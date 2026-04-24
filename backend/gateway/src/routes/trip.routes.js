const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware'); //middleware that forwards incoming requests to another server 
const AppError = require('../utils/AppError');

const tripServiceUrl = process.env.TRIP_SERVICE_URL;
const router = express.Router();

const tripProxy = createProxyMiddleware({
    tripServiceUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api/trip': '' //remove the prefix /api/auth from the request url before forwading it
    },
    onError: (err,req,res) => {
        console.error('trip service proxy error', err);
        throw new AppError('Trip service unavaliable at the moment !', 503);
    }
});

router.use('/', tripProxy);

module.exports = router;