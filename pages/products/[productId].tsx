import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import prisma from "db";

export default function ProductListing() {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState<any>(null);

    //fetching individual product details
    useEffect(() => {
    const getProductDetails = async () => {
        try {
            const fetchedProduct = await prisma.products.findUnique({
                where: { id: typeof productId === 'string' ? parseInt(productId) : 0 },
              });
              
            setProduct(fetchedProduct);
            //access product details
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    if (productId) {
        getProductDetails();
    }
   }, [productId]);
    
   if (!product) {
    return <div>Loading...</div>;
   }

    return (
        <div>
            <h1 className='text-blue-800 text-center'>
                {product.title}
            </h1>
            <h2>Description: {product.details}</h2>
        </div>
    )
}