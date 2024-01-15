const express = require("express");
const db = require("./db/connection");
const {getAllTopics} = require("./controllers/topics.controller")
const  {getEndpoints} = require("./controllers/endpoints.controller");
const {getArticleById} = require("./controllers/articles.controllers")
const app = express();

app.get("/api/topics", getAllTopics)
app.get("/api", getEndpoints)

app.get("/api/articles/:article_id", getArticleById )


app.use((err, req, res, next)=>{
    if(err.code === '22P02'){
        res.status(400).send({msg: "Bad request"});
    }else{
        next(err)
    }
})
app.use((err, req, res, next)=>{
    if(err.msg === "Article does not exist"){
        res.status(404).send({msg: err.msg})
    }else{
        next(err)
    }
})
app.use((err, req, res, next)=>{
    res.status(500).send({msg: "Ooops ... "})
})

module.exports = app;