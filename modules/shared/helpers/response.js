const GenericResponseEntity = require('../entities/GenericResponseEntity');

const httpResponse = (entity, res, req) => {
    if (entity instanceof GenericResponseEntity) {
        const response = entity.toResponse();

        res.status(response.statusCode).send({
            success: response.success,
            message: response.message,
            messageTitle: response.messageTitle,
            data: response.data,
            responseTime: response.responseTime,
        });
        return;
    }

    res.status(500);
};



module.exports = {
    httpResponse
};
