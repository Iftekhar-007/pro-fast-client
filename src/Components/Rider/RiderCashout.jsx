import React, { useState, useEffect } from "react";
import axios from "axios";
import AxiosSecure from "../Hooks/AxiosSecure";

const RiderCashout = ({ riderEmail, token }) => {
  const [earnings, setEarnings] = useState(0);
  const [cashedOut, setCashedOut] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [cashoutAmount, setCashoutAmount] = useState("");
  const [message, setMessage] = useState("");

  const axiosSecure = AxiosSecure();

  // Fetch earnings and cashout data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch rider info (including totalCashedOut)
        const riderRes = await axios.get(
          `/api/riders/info?email=${riderEmail}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Fetch delivered parcels to calculate earnings
        const parcelsRes = await axios.get(
          `/api/riders/completed-deliveries?email=${riderEmail}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const riderData = riderRes.data;
        const parcels = parcelsRes.data;

        const totalEarned = parcels.reduce((acc, parcel) => {
          return (
            acc + (parcel.receiverDistrict === riderData.district ? 80 : 150)
          );
        }, 0);

        setEarnings(totalEarned);
        setCashedOut(riderData.totalCashedOut || 0);
        setAvailableBalance(totalEarned - (riderData.totalCashedOut || 0));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [riderEmail, token]);

  const handleCashout = async () => {
    const amountNum = parseFloat(cashoutAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setMessage("Please enter a valid cashout amount");
      return;
    }
    if (amountNum > availableBalance) {
      setMessage("Cashout amount exceeds available balance");
      return;
    }

    try {
      const res = await axios.patch(
        "/api/riders/cashout",
        { amount: amountNum },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setAvailableBalance(res.data.newBalance);
      setCashoutAmount("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Cashout failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Your Earnings & Cashout</h2>
      <p>Total Earned: ৳{earnings}</p>
      <p>Total Cashed Out: ৳{cashedOut}</p>
      <p>Available Balance: ৳{availableBalance}</p>

      <input
        type="number"
        min="0"
        max={availableBalance}
        placeholder="Enter cashout amount"
        value={cashoutAmount}
        onChange={(e) => setCashoutAmount(e.target.value)}
        className="input input-bordered w-full my-2"
      />

      <button
        onClick={handleCashout}
        disabled={availableBalance <= 0}
        className="btn btn-primary w-full"
      >
        Request Cashout
      </button>

      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
};

export default RiderCashout;
