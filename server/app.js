const express = require("express")
const cors = require('cors')
require('dotenv/config')

const waitListRouter = require('./routes/waitlist')
const getInTouchRouter = require('./routes/get-in-touch')

const PORT = process.env.PORT || 5000

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Route Handlers
app.use(waitListRouter)
app.use(getInTouchRouter)


//Port
app.listen(PORT, () => {
    console.log(`Connected on port: ${PORT}`)
})

module.exports = app;