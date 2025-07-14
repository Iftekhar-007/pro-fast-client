import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import Context from "../Contexts/Context";
import AxiosSecure from "../Hooks/AxiosSecure";

const TotalEarnings = () => {
  const { user } = use(Context);
  const axiosSecure = AxiosSecure();
  const { data: earningsSummary = {}, isLoading: loadingEarnings } = useQuery({
    queryKey: ["earningsSummary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/earning-summary?email=${user.email}`
      );

      return res.data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 shadow p-4">
          <h4 className="text-lg font-semibold">💰 Total Earning</h4>
          <p className="text-xl">৳ {earningsSummary.totalEarning || 0}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h4 className="text-lg font-semibold">💸 Cashed Out</h4>
          <p className="text-xl">৳ {earningsSummary.totalCashedOut || 0}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h4 className="text-lg font-semibold">🕒 Pending</h4>
          <p className="text-xl">৳ {earningsSummary.pendingAmount || 0}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h4 className="text-lg font-semibold">📅 Today</h4>
          <p className="text-xl">৳ {earningsSummary.todayEarning || 0}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h4 className="text-lg font-semibold">🗓️ This Week</h4>
          <p className="text-xl">৳ {earningsSummary.weeklyEarning || 0}</p>
        </div>
        <div className="card bg-base-100 shadow p-4">
          <h4 className="text-lg font-semibold">📆 This Month</h4>
          <p className="text-xl">৳ {earningsSummary.monthlyEarning || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default TotalEarnings;
