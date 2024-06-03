import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest, indicatorRequest } from "../api/auten";
import PropTypes from "prop-types";

export const AuthenContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
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

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response);
        }
    };

    const signin = async(user) => {
      try {
        const res = await loginRequest(user);
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors([]);
      } catch (error) {
        setErrors(error.response.data);
        console.log(error.response);
      }
    };

    const indicator = async (indicadorData) => {
        try {
            const res = await indicatorRequest(indicadorData);
            console.log(res.data);
            setErrors([]);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response);
        }
    };

    return (
        <AuthenContext.Provider value={{ signup, signin, user, isAuthenticated, errors, indicator }}>
            {children}
        </AuthenContext.Provider>
    );
};

AutenProvider.propTypes = {
    children: PropTypes.node.isRequired,
};