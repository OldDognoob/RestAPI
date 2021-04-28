require('dotenv').config()
//create a variable and call it express, this will pull the express library
const express = require('express')
// create an app variable that will run express to configure our server
const app = express()
// create mongoose to set up our library
const mongoose = require('mongoose')

// connect our database with mongoose, so we are going to put our string here 
// which they connect with our database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//lets create our middleware
app.use(express.json())

//setting up our routes
const subscribersRouter = require('/routes/subscribers')
app.use('/subscribers', subscribersRouter)


app.listen(3000, () => console.log('Server Started'))