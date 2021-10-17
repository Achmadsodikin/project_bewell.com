const express= require('express')
const { transactionController } = require('../controllers')
const route = express.Router()


route.get('/getTransaction/:id', transactionController.getTransaction)
route.get('/getTransactionFilter/:id/:status', transactionController.getTransactionFilter)




module.exports = route