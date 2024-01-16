const express = require("express");
const db = require("./db/connection");
const {getAllTopics} = require("./controllers/topics.controller")
const  {getEndpoints} = require("./controllers/endpoints.controller");
const {
    getArticleById,
    getAllArticles
} = require("./controllers/articles.controllers")
const {
    psqlErrorHandler,
    customErrorHandler,
    serverErrorHandler
} = require("./error-handler")
const {getCommentsByArticleId} = require("./controllers/comment.controllers")

const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleById );

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId )


app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;