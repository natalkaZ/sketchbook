const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const passport = require('passport')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const profileRoutes = require('./routes/profile')
const notesRoutes = require('./routes/notes')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongDB connected!!!'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads/', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/notes', notesRoutes)

module.exports = app