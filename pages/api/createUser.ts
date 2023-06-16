import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let { user_email } = req.body;
    let { name } = req.body;
    let { user } = req.body;
    let { pass } = req.body;

    const new_user = await prisma.users.create({
        data: {
            email: user_email,
            username: user,
            password_hash: pass,
            name: name,
        }
    })

    res.status(200).json(new_user);

    return {
        user : { user }
    }
    
}