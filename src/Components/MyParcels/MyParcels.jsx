import React, { use } from "react";
import Context from "../Contexts/Context";
import AxiosSecure from "../Hooks/AxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyParcels = () => {
  const { user } = use(Context);
  const axiosSecure = AxiosSecure();

  const {
    data: parcels = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`my-parcels?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(parcels);

  if (isPending) {
    <>
      <h4>Loding.......</h4>
    </>;
  }

  const handleDelete = (id) => {
    // TODO: Add confirmation and delete request
    refetch();
    console.log("Deleting parcel with ID:", id);
  };

  const handlePay = (parcel) => {
    // TODO: Integrate payment logic
    console.log("Paying for parcel:", parcel);
  };

  const handleViewDetails = (parcel) => {
    // TODO: Open modal or navigate to detail page
    console.log("Viewing parcel:", parcel);
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📦 My Parcels</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Receiver</th>
              <th className="border p-2">Delivery Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Cost</th>
              <th className="border p-2">Created</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50 transition">
                <td className="border p-2 font-medium">{parcel.title}</td>
                <td className="border p-2">{parcel.type}</td>
                <td className="border p-2">{parcel.receiverName}</td>

                <td className="border p-2 capitalize">
                  {parcel.deliveryStatus}
                </td>
                <td className="border p-2">
                  {parcel.paymentStatus === "paid" ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="border p-2">৳{parcel.deliveryCost}</td>
                <td className="border p-2">
                  {new Date(parcel.creation_date).toLocaleString()}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleViewDetails(parcel)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                  {parcel.paymentStatus === "unpaid" && (
                    <button
                      onClick={() => handlePay(parcel)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td className="p-4 text-center" colSpan={8}>
                  😶 No parcels found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
