import React from "react";
import { useQuery } from "@tanstack/react-query";
// import AxiosSecure from "../Hooks/AxiosSecure";
import { format } from "date-fns";
import AxiosSecure from "../Hooks/AxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = AxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-bars loading-md text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">💳 Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra border border-base-300 text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Email</th>
              {/* <th>Role</th> */}
              <th>Amount (৳)</th>
              <th>Parcel ID</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.email}</td>
                  {/* <td>{payment.role}</td> */}
                  <td className="text-green-600 font-semibold">
                    ৳{payment.amount}
                  </td>
                  <td>{payment.parcelId}</td>
                  <td className="text-xs break-all">{payment.transactionId}</td>
                  <td>{format(new Date(payment.paidAt), "PPpp")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  💤 No payment history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
