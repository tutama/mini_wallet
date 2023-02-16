const Auth = require("../shared/libraries/Auth");
const GenericResponseEntity = require('../shared/entities/GenericResponseEntity');
const Constant = require('../shared/constants/Constant');
const { Users } = require('../shared/databases/models/UserModel');


class Account {

    async init(payload) {

        const response = new GenericResponseEntity();
        const userUuid = payload.customer_xid;

        if (!userUuid) {
            return response.errorResponse('Customer id required.', 400, null);
        }

        let data = {
            userUuid: userUuid
        }

        try {

            const token = await Auth.generateToken(data);
            data = {
                ...data,
                token: token
            };

            await Users.create({
                uuid: userUuid,
                balance: 0,
                wallet_status: Constant.WALLET_STATUS_DISABLED
            });

        } catch (error) {
            return response.errorResponse(error.message, 400, error);
        }

        return response.successResponse('Account initialized', 200, data);
    }

    async setWallet(payload, user) {

        const response = new GenericResponseEntity();
        let walletStatus = Constant.WALLET_STATUS_ENABLED;

        if (payload.is_disabled != undefined) {
            walletStatus = (payload.is_disabled === 'true') ? Constant.WALLET_STATUS_DISABLED : Constant.WALLET_STATUS_ENABLED;
        }
        
        try {

            await Users.update({
                wallet_status: walletStatus
            }, { 
                where: { id: user.id } 
            }
            );

        } catch (error) {
            return response.errorResponse(error.message, 400, error);
        }

        const message = 'Wallet ' + ((walletStatus === Constant.WALLET_STATUS_ENABLED) ? 'enabled' : 'disabled');

        return response.successResponse(message, 200, null);
    }


    async getBalance(user) {

        const response = new GenericResponseEntity();

        if (user.wallet_status === Constant.WALLET_STATUS_DISABLED) {
            return response.errorResponse('Wallet disabled.', 400, null);
        }

        const data = {
            userUuid: user.uuid,
            userBalance: user.balance
        };

        return response.successResponse('Get balance successful', 200, data);
    }
}

module.exports = Account;