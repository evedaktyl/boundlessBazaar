'use client';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function LandingPage() {
    const router = useRouter();
    function handleMarketplaceButton(event: any) {
        router.push('/MarketplacePage');
    }

    function handleListproductButton(event: any) {
        router.push('/ProductRequestPage');
    }

    return (
        
        <div className='grid grid-cols-2 grid-rows-3 gap-3 max-w-7xl mx-auto px-10'>
            <div className='pt-20'>
                <h1 className="sm:text-8xl text-blue-800 font-extrabold text-left">
                    SHOP
                </h1>
                <h1 className="sm:text-8xl mt-2 text-blue-800 font-extrabold text-left">
                    WITHOUT
                </h1>
                <h1 className="sm:text-8xl mt-2 text-blue-800 font-extrabold text-left">
                    LIMITS
                </h1>
                <h3 className="sm:text-2xl mt-2 text-green-700 font-semibold text-left">
                    Your all in one marketplace for global purchases.
                </h3>
            </div>
            <div className='pt-10 ml-auto'>
                <Image src="/trolley.png" alt="BB Icon 1" className='pt-6' width={400} height={400} />
            </div>
            <div className='pt-10'>
                <Image src="/globe.png" alt="globe img" className='pt-6' width={420} height={420} />
            </div>
            <div className='pt-40 mr-[8%] text-right'>
                <h1 className="sm:text-7xl text-blue-800 font-extrabold">
                    MAKE MONEY
                </h1>
                <h1 className="sm:text-7xl mt-2 text-blue-800 font-extrabold">
                    AS YOU TRAVEL
                </h1>
                <h3 className="sm:text-1xl mt-2 text-green-700 font-semibold">
                    Bring back buyer requested products during your travel and make easy,
                    hassle-free money while you’re at it.
                </h3>
                <button type="submit"
                    className='hover:bg-gray-100 border-2 border-blue-800
                    text-blue-800 text-1xl font-bold mt-5 py-3 px-5 rounded-full'
                    onClick={handleMarketplaceButton}>
                    MARKETPLACE
                </button>
            </div>
            <div className='pt-44'>
                <h1 className="sm:text-7xl text-blue-800 font-extrabold text-left">
                    REQUEST A 
                </h1>
                <h1 className="sm:text-7xl mt-2 text-blue-800 font-extrabold text-left">
                    PRODUCT
                </h1>
                <h3 className="sm:text-1xl mt-2 text-green-700 font-semibold text-left">
                    Make requests for products sold overseas that are either not available to deliver to your region,
                    or simply have unreasonably high delivery charges.
                </h3>
                <button type="submit"
                    className='hover:bg-gray-100 border-2 border-blue-800
                    text-blue-800 text-1xl font-bold mt-5 py-3 px-5 rounded-full'
                    onClick={handleListproductButton}>
                    LIST A PRODUCT
                </button>
            </div>
            <div className=' pt-24 ml-auto'>
                <Image src="/shop.png" alt="BB Icon 1" className='pt-6' width={400} height={400} />
            </div>
        </div>
    );
}
