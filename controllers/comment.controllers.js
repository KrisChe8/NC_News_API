const {
    fetchCommentsByArticleId,
    insertComment
} = require("../models/comment.models");
const {checkArticleExists} = require("../utils/checkExistence.utils");

module.exports.getCommentsByArticleId = (req, res, next)=>{
    const {article_id} = req.params;

    const fetchCommentsQuery =  fetchCommentsByArticleId(article_id);
    const articleExistenceQuery = checkArticleExists(article_id);
    const queries =[fetchCommentsQuery, articleExistenceQuery];
    Promise.all(queries)
    .then((response)=>{
        const comments = response[0];
        res.status(200).send({comments})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.postComment = (req, res, next)=>{
    const {article_id} = req.params;
    const {username, body} = req.body;

    const articleExistenceQuery = checkArticleExists(article_id);
    const insertCommentsQuery =  insertComment(username, body, article_id);
    const queries =[insertCommentsQuery, articleExistenceQuery];
    Promise.all(queries)

    .then((response)=>{
        const comment = response[0];
        res.status(201).send({comment})
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    })
}