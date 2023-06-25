'use client';
import React from "react";

function SuccessfulRequest() {
    return (
        <div className="flex justify-center items-center">
            <h1 className='text-blue-800 text-6xl font-bold text-center mt-10 mr-10'>
                Success!
            </h1>
            //to be linked to individual listing
            <button className='bg-green-700 hover:bg-green-900 text-white text-4xl font-bold py-2 px-4 rounded-lg mt-10'>
                View Listing
            </button>
        </div>
    )
}

export default SuccessfulRequest;