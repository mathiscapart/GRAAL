const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Models', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nbModel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }  
    },{
        paranoid: true,
    })
}