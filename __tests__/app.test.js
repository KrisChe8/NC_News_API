const request = require('supertest');
const app = require('../app');

const db = require('../db/connection');
const seed = require('../db/seeds/seed');

const {articleData, commentData, topicData, userData } = require('../db/data/test-data/index')

beforeEach(()=>{
    return seed({topicData, userData, articleData, commentData })
})
afterAll(() => {db.end()});


describe('api', ()=>{
    describe('GET /api/topics', ()=>{
        test('should return statuscode 200 and  an array of topic objects', ()=>{
            return request(app).get('/api/topics')
            .expect(200)
            .then(({body})=>{
                const {topics} = body;
                expect(topics).not.toHaveLength(0);
                topics.forEach((topic)=>{
                    expect(typeof topic.slug).toBe('string');
                    expect(typeof topic.description).toBe('string');
                }) 
            })
        })
    })
    describe('GET /api', ()=>{
        test('should return statusCode 200 and  object describing all the available endpoints on API', ()=>{
            return request(app).get('/api')
            . expect(200)
            .then(({body})=>{
                const {instructions} = body;
                for(let key in instructions){
                        expect(instructions[key].hasOwnProperty("description")).toBe(true);
                        expect(instructions[key].hasOwnProperty("queries")).toBe(true);
                        expect(instructions[key].hasOwnProperty("exampleResponse")).toBe(true);
                } 
            })
        })
    })
    describe('GET /api/articles/:article_id', ()=>{
        test('should return statusCode 200 and article object by id', ()=>{
            return request(app).get('/api/articles/1')
            .expect(200)
            .then(({body})=>{
                const {article} = body; 
                expect(article['article_id']).toBe(1);
                expect(typeof article['title']).toBe('string');
                expect(typeof article['topic']).toBe('string');
                expect(typeof article['author']).toBe('string');
                expect(typeof article['body']).toBe('string');
                expect(typeof article['created_at']).toBe("string");
                expect(typeof article['votes']).toBe('number');
                expect(typeof article['article_img_url']).toBe('string');

            })
        })
        test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', ()=>{
            return request(app).get('/api/articles/99999')
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Article does not exist");
            })
        })
        test('GET:400 sends an appropriate status and error message when given an invalid id', ()=>{
            return request(app).get('/api/articles/not-id')
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe('Bad request')
            })
        })
    })
    describe('GET /api/articles', ()=>{
        test('should return statuscode 200 and  an array of article objects', ()=>{
            return request(app).get('/api/articles')
            .expect(200)
            .then(({body})=>{
                const {articles} = body;
                articles.forEach((article)=>{
                expect(typeof article['article_id']).toBe('number');
                expect(typeof article['title']).toBe('string');
                expect(typeof article['topic']).toBe('string');
                expect(typeof article['author']).toBe('string');
                expect(typeof article['created_at']).toBe("string");
                expect(typeof article['votes']).toBe('number');
                expect(typeof article['article_img_url']).toBe('string');
                expect(typeof article['comment_count']).toBe('number')
                })
            })
        })
        test('should return statuscode 200 and  an array of article objects sorted by date in descending order by default', ()=>{
            return request(app).get('/api/articles')
            .expect(200)
            .then(({body})=>{
                expect(body.articles).toBeSortedBy("created_at", { descending: true });
            })
        })
        test('should return statuscode 200 and  an array of article objects sorted by author in descending order by default', ()=>{
            return request(app).get('/api/articles?sort_by=author')
            .expect(200)
            .then(({body})=>{
                expect(body.articles).toBeSortedBy("author", { descending: true });
            })
        })
        test('should return statuscode 200 and  an array of article objects sorted by topic in asc order', ()=>{
            return request(app).get('/api/articles?sort_by=topic&order=asc')
            .expect(200)
            .then(({body})=>{
                expect(body.articles).toBeSortedBy("topic", { descending: false });
            })
        })
        test('should return statuscode 200 and  an array of article objects ONLY of given TOPIC sorted by date in descending order by default', ()=>{
            return request(app).get('/api/articles?topic=cats')
            .expect(200)
            .then(({body})=>{
                const{articles} = body;
                expect(articles).toBeSortedBy("created_at", { descending: true });
                articles.forEach((article)=>{
                    expect(article['topic']).toBe('cats');
                })
            })
        })
        test('should return statuscode 200 and  an array of article objects ONLY of given AUTHOR sorted by date in descending order by default', ()=>{
            return request(app).get('/api/articles?author=icellusedkars')
            .expect(200)
            .then(({body})=>{
                const{articles} = body;
                expect(articles).toBeSortedBy("created_at", { descending: true });
                articles.forEach((article)=>{
                    expect(article['author']).toBe('icellusedkars');
                })
            })
        })
        test('GET:400 sends an appropriate status and error message when given an invalid sort_by query', ()=>{
            return request(app).get('/api/articles?sort_by=234')
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe('Bad request')
            })
        })
        test('GET:400 sends an appropriate status and error message when given an invalid order query', ()=>{
            return request(app).get('/api/articles?order=dosc')
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe('Bad request')
            })
        })
        test('GET:404 sends an appropriate status and error message when given a valid but NON-existent TOPIC', ()=>{
            return request(app).get('/api/articles?topic=burger')
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Topic does not exist");
            })
        })
        test('GET:404 sends an appropriate status and error message when given a valid but NON-existent Author', ()=>{
            return request(app).get('/api/articles?author=salad')
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Author does not exist");
            })
        })
    })
    describe("GET /api/articles/:article_id/comments", ()=>{
        test("should return statuscode 200 and  an array of comments for an article given by ID", ()=>{
            return request(app).get("/api/articles/1/comments")
            .expect(200)
            .then(({body})=>{
                const {comments} = body;
                expect(comments).not.toHaveLength(0);
                comments.forEach((comment)=>{
                expect(comment['article_id']).toBe(1);
                expect(typeof comment['comment_id']).toBe('number');
                expect(typeof comment['body']).toBe('string');
                expect(typeof comment['author']).toBe('string');
                expect(typeof comment['created_at']).toBe("string");
                expect(typeof comment['votes']).toBe("number")
                })
            })
        })
        test("return 200 and an array of comments for an article given by ID sorted by created_at in DESC ", ()=>{
            return request(app).get("/api/articles/1/comments")
            .expect(200)
            .then(({body})=>{
                const{comments} = body;
                expect(comments).toBeSortedBy("created_at", { descending: true });
            })
        })
        test("return 200 and an empty array of comments when the article does not have comments ", ()=>{
            return request(app).get("/api/articles/2/comments")
            .expect(200)
            .then(({body})=>{
                const{comments} = body;
                expect(comments).toEqual([]);
            })
        })
        test("GET:404 sends an appropriate status and error message when given a valid but NON-existent article ID ", ()=>{
            return request(app).get("/api/articles/999/comments")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Article does not exist")
            })
        })
        test('GET:400 sends an appropriate status and error message when given an invalid ID', ()=>{
            return request(app).get('/api/articles/dog/comments')
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe('Bad request')
            })
        })

    })
    describe("POST /api/articles/:article_id/comments", ()=>{
        test("POST: 201 inserts a new comment to the db and sends the posted comment to the client", ()=>{
            const newComment = {
                username: 'icellusedkars',
                body: "Hello world!"
            };
            return request(app)
            .post('/api/articles/1/comments')
            .send(newComment)
            .expect(201)
            .then(({body})=>{
                const {comment} = body;
                expect(comment.body).toBe("Hello world!");
                expect(comment.author).toBe("icellusedkars");
                expect(comment.article_id).toBe(1)
            })
        })
        test('POST:404 sends an appropriate status and error message when given a valid but non-existent id', ()=>{
            const newComment = {
                username: 'icellusedkars',
                body: "Hello world!"
            };
            return request(app)
            .post('/api/articles/999/comments')
            .send(newComment)
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Article does not exist");
            })
        })
        test('POST:400 sends an appropriate status and error message when given an invalid id', ()=>{
            const newComment = {
                username: 'icellusedkars',
                body: "Hello world!"
            };
            return request(app)
            .post('/api/articles/karamba/comments')
            .send(newComment)
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe('Bad request')
            })
        })
    })
})
