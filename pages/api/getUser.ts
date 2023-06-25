import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { userId } = req.body;

    try {
        const user = await prisma.users.findFirst({
            where: { id: userId }
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
