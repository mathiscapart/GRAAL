function errorMiddleware(err, req, res) {
    console.error(err.stack);

    if (err.status === 404) {
        return res.status(404).json({
            status: 'error',
            message: 'Resource not found!',
        });
    }

    if (err.status === 400) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad request: ID should not be provided, since it is determined automatically by the database.',
        })
    }

    res.status(500).json({
        status: 'error',
        message: 'Server Crash',
        code: err.code,
        error: process.env.NODE_ENV === 'development' ? err.message : {},
    });
}

module.exports = errorMiddleware;