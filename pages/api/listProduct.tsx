import { NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { userID, deliveryCountry, deliveryState, deliveryCity,
        productURL, productName, productCountry, productState, productCity,
        imageURL, quantity, yourOffer, productDetails } = req.body;
  
    try {
      // Create the buyer entry

      const user = await prisma.buyers.findFirst({
        where: {buyerId: userID}
      });

      if (!user) {
        await prisma.buyers.create({
            data: {
              country: deliveryCountry,
              state: deliveryState,
              city: deliveryCity,
              buyerId: userID
            },
          });
      }
  
      // Create the product entry and associate it with the buyer
      const product = await prisma.products.create({
        data: {
          web_url: productURL,
          title: productName,
          details: productDetails,
          country: productCountry,
          state: productState,
          city: productCity,
          buyer_id: userID,
          status: "Listed",
          quantity: +quantity,
          curr_offer: +yourOffer,
          image_url: imageURL
        },
      });
  
      // Update the buyers table to include the new product in the products array
      await prisma.buyers.update({
        where: {
          buyerId: userID,
        },
        data: {
            country: deliveryCountry,
            state: deliveryState,
            city: deliveryCity,
            buyerId: userID,
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