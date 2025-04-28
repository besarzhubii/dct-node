const { Sequelize } = require('sequelize');

// Replace 'YOUR_PASSWORD' with your actual password
const sequelize = new Sequelize(
  'postgresql://postgres:Besar321!!!@db.agpqtoxykerinjdnaaku.supabase.co:5432/postgres',
  {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,  // Ensures SSL is enabled
        rejectUnauthorized: false, // Disable SSL certificate validation (useful for Supabase)
      },
    },
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
