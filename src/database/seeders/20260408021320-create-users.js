'use strict';
const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = (password) => {
      return crypto.createHash('sha256').update(password).digest('hex');
    };
    await queryInterface.bulkInsert('users', [
      {
        email: 'john.doe@example.com',
        password: hashPassword('password123'),
        name: 'John Doe',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'jane.smith@example.com',
        password: hashPassword('password456'),
        name: 'Jane Smith',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'peter.jones@example.com',
        password: hashPassword('password789'),
        name: 'Peter Jones',
        is_active: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
