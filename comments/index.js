const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post("/post/:id/comments", (req, res) => {
    const postId = req.params.id;

    if (!commentsByPostId[postId]) {
        commentsByPostId[postId] = [];
    }

    const commentId = commentsByPostId[postId].length + 1;
    const { content } = req.body;
    const comment = { id: commentId, content, status: "pending" };
    commentsByPostId[postId].push(comment);

    axios
        .post("http://localhost:4005/events", {
            type: "CommentCreated",
            data: { postId, ...comment },
        })
        .catch((err) => console.log(err.message));

    res.status(201).send(comment);
});

app.get("/post/:id/comments", (req, res) => {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];

    res.send(comments);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { postId, id, status } = data;
        const comment = commentsByPostId[postId].find((c) => c.id === id);
        comment.status = status;
        axios
            .post("http://localhost:4005/events", {
                type: "CommentUpdated",
                data: { postId, ...comment },
            })
            .catch((err) => console.log(err.message));

        return res.status(201);
    }

    res.status(200);
});

app.listen(4001, () => {
    console.log("comments listening on port 4001");
});
