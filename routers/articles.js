const articlesRouter = require('express').Router();

const {
    getArticleById,
    getAllArticles,
    patchArticleVotes
} = require("../controllers/articles.controllers");

const {
    getCommentsByArticleId,
    postComment
} = require("../controllers/comment.controllers")

articlesRouter.route('/')
    .get(getAllArticles)

articlesRouter.route('/:article_id')
    .get(getArticleById)
    .patch(patchArticleVotes)

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticleId)
    .post(postComment)

module.exports = articlesRouter;