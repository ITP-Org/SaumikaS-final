import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults() {
    const [posts, setPosts] = useState([]);
    const query = useQuery().get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`/api/search?query=${encodeURIComponent(query)}`);
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="container p-4 mx-auto">
            <h2 className="mb-4 text-2xl font-bold">Search Results for "{query}"</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Link to={`/posts/${post._id}`} key={post._id} className="block p-4 mb-4 border rounded hover:bg-gray-100">
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <p>{post.content}</p>
                    </Link>
                ))
            ) : (
                <p>No posts found for your search.</p>
            )}
        </div>
    );
}

export default SearchResults;
