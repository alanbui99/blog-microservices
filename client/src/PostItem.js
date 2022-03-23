import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostItem = ({ post }) => {
    return (
        <div className="card" style={{ width: "30%", marginBottom: "20px" }}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id}/>
            </div>
        </div>
    );
};

export default PostItem;
