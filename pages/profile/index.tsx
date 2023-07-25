'use client';
import Image from "next/image";
import { useState } from "react";
import {Row, Col, Button } from "react-bootstrap"
import { useSession } from "next-auth/react";
import { json } from "stream/consumers";
import { useRouter } from "next/router";
import Popup from 'reactjs-popup';

export default function Marketplace() {

    const router = useRouter();

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
    const [initialCall, changeInitialCall] = useState<boolean>(false);
    const [messages, changeMessages] = useState<any>([]);
    const [currChatter, changeCurrChatter] = useState<number>();
    const [currProduct, changeCurrProduct] = useState<number>();
    const [showChat, changeShowChat] = useState<boolean>(false);
    const closeModal = () => changeShowChat(false);
    const [query, changeQuery] = useState('');
    const [chatterName, changeChatterName] = useState('');

    const handleInput = (e: any) => {
        changeQuery(e.currentTarget.value);
    }

    const handleSend = async () => {
        const data = {
            text: query,
            senderID: id,
            receiverID: currChatter,
            productID: currProduct
        }
        try {
            const response = await fetch('/api/updateChats', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const res = await response.json();
                changeMessages(res);
                changeQuery('');
            } else {
                const data:any = await response.json();
                console.error(data.message);
            }
        } catch(error) {
        }
    }

    const handleSubmit = async (productID: any, type: string, chatterID: any) => {
        changeCurrChatter(chatterID);
        changeCurrProduct(productID);

        const data = {
            userID: id,
            productID: productID,
            type: type,
            chatterID: chatterID
        }
        try {
            const response = await fetch('/api/retrieveChats', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const res = await response.json()
                changeShowChat(true);
                (type === 'buyer')
                    ? changeChatterName('Chat with traveler: ' + res[1].name)
                    : changeChatterName('Chat with buyer: ' + res[1].name);
                changeMessages(res[0]);
                
            } else {
                const data:any = await response.json();
                console.error(data.message);
            }
        } catch(error) {
        }
    }

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
    function call1() {
        if (!initialCall) {
            callProducts('traveler');
        }
    }
    function call2() {
        if (!initialCall) {
            callProducts('buyers');
            changeInitialCall(true);
        }
    }
    call1();
    call2();
    
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

    function smallText(text: string, limit: number) {
        var str:string = text;
        if(str.length > limit) str = str.substring(0, limit)+"...";
        return str;
    }

    function smallNum(num: number) {
        var str:string = num.toString();
        if(str.length > 4) str = str.substring(0,4)+"...";
        return str;
    }
    const initiatePayment = async (e:any, productID:any, productOffer:any, productTitle:any) => {
        e.preventDefault();
        console.log(session.data.user.stripeCustomerId);
        if (session.data.user.stripeCustomerId !== null) {
            console.log('customer_id exists, moving on to transfer...');
                //
                const transferDataSend1 = {
                    buyer_userID: id,
                    buyer_name: name,
                    buyer_customer_id: session.data.user.stripeCustomerId,
                    price: productOffer,
                    productTitle: productTitle,
                    productID: productID

                };
                const transferResponse = await fetch('/api/transfer', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(transferDataSend1)
                });
                const transferData = await transferResponse.json();
                if (transferData.transferred) {
                    console.log('transferred');
                    router.push('/Payment');
                    return;
                } else {
                    console.log(
                     'did not transfer'
                    )
                } 
        }

        const createCustomerDataSend = {
            userID: id,
            name: name,
            username: uname,
            email: email
        }

        try {
            const createCustomerResponse = await fetch('/api/createCustomer', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(createCustomerDataSend)
            });

            const createCustomerDataReceived = await createCustomerResponse.json();
            if (createCustomerDataReceived.updated) {
                console.log('moving on to transfer...');
                //
                const transferDataSend = {
                    buyer_userID: id,
                    buyer_name: name,
                    buyer_customer_id: createCustomerDataReceived.stripeCustomerId,
                    price: productOffer,
                    productTitle: productTitle,
                    productID: productID

                };
                console.log(productOffer);
                const transferResponse = await fetch('/api/transfer', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(transferDataSend)
                });
                const transferData = await transferResponse.json();
                if (transferData.transferred) {
                    console.log('transferred');
                    router.push('/Payment');
                } else {
                    console.log(
                     'did not transfer'
                    )
                }   
            } else {
                console.log('did not update');
            }
        } catch (error) {
            console.log('error');
        }
    }


    return (
        <div className="mx-[10%]">
            <h1 className='mt-2 text-blue-800 text-6xl leading-8 font-bold pb-8 text-left'>
                    Welcome back {name}
            </h1>
            <form className='pb-3'>
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
                <form className='pb-3'>
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
                <form className='pb-10'>
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
                <label className='mt-2 text-2xl leading-8 font-semibold sm:text-1xl py-10 pr-8 text-blue-800'>
                        {lowerText}
                </label>
                <div className='text-blue-800 text-6xl leading-8 font-bold text-left pt-20 pb-10'>
                Products Listed:-
                </div>
                <Popup open={showChat} closeOnDocumentClick onClose={closeModal}>
                    <div className="w-[1200px] h-[600px] bg-rose-200 p-5 rounded-lg">
                    <button className="bg-gray-50 rounded-full text-3xl p-1 px-3 flex ml-auto text-center"
                        onClick={closeModal}>
                        &times;
                    </button>
                    <div className="bg-gray-50 w-[1000px] h-[500px] ml-20 rounded-lg py-5 px-10">
                        <div className="text-blue-800 text-3xl leading-8 font-bold">
                            {chatterName}
                        </div>
                        <div className="h-[380px]">
                        {messages.map((msgArr: any, i: number) => (
                            (msgArr[0] === 0) ? (
                                <div key={i} className="p-2">
                                <div className="bg-green-600 p-2 w-fit h-fit flex ml-auto rounded-lg">
                                    <h1 className="text-left">{msgArr[1]}</h1>
                                </div>
                                </div>
                                ) : (
                                <div key={i} className="p-2">
                                <div className="bg-slate-300 p-2 w-fit h-fit rounded-lg"><span>{msgArr[1]}</span>
                                </div>
                                </div>
                                )
                            ))}
                        </div>
                        <div className="bg-zinc-400 rounded-2xl w-[900px] h-14 p-2">
                            <input className="rounded-full h-10 w-[790px] p-1 px-4" value={query} onChange={handleInput} />
                            <a className="px-4">
                            <button className="bg-green-700 px-3 py-2 rounded-lg hover:bg-green-900" onClick={handleSend}> Send </button>
                            </a>
                        </div>
                    </div>
                    </div>
                </Popup>
            <div className="grid grid-cols-2">
            {buyerProducts.map((product: {
                description: string;
                deliver_country:string,
                collect_country:string,
                quantity: number;
                curr_offer: number;
                title: string;
                image_url: string;
                id: React.Key | number | null | undefined;
                traveller_id: number | null;
                status: string;
            }) => 
                <div className='mx-10 mb-10 w-[480px] h-auto bg-rose-300 rounded-lg grid grid-cols-2 grid-rows-2 gap-0'
                key={product.id}>
                <div className="w-40 h-40 bg-white ml-8 rounded-lg mt-5">
                <div className="w-[200px] h-[200px]">
                    <Image src={"/trolley.png"}
                        placeholder={'blur'}
                        blurDataURL={"/public/BB_icon"}
                        alt="no valid img url"
                        className='pt-6' width={150} height={150} />         
                </div>
                <div>
                    {product.collect_country} {'->'} {product.deliver_country}
                </div>
                <div className="py-3">
                {(product.traveller_id !== null)
                ?
                <button type="submit" onClick={() => handleSubmit(product.id, 'buyer', product.traveller_id)}
                    className='bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-2 rounded-lg'>
                    Chat with traveler
                </button>
                :<div></div>
                }
                </div>
                </div>
                <div className="w-50 h-40 mr-8 rounded-lg mt-5">
                    <h1 className="pb-4 font-semibold text-2xl">{product.title}</h1>
                    <h1 className="pb-2 text-2xl">Offer Price: {product.curr_offer}</h1>
                    <h1 className="pb-2 text-2xl">Quantity Offered: {product.quantity}</h1>
                    <h1 className="pb-2 text-2xl">Description:</h1>
                    <h1 className="pb-10 text-1xl">{product.description}</h1>

                    {product.status === 'Accepted' &&
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => initiatePayment(event, product.id, product.curr_offer, product.title)}>
                    Proceed to Payment
                  </button>
                  }
                </div>
                </div>
            )}
            </div>
            <div className='text-blue-800 text-6xl leading-8 font-bold text-left pt-20 pb-10'>
                Products to be Delivered:-
            </div>
            <div className="grid grid-cols-2">
            {travelerProducts.map((product: {
                description: string;
                deliver_country:string,
                collect_country:string,
                quantity: number;
                curr_offer: number;
                title: string;
                image_url: string; 
                id: React.Key | null | undefined;
                status: string;
                buyer_id: number;
            }) => 
            <div className='mx-10 mb-10 w-[480px] h-auto bg-rose-300 rounded-lg grid grid-cols-2 grid-rows-2 gap-0'
            key={product.id}>
            <div className="w-40 h-40 bg-white ml-8 rounded-lg mt-5">
            <div className="w-[200px] h-[200px]">
                <Image src={"/trolley.png"}
                    placeholder={'blur'}
                    blurDataURL={"/public/BB_icon"}
                    alt="no valid img url"
                    className='pt-6' width={150} height={150} />         
            </div>
            <div>
                 {product.collect_country} {'->'} {product.deliver_country}
            </div>
            <div className="py-3">
                <button type="submit"
                    onClick={() => handleSubmit(product.id, 'traveler', product.buyer_id)}
                    className='bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg'>
                    Chat with buyer
                </button>
            </div>
            </div>
            <div className="w-50 h-40 mr-8 rounded-lg mt-5">
                <h1 className="pb-4 font-semibold text-2xl">{product.title}</h1>
                <h1 className="pb-2 text-2xl">Offer Price: ${product.curr_offer}</h1>
                <h1 className="pb-5 text-2xl">Quantity Offered: {product.quantity}</h1>
                <h1 className="pb-2 text-2xl">Description:</h1>
                <h1 className="pb-10 text-1xl">{product.description}</h1>
            </div>
            </div>
            )}
            </div>
        </div>
    )
}