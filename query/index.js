const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { postId, id, content, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === "CommentUpdated") {
        const { postId, id, status } = data;
        const comment = posts[postId].comments.find((c) => c.id === id);
        comment.status = status;
    }
};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);

    return res.status(201);
});

app.listen(4002, async () => {
    console.log("query listening on 4002");

    try {
        const resp = await axios.get("http://localhost:4005/events");
        const events = resp.data;

        for (const { type, data } of events) {
            handleEvent(type, data);
        }
    } catch (err) {
        console.log(err.message);
    }
});
