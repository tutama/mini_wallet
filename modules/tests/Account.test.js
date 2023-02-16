require('dotenv').config();
const Account = require('../useCase/Account');
const Auth = require("../shared/libraries/Auth");
const { Users } = require('../shared/databases/models/UserModel');
const Constant = require('../shared/constants/Constant');

jest.mock('../shared/libraries/Auth');
jest.mock('../shared/databases/models/UserModel');

describe('Account Use Case Test', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Init Should be OK', async () => {
   
    const payload = {
        customer_xid: 'ea0212d3-abd6-406f-8c67-868e814a2438'
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzgyMjcwMjEsImRhdGEiOnsidXNlclV1aWQiOiJlYTAyMTJkMy1hYmQ2LTQwNmYtOGM2Ny04NjhlODE0YTI0MzgifSwiaWF0IjoxNjc2NDk5MDIxfQ.Jl4naIWGA0iGsGrJBKuDoPNZ7ysCTpb5iN3Nw__lfcY';
    
    const user = {
        id: 1,
        uuid: payload.customer_xid,
        balance: 0,
        wallet_status: Constant.WALLET_STATUS_DISABLED
    };

    const data = {
        userUuid: payload.customer_xid,
        token: token
    };

    Auth.generateToken.mockResolvedValue(token);
    Users.create = jest.fn().mockImplementation((query) => {
        return user;
    });

    const response = await new Account().init(payload);
    expect(response.statusCode).toBe(200);
    expect(response.data.userUuid).toBe(data.userUuid);
    expect(response.data.token).toBe(data.token);
  });


  it('Set Wallet Should be OK', async () => {
   
    const payload = {
        is_disabled: 'false'
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzgyMjcwMjEsImRhdGEiOnsidXNlclV1aWQiOiJlYTAyMTJkMy1hYmQ2LTQwNmYtOGM2Ny04NjhlODE0YTI0MzgifSwiaWF0IjoxNjc2NDk5MDIxfQ.Jl4naIWGA0iGsGrJBKuDoPNZ7ysCTpb5iN3Nw__lfcY';
    
    const user = {
        id: 1,
        uuid: 'ea0212d3-abd6-406f-8c67-868e814a2438',
        balance: 0,
        wallet_status: Constant.WALLET_STATUS_ENABLED
    };
    
    Users.update = jest.fn().mockImplementation((query) => {
        return user;
    });

    const response = await new Account().setWallet(payload, user);
    expect(response.statusCode).toBe(200);
  });

  it('Get Balance Should be OK', async () => {
   
    const user = {
        id: 1,
        uuid: 'ea0212d3-abd6-406f-8c67-868e814a2438',
        balance: 9999,
        wallet_status: Constant.WALLET_STATUS_ENABLED
    };

    const response = await new Account().getBalance(user);
    expect(response.statusCode).toBe(200);
    expect(response.data.userBalance).toBe(9999);
  });
});