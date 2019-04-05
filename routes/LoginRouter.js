const express = require('express')
const LoginRouter = express.Router()
const Person = require('../models/Person.model')
const bcrypt = require('bcrypt')

LoginRouter.route('/').get(function (req, res) {
  res.render('login', {
    error: 'ถูก'
  })
})

LoginRouter.route('/').post((req, res) => {
  if (req.body.email && req.body.pass) {
    Person.findOne({
      username: req.body.email
    }, (_err, person) => {
      console.log(person.password);
      bcrypt.compare(req.body.pass, person.password, (_err, password) => {
        if (password) {
          res.redirect('/mangeperson')
        }
      })
    })
  }
})

module.exports = LoginRouter
