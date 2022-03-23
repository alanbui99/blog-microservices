const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const eventStore = []

app.post("/events", (req, res) => {
    const event = req.body;
    eventStore.push(event);
    axios.post("http://localhost:4000/events", event).catch((err) => {console.log(err.message)});
    axios.post("http://localhost:4001/events", event).catch((err) => {console.log(err.message)});
    axios.post("http://localhost:4002/events", event).catch((err) => {console.log(err.message)});
    axios.post("http://localhost:4003/events", event).catch((err) => {console.log(err.message)});
    return res.status(200);
});

app.get('/events', (req, res) => {
    res.send(eventStore)
})

app.listen(4005, () => {
    console.log("event-bus listening on 4005");
});
