const express = require("express")
const nodemailer = require("nodemailer")
const cors = require('cors')
require("dotenv/config")

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors())
app.use(express.json());

app.get("/contact-form", (req, res) => {
    res.sendFile(__dirname, + '/client/get-in-touch.html')
})

app.post("/contact-form", (req, res) => {
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
})


app.listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`)
})