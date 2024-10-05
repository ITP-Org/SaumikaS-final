

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import PostList from './components/Forum/PostList';
import SearchResults from './components/SearchResults';
import PostDetails from './components/PostDetails';
import ReportPage from './components/ReportPage';
import Forum_Admin from './components/Forum_Admin';

import NavBar from './navBar';

function App() {
    const location = useLocation();

    // Check if the current path is for the admin forum or report page
    const showNavBar = location.pathname === '/forum_admin' || location.pathname === '/report';
    const showHeaderFooter = !(location.pathname === '/forum_admin' || location.pathname === '/report');

    return (
        <div>
            {showHeaderFooter && <Header />} {/* Conditionally render Header */}
            {showNavBar && <NavBar />} {/* Conditionally render NavBar */}

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/postlist" element={<PostList />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/report" element={<ReportPage />} /> {/* Report Page */}
                <Route path="/forum_admin" element={<Forum_Admin />} />  {/* Admin Page */}
            </Routes>
            {showHeaderFooter && <Footer />} {/* Conditionally render Footer */}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
