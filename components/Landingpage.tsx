'use client';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import { Container, Col, Row } from 'react-bootstrap';

export default function LandingPage() {
    return (
        
        <div>
            <Row className="max-w-7xl mx-auto px-20 flex">
                 <Col className='pt-20 pr-80'>
                     <h1 className="sm:text-8xl text-blue-800 font-extrabold text-left">
                         SHOP
                     </h1>
                     <h1 className="sm:text-8xl mt-2 text-blue-800 font-extrabold text-left">
                         WITHOUT
                     </h1>
                     <h1 className="sm:text-8xl mt-2 text-blue-800 font-extrabold text-left">
                         LIMITS
                     </h1>
                     <h3 className="sm:text-2xl mt-2 text-green-700 font-semibold text-left">
                         Your all in one marketplace for global purchases.
                     </h3>
                 </Col>
                 <Col className='pt-20'>
                     <Image src="/trolley.png" alt="BB Icon 1" className='pt-6' width={1000} height={1000} />
                 </Col>
             </Row>
        </div>
    );
}
