import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

//prevents a user from accessing a route if not authenticated and redirects to login page
function ProtectedRoute({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => { // on component mount, check if user is authenticated and uses the auth function to verify token validity
        auth().catch(() => setIsAuthenticated(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post('/auth/refresh/', {
                refresh: refreshToken
            });
            if (response.status === 200){ // if refresh token is valid, update access token
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthenticated(true)
            }
            else {
                setIsAuthenticated(false)
            }
        }
        catch (error) {
            console.error('Error refreshing token:', error);
            setIsAuthenticated(false)
        }
    };
    const auth = async () => {
        const toke = localStorage.getItem(ACCESS_TOKEN);//used to check if user is authenticated and has valid token
        if(!token){
            setIsAuthenticated(false)
            return
        }
        const decode = jwtDecode(token);
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000; // in seconds

        if(tokenExpiration < now){
            await refreshToken();
        }else{
            setIsAuthenticated(true)
        }

    }

    if (isAuthenticated === null) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? children: <Navigate to="/login" />
}

export default ProtectedRoute;