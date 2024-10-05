

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-ss.png';  // Import the logo image

function Header() {
    return (
        <header className="p-4 bg-white">
            <div className="container flex items-center justify-between mx-auto">
                {/* Logo Section */}
                <div className="text-xl font-bold">
                    <Link to="/" className="flex items-center text-gray-800">
                        <img src={logo} alt="Forum Logo" className="h-16 mr-2" />
                    </Link>
                </div>
                <nav className="flex items-center space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-blue-500">
                        Course Content
                    </Link>
                    <Link to="/blog" className="text-gray-700 hover:text-blue-500">
                        Forum
                    </Link>
                    <Link to="/contact" className="text-gray-700 hover:text-blue-500">
                        Cart
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
