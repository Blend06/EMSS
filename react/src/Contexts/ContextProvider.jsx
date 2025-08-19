/* @refresh reset */
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axiosClient from "../axios.js";

const StateContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN") || null);
  const [loading, setLoading] = useState(true);

  const setToken = (t) => {
    _setToken(t);
    if (t) {
      localStorage.setItem("ACCESS_TOKEN", t);
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      delete axiosClient.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    let cancelled = false;
    if (!token) {
      setLoading(false);
      return;
    }
    axiosClient
      .get("/user")
      .then(({ data }) => {
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setToken(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const value = useMemo(() => ({ user, token, setUser, setToken }), [user, token]);

  return <StateContext.Provider value={value}>{!loading && children}</StateContext.Provider>;
};

export const useStateContext = () => {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("useStateContext must be used within <ContextProvider>");
  return ctx;
};

export default ContextProvider;
