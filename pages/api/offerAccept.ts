import { NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const {userID, productID} = req.body;
  
    try {
      // Create the buyer entry

      const user = await prisma.users.findFirst({
        where: {id: userID}
      });

      const product:any = await prisma.products.findFirst({
        where: {id: productID}
      });

      // Create the traveller entry and associate it with the buyer
      const findTraveller = await prisma.travelers.findFirst({
        where: {travellerId: userID}
      });
      
      if (!findTraveller) {
        const traveller = await prisma.travelers.create({
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
        const updatedTraveller = await prisma.travelers.update({
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

      // Update the buyers table to include the new product in the products array
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