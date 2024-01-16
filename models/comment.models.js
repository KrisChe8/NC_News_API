const db = require("../db/connection");

module.exports.fetchCommentsByArticleId = (id)=>{
    return db.query(`SELECT * FROM comments WHERE article_id =$1 ORDER BY created_at DESC`, [id])
    .then(({rows})=>{
        
        return rows;
    })
}

module.exports.insertComment = (username, body, id) =>{
    return db.query(
        `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3)
        RETURNING *;`,
        [body, username, id]
    )
    .then((result)=>{
        return result.rows[0];
    })
}