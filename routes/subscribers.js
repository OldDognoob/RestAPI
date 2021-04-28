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
})
// Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
  })
// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
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
router.patch('/:id', getSubscriber, async (req, res) => {
    // we check the request
    // if the request.body,name is not equal with null
    // the user actual past a name to us
    if (req.body.name != null) {
      res.subscriber.name = req.body.name
    }
    // we do the same thing with the subscribedToChannel passed in
    if (req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
      const updatedSubscriber = await res.subscriber.save()
      res.json(updatedSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
      await res.subscriber.remove()
      res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

//creating a middleware
async function getSubscriber(req,res,next){
  try{
      // if there is no subscriber we need immediately leave this function
      // and not move any further
  subscriber = await Subscriber.findById(req.params.id)
  if (subscriber == null){
      return res.status(404).json({message: 'Cannot find subscriber'})
  }
  }catch (err){
      // 500, means this is our fault
   return res.status(500).json({message: err.message})
  }
  res.subscriber = subscriber
  next()
}

module.exports = router