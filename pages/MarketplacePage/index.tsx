'use client'
import Image from "next/image";
import { useState } from "react";
import {Row, Col } from "react-bootstrap"

export default function Marketplace() {
    const [searchedProductName, changeSearchedProductName] = useState('');
    const productNameHandler = (e: any) => {
        changeSearchedProductName(e.currentTarget.value);
    }
    const [products, changeProducts] = useState<any>([]);
    const callProducts = async () => {
        const response = await fetch('/api/getProducts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
        if (response.ok) {
            changeProducts(await response.json());
        } else {
            const data = await response.json();
            console.error(data.message);
        }
        
    }
    callProducts();

    return (
        <div>
            <h1 className='mt-2 text-blue-800 text-6xl leading-8 font-bold pb-8 text-left pl-72'>
                    Fly. Buy. Enjoy.
            </h1>
            <div className="bg-no-repeat bg-plane-sunset h-96 w-auto bg-center pl-[450px] pt-14 mb-2s0">
                <form className='pb-3'>
                    <label className='mt-2 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Search a Product.
                        </label>
                    <div>
                    <input type="text" onChange={productNameHandler} value={searchedProductName}
                    className='rounded-lg text-1xl py-1 px-3 w-[420px]'  />
                    <a className="pl-8">
                        <button type="submit"
                        className='bg-green-700 hover:bg-green-900  text-white font-bold py-2 px-6 rounded-full'>
                            Submit
                        </button>
                    </a>
                    </div>
                </form>
                <Row className="flex pt-4">
                 <Col className='pr-20'>
                 <form className='pb-3'>
                    <label className='mt-2 text-1xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Product Purchase Country:
                    </label>
                    <div>
                    <input type="text" onChange={productNameHandler} value={searchedProductName}
                    className='rounded-lg text-1xl py-1 px-3 w-60' />
                    </div>
                </form>
                <form className='pb-3'>
                    <label className='mt-2 text-1xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Product Delivery Country:
                    </label>
                    <div>
                    <input type="text" onChange={productNameHandler} value={searchedProductName}
                    className='rounded-lg text-1xl py-1 px-3 w-60' />
                    </div>
                </form>
                 </Col>
                 <Col className=''>
                 <form className='pb-3'>
                    <label className='mt-2 text-1xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Product Purchase State:
                    </label>
                    <div>
                    <input type="text" onChange={productNameHandler} value={searchedProductName}
                    className='rounded-lg text-1xl py-1 px-3 w-60' />
                    </div>
                </form>
                <form className='pb-3'>
                    <label className='mt-2 text-1xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Product Delivery State:
                    </label>
                    <div>
                    <input type="text" onChange={productNameHandler} value={searchedProductName}
                    className='rounded-lg text-1xl py-1 px-3 w-60' />
                    </div>
                </form>
                </Col>
             </Row>
            </div>
            <div className='text-blue-800 text-6xl leading-8 font-bold text-left pl-64 pt-20 pb-10'>
                Current Listings
            </div>
            <div className="grid grid-cols-2 mx-56">
            {products.map((product: {
                deliver_country:string,
                collect_country:string,
                quantity: number;
                curr_offer: number;
                title: string;
                image_url: string; id: React.Key | null | undefined; 
}) => 
                <div className='mx-10 mb-10 w-[480px] h-64 bg-rose-300 rounded-lg grid grid-cols-2 grid-rows-2 gap-0'
                key={product.id}>
                <div className="w-40 h-40 bg-white ml-8 rounded-lg mt-5">
                    <div className="w-[200px] h-[200px]">
                    {/* <Image src={"/public/BB_icon"}
                    placeholder={'blur'}
                    blurDataURL={"/public/BB_icon"}
                     alt="no valid img url"
                      className='pt-6' width={1000} height={1000} /> */}
                    </div>
                    <div>
                        {product.collect_country} {'->'} {product.deliver_country}
                    </div>
                </div>
                
                <div className="w-50 h-40 mr-8 rounded-lg mt-5 text-2xl">
                    <h1 className="pb-4 font-semibold">{product.title}</h1>
                    <h1 className="pb-2">Offer Price: {product.curr_offer}</h1>
                    <h1 className="pb-10">Quantity Offered: {product.quantity}</h1>
                    <button type="submit"
                    className='bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg'>
                    Accept Offer
                    </button>
                </div>
                </div>
            )}
            </div>
        </div>
    )
}