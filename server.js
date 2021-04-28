//create a variable and call it express, this will pull the express library
const express = require('express')
// create an app variable that will run express to configure our server
const app = express()

app.listen(3000, () => console.log('Server Started'))