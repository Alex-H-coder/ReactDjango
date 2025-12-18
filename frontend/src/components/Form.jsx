import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";
import "../styles/Form.css";


function Form ({route, method}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? 'Login' : 'Register' // if login, show login else register

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault() // Prevent default form submission behavior
        

        try{
            const response = await api.post(route, {username, password}) // Send form data to specified route using POST method
            if (method === 'login'){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate('/') // Redirect to home page after successful login
                console.log(response.data) // Log the response data for debugging purposes and to be deleted later
            }
            else {
                navigate('/login')
            }
        }
        catch (error){
            alert('An error occurred. Please try again.', error) // Show a generic error message on screen
            console.error('Error during form submission:', error)

        }
        finally{
            setLoading(false)
        }

    }
    return (
        <form onSubmit = {handleSubmit} className='form-container'>
            <h2>{name}</h2> {/* Display form title based on method */}
            <input className = "form-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input className = "form-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    )
}

export default Form;