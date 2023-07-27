'use client';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/checkoutForm';
import { Console } from 'console';


export default function Payment() {
    const router = useRouter();

    const stripeKey: string = (router.query.stripeKey) ? router.query.stripeKey.toString() : 'test';
    const paymentIntentID: string = (router.query.paymentIntentID) ? router.query.paymentIntentID.toString() : 'test';
    const travellerStripeID: string = (router.query.travellerStripeID) ? router.query.travellerStripeID.toString() : 'test';
    const porductOffer = router.query.productOffer;
    const productTitle = router.query.productTitle;

    console.log(porductOffer);
    console.log(productTitle);
    console.log(stripeKey);
    const stripePromise = loadStripe('pk_test_51M9tQUIhG09DVV9L6PPCSgmk1pzsVpjmy4T7urwEbJfKuzEbmuZK7yciXD3EmYFAw0OfNt43yRyCAk5PIzYyalnh00Dsn74z7G');

    
    // const options = JSON.parse((router.query.options) ? router.query.options.toString() : '');
    const clientSecret = (router.query.clientSecret) ? router.query.clientSecret.toString() : '';


    // const stripe = useStripe();
    // const elements = useElements();

    console.log(stripePromise);
    console.log(clientSecret);


    // const handleSubmit = async (event: any) => {
    //     // We don't want to let default form submission happen here,
    //     // which would refresh the page.
    //     event.preventDefault();
    
    //     if (!stripe || !elements) {
    //       // Stripe.js hasn't yet loaded.
    //       // Make sure to disable form submission until Stripe.js has loaded.
    //       return;
    //     }
    
    //     const result = await stripe.confirmPayment({
    //       //`Elements` instance that was used to create the Payment Element
    //       elements,
    //       confirmParams: {
    //         return_url: "https://example.com/order/123/complete",
    //       },
    //     });
    //     if (result.error) {
    //         // Show error to your customer (for example, payment details incomplete)
    //         console.log(result.error.message);
    //       } else {
    //         // Your customer will be redirected to your `return_url`. For some payment
    //         // methods like iDEAL, your customer will be redirected to an intermediate
    //         // site first to authorize the payment, then redirected to the `return_url`.
    //       }
    //     };

    return (
        // <h1>
        //     <Elements stripe={stripePromise} options={options}>
        //     <form id="payment-form" data-secret={clientSecret}>
        //     <div id="payment-element">
        //         {/* <!-- Elements will create form elements here --> */}
        //     </div>

        //     <button id="submit">Submit</button>
        //     </form>
        //     </Elements>
        // </h1>
        <>
        <h1 className='mx-[10%] '>Payment</h1>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret, }}>
            <CheckoutForm paymentIntentID={paymentIntentID} travellerStripeID={travellerStripeID}
                            productOffer={porductOffer} productTitle={productTitle} />
          </Elements>
        )}
      </>
    )
}