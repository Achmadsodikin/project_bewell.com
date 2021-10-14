const express= require('express')
const { cartController } = require('../controllers')
const route = express.Router()



route.get('/getCart/:id', cartController.getCart)
route.delete('/deleteCart/:id', cartController.deleteCart)
route.patch('/updateQty/:id',cartController.updateQty)



module.exports = route