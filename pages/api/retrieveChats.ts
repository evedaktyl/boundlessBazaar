import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const userID = (req.body.userID !== null || undefined) ? req.body.userID : 0;
    const productID = (req.body.productID !== null || undefined) ? req.body.productID : 0;
    const type = req.body.type;
    const chatterID = (req.body.chatterID !== null || undefined) ? req.body.chatterID : 0;

    let chats = await prisma.chat.findMany({
            where: {
                OR: [ {   
                    sender_id: userID,
                    product_id: productID,
                    receiver_id: chatterID
                }, {
                    sender_id: chatterID,
                    product_id: productID,
                    receiver_id: userID
                }
            ]
        }})
    
    let user = await prisma.users.findFirst({
        where: {
            id: chatterID
        }
    })

    let improvised_chats = chats.map((chat) => (chat.sender_id === userID) ? [0, chat.text] : [1, chat.text]);

    res.status(200).json([improvised_chats, user]);
}