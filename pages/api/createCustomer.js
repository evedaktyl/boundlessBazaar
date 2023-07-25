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

  const { userID, name, username, email } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: email,
            description: name
          });
        console.log('created customer');
        const stripeCustomerId = customer.id;
        
        await prisma.users.update({
              where: {id: userID},
              data: {
                  stripeCustomerId: stripeCustomerId
              }
            });
        console.log('updated stripeCustomerId');

      //previous return url
      //return_url: `http://localhost:3000/onboarded?accountID=${accountID}`

      res.status(200).json({updated:true, stripeCustomerId: stripeCustomerId});
      // Redirect to Stripe to start the Express onboarding flow
    //res.redirect(accountLink.url);
    
          
    } catch (error) {
        console.error('Error:', error);
        console.log('Failed to create a customer.');
        res.status(500).send('An error occurred');
    }
};