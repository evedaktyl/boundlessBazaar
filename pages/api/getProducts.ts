import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const title = (req.body.title != null || undefined) ? req.body.title : '';
    const collect_country = (req.body.collect_country != null || undefined) ? req.body.collect_country : '';
    const collect_state = (req.body.collect_state != null || undefined) ? req.body.collect_state : '';
    const deliver_country = (req.body.deliver_country != null || undefined) ? req.body.deliver_country : '';
    const deliver_state = (req.body.deliver_state != null || undefined) ? req.body.deliver_state : '';

    const products = await prisma.products.findMany({
        where: {
            title: {
                contains: title
            },
            collect_country: {
                contains: collect_country
            },
            collect_state: {
                contains: collect_state
            },
            deliver_country: {
                contains: deliver_country
            },
            deliver_state: {
                contains: deliver_state
            },
        },
    })
    res.status(200).json(products);
}
