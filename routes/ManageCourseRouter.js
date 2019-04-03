const express = require('express')
const ManageCourseRouter = express.Router()
const Subject = require('../models/Subject.model')
const Course = require('../models/Course.model')

ManageCourseRouter.route('/').post((req, res) => {
  Subject.findOne({ subjectId: req.body.subjectId }, (err, Subject) => {
    if (!err) {
      Course.find({ 'subject.subjectId': req.body.subjectId }, (err, courses) => {
        if (err) {
          console.log(err)
        } else {
          res.render('ManageCourse', {
            courses: courses,
            subject: Subject
          })
        }
      })
    }
  })
})

// Create Course
ManageCourseRouter.post('/create', (req, res, next) => {
  var course = new Course(req.body)
  course.save((err, data) => {
    if (err) {
      console.log('ไม่สำเร็จ')
      return res.send(err.message)
    } else {
<<<<<<< HEAD
      console.log('สำเร็จ')
      res.status(200).json({
        success: true
=======
      // res.send(courses)
      res.render('ManageCourse', {
        courses: courses
>>>>>>> fb884460fa70ced9415bad494059f856d5197b74
      })
    }
    // res.redirect('/mangeroom')
  })
})

// DELETE Room
ManageCourseRouter.delete('/delete/:_id', (req, res, next) => {
  Course.findByIdAndRemove(req.params._id,
    (err, rooms) => {
      if (err) {
        return res.status(500).send(err.message)
      }
      res.status(200).json({ success: true })
      // res.redirect('/managesubject')
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

module.exports = ManageCourseRouter
