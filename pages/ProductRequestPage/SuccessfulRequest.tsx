'use client';
import Link from "next/link";
import React from "react";

function SuccessfulRequest() {
    return (
        <div className="ml-[10%]">
            <h1 className='text-blue-800 text-6xl font-bold mb-5'>
                Success!
            </h1>
            <Link href="/profile" className="mt-2 text-blue-800 text-2xl font-semibold pb-20 text-left underline">
                Head over to your profile to see your product listed on the profile page.
            </Link>
        </div>
    )
}

export default SuccessfulRequest;