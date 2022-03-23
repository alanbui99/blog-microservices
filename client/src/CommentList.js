const CommentList = ({ comments }) => {
    const renderedComments = comments.map(({ id, content, status }) => {
        if (status === "pending") {
            content = "Comment awaiting moderation";
        }

        if (status === "rejected") {
            content = "Comment rejected";
        }
        return <li key={id}>{content}</li>;
    });

    return (
        <>
            <div className="font-weight-light">
                {comments.length} comment(s)
            </div>
            <ul>{renderedComments}</ul>
        </>
    );
};

export default CommentList;
