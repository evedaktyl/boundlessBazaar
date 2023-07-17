import { NextApiRequest, NextApiResponse} from "next";

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51M9tQUIhG09DVV9LGzz2Hc92SoGYKFAfNfTMts2Zq8GqRA7oDdpBAgjHvn11lAwKOtQzk5yDFCw0BhBMTyxIH3E4000wkdAhoD');



export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const account = await stripe.accounts.create({
            type: 'express',
            capabilities: {
              transfers: {
                requested: true,
              },
            },
            business_type: 'individual',
            business_profile: {
              product_description: 'bb',
            },
          });
          
          const accountLink = await stripe.accountLinks.create({
              account: '{{CONNECTED_ACCOUNT_ID}}',
              refresh_url: 'https://example.com/reauth',
              return_url: 'https://example.com/return',
              type: 'account_onboarding',
            });

            res.redirect(302, accountLink.url);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
};