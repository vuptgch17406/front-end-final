import React from "react";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    user: {},
    token: ""
  });

  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const res = error.response;
      if (res.status === 401 && !res.config.__isRetry) {
        setState(null);
        window.localStorage.removeItem("auth");
        navigate("/login");
      }
    }
  );

  return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
