const db = require("../db/connection");

module.exports.checkTopicExist = (topic)=>{
    return db.query("SELECT * FROM articles WHERE topic = $1", [topic])
    .then(({rows})=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: "Topic does not exist"})
        }
    })
}

module.exports.checkAuthorExist = (author)=>{
    return db.query("SELECT * FROM articles WHERE author = $1", [author])
    .then(({rows})=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: "Author does not exist"})
        }
    })
}