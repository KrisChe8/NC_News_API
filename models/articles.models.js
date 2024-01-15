const db = require("../db/connection");

module.exports.fetchArticleById = (id)=>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({rows})=>{
        if(rows.length === 0){
            return Promise.reject({msg: 'Article does not exist'})
        }
        return rows[0];
    })
}