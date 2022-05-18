import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
    const [comment, setComment] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://posts.com/post/${postId}/comments`, {
            content: comment,
        });
        setComment("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>Comment</label>
            <input
                type="text"
                className="form-control"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <input
                type="submit"
                className="btn btn-primary mt-2"
                value="Submit"
            />
        </form>
    );
};

export default CommentCreate;
