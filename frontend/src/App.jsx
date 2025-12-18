import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/login'
import NotFound from './pages/NotFound'
import Register from './pages/register'

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}
function RegisterAndLogout(){
  localStorage.clear();
  return <Register />
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} /> //catch-all route for undefined paths
      </Routes>

    </BrowserRouter>
  )
}

export default App
