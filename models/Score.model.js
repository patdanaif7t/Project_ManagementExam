// Course.model.js
const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
  studentId: String,
  examinationId: String,
  score: Number

}, {
  collection: 'score'
})

var Score = mongoose.model('Score', scoreSchema)
module.exports = Score
