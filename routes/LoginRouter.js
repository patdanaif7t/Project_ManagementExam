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
  console.log(req.body.email)
  console.log(req.body.pass)

  if (req.body.email && req.body.pass) {
    Person.findOne({
      username: req.body.email
    }).then(person => {
      bcrypt.compare(req.body.pass, person.password, function (_err, res) {
        console.log("ผ่าน");
        
        // res.redirect('/mangeperson')
      }).catch(_err => {
        res.render('login', {
          error: 'ไม่ถูก'
        })
      })
    })
  }
})

module.exports = LoginRouter