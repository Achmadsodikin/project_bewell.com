const express= require('express')
const { uploadController } = require('../controllers')
const route = express.Router()

route.patch('/uploadimg/:id', uploadController.uploadImg)
route.get('/uploadPrescription/:id', uploadController.uploadPrescription)
route.get('/get', uploadController.getProfileImage)


module.exports = route