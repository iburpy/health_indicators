import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/auten";
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
            setErrors([]); // Clear errors on successful signup
        } catch (error) {
            setErrors(error.response.data); // Assuming the errors are in error.response.data
            console.log(error.response);
        }
    };

    const signin = async(user) => {
      try{
        const res = await loginRequest(user);
        console.log(res)
      }catch (error){
        setErrors(error.response.data)
      }
    }

    return (
        <AuthenContext.Provider value={{ signup, user, isAuthenticated, errors,signin }}>
            {children}
        </AuthenContext.Provider>
    );
};

AutenProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
