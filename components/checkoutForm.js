import {
    PaymentElement,
    LinkAuthenticationElement
  } from '@stripe/react-stripe-js'
  import {useState} from 'react'
  import {useStripe, useElements} from '@stripe/react-stripe-js';
  import { useRouter } from 'next/router';
  
  export default function CheckoutForm({ paymentIntentID, travellerStripeID, productOffer, productTitle }) {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setIsLoading(true);


      const transferDataSend = {
        travellerStripeID,
        paymentIntentID,
        productTitle,
        productOffer
      };

      const transfer = await fetch('/api/handlePayment', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(transferDataSend)
    });
    const transferData = await transfer.json();
    console.log(transferData);
    
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: 'boundless-bazaar-git-stripenewstructure-evedaktyl.vercel.app',
        },
      });
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.

      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setIsLoading(false);
        router.push('./Payment/PaymentSuccess');
      }
  
    }
  
    return (
      <form id="payment-form" onSubmit={handleSubmit} className='mx-[20%] mt-5 font-bold'>
        <LinkAuthenticationElement id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          // options={{defaultValues: {email: 'foo@bar.com'}}}
          />
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit"
                className='bg-green-700 hover:bg-green-900 text-white text-4xl
                            font-bold py-2 px-4 rounded-lg mt-10'>
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    )
  }