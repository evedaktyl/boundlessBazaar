'use client';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';
// import { checkSignIn } from '../../components/UserService'
import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function SignInPage() {

    const [pass, changePass] = useState('');
    const [email, changeEmail] = useState('');
    const [lowerText, changeLowerText] = useState('');

    const handleEmailChange = (event: any) => {
        changeEmail(event.currentTarget.value);
    }
    const handlePassChange = (event: any) => {
        changePass(event.currentTarget.value);
    }

    const data = {
        user_email: email
    }

    const handleSubmit = (event: any) => {

        event.preventDefault();
        fetch("/api/checkSignIn", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((user) => {

            if (user == null) {
                changeLowerText(
                    "Oops... Seems like you don't have an account yet. Sign up now!"
                    );
            }
            const realPass = user.password_hash;
            const name = user.name;
            if (pass !== realPass) {
                changeLowerText(
                    "Oops... You've entered the wrong password. Please try again!"
                    );
            } else {
                changeLowerText(
                    "Sign in successful. Welcome back " + name + "!"
                    );
            }})
            .catch((error) => {
            console.error("Error fetching data", error);
            });

        }

            // for (let user of users) {
            //     realUname = user.username;
            //     realPass = user.password;
                
            // }

        // createUser(id, email, uname, pass, name).then(response => {
        //     changeId(id + 1);
        //     console.log(response);
        // })

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
