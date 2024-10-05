
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Reply from './Reply';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Post({ post, onDelete }) {
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(post.content);
    const navigate = useNavigate();

    // Track the logged-in user information
    const loggedInUserId = localStorage.getItem('userId');
    const loggedInUserRole = localStorage.getItem('role');

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const response = await axios.get(`/api/replies?post=${post._id}`);
                setReplies(response.data.replies);
            } catch (error) {
                console.error('Failed to fetch replies:', error);
            }
        };

        fetchReplies();
    }, [post._id]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post('/api/replies', {
                content: newReply,
                post: post._id,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReplies([...replies, response.data.reply]);
            setNewReply('');
        } catch (error) {
            console.error('Failed to add reply:', error);
        }
    };

    const handleVote = (updatedReply) => {
        setReplies((prevReplies) =>
            prevReplies.map((reply) =>
                reply._id === updatedReply._id ? updatedReply : reply
            )
        );
    };

    const handleEdit = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`/api/posts/${post._id}`, { content: editContent }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditing(false);
        } catch (error) {
            console.error('Failed to update post', error);
        }
    };
   
    

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/posts/${post._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onDelete(post._id);
        } catch (error) {
            console.error('Failed to delete post:', error.response?.data || error.message);
            alert('Failed to delete post: ' + (error.response?.data.error || 'Unknown error'));
        }
    };

    // Ensure correct rendering of edit and delete buttons
    const canEditOrDelete = (post.author._id === loggedInUserId || loggedInUserRole === 'Admin') && loggedInUserId && loggedInUserRole;

    return (
        <div className="p-6 mb-4 bg-[#e4e6fd] text-[#7b46d4] rounded-[25px] shadow-md">
            <div className="flex items-center mb-2">
                <img
                    src={`https://ui-avatars.com/api/?name=${post.author.username}&background=random&size=32`}
                    alt="Avatar"
                    className="w-8 h-8 mr-2 rounded-full"
                />
                <h2 className="text-lg font-bold">{post.title}</h2>
            </div>
            {editing ? (
                <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
            ) : (
                <p className="mb-2">{post.content}</p>
            )}
            <div className="flex items-center mb-2">
                <img
                    src={`https://ui-avatars.com/api/?name=${post.author.username}&background=random&size=32`}
                    alt="Avatar"
                    className="w-8 h-8 mr-2 rounded-full"
                />
                <p className="text-sm text-gray-500">By {post.author.username}</p>
            </div>
            {canEditOrDelete && (
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

            <form onSubmit={handleReplySubmit} className="mt-4">
                <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Add a reply"
                    required
                    className="w-full p-2 mb-2 border border-gray-300 rounded-[25px]"
                />
                <button type="submit" className="px-4 py-2 text-white rounded-[25px] hover:bg-[#8e9afa] bg-[#8b7ae6] hover:bg-blue-600 focus:outline-none">
                    Reply
                </button>
            </form>

            <div className="mt-6 space-y-4">
                {replies.map((reply) => (
                    <Reply
                        key={reply._id}
                        reply={reply}
                        onVote={handleVote}
                        onDelete={(replyId) => setReplies(replies.filter(r => r._id !== replyId))}
                        onEdit={(updatedReply) => setReplies(replies.map(r => r._id === updatedReply._id ? updatedReply : r))}
                    />
                ))}
            </div>
        </div>
    );
}

export default Post;


