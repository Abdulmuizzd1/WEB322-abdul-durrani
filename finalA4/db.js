const Sequelize = require('sequelize')
//const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = require('./neontech.credentials')

const PGHOST = 'ep-blue-tooth-18013876-pooler.us-east-2.aws.neon.tech';
const PGDATABASE = 'SenecaDB';
const PGUSER = 'Abdulmuizzd1';
const PGPASSWORD = 'gvcDCwb2nr8h';

// set up sequelize to point to postgres database
let sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false },
    },
    query: {raw: true}
})


//Tables
const users = sequelize.define('users', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    dob: Sequelize.DATE,
    company: Sequelize.STRING,
    phone: Sequelize.STRING,
})

const products = sequelize.define('products', {
    name: Sequelize.STRING,
    isbn: Sequelize.STRING,
    price: Sequelize.DECIMAL,
    description: Sequelize.STRING,
})

const orders = sequelize.define('orders', {
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    description: {
        type: Sequelize.STRING,
    },
})


// Table assosiations
users.hasMany(orders)
orders.belongsTo(users)

products.hasMany(orders)
orders.belongsTo(products)


// Table population 
const seedDatabase = async () => {
    // Populate only if table is empty
    try {
        // Populate the Users table

        if (await users.count() < 1) 
            await users.bulkCreate([
                {
                    firstName: "Mossie",
                    lastName: "Mosciski",
                    email: "Nyah_OHara-Johns@gmail.com",
                    password: "upMyHwDHwjHJdIE",
                    dob: "2023-07-09T01:15:17.101Z",
                    company: "Murphy Inc",
                    phone: "967-963-0570 x9136",
                },
                {
                    firstName: "Karen",
                    lastName: "Yundt",
                    email: "Kristina68@hotmail.com",
                    password: "0p91XkC2iIy44CF",
                    dob: "2022-10-20T11:12:02.084Z",
                    company: "Kuhic Inc",
                    phone: "(796) 606-8670 x2136",
                },
                {
                    firstName: "Malachi",
                    lastName: "Dibbert",
                    email: "Brendon_Hahn72@yahoo.com",
                    password: "dvkXiXKZVbsJCtB",
                    dob: "2023-04-25T17:57:53.896Z",
                    company: "Sawayn - Johnston",
                    phone: "874-405-2158 x751",
                },
                {
                    firstName: "Elroy",
                    lastName: "Hansen",
                    email: "Kelsie.Beier@gmail.com",
                    password: "5Gn84pqXRYBFJo8",
                    dob: "2023-07-14T06:28:32.471Z",
                    company: "Bartell, Frami and Hand",
                    phone: "1-516-257-8571 x847",
                },
                {
                    firstName: "Lucious",
                    lastName: "Casper",
                    email: "Consuelo75@hotmail.com",
                    password: "A0_VSXKl1BFre2v",
                    dob: "2022-12-13T07:04:39.469Z",
                    company: "Lang - Kessler",
                    phone: "800-824-8685 x0095",
                },
                ])

        // Populate the Products table
        if (await products.count() < 1)
            await products.bulkCreate([
                {
                    name: "Refined Rubber Pizza",
                    isbn: "978-0-653-89492-8",
                    price: "355.00",
                    description: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
                },
                {
                    name: "Rustic Metal Mouse",
                    isbn: "978-1-302-07378-7",
                    price: "410.00",
                    description: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
                },
                {
                    name: "Rustic Fresh Sausages",
                    isbn: "978-0-253-09153-6",
                    price: "601.00",
                    description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four-wheel drive",
                },
                {
                    name: "Handcrafted Steel Shirt",
                    isbn: "978-0-949478-82-5",
                    price: "757.00",
                    description: "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7-Color RGB LED Back-lighting for smart functionality",
                },
                {
                    name: "Ergonomic Frozen Cheese",
                    isbn: "978-1-61775-249-0",
                    price: "742.00",
                    description: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
                },
                ])
      
        // Populate the Orders table
        const orderData = [
            // Associating userId 1 to 3 products
            { 
                userId: 1,
                productId: 1,
                description: 'Ordered productId 1'
            },
            {
                userId: 1,
                productId: 3,
                description: 'Ordered productId 3'
            },
            { 
                userId: 1,
                productId: 4,
                description: 'Ordered productId 4'
            },

            // Associating userId 2 to 2 products
            { 
                userId: 2,
                productId: 0,
                description: 'Ordered productId 0'
            },
            { 
                userId: 2,
                productId: 4,
                description: 'Ordered productId 4'
            },

            // Associating userId 3 to 1 products
            { 
                userId: 3,
                productId: 2,
                description: 'Ordered productId 2'
            },
        ]
  
        // Populate the Orders table
        try {
            // appearent bug here:
            // orders is not populated
            if (await orders.count() < 1) {
                await orders.bulkCreate(orderData);
                console.log('Orders table populated successfully');
            } else {
                console.log('Orders table already has data. Skipping population.');
            }

            console.log('Database seeded successfully');
        } catch (error) {
          console.error('Error seeding Orders table:', error);
        }
      } catch (error) {
        console.error('Error seeding database:', error);
      }
    };

const connect = async () => {
    try{
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    }
    catch(err){
        console.log('Unable to connect to the database:', err)
    }
}

const sync = async () => {
    try {
        await seedDatabase()
        await sequelize.sync({alter: true})
        console.log('Models synchronized with the db.')
    } catch (err) {
        console.error('Error syncing models with the database:', err)
    }
}


module.exports = {
    connect,
    sync,
    users,
    products,
    orders
}