// asyncHandler is a utility to wrap async route handlers and catch errors
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            console.error(err)
            res.status(500).json({ error: 'Internal Server Error' })
        })
    }
}

export { asyncHandler }