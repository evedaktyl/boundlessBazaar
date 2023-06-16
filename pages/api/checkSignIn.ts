import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let { user_email } = req.body;

    const users = await prisma.users.findFirst({
        where: {email: user_email}
    })

    res.status(200).json(users);

    return {
        user : { users }
    }
    
}