const express = require('express')
const ManageCourseRouter = express.Router()
const Course = require('../models/Course.model')

ManageCourseRouter.route('/').post(function (req, res) {
  Course.find({ 'subject.subjectId': req.body.subjectId }, (err, courses) => {
    if (err) {
      console.log(err)
    } else {
        // res.send(courses)
      res.render('ManageCourse', {
        courses: courses
      })
    }
  })
})

// // Create Room
// ManageCourseRouter.post('/create', (req, res, next) => {
//   var subject = new Subject(req.body)
//   subject.save((err, data) => {
//     if (err) {
//       console.log('ไม่สำเร็จ')
//       return res.send(err.message)
//     } else {
//       console.log('สำเร็จ')
//       res.status(200).json({
//         success: true
//       })
//     }
//     // res.redirect('/mangeroom')
//   })
// })

// // DELETE Room
// ManageCourseRouter.get('/delete/:_id', (req, res, next) => {
//   Subject.findByIdAndRemove(req.params._id,
//     (err, rooms) => {
//       if (err) {
//         return res.status(500).send(err.message)
//       }
//       res.redirect('/managesubject')
//       // res.status(200).send({ success: { message: 'ลบห้องสำเร็จ' } })
//     })
// })

// // UPDATE Building
// MangeRoomRouter.post('/update', (req, res, next) => {
//   Room.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
//     if (err) {
//       return res.status(500).send(err.message)
//     }
//     res.redirect('/mangeroom')
//   })
// })

module.exports = ManageCourseRouter
