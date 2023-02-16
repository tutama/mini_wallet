const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    wallet_status: {
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

const Users = db.define('users', attributes, {
    freezeTableName: true,
    underscored: true,
});

const getUserByUuid = async (userUuid) => Users.findOne({
    where: {
        uuid: userUuid
    }
});

module.exports = {
    Users,
    getUserByUuid
};