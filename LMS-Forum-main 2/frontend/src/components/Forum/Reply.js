

// import React, { useState } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

// function Reply({ reply, onVote, onDelete, onEdit }) {
//     const [editing, setEditing] = useState(false);
//     const [editContent, setEditContent] = useState(reply.content);

//     const loggedInUserId = localStorage.getItem('userId');
//     const loggedInUserRole = localStorage.getItem('role');

//     if (!reply) {
//         return <div className="text-gray-500">No reply available</div>;
//     }

//     const handleVote = async () => {
//         try {
//             const response = await axios.post(`/api/replies/${reply._id}/vote`, null, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });

//             if (response.data && response.data.reply) {
//                 onVote(response.data.reply);
//             } else {
//                 console.error('Vote response does not contain the expected reply object.');
//             }
//         } catch (error) {
//             console.error('Failed to vote:', error);
//         }
//     };

//     const handleDelete = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const response = await axios.delete(`/api/replies/${reply._id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             onDelete(reply._id);
//         } catch (error) {
//             console.error('Failed to delete reply:', error.response?.data || error.message);
//             alert('Failed to delete reply: ' + (error.response?.data.error || 'Unknown error'));
//         }
//     };

//     const handleEdit = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const response = await axios.put(`/api/replies/${reply._id}`, { content: editContent }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             onEdit(response.data.reply);
//             setEditing(false);
//         } catch (error) {
//             console.error('Failed to update reply', error);
//         }
//     };

//     return (
//         <div className="p-4 mb-2 border border-gray-200 rounded-[25px] bg-gray-50">
//             {editing ? (
//                 <textarea
//                     value={editContent}
//                     onChange={(e) => setEditContent(e.target.value)}
//                     className="w-full p-2 mb-2 border border-gray-300 rounded-[25px]"
//                 />
//             ) : (
//                 <p className="mb-2">{reply.content}</p>
//             )}
//             <p className="mb-2 text-sm text-gray-500">By {reply.author?.username || 'Anonymous'}</p>
//             {(reply.author._id === loggedInUserId || loggedInUserRole === 'Admin') && (
//                 <div className="flex items-center mt-2 space-x-4">
//                     {editing ? (
//                         <button onClick={handleEdit} className="text-blue-500 hover:text-blue-600">
//                             Save
//                         </button>
//                     ) : (
//                         <button onClick={() => setEditing(true)} className="text-blue-500 hover:text-blue-600">
//                             <FontAwesomeIcon icon={faEdit} />
//                         </button>
//                     )}
//                     <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
//                         <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                 </div>
//             )}
//             <button onClick={handleVote} className="px-2 py-1 text-white rounded-[25px] hover:bg-[#8e9afa] bg-[#8b7ae6] focus:outline-none">
//                 <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
//                 Vote ({reply.votes})
//             </button>
//         </div>
//     );
// }

// export default Reply;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function Reply({ reply, onVote, onDelete, onEdit }) {
    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(reply.content);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [loggedInUserRole, setLoggedInUserRole] = useState(null);

    useEffect(() => {
        // Fetch the user ID and role from localStorage whenever the component renders
        setLoggedInUserId(localStorage.getItem('userId'));
        setLoggedInUserRole(localStorage.getItem('role'));
    }, []);

    if (!reply) {
        return <div className="text-gray-500">No reply available</div>;
    }

    const handleVote = async () => {
        try {
            const response = await axios.post(`/api/replies/${reply._id}/vote`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data && response.data.reply) {
                onVote(response.data.reply);
            } else {
                console.error('Vote response does not contain the expected reply object.');
            }
        } catch (error) {
            console.error('Failed to vote:', error);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`/api/replies/${reply._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onDelete(reply._id);
        } catch (error) {
            console.error('Failed to delete reply:', error.response?.data || error.message);
            alert('Failed to delete reply: ' + (error.response?.data.error || 'Unknown error'));
        }
    };

    const handleEdit = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`/api/replies/${reply._id}`, { content: editContent }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onEdit(response.data.reply);
            setEditing(false);
        } catch (error) {
            console.error('Failed to update reply', error);
        }
    };

    return (
        <div className="p-4 mb-2 border border-gray-200 rounded-[25px] bg-gray-50">
            {editing ? (
                <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 mb-2 border border-gray-300 rounded-[25px]"
                />
            ) : (
                <p className="mb-2">{reply.content}</p>
            )}
            <p className="mb-2 text-sm text-gray-500">By {reply.author?.username || 'Anonymous'}</p>
            {(reply.author._id === loggedInUserId || loggedInUserRole === 'Admin') && loggedInUserId && loggedInUserRole && (
                <div className="flex items-center mt-2 space-x-4">
                    {editing ? (
                        <button onClick={handleEdit} className="text-blue-500 hover:text-blue-600">
                            Save
                        </button>
                    ) : (
                        <button onClick={() => setEditing(true)} className="text-blue-500 hover:text-blue-600">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    )}
                    <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )}
            <button onClick={handleVote} className="px-2 py-1 text-white rounded-[25px] hover:bg-[#8e9afa] bg-[#8b7ae6] focus:outline-none">
                <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                Vote ({reply.votes})
            </button>
        </div>
    );
}

export default Reply;
