/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import {
    registerRequest,
    loginRequest,
    indicatorRequest,
    profileRequest,
    updateProfileRequest,
    verifyTokenRequest,
    createGoalRequest
} from "../api/auten";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

export const AuthenContext = createContext();

export const useAuten = () => {
    const context = useContext(AuthenContext);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const clearErrorsAfterTimeout = () => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    };

    const handleErrorResponse = (error, setErrorState) => {
        const errorResponse = error.response.data;
        if (Array.isArray(errorResponse)) {
            setErrorState(errorResponse);
        } else {
            setErrorState([errorResponse]);
        }
    };

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            handleErrorResponse(error, setErrors);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            handleErrorResponse(error, setErrors);
        }
    };

    const indicator = async (indicadorData) => {
        try {
            const res = await indicatorRequest(indicadorData);
            setErrors([]);
        } catch (error) {
            handleErrorResponse(error, setSubmitErrors);
        }
    };

    const createGoal = async (objetivoData) => {
        try {
            const res = await createGoalRequest(objetivoData);
            setErrors([]);
        } catch (error) {
            handleErrorResponse(error, setErrors);
        }
    };

    const getIndicatorsByNumDoc = async (num_doc) => {
        try {
            const res = await axios.get(`/indicator/${num_doc}`);
            return res.data.indicators;
        } catch (error) {
            console.error("Error al obtener los indicadores por número de documento:", error);
            return [];
        }
    };

    const profile = async () => {
        try {
            const res = await profileRequest(user.num_doc);
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateProfile = async (userData) => {
        try {
            const res = await updateProfileRequest(userData);
            setUser(res.data);
            setErrors([]);
        } catch (error) {
            handleErrorResponse(error, setErrors);
        }
    };

    useEffect(() => {
        clearErrorsAfterTimeout();
    }, [errors, clearErrorsAfterTimeout]);

    useEffect(() => {
        const checkLogin = async () => {
            const token = Cookies.get('token');

            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(token);
                setIsAuthenticated(true);
                setUser(res.data);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenContext.Provider value={{
            signup,
            signin,
            indicator,
            createGoal,
            getIndicatorsByNumDoc,
            user,
            profile,
            updateProfile,
            isAuthenticated,
            errors,
            loading,
            submitErrors
        }}>
            {children}
        </AuthenContext.Provider>
    );
};

AutenProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
