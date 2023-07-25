
import prisma from "@/lib/prisma";
require('dotenv').config();


const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.ENDPOINT_SECRET;

export default async function stripeWebhookHandler(req, res) {
  const sig = req.headers['stripe-signature'];
  
  let event;
 
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    if (event.type === 'account.updated') {
        //const paymentIntentSucceeded = event.data.object;
        const accountID = event.data.object.id;
        const isOnboardingComplete = event.data.object.details_submitted;
        await prisma.users.update({
          where: { stripe_id: accountID },
          data: { onboarding_completed: isOnboardingComplete },
        });
        
        // Then define and call a function to handle the event payment_intent.succeeded
  
      // ... handle other event types
    } else if (event.type==='customer.created') {
        console.log('confirmed customer creation');
        console.log(event.data.object);
      } else {
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.send();
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  

};