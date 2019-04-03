const express = require('express')
const LoginRouter = express.Router()
const Person = require('../models/Person.model')

LoginRouter.route('/').get(function (req, res) {
  res.render('login', { error: 'ถูก' })
})

LoginRouter.route('/').post((req, res) => {
  console.log(req.body.email)
  console.log(req.body.pass)
  if (req.body.email && req.body.pass) {
    Person.findOne({ username: req.body.email }).then(person => {
      if (person.password === req.body.pass) {
        res.redirect('/mangeperson')
      } else {
        res.render('login', { error: 'ไม่ถูก' })
      }
    }).catch(_err => {
      res.render('login', { error: 'ไม่ถูก' })
    })
  }
})

module.exports = LoginRouter
