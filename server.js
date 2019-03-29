const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var keys = require('./config/keys')

mongoose.connect(keys.mongoURI)
mongoose.Promise = global.Promise

const LoginRouter = require('./routes/LoginRouter')
const MangePersonRouter = require('./routes/MangePersonRouter')
const ManageBuildingRouter = require('./routes/MangeBuildingRouter')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/login', LoginRouter)
app.use('/mangeperson', MangePersonRouter)
app.use('/mangebuilding', ManageBuildingRouter)

app.route('/').get(function (req, res) {
  res.redirect('/login')
})

app.listen(port, function () {
  console.log('เริ่มการทำงาน', port)
})
