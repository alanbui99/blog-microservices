import { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem";

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const resp = await axios.get("http://posts.com/posts");
        setPosts(resp.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map((post) => (
        <PostItem key={post.id} post={post} />
    ));

    return (
        <>
            <h1>Posts</h1>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {renderedPosts}
            </div>
        </>
    );
};

export default PostList;
