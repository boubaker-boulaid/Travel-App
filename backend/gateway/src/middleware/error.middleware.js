const errorHandler = (err,req,res,next) => {
    // show full error details in development
    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode || 500).json({
            message: err.message,
            stack: err.stack
        });
    }

    // for custom an expected error show clean response
    if (err.isExpected) {
        return res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }

    //unexpected errors 
    console.error('unexpected error', err);
    res.status(500).json({
        massage: 'Something went wrong !'
    })
}