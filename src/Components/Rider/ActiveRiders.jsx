import { useQuery } from "@tanstack/react-query";
// import AxiosSecure from "../../Hooks/AxiosSecure";
// import { use } from "react";
import AxiosSecure from "../Hooks/AxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = AxiosSecure();

  const {
    data: riders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading riders</p>;

  return (
    <div className="overflow-x-auto mt-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🚴‍♂️ Active Riders
      </h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>email</th>
            <th>Phone</th>
            <th>District</th>
            <th>Bike</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, i) => (
            <tr key={rider._id}>
              <td>{i + 1}</td>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.phone}</td>
              <td>{rider.district}</td>
              <td>{rider.bikeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveRiders;
