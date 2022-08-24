'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return Promise.all([
            queryInterface.addColumn(
                'swuseremails', // table name
                'resetpassword', // new field name
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
            ),
            queryInterface.addConstraint('swuseremails', {
                fields: ['email'],
                type: 'unique',
                name: 'email_unique_constraint'
            })
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
