const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reference_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    type: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false,
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },
};

const Transactions = db.define('transactions', attributes, {
    freezeTableName: true,
    underscored: true,
});

const getDataTransactionList = async (userId) => Transactions.findAll({
    where: {
        user_id: userId
    }
});

module.exports = {
    Transactions,
    getDataTransactionList
};