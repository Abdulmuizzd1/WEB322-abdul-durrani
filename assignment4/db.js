const { Sequelize, DataTypes } = require('sequelize');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = require('./neontech.credentials');

// Set up Sequelize to point to the PostgreSQL database
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
  query: { raw: true },
});

// Define models
const User = sequelize.define('User', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  dob: DataTypes.DATE,
  company: DataTypes.STRING,
  phone: DataTypes.STRING,
});

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  isbn: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  description: DataTypes.STRING,
});

const Order = sequelize.define('Order', {
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  description: {
    type: DataTypes.STRING,
  },
});

// Define associations
User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

// Table population function
const seedDatabase = async () => {
  try {
    // Populate the Users table
    if (await User.count() < 1) {
      await User.bulkCreate([
        // ... your user data
      ]);
    }

    // Populate the Products table
    if (await Product.count() < 1) {
      await Product.bulkCreate([
        // ... your product data
      ]);
    }

    // Populate the Orders table
    if (await Order.count() < 1) {
      await Order.bulkCreate([
        // ... your order data
      ]);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Connect to the database
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }
};

// Sync models with the database
const sync = async () => {
  try {
    await sequelize.sync({ alter: true });
    await seedDatabase();
    console.log('Models synchronized with the database.');
  } catch (err) {
    console.error('Error syncing models with the database:', err);
  }
};

module.exports = {
  connect,
  sync,
  User,
  Product,
  Order,
};
