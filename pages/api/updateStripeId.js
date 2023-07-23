import { NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const {userID, stripeID} = req.body;
  
    try {
      
      console.log('updating user stripe id...');
        // update stripe id
        await prisma.users.update({
            where: {id: userID},
            data: {
                stripe_id: stripeID,
            }
        });

    
    return res.status(201).json({ message: 'updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}