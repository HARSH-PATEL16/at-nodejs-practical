const {Sequelize, DataTypes} = require("sequelize");
const User = sequelize.define("users", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20).UNSIGNED
    },
    first_name: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING(255),
    },
    last_name: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING(255),
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING(255),
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(255),
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING(255),
    },
    is_active: {
        allowNull: false,
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
        comment: "0 => Inactive 1 => Active"
    },
    is_delete: {
        allowNull: false,
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
        comment: "0 => Not deleted 1 => Deleted"
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
})
module.exports = User;
