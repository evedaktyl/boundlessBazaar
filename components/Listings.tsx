'use client';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Listings() {
    const router = useRouter();

    return (
        <div>
        <div className='mt-2 text-blue-800 text-6xl leading-8 font-bold text-left pl-72 pb-10'> Current Listings </div> 
        <h1 className='w-40 h-40 bg-rose-300 mx-30'>
            test2 eofen
        </h1>
        </div>
    );
}