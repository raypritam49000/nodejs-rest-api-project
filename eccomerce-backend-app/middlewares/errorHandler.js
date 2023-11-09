// not found
const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
}

//errorHandler
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    const errorMessage = error.message || 'Internal Server Error';
    return res.json({ message: errorMessage, stack: error.stack });
};

module.exports = { notFound, errorHandler };