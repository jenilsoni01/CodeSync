// errorHandler is a middleware to handle errors in Express routes
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.message
        });
    }

    // Handle invalid MongoDB ObjectId errors
    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Invalid ID format'
        });
    }

    // Default error response
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
}; 