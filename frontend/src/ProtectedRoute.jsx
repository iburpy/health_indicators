import { Navigate, Outlet } from "react-router-dom";
import { useAuten } from "./context/AutenContext";

function ProtectedRoute() {
    const { loading, user, isAuthenticated } = useAuten();
    console.log(loading, user, isAuthenticated);

    if (loading) return <div>Loading...</div>;
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />;
    
    return <Outlet />;
}

export default ProtectedRoute;
