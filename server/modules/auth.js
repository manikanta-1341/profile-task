const mongoose = require('mongoose')
const Client = require('../models/client')
const bcrypt = require('bcrypt')
const mailer = require('nodemailer')
const jwt = require("jsonwebtoken");


module.exports.Started = (req, res) => {
    res.send({ msg: "Started..." })
}


module.exports.clientLogin = async (req, res) => {
    try {
        const clientname = req.body.email
        const password = req.body.password
        let existclient = await Client.findOne({ email: clientname })
        if (!existclient) {
            return res.send({ msg: "invalid Email" })
        }
        let isvalid = await bcrypt.compare(password, existclient.password)
        if (!isvalid) {
            return res.send({ msg: "invalid Password" })
        }
        if (existclient.verification === "yes") {
            const token = jwt.sign({ client: existclient }, process.env.SECRET_KEY, { expiresIn: '1hr' })
            res.send(token)
        }
        else {
            
            res.send({msg:"verification not done"})
        }
    }
    catch (e) {
        res.send(e)
    }

}


module.exports.CreateClient = async (req, res) => {
    try {
        let new_client = new Client(req.body.client)
        let client_exist = await Client.findOne({ email: new_client.email })
        if (!client_exist) {
            let str = await bcrypt.genSalt(10)
            new_client.password = await bcrypt.hash(new_client.password, str)
            await new_client.save()
            res.send({ msg: "created successfully" })
        }
        else {
            res.send({ msg: 'Email Already Exist' })
        }
    } catch (e) {
        res.send(e)
    }
}



module.exports.ForgetPassword = async (req, res, next) => {
    try {

        const email = req.body.email
        const client = await Client.findOne({ email: email })
        // console.log(client)
        if (client) {
            const randomString = await bcrypt.genSalt(10)
            // console.log(randomString)
            const token = jwt.sign({ randomString: randomString }, process.env.SECRET_KEY, { expiresIn: "10m" })

            await Client.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(client._id) },
                {
                    $set: { randomString: token }
                }
            )
            // console.log(response)
            var transporter = mailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.mail_id,
                    pass: process.env.password
                }
            });

            await transporter.sendMail({
                from: process.env.mail_id,
                to: client.email,
                subject: "Password Reset",
                text: `
                Follow this link to reset your account password 
                If you didn't request a new password, you can safely delete this email.

                ${process.env.backend_url}/verify/${client._id}/?s=${token}`,
            })
            res.send({ msg: "Reset link has been Sent" })
        }
        else {
            res.send({msg:"Email not Registered"})
        }
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

}


module.exports.ForgetPasswordVerify = async (req, res, next) => {
    try {
        const tokenFromClient = req.query.s
        const client = await Client.findById({ _id: mongoose.Types.ObjectId(req.params.id) })
        if (tokenFromClient === client.randomString) {
            res.redirect(`${process.env.frontend_url}/resetpassword/${req.params.id}/?s=${req.query.s}`)
        }
        else {
            res.send({ msg: "Token Not Matched / Token Expired" })
        }

    }
    catch (err) {
        res.send(err)
    }
}


module.exports.savePassword = async (req, res, next) => {

    try {
        const string = await bcrypt.genSalt(6)
        const hashPassword = await bcrypt.hash(req.body.password, string)

        await Client.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { password: hashPassword }, $set: { randomString: '' } })
        res.send({ msg: "saved successfully" })
    }
    catch (err) {
        res.send(err)
    }
}


module.exports.EmailVerificationSent = async (req, res) => {
    try {
        
        let client = await Client.findOne({ email : req.body.email }) 
        var transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.mail_id,
                pass: process.env.password
            }
        });
        await transporter.sendMail({
            from: process.env.mail_id,
            to: client.email,
            subject: "Account Verification",
            text: `
                Dear User to verify your account. please refer to the below link.

                ${process.env.backend_url}/account/verify/${client._id}`,
        }, function (error, info) {
            if (error) {
                
            }
        });
        res.send({ msg: "Verification Mail has sent,Please Verify account to proceed with login" })
    } catch (error) {
        res.send(error)
    }
}

module.exports.EmailVerify = async (req, res) => {
    try {
        await Client.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { verification: "yes" } })
        res.redirect(`${process.env.frontend_url}/activated`)
    }
    catch (err) {
        res.send(err)
    }
}

