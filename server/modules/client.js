const mongoose = require('mongoose')
const Client = require('../models/client')



module.exports.GetClient = async (req, res) =>{
    try{
        let client = await Client.findOne({_id :mongoose.Types.ObjectId(req.params.id)})
        res.send(client)
    }
    catch(err){
        res.send(err)
    }
}


module.exports.UpdateDetails = async (req, res)=>{
    try{
        let client = await Client.findOne({_id : mongoose.Types.ObjectId(req.params.id)})
        
        Object.keys(req.body).map((key)=>{
            // console.log(key,req.body[key] , client[key])
            if(req.body[key] && req.body[key] !== client[key]){
                client[key] = req.body[key]
            }
        })
        
        let response = await Client.findOneAndUpdate(
            { _id :mongoose.Types.ObjectId(req.params.id)},
            {
                $set : client
            }
        )
        if(response){
            res.send({msg:"Updated!"})
        }
        else{

            res.send({msg:"Server Error"})
        }
    }
    catch(err){
        res.send(err)
    }
}