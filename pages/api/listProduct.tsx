import { NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { userID, productURL, productName, yourOffer, deliveryCountry, deliveryState, deliveryCity } = req.body;
  
    try {
      // Create the buyer entry
      const buyer = await prisma.buyers.create({
        data: {
          country: deliveryCountry,
          state: deliveryState,
          city: deliveryCity,
          buyerId: userID
        },
      });
  
      // Create the product entry and associate it with the buyer
      const product = await prisma.products.create({
        data: {
          url: productURL,
          title: productName,
          details: yourOffer,
          country: deliveryCountry,
          state: deliveryState,
          city: deliveryCity,
          buyer_id: buyer.buyerId,
          status: "Listed"
        },
      });
  
      // Update the buyers table to include the new product in the products array
      await prisma.buyers.update({
        where: {
          buyerId: buyer.buyerId,
        },
        data: {
          products: {
            connect: {
              id: product.id,
            },
          },
        },
      });
  
      return res.status(201).json({ message: 'Product request created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }