const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const AppError = require('../utils/AppError')

const router = express.Router();
const authServiceUrl = process.env.AUTH_SERVICE_URL; //get the target url

const authProxy = createProxyMiddleware({
    authServiceUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '' //remove the prefix /api/auth from the request url before forwading it
    },
    onError: (err, req, res) => {
        console.error('auth service proxy error', err);
        throw new AppError('Auth service unavaliable at the moment', 503);
    }
})

router.use('/', authProxy);

module.exports = router;