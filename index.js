require('dotenv').config()

const express =  require('express')
const app =  express()

const paymentRoute = require('./router')
app.use('/', paymentRoute)

app.listen(3000, () => {
    console.log("Working");
})
