import axios from "axios";
import React, { use } from "react";
import Context from "../Contexts/Context";
import { Navigate, useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
  withCredentials: true,
});

const AxiosSecure = () => {
  const { user, logOutUser } = use(Context);
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.status);
      const status = error.status;
      if (status === 401) {
        logOutUser()
          .then(() => {
            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (status === 403) {
        console.log("forbidden access!!!!");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default AxiosSecure;
