import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    console.log(req.body);
    let { userID, type, data } = req.body;
    let updateUser;

    if (type == 'name') {
        updateUser = await prisma.users.update({
            where: {id: userID},
            data: {
                name: data
            }
        });
    } else if (type == 'uname') {
        updateUser = await prisma.users.update({
            where: {id: userID},
            data: {
                username: data
            }
        });
    } else if (type == 'email') {
        updateUser = await prisma.users.update({
            where: {id: userID},
            data: {
                email: data
            }
        });
    }

    res.status(200).json(updateUser);    
}