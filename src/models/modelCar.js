const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Car', {
        immatriculation: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        paranoid: true,
    })
}