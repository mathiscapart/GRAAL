const { Sequelize } = require('sequelize');
const {relationModels} = require("./relationModel");
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
});


const modelDefiners = [
    require('./modelClient'),
    require('./modelCar'),
    require('./modelModel'),
    require('./modelMarque'),
    require('./modelReservation'),
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

relationModels(sequelize)

module.exports = sequelize;