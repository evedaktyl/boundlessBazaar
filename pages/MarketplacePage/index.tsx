'use client';

import React from "react";
import Image from "next/image";
import { useState } from "react";
import {Row, Col } from "react-bootstrap"

function Marketplace() {
    const [searchedProductName, changeSearchedProductName] = useState('');
    const productNameHandler = (e: any) => {
        changeSearchedProductName(e.currentTarget.value);
    }

    
    return (
        <div>
            <h1 className='mt-2 text-blue-800 text-6xl leading-8 font-bold pb-8 text-left pl-72'>
                    Fly. Buy. Enjoy.
            </h1>
            <div className="bg-no-repeat bg-plane-sunset h-96 w-auto bg-center pl-[450px] pt-14">
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
        </div>
    )
}

export default Marketplace;