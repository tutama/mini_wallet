var express = require('express');
var router = express.Router();

const Account = require('../modules/useCase/Account');
const Transaction = require('../modules/useCase/Transaction');
const AuthVerification = require('../modules/shared/middleware/AuthVerification');
const { httpResponse } = require('../modules/shared/helpers/response');

router.post(
    '/v1/init',
    async (req, res, next) => {
        try {

          httpResponse(await new Account().init(req.body), res);
        } catch (e) {
            next(e);
        }
    }
);

router.post(
    '/v1/wallet',
    AuthVerification,
    async (req, res, next) => {
        try {
        
          httpResponse(await new Account().setWallet(req.body, req.user), res);
        } catch (e) {
            next(e);
        }
    }
);

router.patch(
    '/v1/wallet',
    AuthVerification,
    async (req, res, next) => {
        try {
        
          httpResponse(await new Account().setWallet(req.body, req.user), res);
        } catch (e) {
            next(e);
        }
    }
);

router.get(
    '/v1/wallet',
    AuthVerification,
    async (req, res, next) => {
        try {
        
          httpResponse(await new Account().getBalance(req.user), res);
        } catch (e) {
            next(e);
        }
    }
);

router.get(
    '/v1/wallet/transactions',
    AuthVerification,
    async (req, res, next) => {
        try {
        
          httpResponse(await new Transaction().getTransactionList(req.user), res);
        } catch (e) {
            next(e);
        }
    }
);

router.post(
    '/v1/wallet/deposits',
    AuthVerification,
    async (req, res, next) => {
        try {
        
          httpResponse(await new Transaction().deposits(req.body, req.user), res);
        } catch (e) {
            next(e);
        }
    }
);

router.post(
    '/v1/wallet/withdrawals',
    AuthVerification,
    async (req, res, next) => {
        try {
        
          httpResponse(await new Transaction().withdrawals(req.body, req.user), res);
        } catch (e) {
            next(e);
        }
    }
);

module.exports = router;
