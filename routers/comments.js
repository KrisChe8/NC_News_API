const commentsRouter = require('express').Router()
const {
    deleteCommentById
} = require("../controllers/comment.controllers")

commentsRouter.route("/:comment_id")
.delete(deleteCommentById)


module.exports = commentsRouter;