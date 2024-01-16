const {fetchCommentsByArticleId} = require("../models/comment.models");
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
        console.log(err)
        next(err)
    })
}