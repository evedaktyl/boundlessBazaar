'use client';

import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import Link from 'next/link';


function SignUpPage() {

    const [name, changeName] = useState('');
    const [uname, changeUname] = useState('');
    const [pass, changePass] = useState('');
    const [email, changeEmail] = useState('');
    const [lowerText, changeLowerText] = useState('');

    const handleUserChange = (event: any) => {
        changeUname(event.currentTarget.value);
    }
    const handleNameChange = (event: any) => {
        changeName(event.currentTarget.value);
    }
    const handleEmailChange = (event: any) => {
        changeEmail(event.currentTarget.value);
    }
    const handlePassChange = (event: any) => {
        changePass(event.currentTarget.value);
    }

    const data_1 = {
        user_email: email
    }

    const data_2 = {
        user_email: email,
        name: name,
        user: uname,
        pass: pass
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        fetch("/api/checkSignIn", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data_1),
        })
        .then((response) => response.json())
        .then((user) => {
            if (user == null) {
                createUser();
            } else {
                changeLowerText(
                    "Account already exists. Please sign in to continue!"
                    );
            }
        })
        .catch((error) => {
        console.error("Error fetching data", error);
        });
    }

    const createUser = () => {
        fetch("/api/createUser", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data_2),
        })
        .then((response) => response.json())
        .then((user) => {
            if (user != null) {
                changeLowerText(
                    "Sign up for " + uname + " succcesful. Sign in to continue!"
                );
            }
        })
        .catch((error) => {
            console.error("Error fetching data", error);
            });
    }

    return (
        <div className ="w-full h-screen py-12">
            <h1 className='mt-2 text-blue-800 text-6xl leading-8 font-bold pb-20 text-left pl-52'>
                Sign up today and join the community.
            </h1>
            <div className='text-left pl-52'>
                <form className='pb-3'>
                    <label className='mt-2 text-blue-800 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-14'>
                        Name:
                    </label>
                    <input type="text" onChange={handleNameChange} value={name} className='rounded text-1xl py-1 px-1'  />
                </form> 
                <form className='pb-3'>
                    <label className='mt-2 text-blue-800 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-16'>
                        Email:
                    </label>
                    <input type="email" onChange={handleEmailChange} value={email} className='rounded text-1xl py-1 px-1'  />
                </form>
                <form className='pb-3'>
                    <label className='mt-2 text-blue-800 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-3'>
                        Username:
                    </label>
                    <input type="text" onChange={handleUserChange} value={uname} className='rounded text-1xl py-1 px-1'  />
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
                <Link href='/SignInPage'>
                    <h1 className='mt-2 text-blue-800 text-1xl font-semibold text-left py-6 underline'>
                    Already have an account? Sign in here!
                    </h1>
                </Link>
                <Link href={'/SignInPage'} className="font-semibold text-blue-800 text-3xl">
                    {lowerText} 
                </Link>
            </div>
        </div>
    )
}

export default SignUpPage;
