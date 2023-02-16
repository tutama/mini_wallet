require('dotenv').config();
const Account = require('../useCase/Account');
const Transaction = require('../useCase/Transaction');
const Auth = require("../shared/libraries/Auth");
const { Users } = require('../shared/databases/models/UserModel');
const { Transactions, getDataTransactionList } = require('../shared/databases/models/TransactionModel');
const Constant = require('../shared/constants/Constant');

jest.mock('../shared/libraries/Auth');
jest.mock('../shared/databases/models/UserModel');
jest.mock('../shared/databases/models/TransactionModel');

describe('Transaction Use Case Test', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Get Transaction List Should be OK', async () => {

    const user = {
        id: 7,
        uuid: 'ea0212d3-abd6-406f-8c67-868e814a2436',
        balance: 0,
        wallet_status: Constant.WALLET_STATUS_ENABLED
    };

    const data = [
      {
          "id": 2,
          "user_id": 7,
          "reference_id": "ea021233-abd6-ab6f-8c67-868e814a2abc",
          "amount": 10000,
          "type": 1,
          "createdAt": null,
          "updatedAt": null
      },
      {
          "id": 3,
          "user_id": 7,
          "reference_id": "50535246-dcb2-4929-8cc9-004ea06f5241",
          "amount": 888888,
          "type": 1,
          "createdAt": "2023-02-15T16:41:20.000Z",
          "updatedAt": "2023-02-15T16:41:20.000Z"
      }
    ];
    
    getDataTransactionList.mockResolvedValue(data);

    const response = await new Transaction().getTransactionList(user);
    expect(response.statusCode).toBe(200);
    expect(response.data).toBe(data);
  });

  it('Deposits Should be OK', async () => {

    const user = {
        id: 7,
        uuid: 'ea0212d3-abd6-406f-8c67-868e814a2436',
        balance: 777777,
        wallet_status: Constant.WALLET_STATUS_ENABLED
    };

    const payload = {
      amount: 777777,
      reference_id: '50535246-dcb2-4929-8cc9-004ea06f5246'
    };

    const data = {
      "id": 12,
      "user_id": 7,
      "amount": "777777",
      "reference_id": "50535246-dcb2-4929-8cc9-004ea06f5246",
      "type": 1,
      "updatedAt": "2023-02-15T16:47:54.536Z",
      "createdAt": "2023-02-15T16:47:54.536Z"
    };
    
    Users.update = jest.fn().mockImplementation((query) => {
      return user;
    });

    Transactions.create.mockResolvedValue(data);

    const response = await new Transaction().deposits(payload, user);
    expect(response.statusCode).toBe(200);
    expect(response.data).toBe(data);
  });

  it('Withdrawals Should be OK', async () => {

    const user = {
        id: 7,
        uuid: 'ea0212d3-abd6-406f-8c67-868e814a2436',
        balance: 777777,
        wallet_status: Constant.WALLET_STATUS_ENABLED
    };

    const payload = {
      amount: 777771,
      reference_id: '50535246-dcb2-4929-8cc9-004ea06f5251'
    };

    const data = {
      "id": 16,
      "user_id": 9,
      "amount": -777771,
      "reference_id": "50535246-dcb2-4929-8cc9-004ea06f5251",
      "type": 2,
      "updatedAt": "2023-02-15T23:33:25.488Z",
      "createdAt": "2023-02-15T23:33:25.488Z"
    };
    
    Users.update = jest.fn().mockImplementation((query) => {
      return user;
    });

    Transactions.create.mockResolvedValue(data);

    const response = await new Transaction().withdrawals(payload, user);
    expect(response.statusCode).toBe(200);
    expect(response.data).toBe(data);
  });

});