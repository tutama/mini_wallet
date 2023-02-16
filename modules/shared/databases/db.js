const { Sequelize } = require('sequelize');

db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: true,
    pool: {
        max: 500,
        min: 30,
        acquire: 60000,
        idle: 30000,
    },
    dialectOptions: {
        // @see https://github.com/sequelize/sequelize/issues/8019
        maxPreparedStatements: 100,
    },
});

module.exports = db;