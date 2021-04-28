const mongoose = require('mongoose')

//create a schema
const subscriberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subscribedToChannel:{
        type: String,
        required: true

    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now

    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)