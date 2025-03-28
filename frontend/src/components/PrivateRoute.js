import React from 'react'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    return token ? children : <Navigate to="/Login"/>;
};

export default PrivateRoute;

/** this means if the JWT token exist show protected subdomains. */