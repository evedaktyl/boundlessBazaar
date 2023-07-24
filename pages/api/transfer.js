import prisma from "@/lib/prisma";
require('dotenv').config();


// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);


export default async function handler(req, res) {

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.status(200).end();
    return;
  }

  const { buyer_userID, buyer_name, buyer_customer_id, price, productTitle, productID } = req.body;

    try {
    
        console.log(productID);
        const product = await prisma.products.findFirst({
              where: {id: productID},
            });

        const travelerid = product.traveller_id;
        console.log(travelerid);
        const traveler = await prisma.users.findFirst({
            where: {id: travelerid},
        });

        const traveler_stripe_id = traveler.stripe_id;
        console.log(price);
        const stringPrice = price.toString();
        const intPrice = parseInt(stringPrice);
        const paymentMethods = await stripe.paymentMethods.list({
            customer: buyer_customer_id,
            type: 'card',
          });
        //console.log(paymentMethods);
        //const latest_pm = paymentMethods.data[0].id;
          //console.log(latest_pm);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: +price,
            currency: 'sgd',
            payment_method_types: ['card'],
            description: productTitle,
            statement_descriptor: 'boundless bazaar',
            // The destination parameter directs the transfer of funds from platform to pilot
            customer: buyer_customer_id,
            //automatic_payment_methods: {enabled: true},
            confirm: true,
            transfer_data: {
              // Send the amount for the pilot after collecting a 20% platform fee:
              // the `amountForPilot` method simply computes `ride.amount * 0.8`
              amount: +price,
              // The destination of this Payment Intent is the pilot's Stripe account
              destination: traveler_stripe_id,
            },
          });

          const paymentIntentId = paymentIntent.id;
          await prisma.products.update({
            where: {id: productID},
            data: {
                paymentIntent_id: paymentIntentId
            }
          });

          console.log('updated payment intent id');
        

      //previous return url
      //return_url: `http://localhost:3000/onboarded?accountID=${accountID}`

      res.status(200).json({transferred:true});
      // Redirect to Stripe to start the Express onboarding flow
    //res.redirect(accountLink.url);
    
          
    } catch (error) {
        console.error('Error:', error);
        console.log('Failed to create a customer.');
        res.status(500).send('An error occurred');
    }
};