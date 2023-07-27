import Link from "next/link";

export default function PaymentSuccess() {

    return (
        <>
        <div className="mt-2 text-blue-800 text-6xl leading-24 font-bold pb-4 text-left px-52 pr-80">
          Payment Successful!
        </div>
        <Link href="/profile" className="mt-5 text-blue-800 text-2xl leading-24 font-bold pb-20 text-left px-52 pr-80 underline">
            Chat with your traveller through your profile page here for any further clarifications!
      </Link>
      </>
      );
}