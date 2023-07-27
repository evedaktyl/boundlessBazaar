import prisma from "@/lib/prisma";

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
        console.log(buyer_customer_id);
        const traveler = await prisma.users.findFirst({
            where: {id: travelerid},
        });

        const traveler_stripe_id = traveler.stripe_id;
        const traveler_stripe_customer_id = traveler.stripeCustomerId;
        console.log(price);
        console.log(traveler_stripe_id);
        console.log(traveler_stripe_customer_id);

        const centPrice = price * 100;
        const stringPrice = centPrice.toString();
        const paymentMethods = await stripe.paymentMethods.create({
            type: 'card',
            card: {token: "tok_visa"}
          });

        console.log(paymentMethods);
        // const latest_pm = paymentMethods.data[0].id;
          // console.log(latest_pm);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: centPrice,
            currency: 'sgd',
            payment_method: 'pm_card_visa',
            description: productTitle,
            statement_descriptor: 'boundless bazaar',
            // The destination parameter directs the transfer of funds from platform to pilot
            customer: buyer_customer_id,
            automatic_payment_methods: {enabled: true},
            confirm: true,
            return_url: 'http://localhost:3001/profile'
            // transfer_data: {
            //   // Send the amount for the pilot after collecting a 20% platform fee:
            //   // the `amountForPilot` method simply computes `ride.amount * 0.8`
            //   amount: centPrice,
            //   // The destination of this Payment Intent is the pilot's Stripe account
              // destination: traveler_stripe_id,
            // },
        });

        console.log(paymentIntent);

        console.log('GAP')

        const charge = await stripe.charges.create({
          amount: centPrice,
          currency: 'sgd',
          description: productTitle,
          transfer_group: paymentIntent.id,
          source: 'tok_visa',
        });

        console.log(charge);


        // const transfer = await stripe.transfers.create({
        //   amount: centPrice,
        //   currency: 'sgd',
        //   destination: traveler_stripe_id,
        //   transfer_group: paymentIntent.id,
        //   description: productTitle
        // });

        // console.log(transfer);


        // const paymentIntentId = paymentIntent.id;
        // await prisma.products.update({
        //   where: {id: productID},
        //   data: {
        //       paymentIntent_id: paymentIntentId
        //   }
        // });

        console.log('updated payment intent id');


      
        // Accounts created in any other country use the more limited recipients service agreement (with a simpler
    // onboarding flow): the platform creates the charge and then separately transfers the funds to the recipient.
    // const charge = await stripe.charges.create({
    //   source: 'tok_visa',
    //   amount: centPrice,
    //   currency: 'sgd',
    //   description: productTitle,
    //   // statement_descriptor: config.appName,
    //   // The transfer_group parameter must be a unique id for the ride; it must also match between the charge and transfer
    // });
    // console.log(charge);

    // const transfer = await stripe.transfers.create({
    //   amount: centPrice,
    //   currency: 'sgd',
    //   destination: traveler_stripe_id,
    // })

    // console.log(transfer);

      //previous return url
      //return_url: `http://localhost:3000/onboarded?accountID=${accountID}`

      res.status(200).json({transferred:true, client_secret: paymentIntent.client_secret,
                            stripeKey: stripeSecretKey, paymentIntentID: paymentIntent.id,
                          travellerStripeID: traveler_stripe_id});
      // Redirect to Stripe to start the Express onboarding flow
    //res.redirect(accountLink.url);
    
          
    } catch (error) {
        console.error('Error:', error);
        console.log('Failed to create a customer.');
        res.status(500).send('An error occurred');
    }
};