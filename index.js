const express = require('express')
const app = express()
require('dotenv').config({ path: './config/.env' })
require('./config/mongo')
const authRoute = require('./routes/auth')
const commentRoute = require('./routes/comment')
const privateRoute = require('./routes/private')

app.use(express.json())

app.use('/users', authRoute)
app.use('/comments', commentRoute)
app.use('/privates', privateRoute)

app.listen(3000, () => console.log('Server started: 3000 []'))
