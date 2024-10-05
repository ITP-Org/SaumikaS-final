import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postResponse = await axios.get(`/api/posts/${id}`);
                setPost(postResponse.data.post);

                const repliesResponse = await axios.get(`/api/replies?post=${id}`);
                setReplies(repliesResponse.data.replies);
            } catch (error) {
                console.error('Failed to fetch post details:', error);
            }
        };

        fetchPostDetails();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container p-4 mx-auto">
            <h2 className="mb-4 text-2xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <div className="mt-4">
                <h3 className="text-xl font-bold">Replies</h3>
                {replies.map((reply) => (
                    <div key={reply._id} className="p-4 mb-2 border rounded">
                        <p>{reply.content}</p>
                        <p className="text-sm text-gray-600">By {reply.author.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostDetails;
