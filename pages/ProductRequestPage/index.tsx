/*'use client';

import ProductRequestForm from '../../components/ProductRequestForm'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react';
import Router from 'next/router';

export default function ProductRequestPage() {
    const { status, data } = useSession();
    console.log(status);
    console.log(data);

    useEffect(() => {
        if(status === "unauthenticated") Router.replace("/auth/signIn");
    }, [status])

    if (status === "authenticated") {
        return (
            <div className ="w-full h-screen">
            <ProductRequestForm />
        </div>
        )
    } else {
        return (
        <div className='mt-2 text-blue-800 text-6xl leading-24 font-bold pb-20 text-left px-52 pr-80'>
            Sign In to access this page!
        </div>
        )}
    return (
        <div>
            loading...
        </div>
    )
}*/

import ProductRequestForm from '../../components/ProductRequestForm';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function ProductRequestPage() {
  const { status, data } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setTimeout(() => {
        Router.replace('/auth/signIn');
      }, 2000); // Delay before redirecting to display 'Sign In to access this page!' message
    } else if (status === 'authenticated') {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="mt-2 text-blue-800 text-6xl leading-24 font-bold pb-20 text-left px-52 pr-80">
        Sign In to access this page!
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className="w-full h-screen">
        <ProductRequestForm />
      </div>
    );
  }

  return <div>
           <h2 className="text-white text-center">
            Loading... 
           </h2>
        </div>;
}
