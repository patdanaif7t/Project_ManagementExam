const express = require('express')
const ManageSubjectRouter = express.Router()
const Subject = require('../models/Subject.model')
const Course = require('../models/Course.model')

ManageSubjectRouter.route('/').get(function (req, res) {
  Subject.find(function (err, subjects) {
    if (err) {
      console.log(err)
    } else {
      //   res.send(rooms)
      res.render('ManageSubject', {
        subjects: subjects
      })
    }
  })
})

// Create Room
ManageSubjectRouter.post('/create', (req, res, next) => {
  var subject = new Subject(req.body)
  subject.save((err, data) => {
    if (err) {
      console.log('ไม่สำเร็จ')
      return res.send(err.message)
    } else {
      var course = new Course({
        subject: req.body
      })
      course.save(() => {
      })
      console.log('สำเร็จ')
      res.status(200).json({
        success: true
      })
    }
    // res.redirect('/mangeroom')
  })
})

// DELETE Room
ManageSubjectRouter.get('/delete/:_id', (req, res, next) => {
  Subject.findByIdAndRemove(req.params._id,
    (err, rooms) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.redirect('/managesubject')
      // res.status(200).send({ success: { message: 'ลบห้องสำเร็จ' } })
    })
})

// // UPDATE Building
// MangeRoomRouter.post('/update', (req, res, next) => {
//   Room.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
//     if (err) {
//       return res.status(500).send(err.message)
//     }
//     res.redirect('/mangeroom')
//   })
// })

module.exports = ManageSubjectRouter
