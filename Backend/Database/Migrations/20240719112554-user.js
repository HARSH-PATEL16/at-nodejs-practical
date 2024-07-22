'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      first_name: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING(255),
      },
      last_name: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING(255),
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      is_active: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: 1,
        comment: "0 => Inactive 1 => Active"
      },
      is_delete: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
        comment: "0 => Not deleted 1 => Deleted"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('users');
  }
};