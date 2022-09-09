const express = require('express')
const route = express.Router()
const fromModule = require('../modules/client')


route.get('/:id',fromModule.GetClient)
route.patch ('/update/:id',fromModule.UpdateDetails)

module.exports = route