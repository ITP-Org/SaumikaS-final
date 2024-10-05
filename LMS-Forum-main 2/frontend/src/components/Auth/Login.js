

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // Error state
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous errors
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('role', response.data.user.role);
                
                // Redirect based on role
                if (response.data.user.role === 'Admin') {
                    navigate('/forum_admin');  // Redirect admin to Forum_Admin page
                } else {
                    navigate('/');  // Redirect regular users to the home page
                }
            } else {
                setError('Login failed: Token is undefined');  // Set error
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');  // Display backend error message
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Login</h2>
                {error && <p className="mb-4 text-center text-red-500">{error}</p>}  {/* Show error message */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        New user? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
