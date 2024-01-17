const db = require("../db/connection");

module.exports.fetchAllUsers = ()=>{
    return db.query(
        "SELECT * FROM users"
    ).then((result)=>{
        return result.rows;
    })
}