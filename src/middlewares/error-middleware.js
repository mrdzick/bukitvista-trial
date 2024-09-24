const { CelebrateError } = require('celebrate');
const ResponseError = require('../common/error/response-error');

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof CelebrateError) {
        const [value] = err.details.values();
        console.log(value.details);
        res.status(400).json({
            errors: value.details?.map(err => err.message),
        });
    } else if (err instanceof ResponseError) {
        res.status(err.statusCode).json({
            errors: err.message,
        })
    } else {
        console.log(err)
        res.status(500).json({
            errors: "Internal server error",
        });
    }
}

module.exports = errorMiddleware;