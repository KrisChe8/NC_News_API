const express = require("express");
const db = require("./db/connection");
const {getAllTopics} = require("./controllers/topics.controller")
const  {getEndpoints} = require("./controllers/endpoints.controller");
const app = express();

app.get("/api/topics", getAllTopics)
app.get("/api", getEndpoints)

module.exports = app;