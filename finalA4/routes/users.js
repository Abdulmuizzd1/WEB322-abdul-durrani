const express = require('express')
const userRoutes = express.Router()
const {template, userDetails} = require('./htmlUtils')


const users = require('../data/fakeUsers.json')

userRoutes.get('/', (req,res)=>{
    const userList = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td><a href="/users/${user.id}">${user.firstName} ${user.lastName}</a></td>
        </tr>
    `)

    const table = `
        <table class="user-table">
        <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        </tr>
        </thead>
        <tbody>
        ${userList.slice(0, 25).join('')}
        </tbody>
        </table>
    `
    res.send(template('Users', table))
})

userRoutes.get('/:id', (req, res) => 
    res.send(template('Details', userDetails(UsersService.findById(req.params.id))))
)

module.exports = userRoutes
