const express = require('express')
const MangeRoomRouter = express.Router()
const Room = require('../models/Room.modal')

MangeRoomRouter.route('/').get(function (req, res) {
  Room.find(function (err, rooms) {
    if (err) {
      console.log(err)
    } else {
      //   res.send(rooms)
      res.render('ManageRoom', {
        rooms: rooms
      })
    }
  })
})

// Create Room
MangeRoomRouter.post('/create', (req, res, next) => {
  console.log(req.body)
  var doc = new Room(req.body)
  doc.save((err, data) => {
    if (err) {
      console.log('ไม่สำเร็จ')
      return res.send(err.message)
    } else {
      console.log('สำเร็จ')
      res.status(200).json({
        success: true
      })
    }
    // res.redirect('/mangeroom')
  })
})

// DELETE Room
MangeRoomRouter.get('/delete/:_id', (req, res, next) => {
  Room.findByIdAndRemove(req.params._id,
    (err, rooms) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.redirect('/mangeroom')
      // res.status(200).send({ success: { message: 'ลบห้องสำเร็จ' } })
    })
})

// UPDATE Building
MangeRoomRouter.post('/update', (req, res, next) => {
  Room.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    res.redirect('/mangeroom')
  })
})

module.exports = MangeRoomRouter
