'use client';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function SignOutPage() {
    const router = useRouter();

    const handleYes = async (event: any) => {
        router.push('/');
        signOut();
    }

    const handleNo = async (event: any) => {
        router.push('/');
    }

    return (
        <div className ="w-full h-screen">
            <h1 className='mt-2 text-blue-800 text-6xl leading-24 font-bold pb-20 text-left px-52 pr-80'>
                Are you sure you want to sign out?
            </h1>
            <div className='flex flex-col-2 items-center justify-center gap-32'>
            <button type="submit" onClick={handleYes}
                className='bg-green-700 hover:bg-green-900 text-white text-4xl font-bold py-2 px-4 w-fit rounded'>
                Yes
            </button>
            <button type="submit" onClick={handleNo}
                className='bg-green-700 hover:bg-green-900 text-white text-4xl font-bold py-2 px-4 w-fit rounded'>
                No
            </button>
            </div>
        </div>
    )
}

export default SignOutPage;
