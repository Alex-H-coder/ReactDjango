import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

//prevents a user from accessing a route if not authenticated and redirects to login page
function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => { // on component mount, check if user is authorized and uses the auth function to verify token validity
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => { // function to refresh access token using refresh token automatically
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post('token/refresh/', {
                refresh: refreshToken
            });
            if (response.status === 200){ // if refresh token is valid, update access token
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true)
            }
            else {
                setIsAuthorized(false)
            }
        }
        catch (error) {
            console.log('Error refreshing token:', error);
            setIsAuthorized(false)
        }
    };


    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);//used to check if user is authorized and has valid token
        if(!token){ // if no token found, user is not authorized
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token); // Decode the JWT to get its expiration time
        const tokenExpiration = decoded.exp // expiration time in seconds
        const now = Date.now() / 1000; // in seconds

        if(tokenExpiration < now){
            await refreshToken()
        }
        else{
            setIsAuthorized(true)
        }

    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children: <Navigate to="/login" />
}

export default ProtectedRoute;