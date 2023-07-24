import { NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
require('dotenv').config();

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

export default async function handler(req, res) {

    const {accountID, userID } = req.body;
    
    try {
        const account = await stripe.account.retrieve(accountID);
        if (account.details_submitted) {
            console.log('account successfully created');
            await prisma.users.update({
                where: {id: userID},
                data: {
                    onboarding_completed: true
                }
              });
            
            res.status(200).json({ success: true });
        //res.redirect('/pilots/dashboard');
        } else {
            console.log('The onboarding process was not completed.');
            res.status(200).json({ success: false });
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('Failed to check account creation.');
        res.status(500).send('An error occurred');
    }
};