const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/posts", (req, res) => {
    const id = Object.keys(posts).length + 1;
    const { title } = req.body;
    posts[id] = { id, title };

    axios.post("http://localhost:4005/events", {
        type: "PostCreated",
        data: posts[id],
    }).catch(err => console.log(err.message));

    res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
    res.status(200);
});

app.listen(4000, () => {
    console.log("posts listening on port 4000");
});
