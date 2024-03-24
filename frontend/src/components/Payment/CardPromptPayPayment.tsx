import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

const CardPromptPayPayment = () => {
    const { bookingId } = useParams()



  return (
    <div>
        <form action={process.env.REACT_APP_BACKEND_URL + "/payment/create-checkout-session/" + bookingId} method="POST">
            <button type="submit" className="primary-button">
                Checkout
            </button>
        </form>
    </div>
  )
}

export default CardPromptPayPayment