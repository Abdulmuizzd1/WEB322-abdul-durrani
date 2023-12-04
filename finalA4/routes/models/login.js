const express = require('express')
const apiLogin = express.Router()

const AuthenticationService = require('../../services/authentication.service')

apiLogin.post('/', (req, res) => {
    let {username, password} = req.body
    let result = AuthenticationService.authenticate(username, password)
    res.status((result) ? 200 : 401).send(result)
})

module.exports = apiLogin