/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import { registerRequest, loginRequest, indicatorRequest, profileRequest, updateProfileRequest, verifyTokenRequest, createGoalRequest } from "../api/auten";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

export const AuthenContext = createContext();

export const useAuten = () => {
    const context = useContext(AuthenContext);
    console.log(context)
    if (!context) {
        throw new Error('useAuten must be used within an AuthenProvider');
       
    }

    return context;
};

export const AutenProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitErrors, setSubmitErrors] = useState([]); 

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            setErrors([error.response.data]);
            console.log(error.response);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            localStorage.setItem("token",res.data.token);
            setErrors([]);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data]);
            }
        }
    };

    const signout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    const indicator = async (indicadorData) => {
        try {
            const res = await indicatorRequest(indicadorData);
            console.log(res.data);
            setErrors([]);
        } catch (error) {
            setErrors([error.response.data]);
            console.log(error.response);
        }
    };

    const createGoal = async (objetivoData) => {
        try {
            const res = await createGoalRequest(objetivoData); 
            console.log(res.data);
            setErrors([]); 
        } catch (error) {
            setErrors([error.response.data]);
            console.log(error.response);
        }
    };

    const getIndicadores = async (num_doc) => {
        try {
            const response = await axios.get(`/indicators?usuarios_num_doc=${num_doc}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los indicadores:", error);
            return [];
        }
    };

    const profile = async () => {
       if(user.num_doc){
        try {
            console.log({user})
            const res = await profileRequest(user.num_doc); 
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
       }
    };

    const updateProfile = async (userData) => {
        try {
            const res = await updateProfileRequest(userData);
            setUser(res.data);
            setErrors([]);
        } catch (error) {
            setErrors([error.response.data]);
            console.log(error.response);
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const token = localStorage.getItem("token");
            console.log("hola mundo");
            console.log(token);
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(token);
                console.log(res)
                console.log(token)
                setIsAuthenticated(true);
                setUser(res.data);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkLogin().then(data => console.log(data));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenContext.Provider value={{ signup, signin, signout, indicator, createGoal, getIndicadores, user, profile, updateProfile, isAuthenticated, errors, loading, submitErrors }}>
            {children}
        </AuthenContext.Provider>
    );
};

AutenProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
