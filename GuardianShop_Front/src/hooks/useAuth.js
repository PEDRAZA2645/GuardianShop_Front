import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // Estado para manejar la autenticación
    const navigate = useNavigate();

    // Verificar si ya hay una sesión activa (por ejemplo, un token almacenado en localStorage)
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);  // Si hay un token, asumimos que está autenticado
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAuth = async (mode) => {
        try {
            let response;
            if (mode === 'login') {
                response = await axios.post('http://localhost:8082/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });
                // Suponemos que el backend devuelve un token para la autenticación
                localStorage.setItem('authToken', response.data.token); // Guardar el token
                setIsAuthenticated(true); // Usuario autenticado correctamente
                navigate('/products'); // Redirigir a productos
            } else if (mode === 'register') {
                response = await axios.post('http://localhost:8082/auth/register', {
                    ...formData,
                });
                navigate('/register');
            }
            setMessage(response.data.message || 'Success!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return [
        formData,
        message,
        handleInputChange,
        handleAuth,
        isAuthenticated,  // Devolver el estado de autenticación
        logout,
    ];
};

export default useAuth;
