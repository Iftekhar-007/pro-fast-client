// import React from "react";

// const CompletedDeliveries = () => {
//   return (
//     <div>
//       <h1>com</h1>
//     </div>
//   );
// };

// export default CompletedDeliveries;

import React, { use, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Context from "../Contexts/Context";
import AxiosSecure from "../Hooks/AxiosSecure";

const CompletedDeliveries = () => {
  const { user } = use(Context);
  const axiosSecure = AxiosSecure();
  const [loadingParcelId, setLoadingParcelId] = useState(null);

  // ✅ Get completed deliveries for this rider
  const {
    data: deliveries = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/completed-deliveries?email=${user.email}`
      );
      return res.data;
    },
  });

  // ✅ Handle single cashout
  const cashoutMutation = useMutation({
    mutationFn: async ({ amount, parcelId }) => {
      return axiosSecure.patch("/riders/cashout", { amount, parcelId });
    },

    onSuccess: (res) => {
      toast.success(res.data.message || "Cashout successful!");
      refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Cashout failed");
    },
    onSettled: () => {
      setLoadingParcelId(null);
    },
  });

  const calculateEarning = (parcel) => {
    return parcel.senderDistrict === parcel.receiverDistrict ? 80 : 150;
  };

  const handleCashout = (parcel) => {
    const amount = calculateEarning(parcel);
    setLoadingParcelId(parcel._id);
    cashoutMutation.mutate({ amount, parcelId: parcel._id });
  };

  if (isLoading) return <p className="text-center">Loading deliveries...</p>;
  if (error)
    return <p className="text-red-500 text-center">Failed to fetch data.</p>;

  return (
    <div className="w-11/12 mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">📦 Completed Deliveries</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-base-200">
              <th>Tracking ID</th>
              <th>From</th>
              <th>To</th>
              <th>Pickup Time</th>
              <th>Delivered Time</th>
              <th>Status</th>
              <th>Earning</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.trackingId}</td>
                <td>
                  {parcel.senderServiceCenter}, {parcel.senderDistrict}
                </td>
                <td>
                  {parcel.receiverServiceCenter}, {parcel.receiverDistrict}
                </td>
                <td>
                  {parcel.pickupTime
                    ? new Date(parcel.pickupTime).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  {parcel.deliveredTime
                    ? new Date(parcel.deliveredTime).toLocaleString()
                    : "N/A"}
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td>৳ {calculateEarning(parcel)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleCashout(parcel)}
                    disabled={
                      loadingParcelId === parcel._id || parcel.isCashedOut
                    }
                  >
                    {loadingParcelId === parcel._id
                      ? "Processing..."
                      : parcel.isCashedOut
                      ? "Cashed Out"
                      : "Cashout"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
