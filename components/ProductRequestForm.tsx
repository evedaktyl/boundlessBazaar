'use client';
import { Col, Row } from 'react-bootstrap';

export default function ProductRequestForm() {
    return (
    
        <div>
            <Row className="max-w-5xl mx-auto px-20 flex ml-20">
                 <Col className='pt-20 pr-80'>
                     <h1 className="sm:text-8xl text-blue-800 font-extrabold text-left whitespace-normal break-words">
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
            </Row>
        </div>
    );
}