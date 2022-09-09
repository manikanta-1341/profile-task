const express = require('express')
const route = express.Router()
const fromModule = require('../modules/auth')

route.get('/',fromModule.Started)
route.put('/login',fromModule.clientLogin)

route.post('/create',fromModule.CreateClient)

route.patch('/verificationMail',fromModule.EmailVerificationSent)
route.get('/account/verify/:id',fromModule.EmailVerify)

route.patch('/forgetpassword',fromModule.ForgetPassword)
route.get('/verify/:id',fromModule.ForgetPasswordVerify)
route.patch('/savepassword/:id',fromModule.savePassword)


module.exports = route