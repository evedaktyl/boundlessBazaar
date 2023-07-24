import { NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const {userID, productID, userEmail, userName} = req.body;
  
    try {
      const user = await prisma.users.findFirst({
        where: {id: userID}
      });

      const product:any = await prisma.products.findFirst({
        where: {id: productID}
      });

      const findTraveller = await prisma.travelers.findFirst({
        where: {travellerId: userID}
      });
      
      if (!findTraveller) {
        // Create traveler entry and associate it with product
        await prisma.travelers.create({
            data: {
            country: product?.collect_country,
            state: product?.collect_state,
            city: product?.collect_city,
            travellerId: userID,
            products: {
                connect: {
                    id: productID,
                    }
                },
            }
        });
      } else {
        // Associate existing traveler with product
        await prisma.travelers.update({
            where: {travellerId: userID},
            data: {
                country: product?.collect_country,
                state: product?.collect_state,
                city: product?.collect_city,
                travellerId: userID,
                products: {
                    connect: {
                        id: productID,
                        }
                    },
            }
        });
    }

    // Update status of product
    await prisma.products.update({
    where: { id: productID },
    data: {
        status: "Accepted",
        traveller_id: userID
        },
    });
  
    return res.status(201).json({ message: 'Product request created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}