const { Sequelize, DataTypes } = require("sequelize");
const user_tokens = sequelize.define("user_tokens", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
    },
    user_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'users', key: 'id', as: 'user_id' },
        onDelete: 'CASCADE'
    },
    access_token: {
        allowNull: false,
        type: Sequelize.STRING(255),
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
})
module.exports = user_tokens;
