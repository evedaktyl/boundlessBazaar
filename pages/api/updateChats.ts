import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const userID = (req.body.senderID !== null || undefined) ? req.body.senderID : 0;
    const chatterID = (req.body.receiverID !== null || undefined) ? req.body.receiverID : 0;
    const text = req.body.text;
    const productID = req.body.productID;
    
    await prisma.chat.create({
            data: {
                text,
                product_id: productID,
                sender_id: userID,
                receiver_id: chatterID
        }})

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

    let improvised_chats = chats.map((chat) => (chat.sender_id === userID) ? [0, chat.text] : [1, chat.text]);

    res.status(200).json(improvised_chats);
}