'use client';
import Image from "next/image";
import { useState } from "react";
import {Row, Col } from "react-bootstrap"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Marketplace() {
    const session:any = useSession();
    const sessionID = session.data?.user?.id;
    const sessionName = session.data?.user?.name;
    const sessionEmail = session.data?.user?.email;
    //console.log(sessionID);
    const router = useRouter();

    const [searchedProductName, setSearchedProductName] = useState("");
    const [purchaseCountry, setPurchaseCountry] = useState("");
    const [deliveryCountry, setDeliveryCountry] = useState("");
    const [purchaseState, setPurchaseState] = useState("");
    const [deliveryState, setDeliveryState] = useState("");

    const productNameHandler = (e: any) => {
        setSearchedProductName(e.currentTarget.value);
    }
    const purchaseCountryHandler = (e: any) => {
        setPurchaseCountry(e.currentTarget.value);
    }
    const deliveryCountryHandler = (e: any) => {
        setDeliveryCountry(e.currentTarget.value);
    }
    const purchaseStateHandler = (e: any) => {
        setPurchaseState(e.currentTarget.value);
    }
    const deliveryStateHandler = (e: any) => {
        setDeliveryState(e.currentTarget.value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        searchListing(searchedProductName, purchaseCountry, purchaseState,
                        deliveryCountry, deliveryState);
    }
    const [products, changeProducts] = useState<any>([]);
    const [searchedProducts, changeSearchedproducts] = useState<any>([]);
    const [searchResultComponent, searchResultComponentChanged] = useState<any>();

    const callProducts = async () => {
        try {
            const response = await fetch('/api/getProducts', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            if (response.ok) {
                changeProducts(await response.json());
            } else {
                const data:any = await response.json();
                console.error(data.message);
            }
        } catch(error) {
        }
        
    }
    callProducts();

    const searchListing = async (title: string, purchaseCountry: string, purchaseState: string,
                                deliverCountry:string, deliveryState:string) => {
        try {
            
            const response = await fetch('/api/getProducts', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    collect_country: purchaseCountry,
                    collect_state: purchaseState,
                    deliver_country: deliverCountry,
                    delivery_state: deliveryState
                })
            });
            
            if (response.ok) {
                changeSearchedproducts(await response.json());

                const searchedProds = await searchedProducts.map((product: {
                    deliver_country:string,
                    collect_country:string,
                    quantity: number;
                    curr_offer: number;
                    title: string;
                    image_url: string; id: React.Key | null | undefined; 
                }) => 
                    <div className='mb-10 w-[480px] h-64 bg-rose-300 rounded-lg grid grid-cols-2 gap-1'
                        key={product.id}>
                    <Col className="ml-5 w-40">
                        <div className="w-40 h-40 bg-white rounded-lg mt-5">
                            <div className="w-[200px] h-[200px]">
                            <Image src={"/trolley.png"}
                            placeholder={'blur'}
                            blurDataURL={"/public/BB_icon"}
                            alt="no valid img url"
                            className='pt-6' width={160} height={160} />
                            </div>
                        </div>
                        <br />
                        <div>
                            {smallText(product.collect_country, 6)} {'->'} {smallText(product.deliver_country, 6)}
                        </div>
                    </Col>
                    
                    <Col className="mx-1 rounded-lg mt-5 text-2xl">
                        <h1 className="pb-4 font-semibold">{smallText(product.title, 15)}</h1>
                        <h1 className="pb-2">Offer Price: ${smallNum(product.curr_offer)}</h1>
                        <h1 className="pb-10">Quantity Offered: {smallNum(product.quantity)}</h1>
                        <button type="submit"
                        className='bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg'
                        onClick={() => handleOffer(event, product.id)}>
                        Accept Offer
                        </button>
                    </Col>
                </div>
                )

                searchResultComponentChanged(
                <div>
                    <div className='text-blue-800 text-6xl leading-8 font-bold text-left pt-20 pb-10 ml-[15%]'>
                        Searched product listings:
                    </div>
                    <div className="grid grid-cols-2 mx-[15%] gap-2">
                    {searchedProds}
                    </div>
                </div>
                );
            } else {
                const data:any = await response.json();
                console.error(data.message);
            }
        } catch(error) {
        }
        
    }

    const handleOffer = async (e:any, productID:any) => {
        if (session.status !== 'authenticated') {
            router.push('/MarketplacePage/NoSessionError');
            return;
        }

        const data = {
            userID: sessionID,
            productID: productID,
            userEmail: sessionEmail,
            userName: sessionName,
        }
        console.log(productID);
        e.preventDefault();

        const stripeid = session.data?.user?.stripe_id;
        console.log(stripeid);
        //for now still shows null :( sad

        if (stripeid !== null) {
            console.log('checking onboarding of stripeid: ' + stripeid);
            const dataToOnboarded = {
                accountID: stripeid,
                userID: sessionID,
            }
            const checkOnboardingResponse = await fetch('/api/onboarded', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToOnboarded)
            });

            const checkOnboardingData = await checkOnboardingResponse.json();
            if (checkOnboardingData.success) {
                console.log('onboarding successfully completed')
                const response = await fetch('/api/offerAccept', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    router.push('/MarketplacePage/OfferAccepted');
                    return;
                } else {
                    const data = await response.json();
                    console.error(data.message);
                }
            } else {
                console.log('onboarding failed to pass check')
            }  
        }

        
             // Fetch the Stripe onboarding API first
             const stripeOnboardingResponse = await fetch(`/api/onboarding`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            let stripeOnboardingData = await stripeOnboardingResponse.json();
            console.log(stripeOnboardingData);
            const stripeAccLink = stripeOnboardingData.link;
            const stripe_account_id = stripeOnboardingData.accountID;

            console.log(stripe_account_id);
            //open stripe onboarding in another tab
            window.open(stripeAccLink, '_blank');
        
            

            //router.push(stripeOnboardingData.link);
        
            // window.onpopstate = async () => {
            //     console.log('fetching onboarded');
            //     try {
            //         // Fetch data from the onboarded API to check onboarding status
            //         const onboardedResponse = await fetch('/api/onboarded');
            //         const onboardedData = await onboardedResponse.json();
    
            //         if (onboardedData.success === undefined) {
            //             console.log('Error with onboarding');
            //             router.push('/MarketplacePage');
            //         }
    
            //         if (onboardedData.success) {
            //             // Continue with the rest of your handleSubmit logic
            //             const response = await fetch('/api/offerAccept', {
            //                 method: 'POST',
            //                 headers: {
            //                     'Content-Type': 'application/json',
            //                 },
            //                 body: JSON.stringify(data),
            //             });
            //             if (response.ok) {
            //                 router.push('/MarketplacePage/OfferAccepted');
            //             } else {
            //                 const data = await response.json();
            //                 console.error(data.message);
            //             }
            //         } else {
            //             console.log('Stripe onboarding not successful');
            //             router.push('/MarketplacePage');
            //         }
            //     } catch (error) {
            //         console.error('Error:', error);
            //         console.log('Failed to check account creation.');
            //         router.push('/MarketplacePage');
            //     }
            // };
            // if (stripeOnboardingData.success == undefined) {
            //     console.log('error with onboarding');
            //     router.push('MarketplacePage');
            // }
            // if (stripeOnboardingData.success) {
            //     const response = await fetch('/api/offerAccept', {
            //         method: 'POST',
            //         headers: {
            //         'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(data)
            //     });
            //     if (response.ok) {
            //         router.push('/MarketplacePage/OfferAccepted');
            //     } else {
            //         const data:any = await response.json();
            //         console.error(data.message);
            //     }
        
            // } else {
            //     console.log('stripe onboarding not successful')
            //     router.push('MarketplacePage');
            // }
        
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


    return (
        <div>
            <h1 className='mt-2 text-blue-800 text-6xl leading-8 font-bold pb-8 text-left mx-[15%]'>
                    Fly. Buy. Enjoy.
            </h1>
            <div className="bg-no-repeat bg-plane-sunset h-96 ml-[15%] pt-14 mb-2s0">
                <form className='pb-3 mx-[10%]'>
                    <label className='mt-2 text-2xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Search a Product.
                        </label>
                    <div>
                    <input type="text" onChange={productNameHandler} value={searchedProductName}
                    className='rounded-lg text-black text-1xl py-1 px-3 w-[420px]'  />
                    <a className="pl-8">
                        <button type="submit"
                        className='bg-green-700 hover:bg-green-900  text-white font-bold py-2 px-6 rounded-full'
                        onClick={handleSubmit}>
                            Submit
                        </button>
                    </a>
                    </div>
                </form>
                <Row className="flex pt-4 mx-[10%]">
                 <Col className='pr-20'>
                 <form className='pb-3'>
                    <label className='mt-2 text-1xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Product Purchase Country:
                    </label>
                    <div>
                    <input type="text" onChange={(e) => setPurchaseCountry(e.currentTarget.value)} value={purchaseCountry}
                    className='rounded-lg text-1xl py-1 px-3 w-60  text-black' />
                    </div>
                </form>
                <form className='pb-3'>
                    <label className='mt-2 text-1xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Product Delivery Country:
                    </label>
                    <div>
                    <input type="text" onChange={(e) => setDeliveryCountry(e.currentTarget.value)} value={deliveryCountry}
                    className='rounded-lg text-1xl py-1 px-3 w-60  text-black' />
                    </div>
                </form>
                 </Col>
                 <Col>
                 <form className='pb-3'>
                    <label className='mt-2 text-1xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Product Purchase State:
                    </label>
                    <div>
                    <input type="text" onChange={(e) => setPurchaseState(e.currentTarget.value)} value={purchaseState}
                    className='rounded-lg text-1xl py-1 px-3 w-60  text-black' />
                    </div>
                </form>
                <form className='pb-3'>
                    <label className='mt-2 text-1xl leading-8 font-semibold sm:text-1xl pb-2 pr-8'>
                        Product Delivery State:
                    </label>
                    <div>
                    <input type="text" onChange={(e) => setDeliveryState(e.currentTarget.value)} value={deliveryState}
                    className='rounded-lg text-1xl py-1 px-3 w-60  text-black' />
                    </div>
                </form>
                </Col>
             </Row>
            </div>
            {searchResultComponent}
            <div className='text-blue-800 text-6xl leading-8 font-bold text-left pt-20 pb-10 ml-[15%]'>
                All product listings:
            </div>
            <div className="grid grid-cols-2 mx-[15%] gap-2">
            {products.map((product: {
                deliver_country:string,
                collect_country:string,
                quantity: number;
                curr_offer: number;
                title: string;
                image_url: string; id: React.Key | null | undefined; 
            }) => 
                <div className='mb-10 w-[480px] h-64 bg-rose-300 rounded-lg grid grid-cols-2 gap-1'
                    key={product.id}>
                <Col className="ml-5 w-40">
                    <div className="w-40 h-40 bg-white rounded-lg mt-5">
                        <div className="w-[200px] h-[200px]">
                        <Image src={"/trolley.png"}
                        placeholder={'blur'}
                        blurDataURL={"/public/BB_icon"}
                        alt="no valid img url"
                        className='pt-6' width={160} height={160} />
                        </div>
                    </div>
                    <br />
                    <div>
                        {smallText(product.collect_country, 6)} {'->'} {smallText(product.deliver_country, 6)}
                    </div>
                </Col>
                
                <Col className="mx-1 rounded-lg mt-5 text-2xl">
                    <h1 className="pb-4 font-semibold">{smallText(product.title, 15)}</h1>
                    <h1 className="pb-2">Offer Price: ${smallNum(product.curr_offer)}</h1>
                    <h1 className="pb-10">Quantity Offered: {smallNum(product.quantity)}</h1>
                    <button type="submit"
                    className='bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg'
                    onClick={() => handleOffer(event, product.id)}>
                    Accept Offer
                    </button>
                </Col>
                </div>
            )}
            </div>
        </div>
    )
}
