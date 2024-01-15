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
})
