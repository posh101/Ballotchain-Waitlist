const express = require('express');
const nodemailer = require('nodemailer')
require('dotenv/config')

const waitListRouter = express.Router();


 //Geting waitlist
 waitListRouter.get('/api/waitList', (req, res) => {
    res.sendFile(__dirname, + '/client/index.html')
})

//sending waitlist
waitListRouter.post('/api/waitList', (req, res) => {
    const email = req.body.email;

    if(email === "") {
        res.send({error: "Please enter an email"})
    }
    
    else {
        res.send({success: "Message Sent Successfully"})
    }
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'gsmtp.gmail.com',
            port: 587,
            secure: true,
            requireTLS: true,
            logger: true,
            auth: {
                user: "paulorife@gmail.com",
                pass: "wdaojrfukgddejpc"
            }
        })
    
        const mailOptions = {
            from: email,
            to: "paulorife@gmail.com",
            subject: 'Message from:' + email ,
            text: email,
            
        }
    
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
            console.log(error)
            res.send(error.message)
            }
            else {
                console.log('Message sent' + info.response)
                res.status(200).json({success: 'success'})
            }
        })
})

module.exports = waitListRouter;