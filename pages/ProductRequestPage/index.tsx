import ProductRequestForm from '../../components/ProductRequestForm'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react';
import Router from 'next/router';

export default function ProductRequestPage() {
    const { status, data } = useSession();
    console.log(status);
    console.log(data);

    useEffect(() => {
        if(status === "unauthenticated") Router.replace("/auth/signin");
    }, [status])

    if (status === "authenticated") {
        return (
            <div className ="w-full h-screen">
                {/* <h1> Welcome back {data.user?.name} </h1> */}
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
}