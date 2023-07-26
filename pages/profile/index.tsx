'use client';
import Image from "next/image";
import { useState } from "react";
import {Row, Col } from "react-bootstrap"
import { useSession } from "next-auth/react";
import { json } from "stream/consumers";
import { useRouter } from "next/router";

export default function Marketplace() {
    const session:any = useSession();
    const name = session.data?.user?.name;
    const uname = session.data?.user?.username;
    const email = session.data?.user?.email;
    const id = session.data?.user?.id;
    const [changedName, editChangedName] = useState('');
    const [changedUname, editChangedUname] = useState('');
    const [changedEmail, editChangedEmail] = useState('');
    const [lowerText, changeLowerText] = useState('');
    const [buyerProducts, changeBuyerProducts] = useState<any>([]);
    const [travelerProducts, changeTravelerProducts] = useState<any>([]);
    
    //test comment

    const changeNameHandler = (e: any) => {
        editChangedName(e.currentTarget.value);
    }
    const changeUnameHandler = (e: any) => {
        editChangedUname(e.currentTarget.value);
    }
    const changeEmailHandler = (e: any) => {
        editChangedEmail(e.currentTarget.value);
    }
    const callProducts = async (type:string) => {
        const data = {
            userID: id,
            type: type
        }
        try {
            const response = await fetch('/api/getUserProducts', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                (type == 'traveler')
                    ? changeTravelerProducts(await response.json())
                    : changeBuyerProducts(await response.json())
            } else {
                const data:any = await response.json();
                console.error(data.message);
            }
        } catch(error) {
        }
    }
    callProducts('traveler')
    callProducts('buyer');
    
    const changeDetails = async (e:any, type:string) => {
        e.preventDefault();
        const data = {
            userID: id,
            type: type,
            data: (type === "name") ? changedName : (type === "uname")
                ? changedUname : (type === "email") ? changedEmail : null
        }
        try {
            const response = await fetch('/api/changeUserDetails', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                session.update();
                changeLowerText('Details successfully changed. Sign out and sign in to see revised changes!'); 
            } else {
                const data:any = await response.json();
                console.error(data.message);
            }
        } catch(error) {
        }
    }


    return (
        <div>
            <h1 className='mt-2 text-blue-800 text-6xl leading-8 font-bold pb-8 text-left pl-64'>
                    Welcome back {name}
            </h1>
            <form className='pb-3 pl-64'>
                    <label className='mt-2 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Name: {name}
                        </label>
                    <div>
                    <input type="text" onChange={changeNameHandler} value={changedName}
                    className='rounded-lg text-1xl py-1 px-3 w-[420px]'
                    placeholder="Edit name here!"  />
                    <a className="pl-4">
                        <button type="submit"
                        className='bg-green-700 hover:bg-green-900  text-white font-bold py-2 px-6 rounded-full'
                        onClick={() => changeDetails(event, "name")}>
                            Edit
                        </button>
                    </a>
                    </div>
                </form>
                <form className='pb-3 pl-64'>
                    <label className='mt-2 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Username: {uname}
                        </label>
                    <div>
                    <input type="text" onChange={changeUnameHandler} value={changedUname}
                    className='rounded-lg text-1xl py-1 px-3 w-[420px]'
                    placeholder="Edit username here!"  />
                    <a className="pl-4">
                        <button type="submit"
                        className='bg-green-700 hover:bg-green-900  text-white font-bold py-2 px-6 rounded-full'
                        onClick={() => changeDetails(event, "uname")}>
                            Edit
                        </button>
                    </a>
                    </div>
                </form>
                <form className='pb-10 pl-64'>
                    <label className='mt-2 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Email: {email}
                        </label>
                    <div>
                    <input type="text" onChange={changeEmailHandler} value={changedEmail}
                    className='rounded-lg text-1xl py-1 px-3 w-[420px]'
                    placeholder="Edit email here!"  />
                    <a className="pl-4">
                        <button type="submit"
                        className='bg-green-700 hover:bg-green-900  text-white font-bold py-2 px-6 rounded-full'
                        onClick={() => changeDetails(event, "email")}>
                            Edit
                        </button>
                    </a>
                    </div>
                </form>
                <label className='mt-2 text-2xl leading-8 font-semibold sm:text-1xl py-10 pr-8 pl-64 text-blue-800'>
                        {lowerText}
                </label>
                <div className='text-blue-800 text-6xl leading-8 font-bold text-left pl-64 pt-20 pb-10'>
                Products Listed:-
            </div>
            <div className="grid grid-cols-2 mx-56">
            {buyerProducts.map((product: {
                description: string;
                deliver_country:string,
                collect_country:string,
                quantity: number;
                curr_offer: number;
                title: string;
                image_url: string; id: React.Key | null | undefined; 
            }) => 
                <div className='mx-10 mb-10 w-[480px] h-64 bg-rose-300 rounded-lg grid grid-cols-2 grid-rows-2 gap-0'
                key={product.id}>
                <div className="w-40 h-40 bg-white ml-8 rounded-lg mt-5">
                    <div className="w-[200px] h-[200px]">
                    {/* <Image src={"/public/BB_icon"}
                    placeholder={'blur'}
                    blurDataURL={"/public/BB_icon"}
                     alt="no valid img url"
        className='pt-6' width={1000} height={1000} /> */}
                    </div>
                    <div>
                        {product.collect_country} {'->'} {product.deliver_country}
                    </div>
                </div>
                <div className="w-50 h-40 mr-8 rounded-lg mt-5">
                    <h1 className="pb-4 font-semibold text-2xl">{product.title}</h1>
                    <h1 className="pb-2 text-2xl">Offer Price: {product.curr_offer}</h1>
                    <h1 className="pb-2 text-2xl    ">Quantity Offered: {product.quantity}</h1>
                    <h1 className="pb-10 text-1xl">Description: {product.description}</h1>
                </div>
                </div>
            )}
            </div>
            <div className='text-blue-800 text-6xl leading-8 font-bold text-left pl-64 pt-20 pb-10'>
                Products to be Delivered:-
            </div>
            <div className="grid grid-cols-2 mx-56">
            {travelerProducts.map((product: {
                description: string;
                deliver_country:string,
                collect_country:string,
                quantity: number;
                curr_offer: number;
                title: string;
                image_url: string; id: React.Key | null | undefined; 
            }) => 
            <div className='mx-10 mb-10 w-[480px] h-64 bg-rose-300 rounded-lg grid grid-cols-2 grid-rows-2 gap-0'
            key={product.id}>
            <div className="w-40 h-40 bg-white ml-8 rounded-lg mt-5">
                <div className="w-[200px] h-[200px]">
                {/* <Image src={"/public/BB_icon"}
                placeholder={'blur'}
                blurDataURL={"/public/BB_icon"}
                 alt="no valid img url"
    className='pt-6' width={1000} height={1000} /> */}
                </div>
                <div>
                    {product.collect_country} {'->'} {product.deliver_country}
                </div>
            </div>
            <div className="w-50 h-40 mr-8 rounded-lg mt-5">
                <h1 className="pb-4 font-semibold text-2xl">{product.title}</h1>
                <h1 className="pb-2 text-2xl">Offer Price: {product.curr_offer}</h1>
                <h1 className="pb-2 text-2xl    ">Quantity Offered: {product.quantity}</h1>
                <h1 className="pb-10 text-1xl">Description: {product.description}</h1>
            </div>
            </div>
            )}
            </div>
        </div>
    )
}