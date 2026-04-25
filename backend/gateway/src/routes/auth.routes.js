const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const AppError = require('../utils/AppError')

const router = express.Router();
const authServiceUrl = process.env.AUTH_SERVICE_URL; //get the target url

const authProxy = createProxyMiddleware({
    target: authServiceUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '' //remove the prefix /api/auth from the request url before forwading it
    },
    on: (err, req, res) => {
        console.error('auth service proxy error', err);
        res.status(503).json({
            message: 'Auth service unavaliable at the moment'
        });
    }
})

router.use('/', authProxy);

module.exports = router;