import axios from "axios";
import React, { use } from "react";
import Context from "../Contexts/Context";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
  withCredentials: true,
});

const AxiosSecure = () => {
  const { user } = use(Context);
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default AxiosSecure;
