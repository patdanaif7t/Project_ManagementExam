const express = require('express')
const LoginRouter = express.Router()
const Person = require('../models/Person.model')

LoginRouter.route('/').get(function (req, res) {
  res.render('login')
})

LoginRouter.route('/').post((req, res) => {
  console.log(req.body.email)
  console.log(req.body.pass)
  if (req.body.email && req.body.pass) {
    Person.findOne({ username: req.body.email }).then(person => {
      if (person.password === req.body.pass) {
        res.redirect('/mangeperson')
      } else {
        res.redirect('/login')
      }
    }).catch(_err => {
      res.redirect('/login')
    })
  }
})

module.exports = LoginRouter
