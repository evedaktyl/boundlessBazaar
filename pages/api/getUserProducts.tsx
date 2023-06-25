import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let { userID, type } = req.body;

    if (type === 'traveler') {
        const productsListed = await prisma.products.findMany({
            where: {traveller_id: userID},
        });
    
        res.status(200).json(productsListed);    
    } else {
        const productsListed = await prisma.products.findMany({
            where: {buyer_id: userID},
        });
    
        res.status(200).json(productsListed);    
    }

}