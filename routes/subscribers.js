const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Routes:
// Getting all
router.get('/', (req, res)=>{
    res.send('Hello World')

});
// Getting one
router.get('/', (req, res) => {
    res.send(req.params.id)

})
// Updating one
router.patch('/:id',(req,res)=>{

})
// Deleting one
router.delete('/:id', (req,res)=>{

})

module.exports = router