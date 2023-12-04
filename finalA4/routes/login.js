const express = require('express')
const loginRoutes = express.Router()
const {template, htmlContent} = require('./htmlUtils')

const users = require('../data/fakeUsers.json')

loginRoutes.get('/', (req, res)=>
    res.send(template('Login', htmlContent()))
)

loginRoutes.post('/', (req, res)=>{
    let { username, password } = req.body

 
    const Prod = "Products"
    const validPassword = "a";

    let user = users.find((user) => 
        `${user.firstName} ${user.lastName}` == username
    )

    if (username === 'admin' && password === validPassword || ( user && user.password == password)){
        res.redirect('/users')
     } else if(username === 'Prod' && password ===validPassword){res.redirect(`/products`);}
     else
        res.send(template('Login', htmlContent('Invalid credentials. Please try again')))
})


















module.exports = loginRoutes