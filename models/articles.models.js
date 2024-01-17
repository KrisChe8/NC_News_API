const db = require("../db/connection");

module.exports.fetchArticleById = (id)=>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({rows})=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'Article does not exist'})
        }
        return rows[0];
    })
}

module.exports.fetchAllArticles = (order_by = 'created_at', orderWay = 'desc', topic, author) =>{
    const orderByAllowed = ['created_at', 'author', 'title','article_id',  'topic', 'votes' ];
    const orderOptions = ['desc', 'asc'];
    if(!orderByAllowed.includes(order_by)){
        return Promise.reject({status: 400, msg: "Bad request"})
    }
    if(!orderOptions.includes(orderWay)){
        return Promise.reject({status: 400, msg:"Bad request"})
    }
    
    let queryStr = `SELECT
    articles.article_id,
        articles.title,
        articles.topic,
        articles.author,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        count(comments.article_id) AS comment_count
        FROM articles LEFT JOIN comments ON articles.article_id=comments.article_id`; 

        const queryParams = [];
        if(topic){
            queryStr += " WHERE articles.topic = $1";
            queryParams.push(topic);
        }
        if(author){
            queryStr += " WHERE articles.author = $1";
            queryParams.push(author);
        }

        queryStr += ` GROUP BY articles.article_id`
        queryStr += ` ORDER BY ${order_by} ${orderWay}`;
    return db.query(queryStr, queryParams).then((result)=>{
        return result.rows
    })
}

module.exports.updateArticleVotes = (id, votesIncr)=>{
    const num = Number(votesIncr);
    return db.query(
        `UPDATE articles 
        SET votes = articles.votes+$1 
        WHERE article_id = $2
        RETURNING *;`,
        [num, id]
    ).then((result)=>{
        return result.rows[0];
    })
}