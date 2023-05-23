require('dotenv').config();
const { Sequelize } = require('sequelize');

module.exports = {
  sequelize: new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      port: process.env.PORT,
      dialect: 'postgres',
      logging: false,
      define: {
        freezeTableName: true,
      },
    }
  ),
};
