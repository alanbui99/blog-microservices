const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const badWords = ["fuck", "shit", "cunt", "asshole"];

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentCreated") {
        const { postId, id, content } = data;
        let moderatedStatus = "approved";

        for (const word of badWords) {
            if (content.includes(word)) {
                moderatedStatus = "rejected";
                break;
            }
        }

        axios
            .post("http://localhost:4005/events", {
                type: "CommentModerated",
                data: { postId, id, status: moderatedStatus },
            })
            .catch((err) => console.log(err.message));

        return res.status(201);
    }

    res.status(200);
});

app.listen(4003, () => {
    console.log("moderation listening on 4003");
});