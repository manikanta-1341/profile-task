const mongoose = require('mongoose')
const schema = mongoose.Schema

const ClientSchema = new schema({
    firstname:{ 
        type:String,
        required:true
    },
    lastname:{ 
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true
    },
    password:{ 
        type:String,
        required:true
    },
    age:{
        type:Number,
        default:null
    },
    dob:{
        type:String,
        default:""
    },
    mobile:{
        type:Number,
        default:null
    },
    country:{
        type:String,
        default:""
    },
    verification:{
        type:String,
        default:'no'
    },
    randomString:{
        type:String,
        default:""
    },
})

const Client = new mongoose.model('client',ClientSchema,'client')

module.exports = Client