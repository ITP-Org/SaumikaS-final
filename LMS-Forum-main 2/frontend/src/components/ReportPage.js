

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate
// import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';  // Import necessary icons

// function ReportPage() {
//     const [report, setReport] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const token = localStorage.getItem('token');
//     const username = localStorage.getItem('username');

//     useEffect(() => {
//         const fetchReport = async () => {
//             try {
//                 const response = await axios.get('/api/posts/admin/report', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 console.log('Report Data:', response.data.report);  // Log full report data
//                 console.log('Most Voted Reply:', response.data.report.mostVotedReply);  // Log mostVotedReply specifically
//                 setReport(response.data.report);
//             } catch (error) {
//                 setError('Failed to fetch report');
//                 console.error('Error fetching report:', error);
//             }
//         };

//         fetchReport();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('username');
//         localStorage.removeItem('role');
//         navigate('/login');
//     };

//     if (error) {
//         return <div className="mt-8 text-center text-red-500">{error}</div>;
//     }

//     if (!report) {
//         return <div className="mt-8 text-center text-gray-500">Loading...</div>;
//     }

//     return (
//         <div className="container p-6 mx-auto mt-8 mb-8 bg-white rounded-lg shadow-lg">
//             {/* User Info Section - Right-aligned */}
//             <div className="flex items-center justify-end mb-6 space-x-4">
//                 {username && (
//                     <span className="text-gray-700">
//                         Welcome, {username}
//                     </span>
//                 )}
//                 {!token ? (
//                     <div className="flex items-center space-x-4">
//                         <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-500">
//                             <FaSignInAlt className="mr-1" />
//                             Login
//                         </Link>
//                         <Link to="/register" className="flex items-center text-gray-700 hover:text-blue-500">
//                             <FaUserPlus className="mr-1" />
//                             Register
//                         </Link>
//                     </div>
//                 ) : (
//                     <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 focus:outline-none">
//                         <FaSignOutAlt className="mr-1" />
//                         Logout
//                     </button>
//                 )}
//             </div>

//             <h2 className="pb-2 mb-6 text-3xl font-bold text-gray-800 border-b">Forum Report</h2>

//             {/* Number of Posts per User */}
//             <div className="mb-8">
//                 <h3 className="mb-4 text-2xl font-semibold text-gray-700">Posts by User</h3>
//                 <ul className="space-y-2">
//                     {report.postsByUser && report.postsByUser.map((user, index) => (
//                         <li key={index} className="p-4 border border-blue-200 rounded-md bg-blue-50">
//                             <span className="font-medium text-gray-800">{user.username}</span>: {user.postCount} posts
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {/* Most Active Users */}
//             {report.mostActiveUsers && (
//                 <div className="mb-8">
//                     <h3 className="mb-4 text-2xl font-semibold text-gray-700">Most Active Users</h3>
//                     <ul className="space-y-2">
//                         {report.mostActiveUsers.map((user, index) => (
//                             <li key={index} className="p-4 border border-green-200 rounded-md bg-green-50">
//                                 <span className="font-medium text-gray-800">{user.username}</span>: {user.activityCount} posts and replies
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* Top Replies */}
//             {report.mostVotedReply && report.mostVotedReply.author ? (  // Ensure mostVotedReply and its author are not null
//                 <div className="mb-8">
//                     <h3 className="mb-4 text-2xl font-semibold text-gray-700">Top Replies</h3>
//                     <div className="p-4 border border-yellow-200 rounded-md bg-yellow-50">
//                         <p className="mb-2 text-lg text-gray-800">"{report.mostVotedReply.content}"</p>
//                         <p className="mb-1 text-gray-600">Votes: <span className="font-bold">{report.mostVotedReply.votes}</span></p>
//                         <p className="text-gray-600">By: <span className="font-medium">{report.mostVotedReply.author.username}</span></p>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="mb-8">
//                     <h3 className="mb-4 text-2xl font-semibold text-gray-700">Top Replies</h3>
//                     <p className="p-4 text-gray-700 rounded-md bg-yellow-50">No voted replies available.</p>
//                 </div>
//             )}

//             {/* Additional Statistics and Information */}
//             {/* Add other sections as needed based on available report data */}
//         </div>
//     );
// }

// export default ReportPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { Link, useNavigate } from 'react-router-dom';  
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa'; 

function ReportPage() {
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get('/api/posts/admin/report', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                console.log('Report Data:', response.data.report);
                setReport(response.data.report);  // Set the report data
            } catch (error) {
                setError('Failed to fetch report');
                console.error('Error fetching report:', error);
            }
        };

        fetchReport();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/login');
    };

    // Ensure the report is fully loaded before generating the PDF
    const downloadPDF = () => {
        if (!report) {
            console.error("No report data available to download.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Forum Report', 10, 10);

        // Section: Posts by User
        if (report.postsByUser && report.postsByUser.length > 0) {
            doc.setFontSize(14);
            doc.text('Posts by User:', 10, 30);
            report.postsByUser.forEach((user, index) => {
                doc.text(`${index + 1}. ${user.username}: ${user.postCount} posts`, 10, 40 + index * 10);
            });
        } else {
            doc.text('No posts available from users.', 10, 30);
        }

        // Section: Most Active Users
        if (report.mostActiveUsers && report.mostActiveUsers.length > 0) {
            const startingY = 50 + (report.postsByUser ? report.postsByUser.length * 10 : 0);
            doc.setFontSize(14);
            doc.text('Most Active Users:', 10, startingY);
            report.mostActiveUsers.forEach((user, index) => {
                doc.text(`${index + 1}. ${user.username}: ${user.activityCount} posts and replies`, 10, startingY + 10 + index * 10);
            });
        } else {
            const noDataY = 50 + (report.postsByUser ? report.postsByUser.length * 10 : 0);
            doc.text('No active users available.', 10, noDataY);
        }

        // Section: Top Replies
        const topRepliesY = 100 + (report.mostActiveUsers ? report.mostActiveUsers.length * 10 : 0);
        if (report.mostVotedReply && report.mostVotedReply.author) {
            doc.setFontSize(14);
            doc.text('Top Reply:', 10, topRepliesY);
            doc.text(`Content: "${report.mostVotedReply.content}"`, 10, topRepliesY + 10);
            doc.text(`By: ${report.mostVotedReply.author.username}`, 10, topRepliesY + 20);
            doc.text(`Votes: ${report.mostVotedReply.votes}`, 10, topRepliesY + 30);
        } else {
            doc.setFontSize(14);
            doc.text('No voted replies available.', 10, topRepliesY);
        }

        doc.save('report.pdf');
    };

    if (error) {
        return <div className="mt-8 text-center text-red-500">{error}</div>;
    }

    if (!report) {
        return <div className="mt-8 text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="container p-6 mx-auto mt-8 mb-8 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-end mb-6 space-x-4">
                {username && (
                    <span className="text-gray-700">
                        Welcome, {username}
                    </span>
                )}
                {!token ? (
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="flex items-center text-gray-700 hover:text-blue-500">
                            <FaSignInAlt className="mr-1" />
                            Login
                        </Link>
                        <Link to="/register" className="flex items-center text-gray-700 hover:text-blue-500">
                            <FaUserPlus className="mr-1" />
                            Register
                        </Link>
                    </div>
                ) : (
                    <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-700 focus:outline-none">
                        <FaSignOutAlt className="mr-1" />
                        Logout
                    </button>
                )}
            </div>

            <h2 className="pb-2 mb-6 text-3xl font-bold text-gray-800 border-b">Forum Report</h2>

            {/* Download PDF Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={downloadPDF}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Download PDF
                </button>
            </div>

            {/* Number of Posts per User */}
            <div className="mb-8">
                <h3 className="mb-4 text-2xl font-semibold text-gray-700">Posts by User</h3>
                <ul className="space-y-2">
                    {report.postsByUser && report.postsByUser.map((user, index) => (
                        <li key={index} className="p-4 border border-blue-200 rounded-md bg-blue-50">
                            <span className="font-medium text-gray-800">{user.username}</span>: {user.postCount} posts
                        </li>
                    ))}
                </ul>
            </div>

            {/* Most Active Users */}
            {report.mostActiveUsers && (
                <div className="mb-8">
                    <h3 className="mb-4 text-2xl font-semibold text-gray-700">Most Active Users</h3>
                    <ul className="space-y-2">
                        {report.mostActiveUsers.map((user, index) => (
                            <li key={index} className="p-4 border border-green-200 rounded-md bg-green-50">
                                <span className="font-medium text-gray-800">{user.username}</span>: {user.activityCount} posts and replies
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Top Replies */}
            {report.mostVotedReply && report.mostVotedReply.author ? (
                <div className="mb-8">
                    <h3 className="mb-4 text-2xl font-semibold text-gray-700">Top Replies</h3>
                    <div className="p-4 border border-yellow-200 rounded-md bg-yellow-50">
                        <p className="mb-2 text-lg text-gray-800">"{report.mostVotedReply.content}"</p>
                        <p className="mb-1 text-gray-600">Votes: <span className="font-bold">{report.mostVotedReply.votes}</span></p>
                        <p className="text-gray-600">By: <span className="font-medium">{report.mostVotedReply.author.username}</span></p>
                    </div>
                </div>
            ) : (
                <div className="mb-8">
                    <h3 className="mb-4 text-2xl font-semibold text-gray-700">Top Replies</h3>
                    <p className="p-4 text-gray-700 rounded-md bg-yellow-50">No voted replies available.</p>
                </div>
            )}
        </div>
    );
}

export default ReportPage;
