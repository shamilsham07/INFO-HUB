import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import Sidbar from "./sidbar";
import Loader from "./loader";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ setLoader }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoader(false);
      return;
    }
    const res = await fetch("http://localhost:8000/create-intent", {
      method: "POST",
    });

    const { client_secret: clientSecret } = await res.json();
    setLoader(false);

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/payment/success",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      console.log(error.message);
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="d-flex justify-content-center align-items-center pt-2">
        <button
          type="submit"
          className="payment-btn"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </div>

      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51SbLboE14I39MgoAZp0PgN5UzNefNXYpNWKvFoiP0hmPMNF8OPguYXzsdjGqWFZb6XwxE9zj0BiweQek0aZdZirs00pfjPwOVA"
);

const options = {
  mode: "payment",

  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

export default function Payment() {
  const [loader, setLoader] = useState(false);

  return (
    <>
      <Sidbar active={"payment"} />
      {loader && <Loader />}
      <div className="strip-pay d-flex justify-content-center align-items-center">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm setLoader={setLoader} />
        </Elements>
      </div>
    </>
  );
}

export function Paymentsuccess() {
  return (
    <>
      <div className=" d-flex justify-content-center align-items-center text-primary">
        successs
      </div>
    </>
  );
}
