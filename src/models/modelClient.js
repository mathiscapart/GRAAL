const {DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
    sequelize.define('Client', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            unique: false,
            len: [2, 10]
        }
    }, {
        alter: true,
        paranoid: true,
        hooks: {
            async beforeCreate(attributes, _) {
                const salt = await bcrypt.genSalt(10);
                attributes.dataValues.password = await bcrypt.hash(attributes.dataValues.password, salt);
            },
            async beforeUpdate(instance, _) {
                const salt = await bcrypt.genSalt(10);
                instance.dataValues.password = await bcrypt.hash(instance.dataValues.password, salt);
            }
        }
    })
};
