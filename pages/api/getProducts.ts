import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const products = await prisma.products.findMany({
    })
    res.status(200).json(products);
}
