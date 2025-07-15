import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import AxiosSecure from "../Hooks/AxiosSecure";

const PaymentForm = () => {
  const axiosSecure = AxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();

  const [error, seterror] = useState("");

  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <>
        <p>Loading.........</p>
      </>
    );
  }

  console.log(parcelInfo);
  const amount = parcelInfo.deliveryCost;
  const amountInCents = amount * 100;
  console.log(amountInCents);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      seterror(error?.message);
      //   console.log("error", error);
    } else {
      seterror("");
      console.log("paymentMethod", paymentMethod);
    }

    // step-2 create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Jenny Rosen",
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
      }
    }

    console.log(res);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:w-[720px] lg:mx-auto shadow-2xl bg-gray-200 lg:p-6 rounded-2xl"
      >
        <CardElement></CardElement>
        <button
          className="btn btn-primary text-black w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay BDT:{amount} for Parcel PickUp
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
