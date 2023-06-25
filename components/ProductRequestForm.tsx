'use client';
import { Col, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductRequestForm() {
    const session:any = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        userID: session.data.user.id,
        productCountry: '',
        productState: '',
        productCity: '',
        productURL: '',
        productName: '',
        quantity: '',
        yourOffer: '',
        name: '',
        deliveryCountry: '',
        deliveryState: '',
        deliveryCity: '',
        contactNumber: '',
      });

      const handleSubmit = async (event:any) => {
        event.preventDefault();
      
        try {
            console.log(formData);
          const response = await fetch('/api/listProduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            // Product request created successfully
            // Redirect to the success page
            router.push('/');
          } else {
            // Handle error response
            const data = await response.json();
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const handleChange = (event:any) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [event.target.name]: event.target.value,
        }));
      };
    
      return (
        <form onSubmit={handleSubmit}>
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
                    <input className='w-24 text-black rounded' name="productCountry" value={formData.productCountry} onChange={handleChange} />
                  </div>
                  <div className='pl-10 pb-10'>
                    <h1>Product State</h1>
                    <input className='w-24 text-black rounded' name="productState" value={formData.productState} onChange={handleChange} />
                  </div>
                  <div className='pl-20 pb-10'>
                    <h1>Product City</h1>
                    <input className='w-24 text-black rounded' name="productCity" value={formData.productCity} onChange={handleChange} />
                  </div>
                </Row>
                <div className='pb-10'>
                  <h1>Enter Product URL</h1>
                  <input className='w-96 text-black rounded' name="productURL" value={formData.productURL} onChange={handleChange} />
                </div>
                <div className='pb-10'>
                  <h1>Product Name + Selection</h1>
                  <input className='w-96 text-black rounded' name="productName" value={formData.productName} onChange={handleChange} />
                </div>
                <Row className='grid grid-cols-2'>
                  <div className='pb-10'>
                    <h1>Quantity</h1>
                    <input className='w-44 text-black rounded' name="quantity" value={formData.quantity} onChange={handleChange} />
                  </div>
                  <div className='pl-20 pb-10'>
                    <h1>YourOffer</h1>
                    <input className='w-44 text-black rounded' name="yourOffer" value={formData.yourOffer} onChange={handleChange} />
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
              <input className='w-96 text-black rounded' name="name" value={formData.name} onChange={handleChange} />
            </div>
            <Row className='grid grid-cols-3'>
              <div className='pb-10'>
                <h1>Delivery Country</h1>
                <input className='w-24 text-black rounded' name="deliveryCountry" value={formData.deliveryCountry} onChange={handleChange} />
              </div>
              <div className='pl-10 pb-10'>
                <h1>Delivery State</h1>
                <input className='w-24 text-black rounded' name="deliveryState" value={formData.deliveryState} onChange={handleChange} />
              </div>
              <div className='pl-20 pb-10'>
                <h1>Delivery City</h1>
                <input className='w-24 text-black rounded' name="deliveryCity" value={formData.deliveryCity} onChange={handleChange} />
              </div>
            </Row>
            <div className='pb-10'>
              <h1>Contact Number</h1>
              <input className='w-96 text-black rounded' name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
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
    </form>
  );
};

    // return (
    
    //     <div>
    //         <div> Welcome </div>
    //         <Row className="max-w-5xl mx-auto px-20 ml-20 grid grid-cols-2">
    //              <Col className='pt-20'>
    //                  <h1 className="sm:text-8xl text-blue-800 font-extrabold text-left whitespace-normal">
    //                      STEP 1: 
    //                  </h1>
    //                  <h1 className="sm:text-8xl mt-2 text-blue-800 font-extrabold text-left">
    //                      PRODUCT DETAILS
    //                  </h1>
    //                  <h3 className="sm:text-2xl mt-2 text-green-700 font-semibold text-left break-words">
    //                  Do make sure all information is accurate, and include specifications 
    //                  (e.g size/color) under Product Name + Selection!
    //                  </h3>
    //              </Col>
    //              <Col className='pt-20 pl-52'>
    //                 <Row className='grid grid-cols-3'>
    //                     <div className='pb-10'>
    //                         <h1>Product Country</h1>
    //                         <input className='w-24 rounded' />
    //                     </div>
    //                     <div className='pl-10 pb-10'>
    //                         <h1>Product State</h1>
    //                         <input className='w-24 rounded' />
    //                     </div>
    //                     <div className='pl-20 pb-10'>
    //                         <h1>Product City</h1>
    //                         <input className='w-24 rounded' />
    //                     </div>
    //                 </Row>
    //                 <div className='pb-10'>
    //                     <h1>Enter Product URL</h1>
    //                     <input className='w-96 rounded' />
    //                 </div>
    //                 <div className='pb-10'>
    //                     <h1>Product Name + Selection</h1>
    //                     <input className='w-96 rounded' />
    //                 </div>
    //                 <Row className='grid grid-cols-2'>
    //                     <div className='pb-10'>
    //                         <h1>Quantity</h1>
    //                         <input className='w-44 rounded' />
    //                     </div>
    //                     <div className='pl-20 pb-10'>
    //                         <h1>YourOffer </h1>
    //                         <input className='w-44 rounded' />
    //                     </div>
    //                 </Row>
    //              </Col>
    //         </Row>

    //         <Row className="max-w-5xl mx-auto px-20 ml-20 grid grid-cols-2">
    //              <Col className='pt-20'>
    //                  <h1 className="sm:text-8xl text-blue-800 font-extrabold text-left whitespace-normal">
    //                      STEP 2: 
    //                  </h1>
    //                  <h1 className="sm:text-8xl mt-2 text-blue-800 font-extrabold text-left">
    //                      DELIVERY DETAILS
    //                  </h1>
    //              </Col>
    //              <Col className='pt-20 pl-52'>
    //                 <div className='pb-10'>
    //                     <h1>Name</h1>
    //                     <input className='w-96 rounded' />
    //                 </div>
    //                 <Row className='grid grid-cols-3'>
    //                     <div className='pb-10'>
    //                         <h1>Delivery Country</h1>
    //                         <input className='w-24 rounded' />
    //                     </div>
    //                     <div className='pl-10 pb-10'>
    //                         <h1>Delivery State</h1>
    //                         <input className='w-24 rounded' />
    //                     </div>
    //                     <div className='pl-20 pb-10'>
    //                         <h1>Delivery City</h1>
    //                         <input className='w-24 rounded' />
    //                     </div>
    //                 </Row>
    //                 <div className='pb-10'>
    //                     <h1>Contact Number</h1>
    //                     <input className='w-96 rounded' />
    //                 </div>
    //              </Col>
    //         </Row>
    //         <Row className="text-center py-20">
    //             <button type="submit"
    //             className='bg-green-700 hover:bg-green-900 text-white text-4xl font-bold py-2 px-4 rounded-lg'>
    //                     Confirm and Submit
    //                 </button>
    //         </Row>
    //     </div>
    // );
