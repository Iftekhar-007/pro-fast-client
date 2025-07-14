// utils/trackParcel.js
// import AxiosSecure from "../Hooks/AxiosSecure";

import AxiosSecure from "./AxiosSecure";

// import AxiosSecure from "./AxiosSecure";

const TrackParcel = async ({ trackingId, parcelId, status, message }) => {
  const axiosSecure = AxiosSecure();

  try {
    const res = await axiosSecure.post("/track/logs", {
      trackingId,
      parcelId,
      status,
      message,
    });
    return res.data;
  } catch (err) {
    console.error("Tracking log failed:", err.message);
  }
};

export default TrackParcel;
