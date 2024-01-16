const express = require("express");
const db = require("./db/connection");
const {getAllTopics} = require("./controllers/topics.controller")
const  {getEndpoints} = require("./controllers/endpoints.controller");
const {
    getArticleById,
    getAllArticles,
    patchArticleVotes
} = require("./controllers/articles.controllers")
const {
    psqlErrorHandler,
    customErrorHandler,
    serverErrorHandler
} = require("./error-handler")
const {
    getCommentsByArticleId,
    postComment
} = require("./controllers/comment.controllers")

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getEndpoints);
app.get("/api/articles/:article_id", getArticleById );
app.get("/api/articles", getAllArticles)
app.get("/api/articles/:article_id/comments", getCommentsByArticleId )

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchArticleVotes)

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;