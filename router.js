const paymentRoute = require('express')();

const bodyParser = require('body-parser')
const path = require('path')

paymentRoute.set('view engine', 'ejs')
paymentRoute.set('views', path.join(__dirname, './views'))
const paymentController = require('./controller')

paymentRoute.get('/', paymentController.renderBuyPage)
paymentRoute.post('/createOrder', paymentController.creaeOrder)
paymentRoute.post('/pay', paymentController.payProduct)
paymentRoute.get('/success', paymentController.successPage)
paymentRoute.get('/cancel', paymentController.cnacelPage)

module.exports = paymentRoute