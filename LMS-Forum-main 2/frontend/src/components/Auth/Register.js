
// import React, { useState } from 'react';
// import axios from 'axios';

// function Register() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('User');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/api/auth/register', { username, email, password, role });
//             window.location.href = '/login';
//         } catch (error) {
//             console.error('Registration failed:', error);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
//                 <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Register</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="mb-4">
//                         <input
//                             type="text"
//                             id="username"
//                             name="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             placeholder="Username"
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Email"
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Password"
//                             required
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <select
//                             id="role"
//                             name="role"
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         >
//                             <option value="User">User</option>
//                             <option value="Admin">Admin</option>
//                         </select>
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     >
//                         Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const [error, setError] = useState('');  // Error state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous errors
        try {
            await axios.post('/api/auth/register', { username, email, password, role });
            window.location.href = '/login';
        } catch (error) {
            setError(error.response?.data?.error || 'Registration failed');  // Display backend error message
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Register</h2>
                {error && <p className="mb-4 text-center text-red-500">{error}</p>}  {/* Show error message */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
