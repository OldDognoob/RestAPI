const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Routes:
// Getting all
router.get('/', async (req, res)=>{
    try{
        const subscribers = await Subscriber.find()
        // if we were correct then we needed to send all the subscribers
        res.json(subscribers)
    }catch (err){
        // 500 means there is an error at your server which cause the actual transaction not to work
        // and had nothing to do with the user  or client API
        res.status(500).json({message: err.message})
    }
});
// Getting one
router.get('/', async (req, res) => {
    const subscriber = new Subscriber({
        name:req.body.name,
        subscriberToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        // 201 means succesfully we create an object
        res.status(201).json(newSubscriber)
    }catch(err){
        // you send 400 every time when the client fail because something 
        // is wrong with your user input and not with your server
        // wrap it as an object
        res.status(400).json({message:err.message})
    }

})
// Updating one
router.patch('/:id',(req,res)=>{

})
// Deleting one
router.delete('/:id', (req,res)=>{

})

module.exports = router