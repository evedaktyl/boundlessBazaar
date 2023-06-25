'use client';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

function SignInPage() {
    const session:any = useSession();

    const [pass, changePass] = useState('');
    const [email, changeEmail] = useState('');
    const [lowerText, changeLowerText] = useState('');
    const [name, changeName] = useState<string>('');

    const handleEmailChange = (event: any) => {
        changeEmail(event.currentTarget.value);
    }
    const handlePassChange = (event: any) => {
        changePass(event.currentTarget.value);
    }

    const handleSubmit = async (event: any) => {

        event.preventDefault();
        const res = await signIn('credentials', {
            email: email,
            password: pass,
            redirect: false
        })

        if (res?.status == 200) {
            const fetchName = session.data?.user?.name;
            changeName(fetchName);
            setTimeout(() => changeLowerText('Sucessful Sign In! Welcome back ' + name + '!'), 1000)
            console.log(name);  
        } else {
            changeLowerText('Incorrect email or password. Please try again!')
        }
        console.log(res);  
    }

    return (
        <div className ="w-full h-screen">
            <h1 className='mt-2 text-blue-800 text-6xl leading-24 font-bold pb-20 text-left px-52 pr-80'>
                Welcome back to your favourite e-commerce platform!
            </h1>   
            <h1 className='mt-2 text-blue-800 text-5xl leading-8 font-bold pb-10 text-left pl-52'>
                Sign In here.
            </h1>   
            <div className='text-left pl-52'>
                <form className='pb-3'>
                    <label className='mt-2 text-blue-800 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-16'>
                        Email:
                    </label>
                    <input type="email" onChange={handleEmailChange} value={email} className='rounded text-1xl py-1 px-1'  />
                </form>
                <form className='pb-6'>
                    <label className='mt-2 text-blue-800 text-2xl leading-8 font-semibold sm:text-1xl pb-5 pr-4'>
                        Password:
                    </label>
                    <input type="password" onChange={handlePassChange} value={pass} className='rounded text-1xl py-1 px-1'  />
                </form>
                <button type="submit" onClick={handleSubmit}
                    className='bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded'>
                    Submit
                </button>
                <Link href='/SignUpPage'>
                    <div className='mt-2 text-blue-800 text-1xl font-semibold text-left py-6 underline'>
                    Don&apos;t have an account yet? Sign up now!
                    </div>
                </Link>
                <h1 className="font-semibold text-blue-800 text-3xl">
                    {lowerText} 
                </h1>
            </div>
        </div>
    )
}

export default SignInPage;
