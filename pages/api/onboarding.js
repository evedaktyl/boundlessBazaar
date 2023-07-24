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

  const { userID, productID, userEmail, userName } = req.body;
    try {
        
        let accountParams = {
          type: 'express',
          capabilities: {
            transfers: {
              requested: true,
            },
          },
          country: undefined,
          email: userEmail || undefined,
          business_type: 'individual',
          business_profile: {
            product_description: 'bb',
          },
        }

        accountParams = Object.assign(accountParams, {
          individual: {
            first_name: userName || undefined,
            last_name:  undefined,
            email: userEmail || undefined
          }
        });
        console.log(accountParams);
      
        const account = await stripe.accounts.create(accountParams);
        const accountID = account.id;
        console.log(accountID);
        console.log(userID);
        await prisma.users.update({
          where: {id: userID},
          data: {
              stripe_id: accountID
          }
        });
      const accountLink = await stripe.accountLinks.create({
        account: accountID,
        refresh_url: 'http://localhost:3001/MarketplacePage',
        return_url: 'http://localhost:3001/MarketplacePage',
        type: 'account_onboarding'
      });
      const accountLinkUrl = accountLink.url;

      //previous return url
      //return_url: `http://localhost:3000/onboarded?accountID=${accountID}`

      res.status(200).json({ link: accountLinkUrl, accountID: accountID });
      // Redirect to Stripe to start the Express onboarding flow
    //res.redirect(accountLink.url);
    
          
    } catch (error) {
        console.error('Error:', error);
        console.log('Failed to create a Stripe account.');
        res.status(500).send('An error occurred');
    }
};