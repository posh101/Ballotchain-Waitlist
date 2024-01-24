const express = require("express")
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv/config')

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(express.json());

//Get in touch route

//getting message
app.get('/api/get-in-touch', (req, res) => {
    res.sendFile(__dirname, + '/client/get-in-touch.html')
})

//sending message
app.post('/api/get-in-touch', (req, res) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    if(firstname === "" || lastname === "" || email === "" || phone === "" || message === "") {
        res.send({error: "All field is required"})
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
                res.send("success")
            }
        }) 
} )


// Join the Waitlist route

 //Geting waitlist
app.get('/api/waitList', (req, res) => {
    res.sendFile(__dirname, + '/client/index.html')
})

//sending waitlist
app.post('/api/waitList', (req, res) => {
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

//Port
app.listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`)
})

module.exports = app;