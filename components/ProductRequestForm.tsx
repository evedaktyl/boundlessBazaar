'use client';
import { Col, Row } from 'react-bootstrap';

export default function ProductRequestForm() {
    return (
    
        <div>
            <Row className="max-w-5xl mx-auto px-20 ml-20 grid grid-cols-2">
                 <Col className='pt-20'>
                     <h1 className="sm:text-8xl text-blue-800 font-extrabold text-left whitespace-normal">
                         STEP 1: 
                     </h1>
                     <h1 className="sm:text-8xl mt-2 text-blue-800 font-extrabold text-left">
                         PRODUCT DETAILS
                     </h1>
                     <h3 className="sm:text-2xl mt-2 text-green-700 font-semibold text-left break-words">
                     Do make sure all information is accurate, and include specifications 
                     (e.g size/color) under Product Name + Selection!
                     </h3>
                 </Col>
                 <Col className='pt-20 pl-52'>
                    <Row className='grid grid-cols-3'>
                        <div className='pb-10'>
                            <h1>Product Country</h1>
                            <input className='w-24 rounded' />
                        </div>
                        <div className='pl-10 pb-10'>
                            <h1>Product State</h1>
                            <input className='w-24 rounded' />
                        </div>
                        <div className='pl-20 pb-10'>
                            <h1>Product City</h1>
                            <input className='w-24 rounded' />
                        </div>
                    </Row>
                    <div className='pb-10'>
                        <h1>Enter Product URL</h1>
                        <input className='w-96 rounded' />
                    </div>
                    <div className='pb-10'>
                        <h1>Product Name + Selection</h1>
                        <input className='w-96 rounded' />
                    </div>
                    <Row className='grid grid-cols-2'>
                        <div className='pb-10'>
                            <h1>Quantity</h1>
                            <input className='w-44 rounded' />
                        </div>
                        <div className='pl-20 pb-10'>
                            <h1>YourOffer </h1>
                            <input className='w-44 rounded' />
                        </div>
                    </Row>
                 </Col>
            </Row>

            <Row className="max-w-5xl mx-auto px-20 ml-20 grid grid-cols-2">
                 <Col className='pt-20'>
                     <h1 className="sm:text-8xl text-blue-800 font-extrabold text-left whitespace-normal">
                         STEP 2: 
                     </h1>
                     <h1 className="sm:text-8xl mt-2 text-blue-800 font-extrabold text-left">
                         DELIVERY DETAILS
                     </h1>
                 </Col>
                 <Col className='pt-20 pl-52'>
                    <div className='pb-10'>
                        <h1>Name</h1>
                        <input className='w-96 rounded' />
                    </div>
                    <Row className='grid grid-cols-3'>
                        <div className='pb-10'>
                            <h1>Delivery Country</h1>
                            <input className='w-24 rounded' />
                        </div>
                        <div className='pl-10 pb-10'>
                            <h1>Delivery State</h1>
                            <input className='w-24 rounded' />
                        </div>
                        <div className='pl-20 pb-10'>
                            <h1>Delivery City</h1>
                            <input className='w-24 rounded' />
                        </div>
                    </Row>
                    <div className='pb-10'>
                        <h1>Contact Number</h1>
                        <input className='w-96 rounded' />
                    </div>
                 </Col>
            </Row>
            <Row className="text-center py-20">
                <button type="submit"
                className='bg-green-700 hover:bg-green-900 text-white text-4xl font-bold py-2 px-4 rounded-lg'>
                        Confirm and Submit
                    </button>
            </Row>
        </div>
    );
}