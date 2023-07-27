import { NextApiRequest, NextApiResponse} from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { productOffer, travellerStripeID, paymentIntentID, productTitle } = req.body;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripe = require('stripe')(stripeSecretKey);

    try {
        console.log(productOffer)
        console.log(travellerStripeID)
        console.log(paymentIntentID)
        console.log(productTitle)

        const transfer = await stripe.transfers.create({
            amount: productOffer * 100,
            currency: 'sgd',
            destination: travellerStripeID,
            transfer_group: paymentIntentID,
            description: productTitle
          });
        
        console.log(transfer);

        res.status(200).json(transfer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
