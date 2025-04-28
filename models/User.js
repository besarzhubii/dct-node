const Sequelize = require('sequelize');
const db = require('../helpers/db');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type:Sequelize.STRING,
    allowNull:true
  },
  email: {
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  password: {
    type:Sequelize.STRING,
    allowNull:true
  },
  klavyio: {
    type:Sequelize.STRING,
    allowNull:false
  },
  shopify: {
    type:Sequelize.STRING,
    allowNull:false
  },
  facebook: {  
    type:Sequelize.STRING,
    allowNull:false
  },
  google: {
    type:Sequelize.STRING,
    allowNull:false
  },
  role: {
    type:Sequelize.STRING,
    allowNull:false,
    defaultValue:"user"
  }
});
User.sync({ alter:true })
    .then(() => {
        console.log('User table has been synchronised');
    })
    .catch((error) => {
        console.error('Error synchronizing User table:', error);
    });

module.exports = User;
