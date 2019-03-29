const express = require('express')
const MangeBuildingRouter = express.Router()
const Building = require('../models/Building.modal')

MangeBuildingRouter.route('/').get(function (req, res) {
  Building.find(function (err, buildings) {
    if (err) {
      console.log(err)
    } else {
      // res.send(buildings)
      res.render('ManageBuilding', {
        buildings: buildings
      })
    }
  })
})
// Create Building
MangeBuildingRouter.post('/create', (req, res, next) => {
  console.log('cre')
  var doc = new Building(req.body)
  doc.save((err, data) => {
    if (err) {
      return res.send(err.message)
    }
    // res.status(200).send({success : {message : "เพิ่มตึกสำเร็จ"}})
    res.redirect('/mangebuilding')
  })
})

// DELETE Building
MangeBuildingRouter.get('/delete/:_id', (req, res, next) => {
  Building.findByIdAndRemove(req.params._id,
    (err, buildings) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.redirect('/mangebuilding')
      // res.status(200).send({success : {message : "ลบตึกสำเร็จ"}})
    })
})

// UPDATE Building
MangeBuildingRouter.post('/update', (req, res, next) => {
  Building.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    res.redirect('/mangebuilding')
  })
})

module.exports = MangeBuildingRouter
