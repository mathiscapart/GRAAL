const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Marque', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        paranoid: true,
    })
}