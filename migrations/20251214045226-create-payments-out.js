'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments_out', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      business_shortcode: {
        type: Sequelize.STRING
      },
      transaction_id: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },

      chamaa_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      cycle_id: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      actualized: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
       type:{
        type: Sequelize.STRING,
        values:Sequelize.ENUM(["credit","debit"])
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments_out');
  }
};