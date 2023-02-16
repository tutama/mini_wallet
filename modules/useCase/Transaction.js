const Auth = require("../shared/libraries/Auth");
const GenericResponseEntity = require("../shared/entities/GenericResponseEntity");
const Constant = require('../shared/constants/Constant');
const { Transactions, getDataTransactionList } = require('../shared/databases/models/TransactionModel');
const { Users } = require('../shared/databases/models/UserModel');

class Transaction {
  async getTransactionList(user) {
    const response = new GenericResponseEntity();
    let data = [];

    try {
        
        if (user.wallet_status === Constant.WALLET_STATUS_DISABLED) {
            return response.errorResponse('Wallet disabled.', 400, null);
        }

        data = await getDataTransactionList(user.id);
    } catch (error) {
        return response.errorResponse(error.message, 400, error);
    }

    return response.successResponse('Get transaction list successful', 200, data);
  }

  async deposits(payload, user) {
    const response = new GenericResponseEntity();
    const amount = payload.amount;
    const reference_id = payload.reference_id;

    if (!amount || !reference_id) {
        return response.errorResponse('Amount and reference id required.', 400, null);
    }

    let data;

    try {
        
        if (user.wallet_status === Constant.WALLET_STATUS_DISABLED) {
            return response.errorResponse('Wallet disabled.', 400, null);
        }

        await Users.update({
            balance: (Number(user.balance) + Number(amount))
        }, { 
            where: { id: user.id } 
        });

        data = await Transactions.create({
            user_id: user.id,
            amount: amount,
            reference_id: reference_id,
            type: Constant.TRANSACTION_TYPE_DEPOSIT
        });


    } catch (error) {
        return response.errorResponse(error.message, 400, error);
    }

    return response.successResponse('Deposit successful', 200, data);
  }

  async withdrawals(payload, user) {
    const response = new GenericResponseEntity();
    const amount = payload.amount;
    const reference_id = payload.reference_id;

    if (!amount || !reference_id) {
        return response.errorResponse('Amount and reference id required.', 400, null);
    }

    let data;

    try {
        
        if (user.wallet_status === Constant.WALLET_STATUS_DISABLED) {
            return response.errorResponse('Wallet disabled.', 400, null);
        }

        if ((Number(user.balance) - Number(amount)) < 0) {
            return response.errorResponse('Insufficient balance.', 400, null);
        }
        
        await Users.update({
            balance: (Number(user.balance) - Number(amount))
        }, { 
            where: { id: user.id } 
        });

        data = await Transactions.create({
            user_id: user.id,
            amount: -(Number(amount)),
            reference_id: reference_id,
            type: Constant.TRANSACTION_TYPE_WITHDRAW
        });

    } catch (error) {
        return response.errorResponse(error.message, 400, error);
    }

    return response.successResponse('Withdrawal successful', 200, data);
  }
}

module.exports = Transaction;
