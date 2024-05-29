const paypal = require('paypal-rest-sdk')
const Razorpay = require('razorpay')

const {SECRATE_CODE, CLIENT_ID, ACCOUNT, PAYPALMODE, REZORPAY_KEY, REZORPAY_SECRATE} =  process.env

const razorPayInstance = new Razorpay({
    key_id:REZORPAY_KEY,
    key_secret:REZORPAY_SECRATE
})


paypal.configure({
    mode:PAYPALMODE,
    client_id:CLIENT_ID,
    client_secret:SECRATE_CODE
})


exports.renderBuyPage = async(req,res) => {
    return res.render('index')
    
}
exports.payProduct = async(req,res) => {
const create_payment_json = {
    intent :'sale',
    payer:{
        payment_method : "paypal"
    },
    redirect_urls :{
        return_url :'http://localhost:3000/success',
        cancel_url :'http://localhost:3000/cancel', 
    },
    transactions :[{
        item_list :{
            items:[{
            name : "Book",
            sku:'001',
            price:"1.00",
            currency:'USD',
            quantity:1
       }],
     },
     amount:{
        currency : "USD",
        total:'1.00'
     },
     description:'Hat for the best tem ever'
    }],
}

paypal.payment.create(create_payment_json, function(err, payment){
    if(err) return console.log(err);
    else {
        console.log(payment);
        for(let i=0; i<payment.links.length; i++){
            if(payment.links[i].rel == "approval_url") res.redirect(payment.links[i].href)
        }
    }
})

}
exports.successPage = async(req,res) => {
const {payerId, paymentId} = req.query 
const excute_payment_json = {
    payer_id :payerId,
    transactions : [{
        amount : {
            currency : 'USD',
            total : '25.00'
        }
    }]
}
paypal.payment.execute(payerId, excute_payment_json, function(err, payment){
    if(err) return console.log(err);
    else {
        const result =  JSON.stringify(payment)
        console.log(result);
        return res.send('Success')
    }
})
}
exports.cnacelPage = async(req,res) => {
    return res.render('cancel')

}
exports.creaeOrder = async(req,res) => {
    try {
      
        const amount = 100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'rickygathwal@gmail.com'
        }
     

        razorPayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:REZORPAY_KEY,
                        product_name:"Ricky Gathwal",
                        description:"Description",
                        contact:"8567345632",
                        name: "Sandeep Sharma",
                        email: "sandeep@gmail.com"
                    });
                }
                else{
                  return console.log(err);  
                 }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}