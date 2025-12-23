import React, { useEffect, useState } from "react";
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
    event.preventDefault();
    setLoader(true);

    if (!stripe || !elements) {
      setLoader(false);
      return;
    }
     const result=fetch("http://localhost:8000/paymentreigster",{
        method:"POST"
      })
      
    const { error } = await stripe.confirmPayment({
 
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment/success",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoader(false);
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

export default function Payment({ price }) {
  const [loader, setLoader] = useState(false);
  const [clientsecret, setclientsecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/createintent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => setclientsecret(data.clientsecret));
  }, [price]);
  const options = {
    clientSecret: clientsecret,
    appearance: { theme: "stripe" },
  };

  return (
    <>
      {loader && <Loader />}
      {clientsecret && (
        <div className="strip-pay d-flex justify-content-center align-items-center">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm setLoader={setLoader} price={price}  />
          </Elements>
        </div>
      )}
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
