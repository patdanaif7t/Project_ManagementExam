const express = require('express')
const MangePersonRouter = express.Router()
const Person = require('../models/Person.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
MangePersonRouter.route('/').get(function (req, res) {
  Person.find(function (err, persons) {
    if (err) {
      console.log(err)
    } else {
      // res.send(persons)
      res.render('ManagePerson', {
        persons: persons
      })
    }
  })
})

MangePersonRouter.route('/').delete((req, res) => {
  Person.deleteOne({
    id: req.body.id
  }, () => {
    res.json({
      success: true
    })
  })
})

MangePersonRouter.route('/').put((req, res) => {
  var personNew = {}
  if (req.body.id) personNew.password = req.body.id
  if (req.body.username) personNew.username = req.body.username
  if (req.body.password) personNew.password = req.body.password
  if (req.body.firstname) personNew.firstname = req.body.firstname
  if (req.body.lastname) personNew.lastname = req.body.lastname
  if (req.body.email) personNew.email = req.body.email
  if (req.body.faculty) personNew.faculty = req.body.faculty
  if (req.body.status) personNew.faculty = req.body.status
  if (req.body.major) personNew.major = req.body.major
  if (req.body.position) personNew.position = req.body.position
  Person.findOneAndUpdate({
    id: req.body.id
  }, personNew, (result) => {
    console.log(result)

    res.status(200).json({
      success: true
    })
  })
})

MangePersonRouter.route('/').post((req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (_err, hash) {
    var personNew = new Person()
    if (req.body.id) personNew.id = req.body.id
    if (req.body.username) personNew.username = req.body.username
    if (req.body.password) personNew.password = hash
    if (req.body.firstname) personNew.firstname = req.body.firstname
    if (req.body.lastname) personNew.lastname = req.body.lastname
    if (req.body.email) personNew.email = req.body.email
    if (req.body.status) personNew.faculty = req.body.status
    if (req.body.faculty) personNew.faculty = req.body.faculty
    if (req.body.major) personNew.major = req.body.major
    if (req.body.position) personNew.position = req.body.position
    personNew.save().then(result => {
      console.log(result)
      res.status(201).json({
        data: personNew,
        success: true
      })
    }).catch(_err => {
      console.log(_err)
      res.status(500).json(_err)
    })
  })
})

MangePersonRouter.post('/update', (req, res, next) => {
  console.log('update')
  console.log(req.body.id)
  console.log(req.body)
  Person.findByIdAndUpdate(req.body.id, req.body, (err, persons) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    res.json({
      success: true
    })
    // res.status(200).send({success : {message : "Update Repair succesfully."}})
  })
})

module.exports = MangePersonRouter