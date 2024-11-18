const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Reservation', {
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },{
        paranoid: true,
    })
}