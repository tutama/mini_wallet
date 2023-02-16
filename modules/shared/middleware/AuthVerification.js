const GenericResponseEntity = require("../entities/GenericResponseEntity");
const { httpResponse } = require("../helpers/response");
const Auth = require("../libraries/Auth");
const { getUserByUuid } = require('../databases/models/UserModel');

module.exports = async (req, res, next) => {
    try {
        const response = new GenericResponseEntity();
        response.statusCode = 401
        response.message = "Auth Failed";
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]

            const decoded = await Auth.verifyToken(token)

            if (decoded) {
                let userUuid = decoded.data.userUuid

                const user = await getUserByUuid(userUuid)
                if (!user) {
                    // User tidak ditemukan di sistem
                    return httpResponse(response, res);
                }

                req.user = user;
                next();
            } else {
                return httpResponse(response, res);
            }
        } else {
            return httpResponse(response, res);
        }
    } catch (e) {
        console.log(e.message)
        next(e)
    }
};
