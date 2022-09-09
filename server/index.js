const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connection = require('./shared/connect')
const app = express()
app.use(express.json())
dotenv.config()
connection.Connect()
app.use(cors())


const auth = require('./routes/auth')
const client = require('./routes/client')

app.use('/',auth)
app.use('/client',client)




app.listen(process.env.PORT || 5000)