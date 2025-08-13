// src/context/context.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios.js"; 

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize as null
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN") || null);
    const [loading, setLoading] = useState(true); // Optional: Loading state

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
            delete axiosClient.defaults.headers.common['Authorization'];
        }
    };

    useEffect(() => {
        if (token) {
            // Set the token in axios headers
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Fetch user data
            axiosClient.get('/user')  
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(() => {
                    setToken(null);  
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {!loading && children} {/* Render children only after loading */}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);