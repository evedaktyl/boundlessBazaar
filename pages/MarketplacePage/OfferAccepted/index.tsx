import Link from "next/link";

export default function OfferAccepted() {

    return (
        <>
        <div className="mt-2 text-blue-800 text-6xl leading-24 font-bold pb-4 text-left px-52 pr-80">
          Offer successfully accepted!
        </div>
        <Link href="/" className="mt-2 text-blue-800 text-2xl leading-24 font-bold pb-20 text-left px-52 pr-80 underline">
        Head over to your profile to see all accepted offers.
      </Link>
      </>
      );
}