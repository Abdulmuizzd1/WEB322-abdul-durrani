const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const apiRoutes = require('./routes/api.routes')
const { connect, sync } = require("./db");
const app = express()
const PORT = 3002



async function init() {
    await connect()
    await sync()
}

//Connectoin to database
init()


//JSON middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })) 


//route handling
app.use(routes)
app.use('/api', apiRoutes)


app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))
