const express = require('express');
const nodemailer = require('nodemailer')
require('dotenv/config')

const getInTouchRouter = express.Router();

//Getting messages
getInTouchRouter.get('/api/get-in-touch', (req, res) => {
    res.sendFile(__dirname, + '/client/get-in-touch.html')
})

//sending message
getInTouchRouter.post('/api/get-in-touch', (req, res) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    
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
            from: email + " " + phone,
            to: "paulorife@gmail.com",
            subject: 'Message from:' + firstname + " " + lastname ,
            text: message,
            
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
} )

module.exports = getInTouchRouter;

