import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const{user,loading} = useContext(AuthContext);
    if(loading){
        return <div className="flex justify-center items-center min-h-screen">
            <span style={{"--size": "12rem"}} className="loading loading-spinner text-warning"></span>
        </div>
    }
    if(user){
        return children
    }
    return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;