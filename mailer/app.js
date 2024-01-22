const express = require("express")
const nodemailer = require("nodemailer")
require("dotenv/config")

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json());

app.get("/send", (req, res) => {
    res.sendFile(__dirname, + '/client/get-in-touch.html')
})

app.post("/send", (req, res) => {
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
        from: req.body.email,
        to: "paulorife@gmail.com",
        subject: `Message from ${req.body.firstname}`,
        text: req.body.message
       
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