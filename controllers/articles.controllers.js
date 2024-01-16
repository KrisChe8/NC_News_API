const {
    fetchArticleById,
    fetchAllArticles,
    updateArticleVotes
} = require("../models/articles.models")

const {
    checkTopicExist, 
    checkAuthorExist,
    checkArticleExists
} = require("../utils/checkExistence.utils")


module.exports.getArticleById = (req, res, next) =>{
    const {article_id} = req.params;
    fetchArticleById(article_id).then((article)=>{
        res.status(200).send({article})
    })
    .catch((err)=>{
        next(err);
    })
}

module.exports.getAllArticles = (req, res, next) =>{
  
    const {sort_by, order, topic, author} = req.query;

    const fetchArticlesQuery = fetchAllArticles(sort_by, order, topic, author);
    const queries =[fetchArticlesQuery];
    
    if(topic){
        const topicExistenceQuery = checkTopicExist(topic);
        queries.push(topicExistenceQuery);
    }
    if(author){
        const authorExistenceQuery = checkAuthorExist(author);
        queries.push(authorExistenceQuery)
    }
     
    Promise.all(queries)

    
    .then((response)=>{
        const articles = response[0];
        
        const counts = {};
        const semiresult =  articles.reduce((acc, {article_id})=>{
            if(acc.hasOwnProperty(article_id)){
                acc[article_id] +=1;
            }else{
                acc[article_id] = 1;
            }
            return acc;
        }, counts)
        
        articles.forEach((article)=>{
            let index = article['article_id']
           article['comment_count'] = counts[index]
        })

        const uniqueArticles= articles.reduce((acc, article)=>{
            if(acc.done[article['article_id']]){
                return acc;
            }
            acc.done[article['article_id']] = true
            acc.articles.push(article);
            return acc;
        },{done:{}, articles:[]})
        
        res.status(200).send({articles: uniqueArticles.articles})
    })
    .catch((err)=>{
        next(err)
    })
    
}

exports.patchArticleVotes = (req, res, next) =>{
    const {article_id} = req.params;
    const {inc_votes} = req.body;

    const articleExistenceQuery = checkArticleExists(article_id);
    const updateVotesQuery =  updateArticleVotes(article_id, inc_votes);
    const queries =[updateVotesQuery, articleExistenceQuery];
    Promise.all(queries)

    
    .then((response)=>{
        const article = response[0];
        res.status(200).send({article})
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    })

}